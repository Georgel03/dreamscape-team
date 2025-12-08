import React from 'react';

// Define the shape of a single tag object
export interface DreamTag {
  label: string;
  styles: string;
}

// Define the props for the DreamCard component
export interface DreamCardProps {
  title: string;
  description: string;
  image: string;
  tags: DreamTag[];
  className?: string; // Optional prop
}

const DreamCard: React.FC<DreamCardProps> = ({ 
  title, 
  description, 
  image, 
  tags, 
  className = "" 
}) => {
  return (
    <div className={`glass-panel rounded-2xl overflow-hidden group relative cursor-pointer h-96 ${className}`}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-90"></div>
      
      {/* Background Image */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80" 
      />
      
      {/* Content Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-2 py-1 rounded border text-[10px] uppercase tracking-wide ${tag.styles}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400 font-light line-clamp-2">
          "{description}"
        </p>
      </div>
    </div>
  );
};

export default DreamCard;