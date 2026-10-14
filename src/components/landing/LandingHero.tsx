import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingHero: React.FC = () => {
  const { 
    setCurrentView, 
    setIsAuthModalOpen, 
    claimHandleText, 
    setClaimHandleText, 
    seedBuilders,
    setSelectedBuilderId 
  } = useApp();

  const [inputHandle, setInputHandle] = useState<string>(claimHandleText || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    setInputHandle(val);
    setClaimHandleText(val);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  // Row 1 & Row 2 builders for marquee
  const marqueeRow1 = [...seedBuilders, ...seedBuilders];
  const marqueeRow2 = [...seedBuilders.slice().reverse(), ...seedBuilders.slice().reverse()];

  return (
    <div className="relative overflow-hidden bg-landing-atmosphere border-b border-[var(--border-crisp)]">
      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols): Editorial Typography + Claim Bar */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Simplify Telemetry Pill */}
            <div className="inline-flex items-center gap-2 bg-[var(--simplify-teal-soft)] border border-[#BCE5DC] text-[#1A5052] px-3.5 py-1.5 rounded-full text-xs font-mono font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00AA45] animate-ping" />
              <span>THE PEER COLLABORATION NETWORK FOR SERIOUS BUILDERS</span>
            </div>

            {/* Headline with Instrument Serif Italic */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Plus_Jakarta_Sans'] font-extrabold text-[var(--text-primary)] tracking-[-0.035em] leading-[1.08]">
              Find your{' '}
              <span className="font-['Instrument_Serif'] italic font-normal text-[#1A5052] tracking-normal">
                people
              </span>
              . Build what’s{' '}
              <span className="font-['Instrument_Serif'] italic font-normal text-[#00AA45] tracking-normal">
                next
              </span>
              .
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed">
              Meet founders, builders and startups that match what you want to create — then connect, collaborate in 5-day scoped trial sprints, and ship together.
            </p>

            {/* PEERLIST-STYLE LIVE HANDLE CLAIM BAR */}
            <div className="pt-2 max-w-xl">
              <form 
                onSubmit={handleClaimSubmit}
                className="bg-white p-2 rounded-2xl border-2 border-[var(--border-crisp)] hover:border-[#1A5052] focus-within:border-[#1A5052] shadow-[var(--shadow-float)] transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="flex items-center flex-1 px-3 py-1 font-mono text-sm">
                  <span className="text-[var(--text-muted)] select-none">shipwith.app/</span>
                  <input
                    type="text"
                    value={inputHandle}
                    onChange={handleInputChange}
                    placeholder="yourname"
                    className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden font-bold pl-0.5"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#1A5052] hover:bg-[#12393B] text-white px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Try ShipWith free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Instant Handle Availability Feedback */}
              <div className="mt-2.5 px-2 flex items-center gap-1.5 text-xs font-mono">
                {inputHandle.length > 0 ? (
                  <div className="text-[#00AA45] flex items-center gap-1.5 bg-[#E8F8EE] px-2.5 py-1 rounded-lg border border-[#C6F0D6]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      <strong>shipwith.app/{inputHandle}</strong> is available — Claim your Build Passport
                    </span>
                  </div>
                ) : (
                  <span className="text-[var(--text-muted)]">
                    Type a username to claim your un-buyable builder reputation profile. No credit card required.
                  </span>
                )}
              </div>
            </div>

            {/* Secondary Action Link Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <button
                onClick={() => setCurrentView('startups')}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold flex items-center gap-1 underline underline-offset-4 decoration-[var(--border-crisp)] hover:decoration-[#1A5052] transition-colors"
              >
                Explore 8+ Active Startups <ChevronRight className="w-3 h-3" />
              </button>
              <span className="text-[var(--border-crisp)]">•</span>
              <button
                onClick={() => setCurrentView('people')}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold flex items-center gap-1 underline underline-offset-4 decoration-[var(--border-crisp)] hover:decoration-[#1A5052] transition-colors"
              >
                Browse Verified Builders <ChevronRight className="w-3 h-3" />
              </button>
              <span className="text-[var(--border-crisp)]">•</span>
              <button
                onClick={() => setCurrentView('feed')}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold flex items-center gap-1 underline underline-offset-4 decoration-[var(--border-crisp)] hover:decoration-[#1A5052] transition-colors"
              >
                Weekly ShipPad #1 Launches <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Layered Simplify Floating Visual Preview */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Card 1: 96% Builder Match Card */}
              <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-float)] transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Kushagr Rana"
                      className="w-11 h-11 rounded-xl object-cover border border-[var(--border-crisp)]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                          Kushagr Rana
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA45]" />
                      </div>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        Full-Stack Engineer · 15 hrs/wk
                      </span>
                    </div>
                  </div>

                  {/* Circular SVG Match Gauge 96% */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="19"
                          stroke="#F2EFE9"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="19"
                          stroke="#0D9488"
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 19}
                          strokeDashoffset={2 * Math.PI * 19 * (1 - 0.96)}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-mono font-bold text-[#1A5052]">96%</span>
                    </div>
                    <span className="text-[8px] font-mono text-[var(--text-muted)] font-semibold">Match</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[var(--border-crisp)] flex flex-wrap gap-1.5">
                  <span className="text-[11px] font-mono bg-[var(--bg-selected)] text-[#0D9488] px-2 py-0.5 rounded-md border border-[#BCE5DC]">
                    React 19 & Next.js ✔
                  </span>
                  <span className="text-[11px] font-mono bg-[var(--bg-selected)] text-[#0D9488] px-2 py-0.5 rounded-md border border-[#BCE5DC]">
                    15 hrs/wk schedule ✔
                  </span>
                </div>
              </div>

              {/* Card 2: 5-Day Trial Sprint Card (Floating overlap) */}
              <div className="bg-[var(--bg-canvas)] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] mt-3 sm:-ml-4 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#1A5052] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
                    5-Day Scoped Trial Sprint
                  </span>
                  <span className="text-[#00AA45] font-semibold bg-[#E8F8EE] px-2 py-0.5 rounded border border-[#C6F0D6]">
                    3/4 Shipped
                  </span>
                </div>
                <div className="mt-2 w-full h-2 bg-white rounded-full overflow-hidden border border-[var(--border-crisp)]">
                  <div className="h-full bg-[#0D9488] rounded-full w-3/4" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>PulseAI Autonomous Worker Engine</span>
                  <span className="text-[#1A5052] font-semibold">Zero Equity Risk ✔</span>
                </div>
              </div>

              {/* Card 3: Build Passport Badge */}
              <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-3 shadow-md mt-3 sm:ml-8 flex items-center justify-between text-xs font-mono transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00AA45]" />
                  <span className="font-bold text-[var(--text-primary)]">
                    4/4 Collaborators Would Build Together Again
                  </span>
                </div>
                <span className="text-[#00AA45] font-bold">100% ✔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PEERLIST-STYLE 2-ROW INFINITE BUILDER MARQUEE */}
      <div className="border-t border-[var(--border-crisp)] bg-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[#00AA45]" />
            <span className="font-semibold text-[var(--text-primary)]">LIVE BUILDER NETWORK:</span>
            <span>Active collaborators ready for 5-day trial builds</span>
          </div>
          <button 
            onClick={() => setCurrentView('people')}
            className="text-xs font-mono text-[#1A5052] hover:underline font-semibold"
          >
            View all builders →
          </button>
        </div>

        {/* Row 1 (scrolls left) */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div className="flex gap-3 animate-marquee-left py-1">
            {marqueeRow1.map((b, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => setSelectedBuilderId(b.id)}
                className="inline-flex items-center gap-2.5 bg-[var(--bg-canvas)] hover:bg-[var(--bg-hover)] border border-[var(--border-crisp)] hover:border-[#1A5052] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
              >
                <img src={b.avatar} alt={b.name} className="w-7 h-7 rounded-full object-cover border border-[var(--border-crisp)]" />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-[var(--text-primary)]">{b.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#00AA45]" />
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{b.handle}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] block">
                    {b.role.split('&')[0]} · {b.stats.ships} Ships
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (scrolls right) */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap mt-2.5">
          <div className="flex gap-3 animate-marquee-right py-1">
            {marqueeRow2.map((b, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => setSelectedBuilderId(b.id)}
                className="inline-flex items-center gap-2.5 bg-[var(--bg-canvas)] hover:bg-[var(--bg-hover)] border border-[var(--border-crisp)] hover:border-[#1A5052] px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
              >
                <img src={b.avatar} alt={b.name} className="w-7 h-7 rounded-full object-cover border border-[var(--border-crisp)]" />
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-[var(--text-primary)]">{b.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#00AA45]" />
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">{b.availability.replace('Available for ', '')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] block">
                    {b.skills.slice(0, 2).join(' · ')} · {b.weeklyHours}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
