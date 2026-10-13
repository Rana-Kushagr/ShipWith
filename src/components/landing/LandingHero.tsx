import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  GitCommit, 
  Play, 
  Pause, 
  Clock, 
  Users, 
  ShieldCheck, 
  Search, 
  ChevronRight,
  Zap,
  ExternalLink,
  Award
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { setCurrentView } = useApp();

  // Active step in the animated hero loop (0: Discovery, 1: Match, 2: Trial Sprint, 3: Shipped)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const steps = [
    { id: 0, title: 'Discovery Radar', icon: Search, label: 'Find Matches' },
    { id: 1, title: 'Compatibility Match', icon: Users, label: '98% Synergy' },
    { id: 2, title: '4-Day Trial Sprint', icon: Zap, label: 'Scoped Build' },
    { id: 3, title: 'Verified Shipped', icon: Award, label: 'Build Passport' },
  ];

  // Auto-cycle through the 4 steps every 5 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update progress every 50ms
    const totalDuration = 4800; // 4.8 seconds per step
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % 4);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStep]);

  const handleSelectStep = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-white">
      {/* Simplify-Style Background Dot Grid with Radial Fade */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.05) 0%, rgba(255, 255, 255, 0) 70%)'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Simplify-Style Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-xs text-slate-700 font-medium shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-900">ShipWith 1.0</span>
              <span className="text-slate-400">•</span>
              <span>The Build-First Co-Founder Network</span>
            </div>

            {/* Main Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Find your people.<br />
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 bg-clip-text text-transparent">
                Build what’s next.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Meet developers, designers, and founders who actually ship. Start with a <strong className="font-semibold text-slate-900">4-day scoped trial sprint</strong> before committing equity or months of work.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setCurrentView('onboarding')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all"
              >
                Start building free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('walkthrough-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                How it works
              </Button>
            </div>

            {/* Trust Micro-Metrics (Social Proof Bar) */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
              <div>
                <div className="text-lg font-bold font-mono text-slate-900">1,400+</div>
                <div className="text-[11px] text-slate-500">Verified Builds</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-emerald-600">94.2%</div>
                <div className="text-[11px] text-slate-500">Trial Completion</div>
              </div>
              <div>
                <div className="text-lg font-bold font-mono text-blue-600">0%</div>
                <div className="text-[11px] text-slate-500">Resume Fluff</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Definition Animated Hero Card Showcase */}
          <div className="lg:col-span-7 relative">
            
            {/* Floating Satellite Card 1: Active 4-Day Trial (Top-Left) */}
            <div className="hidden sm:flex absolute -top-6 -left-6 z-20 items-center gap-3 p-3 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-lg animate-float">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <span>Trial Sprint In-Flight</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Day 2 of 4 • Scoped MVP
                </div>
              </div>
            </div>

            {/* Floating Satellite Card 2: Verified Shipped Stamp (Bottom-Right) */}
            <div className="hidden sm:flex absolute -bottom-6 -right-4 z-20 items-center gap-3 p-3 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-lg animate-float-delayed">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <div className="font-semibold text-slate-900 flex items-center gap-1">
                  <span>Build Passport Stamped</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-[11px] text-slate-500">
                  Campus AI MVP • Shipped to Prod
                </div>
              </div>
            </div>

            {/* Main Interactive Browser Window Frame */}
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden text-left">
              
              {/* Window Header Toolbar */}
              <div className="h-11 px-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="text-xs font-semibold text-slate-700 ml-2 hidden sm:inline">ShipWith Pairing Engine</span>
                </div>
                
                {/* Simulated URL Pill */}
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-mono text-slate-500 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>shipwith.app/engine/{steps[activeStep].title.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>

                {/* Play/Pause control for user */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause auto-tour" : "Play auto-tour"}
                  className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 cursor-pointer transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Dynamic Chapter Stepper Bar */}
              <div className="bg-slate-100/70 border-b border-slate-200 p-1.5 grid grid-cols-4 gap-1">
                {steps.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectStep(idx)}
                      className={`relative flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="truncate hidden sm:inline">{s.title}</span>
                      
                      {/* Live progress indicator bar on active step */}
                      {isActive && isPlaying && (
                        <div 
                          className="absolute bottom-0 left-0 h-0.5 bg-blue-600 rounded-full transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Window Content: Animated Dynamic Stages */}
              <div className="p-5 sm:p-6 bg-white min-h-[360px] flex flex-col justify-between">
                
                {/* STAGE 0: Discovery Radar */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                          <Search className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Builder & Startup Radar</h4>
                          <p className="text-[11px] text-slate-500">Scanning active creators by verified capability</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-mono font-medium">
                        Live: 420 Online
                      </span>
                    </div>

                    {/* Simulated Live Search Bar with typing effect */}
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-xs text-slate-700">
                      <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono font-medium text-slate-900">Full-Stack Engineer</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">React 19 / Next.js / AI</span>
                      <span className="ml-auto w-2 h-4 bg-blue-500 animate-pulse" />
                    </div>

                    {/* Candidate Match Card Result */}
                    <div className="p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3 hover:border-slate-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                            alt="Arjun"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              Arjun Verma
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200">
                                98% Match
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500">Full-Stack Maker • Available 15h/wk</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          ⚡ Trial Ready
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">React 19</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">TypeScript</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">FastAPI</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">GMT+5:30</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 1: Compatibility Match */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Pairing Compatibility Analysis</h4>
                          <p className="text-[11px] text-slate-500">Complementary roles, aligned availability, zero equity friction</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        98% Synergy
                      </span>
                    </div>

                    {/* Visual Two-Builder Pairing Beam */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-7 gap-2 items-center text-center">
                      {/* Builder 1 */}
                      <div className="col-span-3 space-y-1">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                          alt="Arjun"
                          className="w-11 h-11 rounded-full mx-auto object-cover border-2 border-blue-500"
                        />
                        <div className="text-xs font-bold text-slate-900">Arjun (Engineering)</div>
                        <div className="text-[10px] text-slate-500">Full-Stack / Vite / AI</div>
                      </div>

                      {/* Connection Pulse */}
                      <div className="col-span-1 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
                          <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-mono text-blue-600 mt-1">4-Day Trial</span>
                      </div>

                      {/* Builder 2 */}
                      <div className="col-span-3 space-y-1">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                          alt="Priya"
                          className="w-11 h-11 rounded-full mx-auto object-cover border-2 border-emerald-500"
                        />
                        <div className="text-xs font-bold text-slate-900">Priya (Product & Design)</div>
                        <div className="text-[10px] text-slate-500">UI/UX / Growth / MVP</div>
                      </div>
                    </div>

                    {/* Compatibility Checklist */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-white border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Aligned 15 hrs/week commitment</span>
                      </div>
                      <div className="p-2 bg-white border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Same Timezone (GMT+5:30)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 2: 4-Day Trial Sprint Kanban */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">4-Day Trial Sprint Execution</h4>
                          <p className="text-[11px] text-slate-500">Test actual work habits on a scoped micro-objective</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Sprint 1: Day 3 of 4
                      </span>
                    </div>

                    {/* Mini Kanban Columns */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {/* Col 1 */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Backlog (0)</div>
                        <div className="text-[10px] text-slate-400 italic py-3 text-center">All picked up</div>
                      </div>

                      {/* Col 2 */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="text-[10px] font-mono uppercase font-bold text-blue-600 flex items-center justify-between">
                          <span>In Progress (1)</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                          <div className="text-xs font-semibold text-slate-900">Connect Stripe Checkout</div>
                          <div className="text-[10px] text-slate-500">Assigned: Arjun</div>
                        </div>
                      </div>

                      {/* Col 3 */}
                      <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                        <div className="text-[10px] font-mono uppercase font-bold text-emerald-700">Shipped (3)</div>
                        <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                          <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                            <span>Core Auth & Landing</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          </div>
                          <div className="text-[10px] text-slate-500">PR #12 Merged</div>
                        </div>
                      </div>
                    </div>

                    {/* Commit Pill */}
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <GitCommit className="w-3.5 h-3.5 text-blue-600" />
                        <span>git commit -m "feat: complete MVP trial loop"</span>
                      </div>
                      <span className="text-emerald-600 font-bold">+420 -18</span>
                    </div>
                  </div>
                )}

                {/* STAGE 3: Verified Shipped & Build Passport */}
                {activeStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Build Passport Stamp</h4>
                          <p className="text-[11px] text-slate-500">Reputation earned through shipped software, not self-written bios</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ⭐ 5.0 Mutual Rating
                      </span>
                    </div>

                    {/* Passport Certificate Card */}
                    <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">Campus AI Tutor MVP</div>
                          <div className="text-[11px] text-slate-600">4-Day Trial Sprint Successfully Completed</div>
                        </div>
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono font-bold text-slate-900 flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          VERIFIED
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-slate-200/80 italic">
                        "Arjun delivered clean React components ahead of schedule. Great communicator and sharp thinker. Continuing as co-founders!"
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-mono">
                          <ExternalLink className="w-3 h-3 text-blue-600" /> campusai.dev
                        </span>
                        <span className="text-emerald-600 font-semibold">Decision: Co-Founder Partnership Confirmed ✅</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Interactive Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Real collaborative output replaces unverified resumes.</span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentView('onboarding')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <span>Try it yourself</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
