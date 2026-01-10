'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/nextjs';

// Style for the Clerk UserButton (Restored from your first version)
const clerkButtonStyle = {
  elements: {
    avatarBox: "w-10 h-10 rounded-full border-2 border-[#C393F5]/50 shadow-[0_0_15px_rgba(195,147,245,0.3)] transition-all hover:border-[#C393F5] hover:shadow-[0_0_25px_rgba(195,147,245,0.6)]"
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Clerk hooks
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const getLink = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4">

      {/* Pill Container */}
      <div className="relative w-full max-w-5xl bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-full pl-8 pr-3 py-3 flex items-center justify-between shadow-2xl shadow-black/50 z-50">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-medium tracking-tight text-sm uppercase">Oneiric ®</Link>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <SignedIn>
            <Link href="/app" className="text-sm text-[#C393F5] hover:text-white transition-colors font-medium drop-shadow-[0_0_8px_rgba(195,147,245,0.5)]">
              Dashboard
            </Link>
          </SignedIn>
          
          <a href={getLink('#features')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Technology</a>
          <a href={getLink('#visuals')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Visuals</a>
          <a href={getLink('#pricing')} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Pricing</a>
          <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">About Us</Link>
        </div>

        {/* DESKTOP BUTTON & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">

          {/* DESKTOP AUTH LOGIC */}
          <div className="hidden md:block">
            {/* Show Sign Up button ONLY if signed out */}
            <SignedOut>
              <Link href="/sign-up">
                <button className="px-6 py-2.5 rounded-full border border-[#C393F5]/30 bg-[#C393F5]/10 text-white text-sm font-medium hover:bg-[#C393F5]/20 hover:border-[#C393F5]/50 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
                  Sign Up Now
                </button>
              </Link>
            </SignedOut>

            {/* Show User Button ONLY if signed in */}
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={clerkButtonStyle}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full max-w-5xl px-4 md:hidden">
          <div className="w-full bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-200">

            <div className="flex flex-col gap-4 items-center">
              <SignedIn>
                 <Link 
                   href="/app" 
                   onClick={() => setIsOpen(false)} 
                   className="text-base text-[#C393F5] hover:text-white font-medium drop-shadow-[0_0_5px_rgba(195,147,245,0.5)]"
                 >
                   Open Dashboard
                 </Link>
              </SignedIn>

              <a href={getLink('#features')} onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Technology</a>
              <a href={getLink('#visuals')} onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Visuals</a>
              <a href={getLink('#pricing')} onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Pricing</a>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">About Us</Link>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            {/* MOBILE AUTH LOGIC */}
            <div className="w-full flex justify-center">
              <SignedOut>
                <Link href="/sign-up" className="w-full">
                  <button className="w-full py-3 rounded-xl border border-[#C393F5]/30 bg-[#C393F5]/10 text-white font-medium hover:bg-[#C393F5]/20 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
                    Sign Up Now
                  </button>
                </Link>
              </SignedOut>

              <SignedIn>
                  <div className="flex items-center justify-between w-full bg-[#C393F5]/10 rounded-xl p-2 border border-[#C393F5]/30 shadow-[0_0_15px_rgba(195,147,245,0.2)]">
                    <button 
                      onClick={() => openUserProfile()} 
                      className="flex items-center gap-3 flex-1 text-left px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#C393F5]/50">
                         <img 
                           src={user?.imageUrl} 
                           alt="Profile" 
                           className="w-full h-full object-cover"
                         />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-sm text-white font-medium leading-none mb-0.5">My Account</span>
                         <span className="text-[10px] text-[#C393F5]/80 uppercase tracking-wider">Manage Profile</span>
                      </div>
                    </button>
                    <div className="w-px h-8 bg-[#C393F5]/20 mx-1"></div>
                    <button 
                      onClick={() => signOut(() => setIsOpen(false))}
                      className="p-2.5 text-[#C393F5] hover:text-white hover:bg-[#C393F5]/20 rounded-lg transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
              </SignedIn>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}