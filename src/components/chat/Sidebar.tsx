'use client';

import { Sparkles, PanelLeftClose, Plus, MessageSquare, Crown, MoreHorizontal, Trophy, BarChart2 } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Sidebar Props
interface SidebarProps {
  // Desktop State
  isOpen: boolean;
  toggleSidebar: () => void;
  // Mobile State
  isMobileOpen: boolean;
  closeMobile: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar, isMobileOpen, closeMobile }: SidebarProps) {
  
  // Get user info and Clerk functions
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      isActive 
        ? 'bg-white/5 text-white' // Stil ACTIV
        : 'text-slate-400 hover:bg-white/5 hover:text-white' // Stil INACTIV
    }`;
  };

  const getIconClasses = (path: string) => {
    const isActive = pathname === path;
    return `w-4.5 h-4.5 ${isActive ? 'text-[#C393F5]' : 'text-current'}`;
  };

  return (
    <>
      {/* 1. Mobile Overlay */}
      {isMobileOpen && (
        <div 
          onClick={closeMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* 2. Sidebar Container*/}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 h-full flex flex-col bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 ease-in-out
          
          /* Mobile Behaive */
          md:relative md:translate-x-0
          ${isMobileOpen ? 'translate-x-0 shadow-2xl shadow-purple-500/10' : '-translate-x-full'}

          /* DESKTOP (ovveride if the screens is > md): */
          ${isOpen ? 'md:w-[280px] md:sm:w-[300px] md:p-5' : 'md:w-0 md:p-0 md:border-none md:overflow-hidden'}
          
          /* Fixed width on mobile when is open */
          w-[280px] p-5
        `}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          
          
          <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-white font-medium text-lg tracking-tight">Oneiric ®</span>
          </Link>
          
          {/* Close Button: On mobile use closeMobile, on Desktop use toggleSidebar */}
          <button 
            onClick={() => {
            }}
            className="text-slate-500 hover:text-white transition-colors"
          >
             {/* Button Desktop */}
             <PanelLeftClose 
               className="w-5 h-5 hidden md:block" 
               onClick={toggleSidebar} 
             />
             
             {/* Button Mobile (X) */}
             <PanelLeftClose 
               className="w-6 h-6 md:hidden" 
               onClick={closeMobile}
             />
          </button>
        </div>

        {/* Content Container */}
        <div className={`flex flex-col flex-1 min-w-[240px] whitespace-nowrap ${(!isOpen && 'md:invisible')} transition-all duration-200`}>
            
            {/* New Chat Button */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-200 group mb-8">
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-slate-400 group-hover:border-[#C393F5] group-hover:text-[#C393F5] transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-medium text-white group-hover:text-[#C393F5] transition-colors">New Chat</span>
            </button>

            {/* Features Navigation */}
            <div className="flex-1 overflow-y-auto">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 px-2">Features</div>
              <nav className="space-y-1">
                <Link href="/app" className={getLinkClasses('/app')}>
                  <MessageSquare className={getIconClasses('/app')} />
                  <span className="text-sm">Chat</span>
                </Link>

                <Link href="/badges-viewer" className={getLinkClasses('/badges-viewer')}>
                  <Trophy className={getIconClasses('/badges-viewer')} />
                  <span className="text-sm">Badges</span>
                </Link>

                <Link href="/visualizations" className={getLinkClasses('/visualizations')}>
                  <BarChart2 className={getIconClasses('/visualizations')} />
                  <span className="text-sm">Statistics</span>
                </Link>
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto pt-6">
              <div className="bg-[#121215] border border-white/5 rounded-2xl p-4 relative overflow-hidden group mb-6">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#C393F5] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="w-8 h-8 rounded-lg bg-[#C393F5]/10 flex items-center justify-center text-[#C393F5] mb-3">
                  <Crown className="w-4 h-4" />
                </div>
                <h4 className="text-white text-sm font-medium mb-1">Upgrade to premium</h4>
                <p className="text-xs text-slate-500 font-light mb-4 leading-relaxed text-wrap">
                  Boost productivity with seamless automation.
                </p>
                <button className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  Upgrade
                </button>
              </div>

              {/* User Info using Clerk */}
              <div className="flex items-center gap-3 px-1 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 overflow-hidden">
                  <img 
                    src={user?.imageUrl}
                    alt={user?.fullName || "User Avatar"}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{user?.fullName}</div>
                  <div className="text-xs text-slate-500">Free Plan</div>
                </div>
                <MoreHorizontal 
                  className="w-4 h-4 text-slate-500"
                  onClick={() => openUserProfile()}
                />
              </div>
            </div>
        </div>
      </aside>
    </>
  );
}