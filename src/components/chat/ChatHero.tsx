'use client';

import { useDream } from '@/context/DreamContext';
import { Sparkles, PlayCircle, Tag, BrainCircuit, Fingerprint, Activity, Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Dream, Media } from '@/types/dreamMediaType';
import ImageModal from '@/components/chat/ImageModal'; 

// Component for displaying each dream block
const DreamBlock = ({ 
  dream, 
  media, 
  onImageClick 
}: { 
  dream: Dream, 
  media: Media[], 
  onImageClick: (url: string) => void 
}) => (
  <div className="flex flex-col gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 border-b border-white/5 pb-10 last:border-0">
      
      {/* 1. User input */}
      <div className="flex gap-4 items-start justify-end pl-10">
          <div className="bg-white/10 rounded-2xl rounded-tr-sm p-4 border border-white/10 max-w-2xl">
              <p className="text-white text-sm md:text-base">{dream.content}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-xs text-white shrink-0">
            You
          </div>
      </div>

      {/* 2. Ai response */}
      <div className="flex gap-4 items-start pr-4 md:pr-10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C393F5] to-purple-900 flex items-center justify-center text-white shadow-[0_0_15px_rgba(195,147,245,0.5)] shrink-0 mt-1">
              <Sparkles className="w-4 h-4" />
          </div>
          
          <div className="flex-1 space-y-6 min-w-0">
              
              {/* Card analisys */}
              <div className="bg-[#0a0a0a] border border-[#C393F5]/20 rounded-2xl rounded-tl-sm p-6 shadow-2xl shadow-[#C393F5]/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold text-white tracking-tight">{dream.title}</h2>
                      <span className="text-[10px] font-mono text-[#C393F5] border border-[#C393F5]/30 px-2 py-0.5 rounded bg-[#C393F5]/5">
                          {new Date(dream.createdAt).toLocaleDateString()}
                      </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 border-l-2 border-[#C393F5]/50 pl-3">
                      {dream.summary}
                  </p>
                  
                  {/* Grid Data (Mood, Emotions, Tags) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                      <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                              <Fingerprint className="w-3 h-3" /> Mood
                          </div>
                          <span className="text-sm text-white font-medium capitalize">{dream.moodAI}</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                              <Activity className="w-3 h-3" /> Emotions
                          </div>
                          <div className="flex flex-wrap gap-1">
                              {dream.emotions && Object.keys(dream.emotions).slice(0, 2).map((emotion) => (
                                  <span key={emotion} className="text-xs text-slate-300 capitalize bg-white/5 px-1.5 py-0.5 rounded">
                                      {emotion}
                                  </span>
                              ))}
                          </div>
                      </div>
                      <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                           <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                              <BrainCircuit className="w-3 h-3" /> Tags
                          </div>
                          <div className="flex flex-wrap gap-1">
                              {dream.tags.map((tag) => (
                                  <span key={tag} className="text-[10px] text-[#C393F5] border border-[#C393F5]/20 px-1.5 py-0.5 rounded-full">
                                      #{tag}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Grid Media (Immagini e Video) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {media.map((m) => (
                      <div key={m.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-lg transition-all hover:scale-[1.01]">
                          {m.kind === 'IMAGE' ? (
                              //  Clickable Image
                              <div 
                                className="aspect-[4/3] relative cursor-pointer block overflow-hidden"
                                onClick={() => onImageClick(m.url)}
                              >
                                  <img 
                                      src={m.url} 
                                      alt="Dream visualization"
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      loading="lazy"
                                  />
                                  {/* Overlay Hover Effect */}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                       <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                          <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
                                       </div>
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                                       <span className="text-[10px] text-white font-medium flex items-center gap-1">
                                          <Tag className="w-3 h-3" /> Click to view full size
                                       </span>
                                  </div>
                              </div>
                          ) : (
                              // Video Player
                              <div className="aspect-[4/3] relative bg-black group">
                                  <video 
                                      src={m.url}
                                      className="w-full h-full object-cover"
                                      controls
                                      playsInline
                                      loop
                                  />
                                   <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none border border-white/10">
                                      <PlayCircle className="w-3 h-3 text-[#C393F5]" /> Video
                                   </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>
  </div>
);

// Loading Skeleton Component
const LoadingSkeleton = () => (
    <div className="flex flex-col gap-6 animate-in fade-in pb-10">
        <div className="flex gap-4 items-start opacity-70 justify-end">
             <div className="h-12 bg-slate-700/30 rounded-2xl w-1/3 animate-pulse"></div>
             <div className="w-8 h-8 rounded-full bg-slate-700/50 animate-pulse shrink-0"></div>
        </div>
         <div className="flex gap-4 items-start mt-4">
            <Sparkles className="w-6 h-6 text-[#C393F5] animate-spin-slow shrink-0" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                {[1, 2].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-[#C393F5]/10 border border-[#C393F5]/20 animate-pulse relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shimmer"></div>
                    </div>
                ))}
            </div>
        </div>
        <div className="text-center text-xs text-[#C393F5] animate-pulse mt-2">
            Generating your dream... this may take up to a minute.
        </div>
    </div>
);

// Main Component
export default function ChatHero() {
    const { isGenerating, history } = useDream();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isGenerating]);

    // 1. First State: no dreams yet
    if (!isGenerating && history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center px-6 -mt-20 animate-in fade-in zoom-in duration-500 h-full">
                <div className="orb-glow w-24 h-24 md:w-32 md:h-32 rounded-full mb-10 relative">
                    <div className="absolute inset-0 bg-[#C393F5] blur-[80px] opacity-30 rounded-full animate-pulse-slow"></div>
                </div>
                <h1 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4 drop-shadow-2xl">
                    Ready to Visualize Your Dream?
                </h1>
                <p className="text-slate-400 max-w-md">
                    Describe your dream below. Our Neural Engine will reconstruct it into data and visuals.
                </p>
            </div>
        );
    }

    // 2. Chat Status with dreams
    return (
        <>
        {/* Modal for viewing image */}
        <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />

        <div 
            className="
            w-full h-full overflow-y-auto px-4 md:px-6 pb-32 pt-10 scroll-smooth
            /* Stili Scrollbar */
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-[#050505]
            [&::-webkit-scrollbar-thumb]:bg-white/10
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-white/20
            "
        >
            <div className="max-w-4xl mx-auto flex flex-col">
                
                {/* Dreams List */}
                {history.map((item) => {
                    // Safety check for the dream
                    if (!item || !item.dream) return null;
                    
                    return (
                        <DreamBlock 
                            key={item.dream.id} 
                            dream={item.dream} 
                            media={item.media} 
                            onImageClick={(url) => setSelectedImage(url)}
                        />
                    );
                })}

                {/* Loading State */}
                {isGenerating && <LoadingSkeleton />}

                {/* Automatic scroll Stil */}
                <div ref={messagesEndRef} className="h-4" />
            </div>
        </div>
        </>
    );
}