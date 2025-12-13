'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DreamGenerationResult, Dream, Media } from '@/types/dreamMediaType';
import { generateDreamAction } from '@/actions/generateDreamAction';
import { getHistoryAction } from '@/actions/getHistoryAction'; // <--- Import the new action

interface DreamContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  
  // MODIFIED: We now have a history (array), not a single dream
  history: DreamGenerationResult[];
  
  generateDream: () => Promise<void>;
  clearResults: () => void;
}

const DreamContext = createContext<DreamContextType | undefined>(undefined);

export function DreamProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // State for the list of dreams
  const [history, setHistory] = useState<DreamGenerationResult[]>([]);

  // 1. Load History when the app mounts
  useEffect(() => {
    const loadHistory = async () => {
      const data = await getHistoryAction();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const generateDream = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Note: We no longer clear the history; we append the new dream to the end

    try {
      const result = await generateDreamAction(prompt);
      
      // 2. Add the new result to the existing list
      setHistory((prev) => [...prev, result]);
      setPrompt(''); // Clear input after submission
      
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearResults = () => {
    setHistory([]);
    setPrompt('');
  }

  return (
    <DreamContext.Provider value={{ 
      prompt, 
      setPrompt, 
      isGenerating, 
      history, 
      generateDream, 
      clearResults 
    }}>
      {children}
    </DreamContext.Provider>
  );
}

export function useDream() {
  const context = useContext(DreamContext);
  if (context === undefined) {
    throw new Error('useDream must be used within a DreamProvider');
  }
  return context;
}