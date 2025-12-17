import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});
const badges = [
        {
            code : 'FIRST_DREAM',
            name : 'Inceputul calatoriei',
            desc : 'Ai logat primul tau vis in Dreamscape!',
            image: '/badges/first-dream.svg'
        },

        {
            code : 'STREAK_7',
            name : 'Saptamana Onirica',
            desc : 'Ai logat vise timp de 7 zile consecutive!',
            image: '/badges/streak-7.svg'
        },

        {
            code : 'STREAK_30',
            name : 'Maestru al Viselor',
            desc : 'Un jurnal complet de 30 de zile.',
            image: '/badges/streak-30.svg'
        },

        {
            code : 'First_Public_Dream',
            name : 'Vise pentru Lume',
            desc : 'Ai impartasit primul tau vis public!',
            image: '/badges/public-hero.svg'
        },

        {
            code : 'Dream_Lucid',
            name : 'Control Total',
            desc : 'Ai marcat un vis lucid!',
            image: '/badges/lucid-master.svg'
        }
    ];

export async function main() {

    for (const badge of badges) {
        await prisma.badge.upsert({ 
            where : { code : badge.code },
            update : { image : badge.image },
            create : badge 
        })
    }
}

main();
    