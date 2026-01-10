'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Explorer',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'For individuals just starting their dream mapping journey.',
    features: [
      '5 dream logs per month',
      'Basic sentiment analysis',
      'Mobile app access',
      'Community forum access',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Lucid',
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: 'For serious dreamers wanting full visual immersion.',
    features: [
      'Unlimited dream logs',
      '4K Video Generation (AI)',
      'Biometric Watch Integration',
      'Export to Cloud Storage',
      'Priority Support',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Visionary',
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: 'For researchers and institutions analyzing collective data.',
    features: [
      '8K RAW Video Exports',
      'Full API Access',
      'Multi-user Team Account',
      'Dedicated Account Manager',
      'Custom AI Model Training',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const router = useRouter();

  const handlePlanSelect = (planName: string) => {
    const plan = planName.toLowerCase();
    if (plan === 'explorer') router.push('/signup?plan=explorer');
    else if (plan === 'lucid') router.push('/signup?plan=lucid&trial=true');
    else if (plan === 'visionary') router.push('/contact?subject=visionary-plan');
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Dreamscape 2.0 is live
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 tracking-tight mb-6">
            A universal tool for all<br className="hidden md:block" /> your subconscious needs.
          </h2>

          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Consolidate your dream journals, analysis, and visual generation <br className="hidden md:block" /> into one unified control center.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md border border-white/5 p-1.5 rounded-full relative">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isYearly ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${isYearly ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)]' : 'text-slate-400 hover:text-white'
                  }`}
              >
                Annually
                {isYearly && (
                  <span className="absolute -top-3 -right-3 text-[10px] bg-gradient-to-r from-orange-400 to-pink-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                    -20%
                  </span>
                )}
              </button>
            </div>
            {!isYearly && (
              <span className="text-xs font-medium text-cyan-400 animate-pulse hidden md:block">
                Switch to annual for 20% off
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative group rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2
                ${plan.featured
                  ? 'bg-slate-900/40 border-cyan-500/50 shadow-[0_0_50px_rgba(8,145,178,0.15)] z-10 scale-105 md:scale-110'
                  : 'bg-black/20 border-white/5 hover:border-white/10'
                }
                backdrop-blur-xl border flex flex-col h-full
              `}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="bg-cyan-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/20">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-2 ${plan.featured ? 'text-white' : 'text-slate-200'}`}>
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm h-10 mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tight">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-500 font-medium">/month</span>
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-emerald-400 mt-2 font-medium">
                    You save ${(plan.monthlyPrice * 12) - (plan.yearlyPrice * 12)} a year
                  </p>
                )}
              </div>

              <div className={`h-px w-full mb-8 ${plan.featured ? 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent' : 'bg-white/5'}`} />

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 rounded-full ${plan.featured ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-slate-400 group-hover:text-white transition-colors'}`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-slate-300 text-sm font-light group-hover:text-slate-200 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300
                  ${plan.featured
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-white/20'
                  }
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust/Footer text */}
        <div className="mt-20 text-center space-y-4">
          <p className="text-slate-500 text-sm">
            Trusted by sleep researchers at major institutes.
          </p>
          <div className="flex justify-center gap-8 opacity-40 grayscale">
            <span className="text-lg font-serif italic text-white">SleepFoundation</span>
            <span className="text-lg font-sans font-black text-white">REM-X</span>
            <span className="text-lg font-mono text-white">LUCIDITY</span>
            <span className="text-lg font-sans font-bold text-white">Oura</span>
          </div>
        </div>
      </div>
    </section>
  );
}