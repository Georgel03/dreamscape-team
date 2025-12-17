'use server';

import { DreamGenerationResult, Dream, Media, Visibility, MediaKind, DreamInputOptions } from "@/types/dreamMediaType";
import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';
import { generateImageVertex } from "./generateImagesAction";
import { generateVideoVertex } from "./generateVideoAction";
import { checkAndAwardBadges } from "@/lib/gamification";

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

export async function generateDreamAction(prompt: string, options?: DreamInputOptions): Promise<DreamGenerationResult> {
  console.log("🚀 Server: Starting Dream Process...");
  
  const { userId } = await auth();
    
    if (!userId) {
      console.log("❌ User not authenticated");
      throw new Error("User not authenticated");
    }

  let contextString = "";
  if (options) {
      if (options.dreamType) contextString += `Tone: ${options.dreamType}. `;
      if (options.emotions?.length) contextString += `Emotions involved: ${options.emotions.join(", ")}. `;
      if (options.atmosphere) contextString += `Atmosphere: ${options.atmosphere}. `;
      if (options.timeLight) contextString += `Time: ${options.timeLight}. `;
      if (options.keyCharacters) contextString += `Characters: ${options.keyCharacters}. `;
      if (options.perspective) contextString += `Perspective: ${options.perspective}. `;
  }

  
  console.log("📝 Generating Text...");
  const systemPrompt = `
    You are an expert Oneirologist (Dream Interpreter) and a Master Storyteller. 
    Your task is to analyze the user's raw dream input and transform it into a structured, vivid, and immersive experience.

    ### INPUT CONTEXT:
    The user has provided specific context parameters. Prioritize these constraints:
    "${contextString}"

    ### OUTPUT INSTRUCTIONS (STRICT JSON FORMAT):
    Return ONLY a raw JSON object. Do not include markdown formatting like \`\`\`json. 
    Follow these data types and rules strictly:

    {
      "title": {
         "type": "String",
         "instruction": "A short, creative, and mysterious title (max 5 words)."
      },
      
      "summary": {
         "type": "String",
         "instruction": "A concise, one-sentence summary of the core conflict."
      },
      
      "story": {
         "type": "String",
         "instruction": "A creative, first-person narrative expansion. Use sensory details. Length: 100-150 words."
      },
      
      "moodAI": {
         "type": "String",
         "instruction": "One single adjective describing the dominant atmosphere (e.g., 'Ethereal', 'Ominous')."
      },
      
      "emotions": {
         "type": "Object<String, Number>",
         "instruction": "A map of detected emotions where the key is the emotion name and the value is a float between 0.0 and 1.0 representing intensity.",
         "example": { "fear": 0.9, "curiosity": 0.4, "awe": 0.8 }
      },
      
      "tags": {
         "type": "Array<String>",
         "instruction": "An array of 3-5 keywords or archetypes found in the dream."
      },
      
      "visualPrompt": {
         "type": "String",
         "instruction": "A highly detailed, comma-separated prompt optimized for AI image generation. Structure: [Subject], [Environment], [Lighting], [Style], [Keywords]. Include settings: '${options?.atmosphere || 'Dreamscape'}' and lighting: '${options?.timeLight || 'Cinematic'}'."
      }
    }
  `;
  
  const dreamData = await generateTextVertex(prompt, systemPrompt);
  if (dreamData.moodAI) dreamData.moodAI = dreamData.moodAI.toUpperCase();

  const dreamId = uuidv4();
  

  try {
    const moodUserToSave = options?.dreamType;
    const visibilityToSave = options?.visibility || Visibility.PRIVATE;
    await prisma.dream.create({
      data: {
        id: dreamId, 
        userId, 
        title: dreamData?.title || "Vis Nou", 
        content: prompt,
        occurredAt: new Date().toISOString(), 
        visibility: visibilityToSave, 
        tags: dreamData.tags || [], 
        moodUser: moodUserToSave,
        moodAI: dreamData.moodAI, 
        emotions: dreamData.emotions || {}, 
        symbols: dreamData.tags || [], 
        summary: dreamData.summary, 
        story: dreamData.story,
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString()
      }
    });
    console.log("✅ Dream Text Saved!");
  } catch (error: any) {
    console.error("❌ EROARE PRISMA:", error);
    throw new Error(`Failed to save Dream. Detalii: ${error.message}`);
  }

  console.log("🎨 Generating Image 1...");
  const img1Result = await generateImageVertex(dreamData.visualPrompt + " cinematic, 8k", userId);
  
 
  await prisma.media.create({
    data: {
      id: uuidv4(), 
      userId, 
      dreamId: dreamId,
      kind: MediaKind.IMAGE, 
      url: img1Result.url, 
      meta: { provider: "imagen-3" }, 
      createdAt: new Date().toISOString()
    }
  });

  console.log("🎨 Generating Image 2...");
  await sleep(1500); 
  const img2Result = await generateImageVertex(dreamData.visualPrompt + " abstract variation", userId);
  
  await prisma.media.create({
    data: {
      id: uuidv4(), 
      userId, 
      dreamId: dreamId, 
      kind: MediaKind.IMAGE, 
      url: img2Result.url, 
      meta: { provider: "imagen-3" }, 
      createdAt: new Date().toISOString()
    }
  });
  console.log("✅ Images Saved!");

  console.log("🎥 Generating Video...");
  await sleep(2000); 

  const videoUrl = await generateVideoVertex(dreamData.visualPrompt, img1Result.base64, userId);
  const videoId = uuidv4();
  

  await prisma.media.create({
    data: {
       id: videoId, 
       userId, 
       kind: MediaKind.VIDEO, 
       url: videoUrl, 
       meta: { provider: "veo-3.1-fast" }, 
       createdAt: new Date().toISOString() 
    }
  });

  
  await prisma.dream.update({
    where: { id: dreamId },
    data: { mediaVideoId: videoId }
  });


  const result = await prisma.dream.findUnique({
    where: { id: dreamId },
    include: {
      mediaImages: true, 
      video: true       
    }
  });

  if (!result) throw new Error("Dream not found after creation");

  try {
    await checkAndAwardBadges(userId, dreamId);
    console.log("🏅 Badges checked and awarded if applicable.");
  } catch (badgeError) {
    console.error("❌ Error during badge awarding:", badgeError);
  }

  console.log("🏁 Process Finished Successfully.");
  
  
  const combinedMedia = [...result.mediaImages];
  if (result.video) {
    combinedMedia.push(result.video);
  }

  
  const { mediaImages, video, ...cleanDream } = result;

  return { 
    dream: cleanDream as unknown as Dream, 
    media: combinedMedia as unknown as Media[] 
  };
}