import React from 'react';
import { Megaphone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdvertiseView: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
            TRANSPARENT PROMOTION
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white">
          Promote Your Build on ShipWith
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Reach thousands of serious builders looking for their next startup collaboration.
        </p>
      </div>

      {/* Critical Rule Banner */}
      <div className="p-4 bg-[#141418] rounded-2xl border border-[var(--border-crisp)] text-xs font-mono space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-white">
          <ShieldCheck className="w-4 h-4 text-[#00D659]" />
          <span>Core Principle: Reputation & Match % Cannot Be Bought</span>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Paid placement only boosts visibility and banner impressions. Match %, 52-week heatmaps, and Build Passport reputation remain 100% computed from verified collaborative execution.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-sm hover:border-white/20 transition-all space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg font-['Plus_Jakarta_Sans'] text-white">
                Featured Build Sprint
              </h3>
              <span className="text-xs font-mono font-bold text-white bg-[#141418] px-2.5 py-1 rounded-full border border-[var(--border-crisp)]">
                $49 / week
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Pinned to the top of the Startups Radar with a high-contrast 'Promoted' badge.
            </p>
            <ul className="mt-4 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" /> Top 3 placement on Startups page</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" /> Highlighted open trial sprint roles</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" /> Analytics on impressions and applications</li>
            </ul>
          </div>

          <button
            onClick={() => addToast('Sponsorship checkout demo initialized!', 'info')}
            className="w-full bg-white hover:bg-zinc-200 text-[#050506] py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <span>Promote Build ($49)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-sm hover:border-white/20 transition-all space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg font-['Plus_Jakarta_Sans'] text-white">
                ShipPad Launch Spotlight
              </h3>
              <span className="text-xs font-mono font-bold text-white bg-[#141418] px-2.5 py-1 rounded-full border border-[var(--border-crisp)]">
                $99 / launch
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Spotlight placement on the Weekly ShipPad launch leaderboard during launch week.
            </p>
            <ul className="mt-4 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" /> Weekly email digest feature (4,500+ builders)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" /> Direct feedback collection banner</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" /> Social broadcast on X and LinkedIn</li>
            </ul>
          </div>

          <button
            onClick={() => addToast('Launch spotlight demo initialized!', 'info')}
            className="w-full bg-white hover:bg-zinc-200 text-[#050506] py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <span>Spotlight Launch ($99)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
