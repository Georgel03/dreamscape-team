import { Mic, BrainCircuit, Zap, Layers, ShieldCheck } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="relative py-32 bg-[#020205]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-6">From REM sleep <br />to 8K Reality.</h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">
              Our proprietary neural engine, Somnium-V2, doesn't just record dreams—it reconstructs them. By analyzing vocal patterns, biometric data, and narrative structures, we generate high-fidelity video representations of your nightly adventures.
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Voice Logging</h3>
                  <p className="text-sm text-slate-500 font-light">Wake up and speak. Our NLP parses abstract thoughts instantly.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Pattern Recognition</h3>
                  <p className="text-sm text-slate-500 font-light">Identify recurring symbols and psychological archetypes.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Feature Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="glass-panel rounded-3xl p-1 overflow-hidden relative z-10">
              <div className="bg-black/80 rounded-[20px] aspect-square flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Simulated Dashboard UI */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-[2s]"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] rounded border border-cyan-500/30 uppercase tracking-wide">Analysis Complete</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full">
                      <div className="h-full w-3/4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                    </div>
                    <div className="h-2 w-2/3 bg-white/10 rounded-full">
                      <div className="h-full w-1/2 bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
            <Zap className="w-8 h-8 text-yellow-200 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="text-3xl text-white font-medium mb-1 tracking-tight">0.04s</div>
            <div className="text-sm text-slate-500 font-light">Latency in interpretation</div>
          </div>
          <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
            <Layers className="w-8 h-8 text-cyan-200 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="text-3xl text-white font-medium mb-1 tracking-tight">8K</div>
            <div className="text-sm text-slate-500 font-light">Texture Resolution</div>
          </div>
          <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
            <ShieldCheck className="w-8 h-8 text-purple-200 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="text-3xl text-white font-medium mb-1 tracking-tight">AES-256</div>
            <div className="text-sm text-slate-500 font-light">End-to-End Encryption</div>
          </div>
        </div>
      </div>
    </section>
  );
}