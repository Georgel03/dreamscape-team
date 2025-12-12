'use client';

import { useState } from 'react';
import { ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';

// Style fot the Clerk UserButton
const clerkButtonStyle = {
  elements: {
    avatarBox: "w-10 h-10 rounded-full border-2 border-[#C393F5]/50 shadow-[0_0_15px_rgba(195,147,245,0.3)] transition-all hover:border-[#C393F5] hover:shadow-[0_0_25px_rgba(195,147,245,0.6)]"
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get user info and Clerk functions
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4">
      
      {/* Pill container */}
      <div className="relative w-full max-w-5xl bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-between shadow-2xl shadow-black/50 z-50">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <span className="text-white font-medium tracking-tight text-sm uppercase">Oneiric ®</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          
          <SignedIn>
            <Link href="/app" className="text-sm text-[#C393F5] hover:text-white transition-colors font-medium drop-shadow-[0_0_8px_rgba(195,147,245,0.5)]">
              Dashboard
            </Link> 
          </SignedIn>

          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Technology</a>
          <a href="#visuals" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Visuals</a>
          <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Pricing</a>
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors font-medium">
              Resources <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* DESKTOP AUTH & MOBILE TOGGLE */}
        <div className="flex items-center gap-6">
            
            {/* LOGIC AUTH DESKTOP */}
            <div className="hidden md:block">
              <SignedOut>
                {/*<SignInButton mode="modal">
                  <button className="px-6 py-2.5 rounded-full border border-[#C393F5]/30 bg-[#C393F5]/10 text-white text-sm font-medium hover:bg-[#C393F5]/20 hover:border-[#C393F5]/50 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
                    Sign Up Now
                  </button>
                </SignInButton>*/}
                <Link href="/sign-up">
                  <button className="px-6 py-2.5 rounded-full border border-[#C393F5]/30 bg-[#C393F5]/10 text-white text-sm font-medium hover:bg-[#C393F5]/20 hover:border-[#C393F5]/50 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
                    Sign Up Now
                  </button>
                </Link>
              </SignedOut>

              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={clerkButtonStyle}
                />
              </SignedIn>
            </div>

            {/* Menu Hamburger */}
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors -mr-2"
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
                   Dashboard
                 </Link>
              </SignedIn>

              <a href="#features" onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Technology</a>
              <a href="#visuals" onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Visuals</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="text-base text-slate-300 hover:text-white font-medium">Pricing</a>
              <button className="text-base text-slate-300 hover:text-white font-medium flex items-center gap-1">
                Resources <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            {/* LOGIC AUTH MOBILE */}
            <div className="w-full flex justify-center">
              <SignedOut>
                {/*<SignInButton mode="modal">
                  <button className="w-full py-3 rounded-xl border border-[#C393F5]/30 bg-[#C393F5]/10 text-white font-medium hover:bg-[#C393F5]/20 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
                    Sign Up Now
                  </button>
                </SignInButton>*/}
                <Link href="/sign-up" className="w-full">
                  <button className="w-full py-3 rounded-xl border border-[#C393F5]/30 bg-[#C393F5]/10 text-white font-medium hover:bg-[#C393F5]/20 transition-all shadow-[0_0_15px_rgba(195,147,245,0.3)]">
                    Sign Up Now
                  </button>
                </Link>
              </SignedOut>

              <SignedIn>
                 <div className="flex items-center justify-between w-full bg-[#C393F5]/10 rounded-xl p-2 border border-[#C393F5]/30 shadow-[0_0_15px_rgba(195,147,245,0.2)]">
                    
                    {/* Profile button */}
                    <button 
                      onClick={() => openUserProfile()} 
                      className="flex items-center gap-3 flex-1 text-left px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {/* User img*/}
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

                    {/* Vertical split*/}
                    <div className="w-px h-8 bg-[#C393F5]/20 mx-1"></div>

                    {/* Sign Out button */}
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