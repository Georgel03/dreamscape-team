'use server';

import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { DreamGenerationResult, Dream, Media } from "@/types/dreamMediaType";

export async function getHistoryAction(): Promise<DreamGenerationResult[]> {
  const { userId } = await auth();
  
  if (!userId) return [];

  try {
    
    const dreamsData = await prisma.dream.findMany({
      where: {
        userId: userId
      },
      include: {
        mediaImages: true, 
        video: true        
      },
      orderBy: {
        createdAt: 'asc' 
      }
    });
    
    const history: DreamGenerationResult[] = dreamsData.map((item) => {
      
      const allMedia = [...item.mediaImages];
      if (item.video) {
        allMedia.push(item.video);
      }

      const { mediaImages, video, ...cleanDream } = item;

      return {
        dream: cleanDream as unknown as Dream,
        media: allMedia as unknown as Media[]
      };
    });

    return history;

  } catch (error) {
    console.error("Eroare recuperare history (Prisma):", error);
    return [];
  }
}