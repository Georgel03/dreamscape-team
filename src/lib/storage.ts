import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {

    const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
    

    if (!supabaseURL || !serviceKey) {
        throw new Error("Lipsesc cheile Supabase din .env");
    }
    
    return createClient(supabaseURL, serviceKey);
}

export async function uploadBase64ToStorage(base64String : string, filename: string) {

    const supabase = getSupabaseAdmin();
    const arrayBuffer = Buffer.from(base64String, 'base64'); 
    const filePath = `images/${filename}.png`;

    const { data, error } = await supabase.storage
        .from('dream-assets')
        .upload(filePath, arrayBuffer, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/png',
        })

    if (error) {
        console.error("Supabase Upload Error:", error);
        throw new Error("Nu am putut incarca imaginea.");
    }

    const { data : publicData } = supabase
        .storage
        .from('dream-assets')
        .getPublicUrl(filePath);

    return publicData.publicUrl;

}

export async function uploadVideoFromurlToStorage(videoUrl : string, filename: string) {

    try {
        const supabase = getSupabaseAdmin();
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error(`Eroare la descarcarea video-ului de la Google: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const filePath = `videos/${filename}.mp4`;

        const { data, error } = await supabase.storage
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

        const { data : publicData } = supabase
            .storage
            .from('dream-assets')
            .getPublicUrl(filePath);

        return publicData.publicUrl;

    } catch (error) {
        console.error("Supabase Video Upload Error:", error);
        throw new Error("Nu am putut incarca videoclipul.");
    }
}