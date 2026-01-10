'use server';

import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';
import { uploadBase64ToStorage } from "../lib/storage";


const authConfig: any = {
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
};

if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  try {
    authConfig.credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  } catch (e) {
    console.error("❌ Error parsing GOOGLE_SERVICE_ACCOUNT_KEY:", e);
  }
} else {
  authConfig.keyFilename = 'service-account-key-1.json';
}

const GOOGLE_AUTH = new GoogleAuth(authConfig);
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const LOCATION_ID = "us-central1";
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const IMAGE_MODEL_ID = "imagen-3.0-generate-001";


export async function generateImageVertex(prompt: string, userId: string): Promise<{ url: string, base64: string }> {
  try {
    const client = await GOOGLE_AUTH.getClient();
    const token = (await client.getAccessToken()).token;
    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${IMAGE_MODEL_ID}:predict`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ instances: [{ prompt: prompt }], parameters: { sampleCount: 1, aspectRatio: "4:3" } })
    });

    if (!response.ok) throw new Error(`Imagen Error: ${await response.text()}`);
    const result = await response.json();
    const base64 = result.predictions?.[0]?.bytesBase64Encoded;
    if (!base64) throw new Error("No image data");

    const publicUrl = await uploadBase64ToStorage(base64, userId);
    return { url: publicUrl, base64: base64 };
  } catch (e: any) {
    console.error("Imagen Fallback:", e.message);
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    return { url: fallbackUrl, base64: "" };
  }
}