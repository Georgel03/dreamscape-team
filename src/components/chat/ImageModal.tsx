'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

// Props for the component ImageModal
interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

// Modal component for viewing the img at full resolution
export default function ImageModal({ src, onClose }: ImageModalProps) {
  
  // MAnging exit behavior and scroll lock using ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (src) {
      window.addEventListener('keydown', handleEsc);
      // Blocca lo scroll del body quando la modale è aperta
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      // Ripristina lo scroll quando si chiude
      document.body.style.overflow = 'unset';
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 p-4 cursor-zoom-out"
      onClick={onClose}
    >
      {/* Exit Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white bg-white/5 hover:bg-white/20 p-2 rounded-full transition-all duration-200 z-50 backdrop-blur-sm"
        aria-label="Close full view"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Img Full Quality */}
      <img 
        src={src} 
        alt="Full resolution dream visualization" 
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 select-none cursor-default"
        onClick={(e) => e.stopPropagation()} // Avoid closing when clicking on the image itself
      />
    </div>
  );
}