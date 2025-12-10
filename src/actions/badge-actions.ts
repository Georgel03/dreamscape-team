'use server'

import { prisma } from '../lib/prisma';

export async function getBadgesForUser(userId: string) {

    if (!userId) return { success: false, error: "UserID lipsește" };
    try {
        const badges = await prisma.badgeOnUser.findMany({
            where: { userId },
            select: { 
                badge : true,
                earnedAt : true
            },
            orderBy: {
                earnedAt : 'desc'
            }
        });
        return { success: true, data: badges.map(b => ({
            ...b.badge,
            earnedAt: b.earnedAt
        }))};

        
    } catch (error) {
        return { success: false, error: 'Eroare la preluarea insignei.' };
    }
}