'use server'

import { auth } from '@clerk/nextjs/server';
import { prisma } from '../lib/prisma';
import { checkAndAwardBadges } from '../lib/gamification';
import { revalidatePath } from 'next/cache';
import { Visibility, Mood } from '../generated/prisma/enums';

export async function createMockDream(
    isPublic: boolean = false,
    isLucid: boolean = false,
    daysAgo: number = 0
) {

    const { userId } = await auth();
    if (!userId) {
        throw new Error('Unauthorized');
    }

    try {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        const mockTags = ["test", "manual"];
        isLucid && mockTags.push("lucid");

        const newDream = await prisma.dream.create({
            data : {
                userId,
                title: `Vis Test ${daysAgo > 0 ? `(-${daysAgo} zile)` : ''}`,
                content: 'Acesta este un vis creat pentru testare.',
                occurredAt: date,
                visibility: isPublic ? Visibility.PUBLIC : Visibility.PRIVATE,
                summary: "Acesta este un rezumat al visului de testare.",
                moodAI : Mood.NEUTRAL,
                tags: mockTags,
                emotions: { joy: 0.5, curiosity: 0.5 },
                story: "Poveste de testare a visului.",
            }
        });

        await checkAndAwardBadges(userId, newDream.id);
        revalidatePath('/test-badges-viewer');
        return { success: true, message: `Vis creat! ID: ${newDream.id}` };
    } catch (error) {
        return { success: false, error: `Eroare la crearea visului: ${error}` };
    }
}