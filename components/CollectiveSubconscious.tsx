import React from 'react';
import DreamCard, { DreamCardProps } from './DreamCard';
import { Icon } from '@iconify/react';

const CollectiveSubconscious: React.FC = () => {
  // We strictly type the array using the interface from DreamCardProps
  const dreams: DreamCardProps[] = [
    {
      title: "Neon Labyrinth",
      description: "I was trapped in a mall made of infinite glowing tubes, trying to find an exit that kept moving...",
      image: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=2070&auto=format&fit=crop",
      tags: [
        { label: "Recurring", styles: "bg-purple-500/20 border-purple-500/30 text-purple-200" },
        { label: "Night", styles: "bg-white/5 border-white/10 text-slate-300" }
      ]
    },
    {
      title: "Oceanic Flight",
      description: "Soaring above a mirror-calm ocean where the clouds were made of geometric glass shards...",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
      tags: [
        { label: "Lucid", styles: "bg-cyan-500/20 border-cyan-500/30 text-cyan-200" },
        { label: "Flying", styles: "bg-white/5 border-white/10 text-slate-300" }
      ]
    },
    {
      title: "The Clockwork Forest",
      description: "Trees made of brass gears clicking in rhythm with my heartbeat. The sky was static TV noise.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop",
      tags: [
        { label: "Abstract", styles: "bg-amber-500/20 border-amber-500/30 text-amber-200" }
      ],
      // This optional prop is handled correctly by the interface
      className: "lg:col-span-1 md:col-span-2 lg:block hidden"
    }
  ];

  return (
    <section id="visuals" className="py-32 relative border-t border-white/5 bg-[#020205]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
              Collective Subconscious
            </h2>
            <p className="text-slate-400 font-light max-w-lg text-lg">
              Explore dreamscapes anonymously shared by our community. <br />
              Rendered in real-time by Somnium-V2.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm text-white border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
            View Archive 
            <Icon icon="lucide:arrow-right" width="14"></Icon>
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dreams.map((dream, index) => (
            <DreamCard 
              key={index}
              title={dream.title}
              description={dream.description}
              image={dream.image}
              tags={dream.tags}
              className={dream.className}
            />
          ))}
        </div>

        {/* Technical Integration Banner */}
        <div className="mt-8 glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-dashed border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
              <Icon icon="lucide:code-2" width="24"></Icon>
            </div>
            <div>
              <h4 className="text-white font-medium">Developer API</h4>
              <p className="text-sm text-slate-500 font-light">
                Integrate dream analysis into your own health apps.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 bg-black/50 px-4 py-2 rounded-lg border border-white/5">
            <span className="text-purple-400">GET</span> /v1/dreams/visualize <span className="text-slate-600">...</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CollectiveSubconscious;