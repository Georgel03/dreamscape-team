'use client'

import { useEffect, useState } from 'react';
import { getBadgesForUser } from '@/src/actions/badge-actions'; 
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { Lock, Loader2, Star, Calendar, PanelLeftOpen, Trophy, Shield } from 'lucide-react'; 
import Sidebar from '@/src/components/chat/Sidebar'; 

export default function BadgesPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [badges, setBadges] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const TOTAL_BADGES = 5; 
  const progressPercentage = Math.min((badges.length / TOTAL_BADGES) * 100, 100);

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        setLoadingData(true);
        const result = await getBadgesForUser(user.id);
        if (result.success && result.data) {
          setBadges(result.data);
        }
        setLoadingData(false);
      }
    }

    if (isLoaded && isSignedIn) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, user?.id]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#020205] text-slate-100 font-sans selection:bg-purple-500/30 overflow-hidden">
      
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
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <main className="flex-1 flex flex-col relative h-full transition-all duration-300">
        
        <button 
            onClick={() => setMobileOpen(true)}
            className="absolute top-4 left-4 z-50 p-2.5 rounded-xl bg-[#0a0a0a]/50 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all md:hidden shadow-lg"
        >
            <PanelLeftOpen className="w-6 h-6" />
        </button>

        {!isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hidden md:block"
            title="Open Sidebar"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Area cu custom-scrollbar */}
        <div className="flex-1 overflow-y-auto w-full flex flex-col items-center custom-scrollbar">
            
            <div className="flex-grow w-full max-w-7xl px-6 py-12 pt-20">  
              <SignedOut>
                <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="relative">
                     <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full"></div>
                     <div className="relative p-6 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                        <Lock className="w-12 h-12 text-slate-400" />
                     </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-white">
                        Access Your Profile
                    </h1>
                    <p className="text-slate-400 max-w-md mx-auto text-lg">
                        Sign in to view your badge collection, dream progress, and personal statistics.
                    </p>
                  </div>
                  <SignInButton mode="modal">
                    <button className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-1">
                      Sign In Now
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-700 max-w-6xl mx-auto">
                  
                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-400">
                        Achievements
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Dream{' '}
                        <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                        Badges
                        </span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        Unlock magical artifacts as you explore the depths of your subconscious mind.
                    </p>
                  </div>

                  {/* Profile Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-cyan-600/10 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                src={user?.imageUrl} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full border-2 border-[#050816] object-cover shadow-xl"
                                />
                                <div className="absolute bottom-1 right-1 bg-[#050816] p-1.5 rounded-full">
                                    <div className="bg-emerald-500 w-3 h-3 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white tracking-tight">{user?.fullName || user?.username}</h2>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                                    <Trophy className="w-3 h-3" />
                                    {badges.length} Badges
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                                    <Shield className="w-3 h-3" />
                                    Dream Collector
                                </span>
                            </div>
                        </div>
                        </div>

                        <div className="w-full md:w-1/3 bg-black/20 p-5 rounded-2xl border border-white/5">
                            <div className="flex justify-between text-sm mb-3">
                                <span className="text-slate-400 font-medium">Collection Progress</span>
                                <span className="text-white font-bold">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                                <div 
                                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-1000 ease-out rounded-full relative"
                                style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 text-right">
                                {TOTAL_BADGES - badges.length} badges remaining to master status
                            </p>
                        </div>
                    </div>
                  </div>

                  {/* Badge Grid */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      Your Collection
                    </h3>

                    {loadingData ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse border border-white/5"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {badges.map((item) => (
                          <div 
                            key={item.id} 
                            className="group relative flex flex-col items-center justify-between p-6 bg-[#0E0E12] border border-white/5 rounded-2xl hover:border-purple-500/30 hover:bg-[#131318] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)] overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div className="w-28 h-28 mb-4 relative transition-transform duration-500 group-hover:scale-110">
                              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                              />
                            </div>
                            
                            <div className="text-center w-full z-10">
                                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-purple-300 transition-colors">{item.name}</h3>
                                <p className="text-slate-500 text-[10px] font-mono mb-4 uppercase tracking-widest bg-white/5 py-1 px-2 rounded inline-block">
                                {item.code.replace('DREAM_', '').replace('_', ' ')}
                                </p>
                            </div>
                            
                            <div className="mt-auto flex items-center gap-1.5 text-xs text-slate-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-purple-500/20 group-hover:text-purple-200 transition-colors z-10">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(item.earnedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        ))}

                        {Array.from({ length: Math.max(0, TOTAL_BADGES - badges.length) }).map((_, i) => (
                          <div key={`locked-${i}`} className="flex flex-col items-center justify-center p-6 bg-[#0a0a0c]/40 border border-dashed border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
                            <div className="w-24 h-24 mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/5 shadow-inner group-hover:bg-white/10 transition-colors">
                              <Lock className="w-10 h-10 text-slate-700 group-hover:text-slate-600 transition-colors" />
                            </div>
                            <div className="space-y-2 w-full flex flex-col items-center opacity-50">
                                <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                                <div className="h-3 w-1/2 bg-slate-800 rounded animate-pulse"></div>
                            </div>
                          </div>
                        ))}

                      </div>
                    )}
                  </div>

                </div>
              </SignedIn>
            </div>
        </div>
      </main>
    </div>
  );
}