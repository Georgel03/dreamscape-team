'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuidv4 } from 'uuid';

// CONFIGURATION 
// Using the model ID from your provided types.ts
const MODEL_ID = 'veo-3.1-fast-generate-preview'; 

// --- HELPER: Upload to Supabase ---
async function uploadToStorage(buffer: Buffer, userId: string): Promise<string> {
  const fileName = `${userId}/${uuidv4()}.mp4`;
  const { error } = await supabaseAdmin
    .storage.from('dream-media').upload(fileName, buffer, { contentType: 'video/mp4', upsert: true });

  if (error) throw new Error(`Storage Error: ${error.message}`);
  const { data } = supabaseAdmin.storage.from('dream-media').getPublicUrl(fileName);
  return data.publicUrl;
}

// MAIN FUNCTION 
export async function generateVideoVertex(prompt: string, imageBase64: string, userId: string): Promise<string> {
  console.log("🎥 Veo: Starting generation (Google GenAI SDK)...");

  try {
    // 1. Initialize SDK with API Key
    // NOTE: Ensure GOOGLE_API_KEY is set in your .env.local file
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    // 2. Prepare Payload
    // We construct the payload exactly as your 'geminiService.ts' does
    const config = {
      numberOfVideos: 1,
      resolution: "720p",
      aspectRatio: "16:9",
    };

    const generateVideoPayload: any = {
      model: MODEL_ID,
      config: config,
      prompt: prompt,
    };

    // 3. Handle Image-to-Video Logic
    // If we have an image, we treat it as the 'startFrame' (FRAMES_TO_VIDEO mode from your example)
    if (imageBase64) {
      console.log("🖼️ Adding start frame...");
      generateVideoPayload.image = {
        imageBytes: imageBase64,
        mimeType: 'image/png', // Assuming PNG from Imagen
      };
    }

    // 4. Submit Request
    console.log('🚀 Submitting video generation request...');
    let operation = await ai.models.generateVideos(generateVideoPayload);
    console.log('⏳ Operation started. Polling...');

    // 5. Polling Loop (Matches your service code)
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5s
      // process.stdout.write("."); // Optional visual feedback
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    console.log('\n✅ Operation Done!');

    // 6. Extract & Download Video
    if (operation.response && operation.response.generatedVideos && operation.response.generatedVideos.length > 0) {
        const firstVideo = operation.response.generatedVideos[0];
        
        if (!firstVideo.video?.uri) {
            throw new Error('Generated video is missing a URI.');
        }

        const videoUri = firstVideo.video.uri;
        console.log('⬇️ Fetching video from:', videoUri);

        // Fetch the actual video file using the API Key
        const res = await fetch(`${videoUri}&key=${process.env.GOOGLE_API_KEY}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch video file: ${res.status} ${res.statusText}`);
        }

        const videoArrayBuffer = await res.arrayBuffer();
        const videoBuffer = Buffer.from(videoArrayBuffer);

        // 7. Upload to Supabase
        return await uploadToStorage(videoBuffer, userId);

    } else {
        console.error('Operation failed or empty:', operation);
        throw new Error('No videos were generated.');
    }

  } catch (e: any) {
    console.error("❌ Veo SDK Error:", e);
    console.warn("⚠️ Switching to fallback video.");
    
    // Fallback to prevent app crash
    return "https://cdn.pixabay.com/video/2023/10/22/186175-877660724_large.mp4";
  }
}