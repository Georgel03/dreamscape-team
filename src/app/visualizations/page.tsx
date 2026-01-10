'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/src/components/chat/Sidebar'; 
import { getChartData } from '@/src/actions/getChartData'; 
import { ChartDataPoint } from '@/src/types/chartDataType'; 
import { PanelLeftOpen } from 'lucide-react'; 

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

export default function VisualizationsPage() {
  
  const [points, setPoints] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function loadData() {
      try {
        setError(null);
        const data = await getChartData();
        setPoints(data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load chart data.');
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
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#a855f7',
      },
      {
        label: 'Fear',
        data: points.map((p) => p.emotions.fear),
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ec4899',
      },
      {
        label: 'Sadness',
        data: points.map((p) => p.emotions.sadness),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#0ea5e9',
      },
      {
        label: 'Anger',
        data: points.map((p) => p.emotions.anger),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#f97316',
      },
      {
        label: 'Surprise',
        data: points.map((p) => p.emotions.surprise),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#22c55e',
      },
      {
        label: 'Calm',
        data: points.map((p) => p.emotions.calm),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#06b6d4',
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
          color: '#e2e8f0',
          font: { family: 'system-ui', size: 12 },
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        titleColor: '#f9fafb',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        ticks: { color: '#e2e8f0', maxRotation: 0, font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      y: {
        min: 0,
        max: 1,
        ticks: { color: '#e2e8f0', stepSize: 0.1, font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
    },
  };

  return (
    <div className="flex h-screen w-full bg-[#020205] text-slate-100 overflow-hidden font-sans">
      
      {/* STYLE PENTRU SCROLLBAR */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMobileOpen={isMobileMenuOpen}
        closeMobile={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 flex flex-col relative h-full transition-all duration-300">

        <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="absolute top-4 left-4 z-50 p-2.5 rounded-xl bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all md:hidden shadow-lg"
        >
            <PanelLeftOpen className="w-6 h-6" />
        </button>

        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hidden md:block"
            title="Open Sidebar"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Area cu clasa custom-scrollbar */}
        <div className="flex-1 overflow-y-auto w-full flex flex-col items-center custom-scrollbar">
            
            <div className="w-full max-w-7xl px-4 sm:px-8 lg:px-12 pt-16 pb-16">
                
                <div className="max-w-6xl mx-auto w-full space-y-8">
                    <header className="space-y-3 text-center sm:text-left"> 
                        <p className="text-xs tracking-[0.2em] uppercase text-purple-400/80">
                            Dream Analytics
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                        Dream{' '}
                            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                            Visualizations
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
                        Real-time chart showing the emotions detected by AI in your dreams.
                        Values range between 0 and 1 (0 = absent, 1 = very intense).
                        </p>
                    </header>

                    {/* Am folosit bg-white/5 pentru contrast pe noul fundal */}
                    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-2xl shadow-purple-900/10">
                        <div className="pointer-events-none absolute -right-40 -top-40 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />
                        <div className="pointer-events-none absolute -left-40 -bottom-40 h-64 w-64 rounded-full bg-cyan-600/10 blur-[100px]" />

                        <div className="relative p-6 sm:p-8 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-white">
                            Emotions Over Time
                            </h2>
                            {isLoading && (
                            <span className="text-xs text-slate-500 animate-pulse">
                                Loading data...
                            </span>
                            )}
                        </div>

                        {error && (
                            <p className="text-sm text-rose-400">
                            {error}
                            </p>
                        )}

                        <div className="h-[420px] sm:h-[560px] lg:h-[640px] mt-6">
                            <Line data={data} options={options} />
                        </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}