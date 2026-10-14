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

  // Active step in the animated preview loop (0: Discovery, 1: Match, 2: Trial Sprint, 3: Shipped)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [stepProgress, setStepProgress] = useState<number>(0);

  // Dynamic scroll progress for the 3D perspective reveal (0 at top, 1 when scrolled down)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const steps = [
    { id: 0, title: 'Discovery Radar', icon: Search, label: 'Find Matches' },
    { id: 1, title: 'Compatibility Match', icon: Users, label: '98% Synergy' },
    { id: 2, title: '4-Day Trial Sprint', icon: Zap, label: 'Scoped Build' },
    { id: 3, title: 'Verified Shipped', icon: Award, label: 'Build Passport' },
  ];

  // Auto-cycle through the 4 steps every 4.8 seconds
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update step progress every 50ms
    const totalDuration = 4800; // 4.8 seconds per step
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % 4);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStep]);

  // Window scroll listener to drive reversible 3D tilt animation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Scale from 0 (at top) to 1 (at 420px scrolled)
          const maxScroll = 420;
          const ratio = Math.min(1, Math.max(0, currentY / maxScroll));
          setScrollProgress(ratio);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSelectStep = (index: number) => {
    setActiveStep(index);
    setStepProgress(0);
  };

  // 3D Transform calculations based on scrollProgress
  // At scrollProgress = 0: rotateX = 32deg, scale = 0.88, translateY = 65px (laying still in perspective like on a desk)
  // At scrollProgress = 1: rotateX = 0deg, scale = 1.0, translateY = 0px (comes upright facing the user)
  const currentRotateX = (1 - scrollProgress) * 32;
  const currentScale = 0.88 + scrollProgress * 0.12;
  const currentTranslateY = (1 - scrollProgress) * 65;
  const currentOpacity = 0.90 + scrollProgress * 0.10;

  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-[var(--color-canvas)] transition-colors duration-200">
      {/* Premium background: subtle dot-grid + gradient mesh atmosphere */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================================
            CENTERED HERO HEADER & VALUE PROPOSITION
            Uses curated typography mixture: Outfit Bold + Instrument Serif Italic
            ========================================================================= */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-ping" />
            <span className="font-semibold text-[var(--color-text-primary)]">ShipWith 1.0</span>
            <span className="text-[var(--color-text-muted)]">•</span>
            <span>The Build-First Co-Founder Network</span>
          </div>

          {/* Master Display Heading with High-End Font Mixture */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.04] font-display max-w-4xl mx-auto">
            Find your co-founder.{' '}
            <br className="hidden sm:inline" />
            <span className="font-serif-italic font-normal text-[var(--color-brand-accent)] text-[1.18em] tracking-normal inline-block pr-2">
              Build
            </span>
            <span className="bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-brand-accent)] to-[var(--color-text-primary)] bg-clip-text text-transparent font-black">
              what actually ships.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto font-normal">
            Meet developers, designers, and founders who actually ship. Start with a <strong className="font-semibold text-[var(--color-text-primary)]">4-day scoped trial sprint</strong> before committing equity or months of work.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentView('onboarding')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md hover:shadow-xl transition-all cursor-pointer font-semibold px-6 py-3"
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
              className="w-full sm:w-auto cursor-pointer px-6 py-3"
            >
              Explore pairing engine
            </Button>
          </div>

          {/* Architecture Trust Highlights */}
          <div className="pt-4 max-w-lg mx-auto grid grid-cols-3 gap-4 border-t border-[var(--color-border-subtle)] text-center">
            <div>
              <div className="text-lg font-bold font-mono text-[var(--color-text-primary)]">4 Days</div>
              <div className="text-[11px] text-[var(--color-text-muted)]">Trial Sprint Scope</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-[var(--color-success)]">100%</div>
              <div className="text-[11px] text-[var(--color-text-muted)]">Verified Code Output</div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-[var(--color-brand-accent)]">0%</div>
              <div className="text-[11px] text-[var(--color-text-muted)]">Resume / CV Fluff</div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3D SCROLL-DRIVEN PREVIEW STAGE
            Laying still in perspective at top; tilts upright to the screen on scroll.
            Resets automatically when scrolling back to top.
            ========================================================================= */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto relative hero-3d-stage">
          
          {/* Floating Satellite Card 1: Active 4-Day Trial (Top-Left) */}
          <div className="hidden md:flex absolute -top-6 -left-6 z-20 items-center gap-3 p-3 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl shadow-lg animate-float">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-warning-subtle)] border border-[var(--color-warning)]/30 flex items-center justify-center text-[var(--color-warning)] font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <span>Trial Sprint In-Flight</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[var(--color-text-muted)]" /> Day 2 of 4 • Scoped MVP
              </div>
            </div>
          </div>

          {/* Floating Satellite Card 2: Verified Shipped Stamp (Bottom-Right) */}
          <div className="hidden md:flex absolute -bottom-6 -right-6 z-20 items-center gap-3 p-3 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl shadow-lg animate-float-delayed">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-success-subtle)] border border-[var(--color-success)]/30 flex items-center justify-center text-[var(--color-success)] font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1">
                <span>Build Passport Stamped</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)]">
                Trial Sprint • Verified Deliverable
              </div>
            </div>
          </div>

          {/* The Main 3D Canvas that tilts and rises based on scroll */}
          <div 
            className="hero-preview-canvas relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden text-left"
            style={{
              transform: `perspective(1100px) rotateX(${currentRotateX}deg) scale(${currentScale}) translateY(${currentTranslateY}px)`,
              transformOrigin: 'top center',
              opacity: currentOpacity,
              boxShadow: scrollProgress > 0.4
                ? '0 30px 70px -15px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(226, 232, 240, 0.9)'
                : '0 20px 40px -12px rgba(15, 23, 42, 0.10), 0 0 0 1px rgba(226, 232, 240, 0.6)'
            }}
          >
            
            {/* Window Header Toolbar */}
            <div className="h-11 px-4 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="text-xs font-semibold text-[var(--color-text-primary)] ml-2 hidden sm:inline">
                  ShipWith Pairing Engine
                </span>
              </div>
              
              {/* Simulated URL Pill */}
              <div className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                <span>shipwith.app/engine/{steps[activeStep].title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>

              {/* Play/Pause control */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause auto-tour" : "Play auto-tour"}
                className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-strong)] cursor-pointer transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Dynamic Chapter Stepper Bar */}
            <div className="bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] p-1.5 grid grid-cols-4 gap-1">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStep(idx)}
                    className={`relative flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs border border-[var(--color-border)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[var(--color-brand-accent)]' : 'text-[var(--color-text-muted)]'}`} />
                    <span className="truncate hidden sm:inline">{s.title}</span>
                    
                    {/* Live progress indicator bar on active step */}
                    {isActive && isPlaying && (
                      <div 
                        className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-brand-accent)] rounded-full transition-all duration-75"
                        style={{ width: `${stepProgress}%` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Window Content: Dynamic Interactive Stages */}
            <div className="p-5 sm:p-7 bg-[var(--color-surface)] min-h-[380px] flex flex-col justify-between">
              
              {/* STAGE 0: Discovery Radar */}
              {activeStep === 0 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-accent-subtle)] border border-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)]">
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-text-primary)]">Builder & Startup Radar</h4>
                        <p className="text-[11px] text-[var(--color-text-muted)]">Scanning active creators by verified capability</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]/20 rounded-full text-[10px] font-mono font-medium">
                      Real-Time Radar
                    </span>
                  </div>

                  {/* Simulated Live Search Bar */}
                  <div className="p-3 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-xl flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <Search className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                    <span className="font-mono font-medium text-[var(--color-text-primary)]">Full-Stack Engineer</span>
                    <span className="text-[var(--color-text-muted)]">•</span>
                    <span className="text-[var(--color-text-secondary)]">React 19 / Next.js / AI</span>
                    <span className="ml-auto w-2 h-4 bg-[var(--color-brand-accent)] animate-pulse" />
                  </div>

                  {/* Candidate Match Card Result */}
                  <div className="p-4 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-xl space-y-3 hover:border-[var(--color-border-strong)] transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] flex items-center justify-center font-mono font-bold text-xs border border-[var(--color-brand-accent)]/30">
                          ENG
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                            Engineering Lead Candidate
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/20 font-medium">
                              Passport Active
                            </span>
                          </div>
                          <div className="text-[11px] text-[var(--color-text-muted)]">Full-Stack Builder • Available 15h/wk • Async Aligned</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[var(--color-success)] bg-[var(--color-success-subtle)] px-2.5 py-1 rounded-md border border-[var(--color-success)]/20">
                        ⚡ Trial Ready
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono">React 19</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono">TypeScript</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono">FastAPI</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono">Verified GitHub</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 1: Compatibility Match */}
              {activeStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-success-subtle)] border border-[var(--color-success)]/20 flex items-center justify-center text-[var(--color-success)]">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-text-primary)]">Pairing Compatibility Analysis</h4>
                        <p className="text-[11px] text-[var(--color-text-muted)]">Complementary roles, aligned availability, zero equity friction</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-success)] bg-[var(--color-success-subtle)] px-2.5 py-0.5 rounded-md border border-[var(--color-success)]/20">
                      98% Synergy
                    </span>
                  </div>

                  {/* Visual Two-Builder Pairing Beam */}
                  <div className="p-4 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-xl grid grid-cols-7 gap-2 items-center text-center">
                    {/* Builder 1 */}
                    <div className="col-span-3 space-y-1">
                      <div className="w-11 h-11 rounded-full mx-auto bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] flex items-center justify-center font-mono font-bold text-xs border-2 border-[var(--color-brand-accent)]">
                        ENG
                      </div>
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">Engineering Partner</div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">Full-Stack / Vite / APIs</div>
                    </div>

                    {/* Connection Pulse */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] flex items-center justify-center animate-pulse">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--color-brand-accent)] mt-1">4-Day Trial</span>
                    </div>

                    {/* Builder 2 */}
                    <div className="col-span-3 space-y-1">
                      <div className="w-11 h-11 rounded-full mx-auto bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] flex items-center justify-center font-mono font-bold text-xs border-2 border-[var(--color-success)]">
                        DES
                      </div>
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">Design & Product Lead</div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">UI/UX / Growth / MVP</div>
                    </div>
                  </div>

                  {/* Compatibility Checklist */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                      <span>Aligned 15 hrs/week commitment</span>
                    </div>
                    <div className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)] shrink-0" />
                      <span>Same Timezone (GMT+5:30)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: 4-Day Trial Sprint Kanban */}
              {activeStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-warning-subtle)] border border-[var(--color-warning)]/20 flex items-center justify-center text-[var(--color-warning)]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-text-primary)]">4-Day Trial Sprint Execution</h4>
                        <p className="text-[11px] text-[var(--color-text-muted)]">Test actual work habits on a scoped micro-objective</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-[var(--color-warning)] bg-[var(--color-warning-subtle)] px-2.5 py-0.5 rounded border border-[var(--color-warning)]/20">
                      Sprint 1: Day 3 of 4
                    </span>
                  </div>

                  {/* Mini Kanban Columns */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Col 1 */}
                    <div className="p-2.5 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)] space-y-2">
                      <div className="text-[10px] font-mono uppercase font-bold text-[var(--color-text-muted)]">Backlog (0)</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] italic py-3 text-center">All picked up</div>
                    </div>

                    {/* Col 2 */}
                    <div className="p-2.5 bg-[var(--color-surface-subtle)] rounded-xl border border-[var(--color-border)] space-y-2">
                      <div className="text-[10px] font-mono uppercase font-bold text-[var(--color-brand-accent)] flex items-center justify-between">
                        <span>In Progress (1)</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)] animate-ping" />
                      </div>
                      <div className="p-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-2xs space-y-1">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">Connect Stripe Checkout</div>
                        <div className="text-[10px] text-[var(--color-text-muted)]">Assigned: Engineering Partner</div>
                      </div>
                    </div>

                    {/* Col 3 */}
                    <div className="p-2.5 bg-[var(--color-success-subtle)]/40 rounded-xl border border-[var(--color-success)]/30 space-y-2">
                      <div className="text-[10px] font-mono uppercase font-bold text-[var(--color-success)]">Shipped (3)</div>
                      <div className="p-2 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-2xs space-y-1">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                          <span>Core Auth & Landing</span>
                          <CheckCircle2 className="w-3 h-3 text-[var(--color-success)]" />
                        </div>
                        <div className="text-[10px] text-[var(--color-text-muted)]">PR #12 Merged</div>
                      </div>
                    </div>
                  </div>

                  {/* Commit Pill */}
                  <div className="p-2 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-lg flex items-center justify-between text-[11px] font-mono text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
                      <span>git commit -m "feat: complete MVP trial loop"</span>
                    </div>
                    <span className="text-[var(--color-success)] font-bold">+420 -18</span>
                  </div>
                </div>
              )}

              {/* STAGE 3: Verified Shipped & Build Passport */}
              {activeStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-success-subtle)] border border-[var(--color-success)]/20 flex items-center justify-center text-[var(--color-success)]">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[var(--color-text-primary)]">Build Passport Stamp</h4>
                        <p className="text-[11px] text-[var(--color-text-muted)]">Reputation earned through shipped software, not self-written bios</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[var(--color-success)] bg-[var(--color-success-subtle)] px-2.5 py-0.5 rounded border border-[var(--color-success)]/20">
                      Verified Mutual Review
                    </span>
                  </div>

                  {/* Passport Certificate Card */}
                  <div className="p-4 bg-gradient-to-br from-[var(--color-surface-subtle)] to-[var(--color-brand-accent-subtle)]/30 border border-[var(--color-border)] rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-extrabold text-[var(--color-text-primary)]">Trial Sprint Deliverable</div>
                        <div className="text-[11px] text-[var(--color-text-secondary)]">4-Day Trial Sprint Successfully Completed</div>
                      </div>
                      <span className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md text-xs font-mono font-bold text-[var(--color-text-primary)] flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                        VERIFIED
                      </span>
                    </div>

                    <div className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface)] p-2.5 rounded-lg border border-[var(--color-border)] flex items-center justify-between font-mono">
                      <span>Sprint Outcome: Scoped milestone shipped</span>
                      <span className="text-[var(--color-success)] font-semibold">Mutual Agreement ✓</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1 font-mono text-[var(--color-brand-accent)]">
                        <ExternalLink className="w-3 h-3 text-[var(--color-brand-accent)]" /> live-preview.shipwith.dev
                      </span>
                      <span className="text-[var(--color-success)] font-semibold">Decision: Co-Founder Partnership Confirmed ✅</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Bar */}
              <div className="pt-3.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-warning)]" />
                  <span>Real collaborative output replaces unverified resumes.</span>
                </div>
                
                <button
                  onClick={() => setCurrentView('onboarding')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-accent)] hover:underline cursor-pointer"
                >
                  <span>Try it yourself</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
