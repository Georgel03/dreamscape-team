import React from 'react';

interface TeamCardProps {
    name: string;
    role: string;
    initials: string;
}

export default function TeamCard({ name, role, initials }: TeamCardProps) {
    return (
        <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group relative overflow-hidden">
            {/* Background Gradient Effect */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar / Initials */}
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-cyan-300 to-purple-300">
                        {initials}
                    </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-xl text-white font-medium tracking-tight mb-2">{name}</h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <span className="text-xs text-slate-300 uppercase tracking-widest font-medium">
                        {role}
                    </span>
                </div>
            </div>
        </div>
    );
}
