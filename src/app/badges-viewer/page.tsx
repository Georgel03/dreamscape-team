'use client'

import { useEffect, useState } from 'react';
import { getBadgesForUser } from '../../actions/badge-actions'; 
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { Trophy, Calendar, Lock, Loader2, Star } from 'lucide-react';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer';


export default function BadgesPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [badges, setBadges] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

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
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-purple-500/30 flex flex-col">
      
      <div className="relative z-50 transform translate-y-0">
        <Navbar />
      </div>
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 pt-27">  
        <SignedOut>
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="p-4 bg-white/5 rounded-full border border-white/10">
              <Lock className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Access Your Profile
            </h1>
            <p className="text-gray-400 max-w-md">
              Sign in to view your badge collection, dream progress, and personal statistics.
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dream Badges</h1>
              <p className="text-gray-400">Unlock achievements as you explore your subconscious mind.</p>
            </div>

            {/* --- PROFILE & PROGRESS CARD --- */}
            <div className="w-full bg-[#0E0E11] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="flex items-center gap-6 z-10 w-full md:w-auto">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={user?.imageUrl} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full border-2 border-purple-500/50 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#0E0E11] p-1 rounded-full">
                    <div className="bg-green-500 w-3 h-3 rounded-full border border-[#0E0E11]"></div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-white">{user?.fullName || user?.username}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-purple-400 font-bold text-sm">{badges.length} badges</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-400 text-sm">Dream Collector</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 z-10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Collection Progress</span>
                  <span className="text-white font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  {TOTAL_BADGES - badges.length} badges left to collect
                </p>
              </div>
            </div>

            {/* --- BADGE GRID --- */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Your Achievements
              </h3>

              {loadingData ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-48 bg-white/5 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {badges.map((item) => (
                    <div 
                      key={item.id} 
                      className="group relative flex flex-col items-center p-6 bg-[#0A0A0C] border border-white/5 rounded-xl hover:border-purple-500/40 hover:bg-[#0f0f13] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-24 h-24 mb-5 relative transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] relative z-10"
                        />
                      </div>
                      
                      <h3 className="text-white font-bold text-base mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-xs font-mono mb-3 uppercase tracking-wider">
                        {item.code.replace('DREAM_', '').replace('_', ' ')}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.earnedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  ))}

                  {Array.from({ length: Math.max(0, TOTAL_BADGES - badges.length) }).map((_, i) => (
                    <div key={`locked-${i}`} className="flex flex-col items-center justify-center p-6 bg-[#0A0A0C]/30 border border-dashed border-white/5 rounded-xl opacity-60">
                      <div className="w-20 h-20 mb-4 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                        <Lock className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="h-4 w-24 bg-white/5 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-white/5 rounded"></div>
                    </div>
                  ))}

                </div>
              )}
            </div>

          </div>
        </SignedIn>
      </main>
      <Footer />
    </div>
  );
}