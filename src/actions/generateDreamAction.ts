'use server';

import { DreamGenerationResult, Dream, Media } from "@/types/dreamMediaType";
import { supabaseAdmin } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';

import { generateImageVertex } from "./generateImagesAction";
import { generateVideoVertex } from "./generateVideoAction";

// CONFIG GEMINI
const GOOGLE_AUTH = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  keyFilename: 'service-account-key-1.json', 
});
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const TEXT_MODEL_ID = "gemini-2.0-flash";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function generateTextVertex(prompt: string, systemInstruction: string): Promise<any> {
  const client = await GOOGLE_AUTH.getClient();
  const token = (await client.getAccessToken()).token;
  const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${TEXT_MODEL_ID}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 }
    })
  });

  if (!response.ok) throw new Error(`Gemini Error: ${await response.text()}`);
  const data = await response.json();
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

// MAIN ACTION
export async function generateDreamAction(prompt: string): Promise<DreamGenerationResult> {
  console.log("🚀 Server: Starting Dream Process...");
  
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;

  // 1. Sync User
  await supabaseAdmin.from('User').upsert({
    id: userId,
    email: user.emailAddresses[0]?.emailAddress || "",
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    image: user.imageUrl,
    createdAt: new Date().toISOString()
  });

  // 1: TEXT
  console.log("📝 Generating Text...");
  const systemPrompt = `Analyze dream. Return JSON: { "title": "str", "summary": "str", "story": "str", "moodAI": "MYSTERIOUS|HAPPY|SAD|ANXIOUS|PEACEFUL|EUPHORIC", "emotions": {}, "tags": [], "visualPrompt": "str" }`;
  
  const dreamData = await generateTextVertex(prompt, systemPrompt);
  if (dreamData.moodAI) dreamData.moodAI = dreamData.moodAI.toUpperCase();

  const dreamId = uuidv4();
  
  // Saving Dream Text
  const dreamPayload = {
    id: dreamId, userId, title: dreamData.title, content: prompt,
    occurredAt: new Date().toISOString(), visibility: 'PRIVATE',
    tags: dreamData.tags, moodAI: dreamData.moodAI, emotions: dreamData.emotions,
    symbols: [], summary: dreamData.summary, story: dreamData.story,
    mediaVideoId: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  };
  
  const { error: dreamError } = await supabaseAdmin.from('Dream').insert(dreamPayload);
  if (dreamError) throw new Error("Failed to save Dream Text");
  console.log("✅ Dream Text Saved!");

  // 2. IMAGES
  console.log("🎨 Generating Image 1...");
  const img1Result = await generateImageVertex(dreamData.visualPrompt + " cinematic, 8k", userId);
  
  // Saving Image 1 Immediately
  await supabaseAdmin.from('Media').insert({
    id: uuidv4(), userId, dreamId, kind: 'IMAGE', url: img1Result.url, meta: { provider: "imagen-3" }, createdAt: new Date().toISOString()
  });

  console.log("🎨 Generating Image 2...");
  await sleep(1500); 
  const img2Result = await generateImageVertex(dreamData.visualPrompt + " abstract variation", userId);
  
  // Saving Image 2 Immediately
  await supabaseAdmin.from('Media').insert({
    id: uuidv4(), userId, dreamId, kind: 'IMAGE', url: img2Result.url, meta: { provider: "imagen-3" }, createdAt: new Date().toISOString()
  });
  console.log("✅ Images Saved!");

  // 3. VIDEO
  console.log("🎥 Generating Video...");
  await sleep(2000); // Pauză mică

  const videoUrl = await generateVideoVertex(dreamData.visualPrompt, img1Result.base64, userId);
  
  const videoId = uuidv4();
  
  // Video Saving
  await supabaseAdmin.from('Media').insert({
     id: videoId, userId, dreamId, kind: 'VIDEO', url: videoUrl, meta: { provider: "veo-3.1-fast" }, createdAt: new Date().toISOString() 
  });

  // Link Video to dream
  await supabaseAdmin.from('Dream').update({ mediaVideoId: videoId }).eq('id', dreamId).select().single();

  // Returning the full result
  const { data: allMedia } = await supabaseAdmin.from('Media').select().eq('dreamId', dreamId);
  const { data: updatedDream } = await supabaseAdmin.from('Dream').select().eq('id', dreamId).single();

  console.log("🏁 Process Finished Successfully.");
  return { dream: updatedDream as Dream, media: allMedia as Media[] };
}