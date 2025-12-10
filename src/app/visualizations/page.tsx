'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/src/components/Navbar';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  TimeSeriesScale,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  TimeSeriesScale
);

type EmotionValues = {
  joy: number;
  fear: number;
  sadness: number;
  anger: number;
  surprise: number;
  calm: number;
};

type EmotionPoint = {
  occurredAt: string; // ISO date
  emotions: EmotionValues;
};

export default function VisualizationsPage() {
  const [points, setPoints] = useState<EmotionPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function loadData() {
      try {
        setError(null);

        const res = await fetch('/api/stats/series', {
          method: 'GET',
          next: { revalidate: 0 },
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }

        const json = await res.json();
        const incoming: EmotionPoint[] = json.emotionSeries ?? json ?? [];
        setPoints(incoming);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load data. Check /api/stats/series.');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
    intervalId = setInterval(loadData, 10_000);

    return () => clearInterval(intervalId);
  }, []);

  const labels = points.map((p) =>
    new Date(p.occurredAt).toLocaleDateString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Joy',
        data: points.map((p) => p.emotions.joy),
        borderColor: 'rgba(244, 114, 182, 1)', // roz
        backgroundColor: 'rgba(244, 114, 182, 0.12)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Fear',
        data: points.map((p) => p.emotions.fear),
        borderColor: 'rgba(248, 113, 113, 1)', // roșu soft
        backgroundColor: 'rgba(248, 113, 113, 0.12)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Sadness',
        data: points.map((p) => p.emotions.sadness),
        borderColor: 'rgba(96, 165, 250, 1)', // albastru
        backgroundColor: 'rgba(96, 165, 250, 0.12)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Anger',
        data: points.map((p) => p.emotions.anger),
        borderColor: 'rgba(251, 146, 60, 1)', // portocaliu
        backgroundColor: 'rgba(251, 146, 60, 0.12)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Surprise',
        data: points.map((p) => p.emotions.surprise),
        borderColor: 'rgba(190, 242, 100, 1)', // lime
        backgroundColor: 'rgba(190, 242, 100, 0.12)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Calm',
        data: points.map((p) => p.emotions.calm),
        borderColor: 'rgba(45, 212, 191, 1)', // turcoaz
        backgroundColor: 'rgba(45, 212, 191, 0.12)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e5e7eb', // text legend – gri deschis
          font: {
            family: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text"',
            size: 11,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f9fafb',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(148, 163, 184, 0.6)',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af', // etichete axa X
          maxRotation: 0,
        },
        grid: {
          color: 'rgba(31, 41, 55, 0.7)', // linii grid discrete
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          color: '#9ca3af',
          stepSize: 0.1,
        },
        grid: {
          color: 'rgba(31, 41, 55, 0.7)',
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-slate-100">
      <Navbar />

      <main className="flex-1 px-4 sm:px-8 lg:px-24 pt-32 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header stil asemănător cu landing page */}
          <header className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-violet-300/80">
                Dream Analytics
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
             Dream{' '}
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                 Visualizations
                </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Real-time chart showing the emotions detected by AI in your dreams.
            Values range between 0 and 1 (0 = absent, 1 = very intense).
            </p>
          </header>

          {/* Cardul cu graficul */}
          <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#050816] via-[#050816] to-[#020617] shadow-[0_0_60px_rgba(139,92,246,0.25)]">
            {/* un mic glow subtil în colț */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-40 -bottom-40 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Emotions Over Time
                </h2>
                {isLoading && (
                  <span className="text-xs text-slate-400">
                    Loading data...
                  </span>
                )}
              </div>

              {error && (
                <p className="text-sm text-rose-400">
                  {error}
                </p>
              )}

              <div className="h-[420px] sm:h-[560px] lg:h-[640px]">
                <Line data={data} options={options} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
