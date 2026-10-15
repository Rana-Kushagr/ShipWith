import React from 'react';
import { CheckCircle2, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PremiumView: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#141418] border border-[var(--border-crisp)] text-white px-3 py-1 rounded-full text-xs font-mono font-medium">
          <Award className="w-3.5 h-3.5 text-white" />
          <span>PRO MEMBERSHIP FOR BUILDERS & STARTUPS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
          Supercharge your collaborative shipping
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
          Free for all builders forever. Upgrade to Pro for advanced match telemetry, custom domains, and unlimited concurrent trial rooms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Free Builder */}
        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-white font-['Plus_Jakarta_Sans']">
                Builder Free
              </h3>
              <div className="mt-2 flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-[var(--text-muted)]">/ forever</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Everything you need to discover teammates and ship products.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-[var(--text-secondary)]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Public shipwith.app/@handle</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> 52-Week Proof Heatmap</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> 2 Active Trial Sprints</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Weekly ShipPad launches</li>
            </ul>
          </div>
          <button
            disabled
            className="w-full bg-[#141418] text-[var(--text-muted)] py-2.5 rounded-xl text-xs font-mono font-bold border border-[var(--border-crisp)] cursor-not-allowed"
          >
            Current Active Plan
          </button>
        </div>

        {/* Tier 2: Builder Pro */}
        <div className="bg-[#0C0C0E] rounded-2xl border-2 border-white p-6 shadow-2xl space-y-5 flex flex-col justify-between relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#050506] px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
            Most Popular
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-white font-['Plus_Jakarta_Sans']">
                Builder Pro
              </h3>
              <div className="mt-2 flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-extrabold text-white">$12</span>
                <span className="text-xs text-[var(--text-muted)]">/ month</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              For active creators building and contributing to multiple startups.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-[var(--text-secondary)]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Verified Green Checkmark (✔)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Unlimited 5-day trial rooms</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Custom domain mapping for passport</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Priority matching queue</li>
            </ul>
          </div>
          <button
            onClick={() => addToast('Subscribed to Builder Pro demo!', 'success')}
            className="w-full bg-white hover:bg-zinc-200 text-[#050506] py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
          >
            Upgrade to Builder Pro
          </button>
        </div>

        {/* Tier 3: Startup Pro */}
        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-white font-['Plus_Jakarta_Sans']">
                Startup Pro
              </h3>
              <div className="mt-2 flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-extrabold text-white">$29</span>
                <span className="text-xs text-[var(--text-muted)]">/ month</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              For founders hiring and scoping trial sprints with top talent.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-[var(--text-secondary)]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Unlimited open trial roles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Candidate skill overlap breakdown</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Dedicated team workspace rooms</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D659]" /> Fast-track Weekly ShipPad listing</li>
            </ul>
          </div>
          <button
            onClick={() => addToast('Subscribed to Startup Pro demo!', 'success')}
            className="w-full bg-[#141418] hover:bg-[#1A1A22] text-white py-2.5 rounded-xl text-xs font-mono font-bold border border-[var(--border-crisp)] hover:border-white/30 transition-colors cursor-pointer"
          >
            Upgrade to Startup Pro
          </button>
        </div>
      </div>
    </div>
  );
};
