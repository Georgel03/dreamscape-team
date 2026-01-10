'use client';

import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import TeamCard from '@/src/components/TeamCard';
import {
    Brain,
    Sparkles,
    Lock,
    Video,
    Mic,
    Fingerprint,
    Palette,
    ScanFace,
    LineChart,
} from 'lucide-react';

const teamMembers = [
    {
        name: 'Bala Leonardo',
        role: 'Frontend',
        initials: 'BL',
    },
    {
        name: 'Contras Enos',
        role: 'Frontend',
        initials: 'CE',
    },
    {
        name: 'Stance George Nicolae',
        role: 'Backend',
        initials: 'GN',
    },
    {
        name: 'Sacaciu Filip Daniel',
        role: 'Backend',
        initials: 'FD',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#020205] text-slate-200 selection:bg-cyan-500/30">
            <Navbar />

            <main className="pt-32 pb-24 relative overflow-hidden">
                {/* Background Ambient Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute top-[1000px] left-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-32">

                    {/* 1. Product Introduction (Vision & Purpose) */}
                    <section className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight mb-8">
                            The Subconscious, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Decoded.</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-8">
                            Dreamscape is an AI-powered dream journaling platform designed to bridge the gap between your subconscious experiences and digital interpretation.
                        </p>
                        <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
                            We don't just store your dreams—we analyze, visualize, and help you understand them.
                            By combining advanced natural language processing with generative art, we turn fleeting nightly memories into a permanent, explorable library of your inner life.
                        </p>
                    </section>

                    {/* 2. How the App Works */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-medium text-white mb-4">How It Works</h2>
                            <p className="text-slate-400 font-light">From memory to mastery in four simple steps.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: <Mic className="w-6 h-6 text-cyan-400" />,
                                    title: "1. Log",
                                    desc: "Record your dream via text or voice immediately upon waking. Tag your mood and privacy settings."
                                },
                                {
                                    icon: <Brain className="w-6 h-6 text-purple-400" />,
                                    title: "2. Analyze",
                                    desc: "Our AI extracts themes, emotions, and symbols, offering a psychological summary of your experience."
                                },
                                {
                                    icon: <Palette className="w-6 h-6 text-pink-400" />,
                                    title: "3. Generate",
                                    desc: "Turn words into worlds. Generate high-fidelity images and short videos that visualize your dream."
                                },
                                {
                                    icon: <LineChart className="w-6 h-6 text-emerald-400" />,
                                    title: "4. Reflect",
                                    desc: "Track patterns over time. See how your emotional landscape evolves through interactive charts."
                                }
                            ].map((step, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors">
                                    <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-white/10">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. What Users Can Do (Capabilities) */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-medium text-white mb-6">Unlock Your Inner World</h2>
                            <p className="text-slate-400 font-light mb-8 text-lg">
                                Dreamscape offers more than just storage. It provides a suite of tools for deep introspection and creative expression.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Analyze hidden meanings behind recurring symbols.",
                                    "Generate vivid artwork and narratives from vague memories.",
                                    "Track your emotional evolution across weeks and months.",
                                    "Keep everything private, or share selected dreams with the community.",
                                    "Identify subconscious patterns influencing your waking life."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 font-light">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-[400px] w-full glass-panel rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
                            {/* Abstract Visual Representation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
                            <div className="relative text-center p-8">
                                <ScanFace className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Introspection Engine Active</p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Key Features Overview */}
                    <section>
                        <div className="mb-12">
                            <h2 className="text-3xl font-medium text-white mb-4">Platform Capabilities</h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Core AI */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-cyan-400" /> Core AI
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Smart Dream Summaries</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Emotion & Tone Detection</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Symbol Extraction</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Narrative Structuring</li>
                                </ul>
                            </div>

                            {/* Media */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                    <Video className="w-5 h-5 text-purple-400" /> Visualization
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> AI-Generated Imagery (DALL-E 3)</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Short Dream Sequence Videos</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Mood Heatmaps</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Interactive Galleries</li>
                                </ul>
                            </div>

                            {/* Privacy */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-white border-b border-white/10 pb-4 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-emerald-400" /> Privacy & Control
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Encrypted Entries</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Private-by-Default</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Optional Anonymous Sharing</li>
                                    <li className="text-slate-400 font-light text-sm flex gap-3"><span className="text-white/20">•</span> Full Data Ownership</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 5. What Makes This App Different + 6. Technology & Ethics */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="glass-panel p-8 rounded-2xl border border-white/10">
                            <Sparkles className="w-8 h-8 text-yellow-200 mb-6" />
                            <h2 className="text-2xl font-medium text-white mb-4">Why Dreamscape?</h2>
                            <p className="text-slate-400 font-light leading-relaxed mb-4">
                                Most journals are static archives of text. Dreamscape is an active participant in your self-discovery. We move beyond raw storage to provide visual, emotional, and psychological insights that static text simply cannot offer.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed">
                                It is designed for deep introspection, helping you uncover the patterns that shape your waking life, without the noise and social pressure of traditional social media.
                            </p>
                        </section>

                        <section className="glass-panel p-8 rounded-2xl border border-white/10">
                            <Fingerprint className="w-8 h-8 text-cyan-200 mb-6" />
                            <h2 className="text-2xl font-medium text-white mb-4">Ethical AI & Privacy</h2>
                            <p className="text-slate-400 font-light leading-relaxed mb-4">
                                Your dreams are the most personal data you possess. We treat them with the highest level of care.
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed">
                                Our AI models are tuned responsibly to provide neutral, constructive analysis. All personal data is encrypted, and you retain absolute control over what stays private and what (if anything) is shared.
                            </p>
                        </section>
                    </div>

                    {/* 7. Team Section */}
                    <section className="pt-12 border-t border-white/5">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-medium text-white mb-4">The Team</h2>
                            <p className="text-slate-400 font-light">Engineers, builders, and dreamers.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <TeamCard
                                    key={index}
                                    name={member.name}
                                    role={member.role}
                                    initials={member.initials}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
