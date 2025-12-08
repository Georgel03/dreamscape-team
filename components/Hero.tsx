"use client";

import { ArrowUpRight, Activity } from 'lucide-react';
import dynamic from 'next/dynamic';

// Prevent SSR errors for THREE.js
const Blob = dynamic(() => import('./Blob'), { ssr: false });

export default function Hero() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 md:pt-20 bg-[#020205]">

      {/* Background Noise */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />

      {/* REAL 3D Moving Blob */}
      {/* Responsive positioning: Scaled down on mobile, standard on desktop */}
      <div className="absolute top-[10%] md:top-[12%] left-1/2 -translate-x-1/2 z-0 scale-[1] md:scale-100 transition-transform duration-700">
        <Blob />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center mt-4 md:mt-[-5vh]">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-[1.1] mb-6 md:mb-8">
            Decode Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#C393F5] drop-shadow-[0_0_25px_rgba(195,147,245,0.5)]">
                Subconscious.
            </span>
        </h1>

        <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-10 md:mb-12 px-4">
          Unlock the hidden narratives of your mind with AI-powered dream interpretation and cinematic visualization in a fully encrypted environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-white text-black rounded-full text-base font-medium transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(195,147,245,0.4)]">
            Interpret Dream Now
          </button>
        </div>
      </div>

      {/* Floating UI Elements (Visible mainly on Desktop) */}
      
      {/* Card 1: Dream Sentiment */}
      <div className="absolute top-[65%] lg:top-[60%] left-[5%] xl:left-[15%] hidden lg:block animate-subtle-float">
        <div className="glass-card-floating p-5 rounded-2xl w-64 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Dream Sentiment</span>
            <ArrowUpRight className="text-white w-4 h-4" />
          </div>
          <div className="text-2xl text-white font-medium mb-1">Lucid High</div>
          <div className="text-xs text-[#C393F5] flex items-center gap-1 font-medium">
            <Activity className="w-3 h-3" /> 98% Clarity
          </div>
        </div>
      </div>

      {/* Card 2: Neural Processing */}
      <div className="absolute bottom-[10%] lg:bottom-[15%] right-[5%] xl:right-[15%] hidden lg:block animate-subtle-float delay-1000">
        <div className="glass-card-floating p-5 rounded-2xl w-72 bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Neural Processing</span>
            <div className="w-2 h-2 rounded-full bg-[#C393F5] animate-pulse"></div>
          </div>
          <div className="space-y-3">
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              {/* Updated Gradient to Purple */}
              <div className="h-full w-[85%] bg-gradient-to-r from-[#C393F5] to-purple-600 rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Rendering Scene 4</span>
              <span>85%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}