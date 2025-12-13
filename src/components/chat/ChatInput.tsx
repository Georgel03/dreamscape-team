'use client';

import { Sparkles, Mic, ArrowUp, SlidersHorizontal, X, Users, Sun, Eye, Music } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDream } from '@/context/DreamContext';

// DEFAULT OPTIONS
const DREAM_TYPES = ['Lucid', 'Nightmare', 'Fantasy', 'Realistic', 'Abstract', 'Sci-Fi'];
const EMOTIONS = ['Fear', 'Joy', 'Confusion', 'Awe', 'Sadness', 'Euphoria'];
const TIME_OPTIONS = ['Day', 'Night', 'Sunrise', 'Sunset', 'Twilight', 'Ethereal'];
const PERSPECTIVES = ['1st Person', '3rd Person', 'Observer', 'Shifting'];

export default function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { prompt, setPrompt, generateDream, isGenerating } = useDream();

  // ADVANCED FORM STATES
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 1. Core
  const [mood, setMood] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  
  // 2. Visuals
  const [setting, setSetting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  
  // 3. Narrative
  const [characters, setCharacters] = useState('');
  const [perspective, setPerspective] = useState('');
  const [sensory, setSensory] = useState('');

  // Auto-resize Textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Toggle Emotions
  const toggleEmotion = (emo: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emo) ? prev.filter(e => e !== emo) : [...prev, emo]
    );
  };

  // BUILD ENRICHED PROMPT & SUBMIT
  const handleSubmission = async () => {
    if (isGenerating || !prompt.trim()) return;

    // 1. Build a structured prompt for the AI backend
    let enrichedPrompt = `DREAM DESCRIPTION: ${prompt}.\n`;
    
    // Core Context
    if (mood) enrichedPrompt += `TYPE/MOOD: ${mood}.\n`;
    if (selectedEmotions.length > 0) enrichedPrompt += `EMOTIONS: ${selectedEmotions.join(', ')}.\n`;
    
    // Visual Context (for Imagen/Veo)
    if (setting) enrichedPrompt += `SETTING: ${setting}.\n`;
    if (timeOfDay) enrichedPrompt += `LIGHTING/TIME: ${timeOfDay}.\n`;
    
    // Narrative Context (for the story)
    if (characters) enrichedPrompt += `CHARACTERS: ${characters}.\n`;
    if (perspective) enrichedPrompt += `PERSPECTIVE: ${perspective}.\n`;
    if (sensory) enrichedPrompt += `SENSORY DETAILS: ${sensory}.\n`;

    setPrompt(enrichedPrompt);

    setTimeout(() => {
        generateDream();
        // Reset
        setIsExpanded(false);
        setMood('');
        setSetting('');
        setTimeOfDay('');
        setCharacters('');
        setPerspective('');
        setSensory('');
        setSelectedEmotions([]);
        if (textareaRef.current) textareaRef.current.style.height = '28px';
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
       e.preventDefault();
       handleSubmission();
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8 md:pb-12 z-20 relative">
      
      {/* ADVANCED PANEL (Collapsible) */}
      {isExpanded && (
        <div className="absolute bottom-full left-4 right-4 mb-3 bg-[#0f0f12]/95 backdrop-blur-xl border border-[#C393F5]/20 rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-300 z-30 max-h-[70vh] overflow-y-auto custom-scrollbar">
            
            {/* Panel Header */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#0f0f12]/95 py-2 z-10 border-b border-white/5">
                <h3 className="text-xs font-semibold text-[#C393F5] tracking-widest uppercase flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Deep Dream Context
                </h3>
                <button onClick={() => setIsExpanded(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-6">
                
                {/* SECTION 1: MOOD & EMOTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Dream Type</label>
                        <div className="flex flex-wrap gap-2">
                            {DREAM_TYPES.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setMood(type === mood ? '' : type)}
                                    className={`text-[10px] px-3 py-1.5 rounded-full border transition-all duration-200
                                        ${mood === type 
                                            ? "bg-[#C393F5]/20 border-[#C393F5] text-[#C393F5]" 
                                            : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-white/5"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Emotions</label>
                        <div className="flex flex-wrap gap-2">
                            {EMOTIONS.map(emo => (
                                <button
                                    key={emo}
                                    onClick={() => toggleEmotion(emo)}
                                    className={`text-[10px] px-3 py-1.5 rounded-full border transition-all duration-200
                                        ${selectedEmotions.includes(emo)
                                            ? "bg-indigo-500/20 border-indigo-400 text-indigo-300" 
                                            : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-white/5"
                                        }`}
                                >
                                    {emo}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-white/5 my-2" />

                {/* SECTION 2: VISUALS (Setting & Time) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                            <Sun className="w-3 h-3" /> Time & Lighting
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {TIME_OPTIONS.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setTimeOfDay(time === timeOfDay ? '' : time)}
                                    className={`text-[10px] px-3 py-1.5 rounded-full border transition-all duration-200
                                        ${timeOfDay === time 
                                            ? "bg-amber-500/20 border-amber-500/50 text-amber-200" 
                                            : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-white/5"
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Atmosphere / Setting</label>
                        <input 
                            type="text" 
                            value={setting}
                            onChange={(e) => setSetting(e.target.value)}
                            placeholder="e.g. A foggy abandoned city..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C393F5]/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="w-full h-px bg-white/5 my-2" />

                {/* SECTION 3: NARRATIVE DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                            <Users className="w-3 h-3" /> Key Characters
                        </label>
                        <input 
                            type="text" 
                            value={characters}
                            onChange={(e) => setCharacters(e.target.value)}
                            placeholder="e.g. My grandmother, a wolf..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C393F5]/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                            <Eye className="w-3 h-3" /> Perspective
                        </label>
                        <div className="flex flex-wrap gap-2">
                             {PERSPECTIVES.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPerspective(p === perspective ? '' : p)}
                                    className={`text-[10px] px-2 py-1.5 rounded-full border transition-all duration-200
                                        ${perspective === p 
                                            ? "bg-teal-500/20 border-teal-500/50 text-teal-200" 
                                            : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white bg-white/5"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                            <Music className="w-3 h-3" /> Sensory Details
                        </label>
                        <input 
                            type="text" 
                            value={sensory}
                            onChange={(e) => setSensory(e.target.value)}
                            placeholder="e.g. Smell of rain, loud sirens..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C393F5]/50 transition-colors"
                        />
                    </div>
                </div>

            </div>
        </div>
      )}

      {/* MAIN INPUT BAR */}
      <div className={`glass-input relative bg-[#0f0f12]/80 backdrop-blur-2xl border ${isGenerating ? 'border-[#C393F5]/50' : 'border-white/10'} rounded-2xl p-4 transition-all duration-300 shadow-2xl`}>
        
        {isGenerating && (
           <div className="absolute -top-8 left-0 text-[#C393F5] flex items-center gap-2 text-sm animate-pulse font-medium">
              <Sparkles className="w-4 h-4" />
              Processing dream data...
           </div>
        )}

        <div className="flex items-start gap-3 mb-2">
          
          {/* Toggle Button (Highlighted if active filters) */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-1 p-2 rounded-lg transition-all duration-300 border 
                ${isExpanded || mood || setting || characters 
                    ? 'bg-[#C393F5]/20 border-[#C393F5] text-[#C393F5] shadow-[0_0_10px_rgba(195,147,245,0.3)]' 
                    : 'bg-transparent border-transparent text-slate-500 hover:text-white hover:bg-white/5'
                }`}
            title="Open Deep Context"
          >
             <SlidersHorizontal className="w-5 h-5" />
          </button>

          <textarea 
            ref={textareaRef}
            value={prompt}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-lg outline-none resize-none h-[28px] max-h-32 overflow-hidden leading-relaxed font-light disabled:opacity-50 mt-2" 
            placeholder={
              isGenerating 
                ? "Generating Dream..." 
                : (isExpanded ? "Describe the main events..." : "Describe your dream...")
            }
            rows={1}
          />
        </div>

        <div className="flex items-center justify-end mt-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Mic className="w-4.5 h-4.5" />
            </button>
            
            <button 
              onClick={handleSubmission}
              disabled={isGenerating || !prompt.trim()}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-black transition-all duration-300
                ${isGenerating || !prompt.trim() 
                  ? 'bg-slate-600 cursor-not-allowed opacity-50' 
                  : 'bg-[#C393F5] hover:bg-[#b07be6] shadow-[0_0_15px_rgba(195,147,245,0.4)] hover:shadow-[0_0_25px_rgba(195,147,245,0.6)] hover:scale-105'
                }`}
            >
              <ArrowUp className={`w-5 h-5 stroke-[2.5] ${isGenerating ? 'animate-bounce' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}