'use server';
import { GoogleGenAI } from "@google/genai";
import { uploadVideoFromurlToStorage } from "../lib/storage";
import { VeoModel, AspectRatio, Resolution } from "../types/dreamMediaType";

// MAIN FUNCTION 
export async function generateVideoVertex(prompt: string, imageBase64: string, userId: string): Promise<string> {
  console.log("🎥 Veo: Starting generation (Google GenAI SDK)...");

  try {

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const config = {
      numberOfVideos: 1,
      resolution: Resolution.P720,
      aspectRatio: AspectRatio.LANDSCAPE,
    };

    const generateVideoPayload: any = {
      model: VeoModel.VEO,
      config: config,
      prompt: prompt,
    };

    if (imageBase64) {
      console.log("🖼️ Adding start frame...");
      generateVideoPayload.image = {
        imageBytes: imageBase64,
        mimeType: 'image/png', 
      };
    }

   
    console.log('🚀 Submitting video generation request...');
    let operation = await ai.models.generateVideos(generateVideoPayload);
    console.log('⏳ Operation started. Polling...');

    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); 
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    console.log('\n✅ Operation Done!');

    if (operation.response && operation.response.generatedVideos && operation.response.generatedVideos.length > 0) {
        const firstVideo = operation.response.generatedVideos[0];
        
        if (!firstVideo.video?.uri) {
            throw new Error('Generated video is missing a URI.');
        }

        const videoUri = `${firstVideo.video.uri}&key=${process.env.GOOGLE_API_KEY}`;
        console.log('⬇️ Fetching video from:', videoUri);

        return await uploadVideoFromurlToStorage(videoUri, userId);

    } else {
        console.error('Operation failed or empty:', operation);
        throw new Error('No videos were generated.');
    }

  } catch (e: any) {
    console.error("❌ Veo SDK Error:", e);
    console.warn("⚠️ Switching to fallback video.");
    
    return "https://cdn.pixabay.com/video/2023/10/22/186175-877660724_large.mp4";
  }
}