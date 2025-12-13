import { prisma } from '../lib/prisma';


export async function checkAndAwardBadges(userId: string, dreamId: string) {


    const dream = await prisma.dream.findUnique({
        where: {
            id : dreamId
        },
        select: {
            visibility : true,
            tags : true,
            content : true
        }
    });

    if (!dream) return;

    const userBadges = await prisma.badgeOnUser.findMany({
        where : {
            userId : userId
        },
        select: { badge: { select: { code: true } } }
    })
    const earnedBadgesCodes = new Set(userBadges.map(b => b.badge.code));

    const totalDreams = await prisma.dream.count({
        where : {
            userId : userId
        }
    });

    const awardBadge = async (code: string) => {

        if (earnedBadgesCodes.has(code)) {
            console.log(`User ${userId} already has badge ${code}, skipping.`);
            return;
        }

        const searchBadgeId = await prisma.badge.findUnique({ where: { code }, select: { id: true }})

        if (!searchBadgeId) {
            console.error(`Badge with code ${code} not found.`);
            return;
        }

        if (!earnedBadgesCodes.has(code)) {
            await prisma.badgeOnUser.create({
                data : {
                    userId,
                    badgeId : searchBadgeId.id
                }
                
            }).catch((e) => {
                console.error(`Error awarding badge ${code} to user ${userId}:`, e);
            });
        } else {
            console.log(`User ${userId} already has badge ${code}, skipping.`);
            return;
        }
    }

    if (totalDreams === 1) {
        await awardBadge('FIRST_DREAM');
    }

    if (dream.visibility === 'PUBLIC') {
       const publicDreamsCount = await prisma.dream.count({
            where : {
                userId,
                visibility : 'PUBLIC'
            }
       });
       if (publicDreamsCount === 1) {
            await awardBadge('First_Public_Dream');
       }
    }

    if (dream.tags.includes('lucid') || dream.content.toLowerCase().includes('lucid')) {
        await awardBadge('Dream_Lucid');
    }

    if (totalDreams > 2) {
        const streak = await calculateStreak(userId);
        if (streak >= 7) {
            await awardBadge('STREAK_7');
        } 
        if (streak >= 30) {
            await awardBadge('STREAK_30');
        }
    }

   


}

async function calculateStreak(userId: string) {

    const dataDreams = await prisma.dream.findMany({
        where : { userId },
        select : {
            occurredAt : true
        },
        orderBy : { occurredAt : 'desc' }
    })

    if (dataDreams.length === 0) return 0;

    const uniqueDays = Array.from(new Set(dataDreams.map(d => d.occurredAt.toISOString().split('T')[0])));

    
    if (uniqueDays.length === 0) return 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) {
        return 0;
    }

    let streak = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
        
        const prevDate = new Date(uniqueDays[i - 1]);
        const currentDate = new Date(uniqueDays[i]);

        const diffTime = prevDate.getTime() - currentDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
            streak++;
        } else {
            break;
        }


    }

    return streak;
    
}