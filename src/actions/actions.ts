'use server';

import { uploadBase64ToStorage, uploadVideoFromurlToStorage } from "../lib/storage";
import { v4 as uuidv4 } from 'uuid';

export async function testVideoUploadAction() {
    
  try {
    console.log("Incep testul de VIDEO upload...");

    const dummyVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
    
    const fileName = `test-video-${uuidv4()}`;

    // Apeleaza functia ta din storage.ts
    const publicUrl = await uploadVideoFromurlToStorage(dummyVideoUrl, fileName);

    console.log("Video Upload reusit:", publicUrl);

    return { success: true, url: publicUrl };

  } catch (error: any) {
    console.error("Eroare test video:", error);
    return { success: false, error: error.message };
  }
}

export async function testUploadAction() {
  try {

    const dummyBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    
    const fileName = `test-${uuidv4()}`;

    console.log("Incep testul de upload...");
    
    const publicUrl = await uploadBase64ToStorage(dummyBase64, fileName);

    console.log("Upload reusit:", publicUrl);

    return { success: true, url: publicUrl };

  } catch (error: any) {
    console.error("Eroare test:", error);
    return { success: false, error: error.message };
  }
}

