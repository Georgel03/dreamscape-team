'use server'
import { prisma } from '../lib/prisma';

export  async function getBadgesForUser(userId: string) {

    if (!userId) {
        return { success: false, error: "User ID este necesar." };
    }
    try {

    const userBadges =  await prisma.badgeOnUser.findMany({
        where: {
            userId: userId,
        },
        include: {
            badge: true,
        },
        orderBy: {
                earnedAt: 'desc' 
        }
    });

    const formattedBadges = userBadges.map((record) => ({
            id: record.badge.id,
            name: record.badge.name,
            code: record.badge.code,
            image: record.badge.image,
            desc: record.badge.desc,
            earnedAt: record.earnedAt, 
        }));

    return { success: true, data: formattedBadges };
    } catch (error) {
        console.error("Eroare la preluarea badge-urilor:", error);
        return { success: false, error: "A apărut o eroare la preluarea badge-urilor." };
    }

}
