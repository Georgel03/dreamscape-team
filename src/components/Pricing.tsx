import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative border-t border-white/5">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">Invest in your mind.</h2>
          <p className="text-slate-400 font-light max-w-lg mx-auto text-lg">Choose a plan to start mapping your subconscious.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan 1 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-2">Explorer</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-white">$0</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mt-4 font-light">Basic dream logging and text analysis.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "5 logs per month",
                "Basic sentiment analysis",
                "Mobile app access"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                  <Check className="w-4 h-4 text-cyan-500" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">Get Started</button>
          </div>

          {/* Plan 2 (Featured) */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col relative bg-white/[0.03] border-cyan-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 rounded-full text-[10px] font-medium text-black uppercase tracking-wide">Most Popular</div>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-2">Lucid</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-white">$29</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mt-4 font-light">Full visual rendering and deeper insights.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Unlimited logs",
                "4K Video Generation",
                "Biometric Integration",
                "Export to Cloud"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white font-light">
                  <Check className="w-4 h-4 text-cyan-400" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">Start Free Trial</button>
          </div>

          {/* Plan 3 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-2">Visionary</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-white">$99</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-sm text-slate-500 mt-4 font-light">Professional grade for researchers & artists.</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "8K RAW Exports",
                "API Access",
                "Dedicated Support"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-light">
                  <Check className="w-4 h-4 text-cyan-500" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}