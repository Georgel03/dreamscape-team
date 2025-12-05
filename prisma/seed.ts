import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
console.log("DATABASE_URL =", process.env.DATABASE_URL)
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

async function main() {
    const badges = [
        {
            code : 'FIRST_DREAM',
            name : 'Inceputul calatoriei',
            desc : 'Ai logat primul tau vis in Dreamscape!',
        },

        {
            code : 'STREAK_7',
            name : 'Saptamana Onirica',
            desc : 'Ai logat vise timp de 7 zile consecutive!',
        },

        {
            code : 'STREAK_30',
            name : 'Maestru al Viselor',
            desc : 'Un jurnal complet de 30 de zile.',
        },

        {
            code : 'First_Public_Dream',
            name : 'Vise pentru Lume',
            desc : 'Ai impartasit primul tau vis public!',
        },

        {
            code : 'Dream_Lucid',
            name : 'Control Total',
            desc : 'Ai marcat un vis lucid!',
        }
    ];

    for (const badge of badges) {
        await prisma.badge.upsert({
            where: { code: badge.code },
            update: {},
            create: badge,
        });
    }
          
    
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })