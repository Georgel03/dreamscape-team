'use client'; // Necessario per gestire lo stato del menu mobile

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getLink = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    // 1. Container esterno
    <nav className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4">

      {/* 2. La "Pillola" principale */}
      <div className="relative w-full max-w-5xl bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-full pl-8 pr-3 py-3 flex items-center justify-between shadow-2xl shadow-black/50 z-50">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-medium tracking-tight text-sm uppercase">Oneiric ®</Link>
        </div>

        {/* DESKTOP LINKS (Nascosti su mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <a href={getLink('#features')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Technology</a>
          <a href={getLink('#visuals')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Visuals</a>
          <a href={getLink('#pricing')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Pricing</a>
          <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">About Us</Link>
        </div>

        {/* DESKTOP BUTTON & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">

          {/* Pulsante Desktop (Nascosto su mobile) */}
          <div className="hidden md:block">
            <button className="px-6 py-2.5 rounded-full border border-[#C393F5]/30 bg-[#C393F5]/10 text-white text-sm font-medium hover:bg-[#C393F5]/20 hover:border-[#C393F5]/50 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
              Sign Up Now
            </button>
          </div>

          {/* Menu Hamburger (Visibile solo su mobile) */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MENU MOBILE DROPDOWN (Visibile quando isOpen è true) */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full max-w-5xl px-4 md:hidden">
          <div className="w-full bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-200">

            <div className="flex flex-col gap-4 items-center">
              <a href={getLink('#features')} onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Technology</a>
              <a href={getLink('#visuals')} onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Visuals</a>
              <a href={getLink('#pricing')} onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Pricing</a>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">About Us</Link>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            <button className="w-full py-3 rounded-xl border border-[#C393F5]/30 bg-[#C393F5]/10 text-white font-medium hover:bg-[#C393F5]/20 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
              Sign Up Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}