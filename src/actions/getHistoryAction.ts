'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { DreamGenerationResult, Dream, Media } from "@/types/dreamMediaType";

export async function getHistoryAction(): Promise<DreamGenerationResult[]> {
  const { userId } = await auth();
  
  if (!userId) return [];

  // Query to get dreams and their associated media
  const { data, error } = await supabaseAdmin
    .from('Dream')
    .select('*, Media:Media!Media_dreamId_fkey(*)') 
    .eq('userId', userId)
    .order('createdAt', { ascending: true });

  if (error) {
    console.error("Errore recupero history:", error);
    return [];
  }

  // Format the data into DreamGenerationResult[]
  const history: DreamGenerationResult[] = data.map((item: any) => ({
    dream: {
      ...item,
      Media: undefined // clean up unwanted field
    } as Dream,
    media: item.Media as Media[]
  }));

  return history;
}