'use server';

import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { ChartDataPoint } from "../types/chartDataType";

export async function getChartData(): Promise<ChartDataPoint[]> {

    const { userId } = await auth();
    if (!userId) {
        console.warn("Unauthorized access attempt to chart data");
        return [];
    }

    try {
        const dreamsData = await prisma.dream.findMany({
            where: { userId: userId },
            select: {
                occurredAt: true,
                emotions: true,
            },
            orderBy: { occurredAt: 'asc' },
            take: 50,
        });

        const chartData: ChartDataPoint[] = dreamsData.map((item) => {
            const e = item.emotions as any || {};
            return {
                occurredAt: item.occurredAt.toISOString(),
                emotions: {
                    joy: Number(e.joy || 0),
                    fear: Number(e.fear || 0),
                    sadness: Number(e.sadness || 0),
                    anger: Number(e.anger || 0),
                    surprise: Number(e.surprise || 0),
                    calm: Number(e.calm || 0),
                }
            }
        });

        return chartData;

    } catch (error) {
        console.error("Error fetching chart data (Prisma):", error);
        return [];
    }
}