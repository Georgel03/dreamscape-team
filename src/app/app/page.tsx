'use client';

import { useState } from 'react';
import Sidebar from '@/components/chat/Sidebar';
import ChatHero from '@/components/chat/ChatHero';
import ChatInput from '@/components/chat/ChatInput';
import { PanelLeftOpen } from 'lucide-react';

export default function Home() {
  // Desktop State 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mobile State 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#050505] text-slate-300 overflow-hidden font-sans">
      
      <div className="ambient-glow" />

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMobileOpen={isMobileMenuOpen}
        closeMobile={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 flex flex-col relative h-full z-10 transition-all duration-300">

        {/* Only for mobile (md:hidden) */}
        <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="absolute top-4 left-4 z-40 p-2.5 rounded-xl bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all md:hidden shadow-lg"
        >
            <PanelLeftOpen className="w-6 h-6" />
        </button>

        {/* Desktop button */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-40 p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hidden md:block"
            title="Open Sidebar"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}

        {/* Main Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden w-full">
          <ChatHero />
        </div>

        {/* Input Area */}
        <ChatInput />

      </main>
    </div>
  );
}