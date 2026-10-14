import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ChevronUp, 
  CreditCard, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingStickyShowcase: React.FC = () => {
  const { setIsAuthModalOpen } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Live animation state for Scene 04 buttons
  const [scene4Votes, setScene4Votes] = useState({ tried: 84, wouldPay: 31, hasTried: false, hasPaid: false });

  // Scroll observer on the 4 left-column step containers
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-step-index'));
            if (index >= 1 && index <= 4) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: '-10% 0px -25% 0px',
      }
    );

    stepRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    setActiveStep(index);
    stepRefs[index - 1]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="py-20 bg-white border-y border-[var(--border-crisp)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--simplify-teal-soft)] border border-[#BCE5DC] text-[#1A5052] px-3 py-1 rounded-full text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>THE 4-STEP COLLABORATION FLYWHEEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold text-[var(--text-primary)] tracking-tight">
            How serious builders go from{' '}
            <span className="font-['Instrument_Serif'] italic font-normal text-[#1A5052]">discovery</span> to{' '}
            <span className="font-['Instrument_Serif'] italic font-normal text-[#00AA45]">shipping</span>.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
            No endless ghosting in Discord servers. No awkward equity negotiations with strangers. A structured, scoped path from day one.
          </p>

          {/* Quick Step Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { num: 1, label: '01 · Match Engine' },
              { num: 2, label: '02 · 5-Day Trial Sprint' },
              { num: 3, label: '03 · Build Room' },
              { num: 4, label: '04 · ShipPad & Passport' }
            ].map((tab) => (
              <button
                key={tab.num}
                onClick={() => scrollToStep(tab.num)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  activeStep === tab.num
                    ? 'bg-[#1A5052] text-white border-[#12393B] shadow-xs font-semibold'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:border-[#1A5052]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Sticky Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
          {/* Left Column (5 cols): 4 Tall Scroll Trigger Blocks */}
          <div className="lg:col-span-5 space-y-16">
            {/* Step 01 */}
            <div
              ref={stepRefs[0]}
              data-step-index="1"
              className={`min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                activeStep === 1
                  ? 'bg-[var(--bg-canvas)] border-[#1A5052] shadow-md'
                  : 'bg-white/60 border-[var(--border-crisp)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#1A5052] uppercase tracking-wider mb-2">
                <span className="w-6 h-6 rounded-md bg-[#1A5052] text-white flex items-center justify-center text-xs">01</span>
                <span>Proactive Match Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] tracking-tight">
                Find 90%+ fit builders & startups without cold DMing.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Our match engine calculates stack synergy, weekly hours, timezones, and stage alignment. You see exactly <span className="font-semibold text-[#1A5052]">why</span> you matched—down to the exact hours and libraries.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Circular SVG Match telemetry rings (96% fit)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Filtered by 10–15 hrs/wk realistic commitments</span>
                </li>
              </ul>
            </div>

            {/* Step 02 */}
            <div
              ref={stepRefs[1]}
              data-step-index="2"
              className={`min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                activeStep === 2
                  ? 'bg-[var(--bg-canvas)] border-[#1A5052] shadow-md'
                  : 'bg-white/60 border-[var(--border-crisp)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D9488] uppercase tracking-wider mb-2">
                <span className="w-6 h-6 rounded-md bg-[#0D9488] text-white flex items-center justify-center text-xs">02</span>
                <span>5-Day Scoped Trial Sprint</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] tracking-tight">
                Test real execution before committing equity.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Before promising equity or signing long-term co-founder agreements, collaborate on a tight, 5-day trial sprint. If it clicks, continue. If not, part amicably with zero legal overhead.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Scoped 3–5 milestone deliverables</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Structured end-of-trial decision & peer review</span>
                </li>
              </ul>
            </div>

            {/* Step 03 */}
            <div
              ref={stepRefs[2]}
              data-step-index="3"
              className={`min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                activeStep === 3
                  ? 'bg-[var(--bg-canvas)] border-[#1A5052] shadow-md'
                  : 'bg-white/60 border-[var(--border-crisp)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D94E1F] uppercase tracking-wider mb-2">
                <span className="w-6 h-6 rounded-md bg-[#D94E1F] text-white flex items-center justify-center text-xs">03</span>
                <span>Lightweight Build Room</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] tracking-tight">
                Daily ship logs, tasks & demo links in one place.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Not a bloated Jira board. A clean, focused workspace with a single daily question: <span className="font-semibold text-[var(--text-primary)]">"What did you ship today?"</span> Submitting updates your Proof-of-Work heatmap in real time.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Kanban tasks (Todo / In Progress / Done)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Integrated team chat & repo link pills</span>
                </li>
              </ul>
            </div>

            {/* Step 04 */}
            <div
              ref={stepRefs[3]}
              data-step-index="4"
              className={`min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                activeStep === 4
                  ? 'bg-[var(--bg-canvas)] border-[#1A5052] shadow-md'
                  : 'bg-white/60 border-[var(--border-crisp)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00AA45] uppercase tracking-wider mb-2">
                <span className="w-6 h-6 rounded-md bg-[#00AA45] text-white flex items-center justify-center text-xs">04</span>
                <span>Weekly ShipPad & Build Passport</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] tracking-tight">
                Earn verified builder reputation you can never buy.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Ship directly to the Weekly ShipPad leaderboard. Collect high-signal votes ("▲ Tried It", "💳 Would Pay") and permanently verify your collaboration role on your public Build Passport.
              </p>
              <ul className="mt-4 space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>"4/4 Collaborators Would Build Again ✔" ledger</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45] shrink-0" />
                  <span>Permanent link to your shipwith.app/@handle</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (7 cols): Sticky Container (position: sticky; top: 100px; height: 560px) */}
          <div className="lg:col-span-7 sticky top-[100px] h-[540px] sm:h-[560px] bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border-crisp)] p-5 sm:p-6 shadow-[var(--shadow-float)] overflow-hidden flex flex-col justify-between">
            {/* Top Scene Indicator Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-crisp)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1A5052] animate-pulse" />
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                  SIMULATED LIVE VIEWPORT: STEP 0{activeStep}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] bg-white px-2 py-0.5 rounded-md border border-[var(--border-crisp)]">
                Auto-animating with scroll
              </span>
            </div>

            {/* Dynamic Interactive Scene Container */}
            <div className="flex-1 py-4 flex flex-col justify-center overflow-y-auto scrollbar-none">
              {/* SCENE 01: Proactive Match Engine */}
              {activeStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-[#1A5052] text-white p-3 rounded-xl text-xs font-mono flex items-center justify-between shadow-xs">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#34D399]" />
                      Match Engine scanned 180+ active builds for your profile
                    </span>
                    <span className="text-[#34D399] font-bold">LIVE ✔</span>
                  </div>

                  <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                            PulseAI Workflow Engine
                          </span>
                          <span className="text-[10px] font-mono bg-emerald-50 text-[#00AA45] px-2 py-0.5 rounded-full border border-emerald-200">
                            Building MVP
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          Autonomous background workflow engine for modern dev teams
                        </p>
                      </div>

                      {/* SVG Circular Match Gauge 96% */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-14 h-14 flex items-center justify-center">
                          <svg className="w-14 h-14 transform -rotate-90">
                            <circle
                              cx="28"
                              cy="28"
                              r="22"
                              stroke="#F2EFE9"
                              strokeWidth="4"
                              fill="transparent"
                            />
                            <circle
                              cx="28"
                              cy="28"
                              r="22"
                              stroke="#0D9488"
                              strokeWidth="4"
                              strokeDasharray={2 * Math.PI * 22}
                              strokeDashoffset={2 * Math.PI * 22 * (1 - 0.96)}
                              strokeLinecap="round"
                              fill="transparent"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <span className="absolute text-xs font-mono font-bold text-[#1A5052]">96%</span>
                        </div>
                        <span className="text-[9px] font-mono text-[var(--text-muted)] mt-0.5">Match</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['React 19 aligned ✔', '15 hrs/wk schedule ✔', 'Python & FastAPI ✔'].map((badge, idx) => (
                        <span key={idx} className="text-[11px] font-mono bg-[var(--bg-selected)] text-[#0D9488] px-2.5 py-0.5 rounded-md border border-[#BCE5DC]">
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border-crisp)] text-xs font-mono">
                      <span className="text-[var(--text-muted)]">Founder: Kushagr Rana (GMT+5:30)</span>
                      <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="text-[#1A5052] font-semibold hover:underline flex items-center gap-1"
                      >
                        Inspect Match Breakdown <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 02: 5-Day Scoped Trial Sprint */}
              {activeStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border-crisp)]">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#0D9488] font-bold">
                          ACTIVE TRIAL SPRINT
                        </span>
                        <h4 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                          PulseAI Day 4 of 5 Trial Sprint
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>32h remaining</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[var(--text-secondary)]">Milestones Shipped</span>
                        <span className="font-bold text-[#0D9488]">3 of 4 Done (75%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden border border-[var(--border-crisp)]">
                        <div className="h-full bg-[#0D9488] rounded-full transition-all duration-700 w-3/4" />
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-subtle)]">
                        <span className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                          Setup LangGraph autonomous worker routing
                        </span>
                        <span className="text-[10px] font-mono text-[#00AA45] font-semibold">Shipped ✔</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-subtle)]">
                        <span className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                          Connect GitHub Webhooks to Redis Event Bus
                        </span>
                        <span className="text-[10px] font-mono text-[#00AA45] font-semibold">Shipped ✔</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-200/60">
                        <span className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                          <Clock className="w-4 h-4 text-amber-600" />
                          Final end-to-end regression test run
                        </span>
                        <span className="text-[10px] font-mono text-amber-700 font-semibold">In Progress</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-crisp)]">
                      <span className="flex items-center gap-1 text-[#00AA45]">
                        <ShieldCheck className="w-3.5 h-3.5" /> Zero Equity Risk Guarantee
                      </span>
                      <span>Review in 32 hrs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 03: Lightweight Build Room */}
              {activeStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#D94E1F]">
                        DAILY EXECUTION LOG
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-[var(--bg-subtle)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>git:main</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-[var(--bg-subtle)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                          <svg className="w-3 h-3" viewBox="0 0 38 57" fill="none">
                            <path d="M19 28.5C13.7533 28.5 9.5 24.2467 9.5 19C9.5 13.7533 13.7533 9.5 19 9.5C24.2467 9.5 28.5 13.7533 28.5 19C28.5 24.2467 24.2467 28.5 19 28.5Z" fill="#1ABCFE"/>
                            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                          </svg>
                          <span>figma:v4</span>
                        </span>
                      </div>
                    </div>

                    {/* Daily Prompt */}
                    <div className="p-3 bg-[var(--bg-canvas)] rounded-lg border border-[var(--border-crisp)]">
                      <label className="text-[11px] font-mono font-bold text-[var(--text-primary)] block mb-1">
                        "What did you ship today?"
                      </label>
                      <div className="bg-white border border-[var(--border-crisp)] rounded-md p-2 text-xs text-[var(--text-secondary)] font-mono flex items-center justify-between">
                        <span>Pushed sub-agent retry fallback logic to branch feat/retry</span>
                        <span className="text-[10px] bg-[#E8F8EE] text-[#00AA45] px-1.5 py-0.5 rounded font-bold">Logged ✔</span>
                      </div>
                    </div>

                    {/* Tasks Columns */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[var(--bg-subtle)] p-2.5 rounded-lg border border-[var(--border-crisp)]">
                        <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold block mb-1.5">
                          IN PROGRESS (1)
                        </span>
                        <div className="bg-white p-2 rounded border border-[var(--border-crisp)] shadow-2xs font-medium text-[var(--text-primary)] text-[11px]">
                          Polish telemetry sparklines
                        </div>
                      </div>
                      <div className="bg-[var(--bg-subtle)] p-2.5 rounded-lg border border-[var(--border-crisp)]">
                        <span className="text-[10px] font-mono text-[#00AA45] font-bold block mb-1.5">
                          DONE (4) ✔
                        </span>
                        <div className="bg-white p-2 rounded border border-[var(--border-crisp)] shadow-2xs font-medium text-[var(--text-secondary)] text-[11px] line-through">
                          Design clean match ring
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 04: Weekly ShipPad & Build Passport */}
              {activeStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                            #1
                          </span>
                          <h4 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                            PulseAI Workflow Engine
                          </h4>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          Shipped by Kushagr Rana & Maya Lin · Week 42 Leaderboard
                        </p>
                      </div>
                      <span className="text-xs font-mono bg-[#E8F8EE] text-[#00AA45] px-2.5 py-1 rounded-full font-bold border border-[#C6F0D6] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Shipped
                      </span>
                    </div>

                    {/* Interactive Signal Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setScene4Votes(prev => ({
                            ...prev,
                            tried: prev.hasTried ? prev.tried - 1 : prev.tried + 1,
                            hasTried: !prev.hasTried
                          }));
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                          scene4Votes.hasTried
                            ? 'bg-[#00AA45] text-white border-[#008A37]'
                            : 'bg-white text-[var(--text-primary)] border-[var(--border-crisp)] hover:border-[#00AA45]'
                        }`}
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                        <span>▲ Tried It</span>
                        <span className="text-[11px] bg-black/10 px-1.5 rounded">{scene4Votes.tried}</span>
                      </button>

                      <button
                        onClick={() => {
                          setScene4Votes(prev => ({
                            ...prev,
                            wouldPay: prev.hasPaid ? prev.wouldPay - 1 : prev.wouldPay + 1,
                            hasPaid: !prev.hasPaid
                          }));
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                          scene4Votes.hasPaid
                            ? 'bg-[#1A5052] text-white border-[#12393B]'
                            : 'bg-white text-[var(--text-primary)] border-[var(--border-crisp)] hover:border-[#1A5052]'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>💳 Would Pay</span>
                        <span className="text-[11px] bg-black/10 px-1.5 rounded">{scene4Votes.wouldPay}</span>
                      </button>
                    </div>

                    {/* Build Passport Reputation Card */}
                    <div className="p-3 bg-[var(--bg-selected)] rounded-lg border border-[#BCE5DC] text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-mono font-bold text-[#1A5052]">
                        <span className="flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-[#00AA45]" />
                          Verified Build Passport
                        </span>
                        <span>4/4 Would Build Again ✔</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] font-mono">
                        "Shipped full LangGraph integration ahead of schedule. Exceptional technical communication." — Maya Lin (Product Designer)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom CTA Bar */}
            <div className="pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between text-xs">
              <span className="font-mono text-[var(--text-secondary)]">Ready to launch your build?</span>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#1A5052] hover:bg-[#12393B] text-white font-mono font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
