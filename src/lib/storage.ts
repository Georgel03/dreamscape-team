import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabase";
import { v4 as uuidv4 } from 'uuid';
export async function uploadBase64ToStorage(base64String : string, userId : string) : Promise<string> {

    
    const arrayBuffer = Buffer.from(base64String, 'base64'); 
    const filePath = `images/${userId}/${uuidv4()}.png`;

    const { data, error } = await supabaseAdmin.storage
        .from('dream-assets')
        .upload(filePath, arrayBuffer, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/png',
        })

    if (error) {
        console.error("Supabase Upload Error:", error);
        throw new Error("Cannot upload image to storage.");
    }

    const { data : publicData } = supabaseAdmin
        .storage
        .from('dream-assets')
        .getPublicUrl(filePath);

    return publicData.publicUrl;

}

export async function uploadVideoFromurlToStorage(videoUrl : string, userId: string) {

    try {
        
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error(`Eroare la descarcarea video-ului de la Google: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = `videos/${userId}/${uuidv4()}.mp4`;

        const { data, error } = await supabaseAdmin.storage
            .from('dream-assets')
            .upload(filePath, buffer, {
                cacheControl: '3600',
                upsert: true,
                contentType: 'video/mp4',
            })

        if (error) {
            console.error("Supabase Video Upload Error (Internal):", error);
            throw error;
        }

        const { data : publicData } = supabaseAdmin
            .storage
            .from('dream-assets')
            .getPublicUrl(filePath);

        return publicData.publicUrl;

    } catch (error) {
        console.error("Supabase Video Upload Error:", error);
        throw new Error("Nu am putut incarca videoclipul.");
    }
}