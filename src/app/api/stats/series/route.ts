// src/app/api/stats/series/route.ts

export async function GET() {
  const now = new Date();

  // Generăm 7 puncte (7 zile) cu valori între 0 și 1
  const emotionSeries = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i)); // acum 6 zile ... azi

    return {
      occurredAt: d.toISOString(),
      emotions: {
        joy: Math.random(),
        fear: Math.random(),
        sadness: Math.random(),
        anger: Math.random(),
        surprise: Math.random(),
        calm: Math.random(),
      },
    };
  });

  return Response.json({ emotionSeries });
}
