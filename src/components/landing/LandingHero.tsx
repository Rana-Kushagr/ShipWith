import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShipWithLogoMark } from './LandingNavbar';
import heroDeskImg from '../../assets/hero-desk.jpg';
import startupWorkspaceImg from '../../assets/startup-workspace.jpg';
import { 
  ArrowRight, 
  Home, 
  LayoutGrid, 
  Users, 
  MessageSquare, 
  FolderKanban, 
  Bookmark, 
  Check, 
  X, 
  Info, 
  Box, 
  BarChart3, 
  MoreVertical,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Search,
  Zap,
  Award,
  GitCommit,
  ExternalLink
} from 'lucide-react';

interface FeatureStep {
  id: number;
  name: string;
  tagline: string;
  instruction: string;
}

const FEATURE_STEPS: FeatureStep[] = [
  {
    id: 0,
    name: 'Discover',
    tagline: 'Discovery Radar & Startup Matching',
    instruction: 'Search founders, startups, and open collaborator roles filtered by verified skills and availability.',
  },
  {
    id: 1,
    name: 'Connect',
    tagline: 'Compatibility & Direct Invitation',
    instruction: 'Review compatibility (skills, weekly hours, working style) and send scoped trial build invitations.',
  },
  {
    id: 2,
    name: 'Build',
    tagline: '4-Day Scoped Trial Sprint',
    instruction: 'Work together inside a scoped 4-day sprint to test real collaboration before committing equity.',
  },
  {
    id: 3,
    name: 'Ship',
    tagline: 'Live Release & Milestone Delivery',
    instruction: 'Deploy working code to production, merge pull requests, and deliver real software to users.',
  },
  {
    id: 4,
    name: 'Reputation',
    tagline: 'Verified Build Passport Minting',
    instruction: 'Turn mutual delivery into permanent, unforgeable reputation and verified peer reviews on your passport.',
  },
];

export const LandingHero: React.FC = () => {
  const { setCurrentView } = useApp();

  // Active step in the motion graphic video / walkthrough (0 to 4)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Auto-play timer for the motion graphic demonstration
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 60; // 60ms tick
    const stepDuration = 5200; // 5.2 seconds per chapter
    const stepIncrement = (intervalTime / stepDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % FEATURE_STEPS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStep]);

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    setProgress(0);
  };

  const handlePrevStep = () => {
    setActiveStep((curr) => (curr - 1 + FEATURE_STEPS.length) % FEATURE_STEPS.length);
    setProgress(0);
  };

  const handleNextStep = () => {
    setActiveStep((curr) => (curr + 1) % FEATURE_STEPS.length);
    setProgress(0);
  };

  return (
    <section id="motion-showcase-section" className="relative pt-6 pb-20 overflow-hidden bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors duration-200">
      
      {/* Background Ambience: Desk Corner Vignette in Bottom-Left (Enlarged and clearly visible) */}
      <div 
        className="hidden md:block absolute bottom-0 left-0 w-[540px] lg:w-[640px] xl:w-[720px] h-[390px] lg:h-[470px] pointer-events-none select-none z-0 opacity-95 dark:opacity-70 transition-all duration-300"
        style={{
          maskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, black 72%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, black 72%, transparent 100%)',
        }}
      >
        <img 
          src={heroDeskImg} 
          alt="Designer workspace desk corner" 
          className="w-full h-full object-cover object-bottom filter contrast-[1.03]"
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4">
          
          {/* =========================================================
              LEFT COLUMN: Value Proposition & CTAs
              ========================================================= */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text-primary)] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Networking is only the beginning.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.06] font-display">
              Find your people.
              <br />
              Build what’s next.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-[17px] text-[var(--color-text-secondary)] leading-relaxed font-normal max-w-md">
              Find founders and builders worth working with, build together, ship something real, and turn the work into reputation.
            </p>

            {/* Button Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => setCurrentView('onboarding')}
                className="bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] hover:bg-[var(--color-brand-primary-hover)] font-medium text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Try ShipWith free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('plans-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border)] font-medium text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer shadow-xs"
              >
                View plans
              </button>
            </div>

            {/* Microcopy */}
            <div className="text-xs text-[var(--color-text-muted)] pt-0.5">
              <span>No credit card required &nbsp;·&nbsp; Already have an account? </span>
              <button 
                onClick={() => setCurrentView('home')}
                className="text-[var(--color-text-primary)] underline underline-offset-2 font-medium hover:opacity-80 cursor-pointer"
              >
                Log in
              </button>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN: Motion Graphic Video / Interactive Tour Card
              ========================================================= */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            
            {/* The Main Container holding Browser Window + 3 Floating Cards */}
            <div className="relative w-full max-w-[760px]">
              
              {/* Outer Browser Mockup Window */}
              <div 
                className="relative rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300"
                style={{
                  transform: 'perspective(1400px) rotateY(-2.5deg) rotateX(1deg)',
                  transformOrigin: 'center center',
                }}
              >
                
                {/* Window Top Bar: Mac Dots + Motion Video Controls */}
                <div className="h-10 px-4 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] flex items-center justify-between">
                  {/* Left: Mac Dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)] ml-2 hidden sm:inline">
                      ShipWith Interactive Tour
                    </span>
                  </div>

                  {/* Center: Current Step Status Pill with Live Progress Indicator */}
                  <div className="relative overflow-hidden px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-medium text-[var(--color-text-secondary)] flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-semibold text-[var(--color-text-primary)]">{FEATURE_STEPS[activeStep].name}</span>
                    <span className="text-[var(--color-text-muted)]">• Step {activeStep + 1} of 5</span>
                    {isPlaying && (
                      <div 
                        className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>

                  {/* Right: Play / Pause & Step Navigation Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevStep}
                      title="Previous Step"
                      className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      title={isPlaying ? "Pause auto-tour" : "Play auto-tour"}
                      className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleNextStep}
                      title="Next Step"
                      className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Window Inner 3-Column Layout */}
                <div className="grid grid-cols-12 min-h-[440px] text-left">
                  
                  {/* Internal Sub-Col 1: Mini Sidebar */}
                  <div className="col-span-3 border-r border-[var(--color-border)] p-3.5 flex flex-col justify-between bg-[var(--color-surface-subtle)]">
                    <div className="space-y-4">
                      {/* Inner Logo */}
                      <div className="flex items-center gap-1.5 px-1 pt-1">
                        <ShipWithLogoMark className="w-4 h-4 text-[var(--color-text-primary)]" />
                        <span className="font-display font-bold text-xs text-[var(--color-text-primary)]">ShipWith</span>
                      </div>

                      {/* Nav Links */}
                      <nav className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer">
                          <Home className="w-3.5 h-3.5" />
                          <span>Home</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-all ${
                          activeStep === 0 || activeStep === 3
                            ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-2xs border border-[var(--color-border)]' 
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`}>
                          <LayoutGrid className="w-3.5 h-3.5" />
                          <span>Startups</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-all ${
                          activeStep === 1
                            ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-2xs border border-[var(--color-border)]' 
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`}>
                          <Users className="w-3.5 h-3.5" />
                          <span>People</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Messages</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-all ${
                          activeStep === 2 || activeStep === 4
                            ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold shadow-2xs border border-[var(--color-border)]' 
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        }`}>
                          <FolderKanban className="w-3.5 h-3.5" />
                          <span>Workspace</span>
                        </div>
                      </nav>
                    </div>

                    {/* Bottom User Pill */}
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[var(--color-surface)] cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                          alt="Riya Mehta" 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="text-[10px] leading-tight">
                          <div className="font-semibold text-[var(--color-text-primary)]">Riya Mehta</div>
                          <div className="text-[var(--color-text-muted)]">Builder</div>
                        </div>
                      </div>
                      <MoreVertical className="w-3 h-3 text-[var(--color-text-muted)]" />
                    </div>
                  </div>

                  {/* Internal Sub-Col 2: Dynamic Motion Graphic Center Stage */}
                  <div className="col-span-5 border-r border-[var(--color-border)] p-3.5 space-y-3 bg-[var(--color-surface)]">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-[var(--color-text-primary)]">Startups</h3>
                      <button 
                        onClick={() => setCurrentView('startups')}
                        className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-3 text-[11px] border-b border-[var(--color-border)] pb-1.5">
                      <span className="font-semibold text-[var(--color-text-primary)] cursor-pointer">For you</span>
                      <span className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer">Trending</span>
                      <span className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer">Latest</span>
                    </div>

                    {/* STEP 0: Discover Stage (Highlighted Radar & Roles) */}
                    {activeStep === 0 && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        {/* Simulated Search Typing */}
                        <div className="p-2 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-lg flex items-center gap-1.5 text-[10px]">
                          <Search className="w-3 h-3 text-[var(--color-text-muted)] shrink-0" />
                          <span className="font-mono text-[var(--color-text-primary)] font-medium">React 19 / Next.js / AI</span>
                          <span className="w-1.5 h-3 bg-emerald-500 animate-pulse ml-auto" />
                        </div>

                        {/* Startup Card 1 */}
                        <div className="border border-[var(--color-border)] rounded-xl overflow-hidden shadow-2xs">
                          <div className="relative h-20 bg-[var(--color-surface-subtle)] overflow-hidden">
                            <img 
                              src={startupWorkspaceImg} 
                              alt="Campus AI Tutor Workspace" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1.5 right-1.5 p-1 rounded-md bg-[var(--color-surface)]/90 text-[var(--color-text-primary)] shadow-2xs">
                              <Bookmark className="w-2.5 h-2.5" />
                            </div>
                          </div>

                          <div className="p-2.5 space-y-1.5">
                            <div>
                              <div className="font-bold text-xs text-[var(--color-text-primary)]">Campus AI Tutor</div>
                              <p className="text-[10px] text-[var(--color-text-secondary)] line-clamp-2 leading-snug mt-0.5">
                                AI study companion looking for a frontend developer and growth collaborator.
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">AI</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">EdTech</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Early stage</span>
                            </div>

                            <div className="flex items-center justify-between text-[9px] text-[var(--color-text-muted)] pt-1 border-t border-[var(--color-border)]">
                              <span className="text-emerald-600 font-semibold">👤 3 open roles</span>
                              <span>♡ 12 interested</span>
                            </div>

                            <button 
                              onClick={() => setCurrentView('startups')}
                              className="w-full py-1.5 bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] text-[10px] font-medium rounded-lg flex items-center justify-center gap-1 hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              <span>View build</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 1: Connect Stage (Active Teammate Pairing) */}
                    {activeStep === 1 && (
                      <div className="space-y-2.5 animate-in fade-in duration-300">
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[10px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                          <span className="font-semibold">⚡ High Synergy Match Found</span>
                          <span className="font-mono font-bold">98% Match</span>
                        </div>

                        {/* Match Focus Card */}
                        <div className="p-3 border-2 border-emerald-500/60 rounded-xl space-y-2 bg-[var(--color-surface-subtle)] shadow-xs">
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                              alt="Arjun Verma" 
                              className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                            />
                            <div>
                              <div className="font-bold text-xs text-[var(--color-text-primary)]">Arjun Verma</div>
                              <div className="text-[10px] text-[var(--color-text-secondary)]">Full-stack React & Next.js</div>
                              <div className="text-[9px] text-emerald-600 font-medium">● Available 10 hrs/week</div>
                            </div>
                          </div>

                          <div className="p-2 bg-[var(--color-surface)] rounded-md border border-[var(--color-border)] text-[9px] text-[var(--color-text-secondary)] space-y-1">
                            <div>• Complementary skill: Frontend + UI Polish</div>
                            <div>• Timezone: Aligned GMT+5:30</div>
                          </div>

                          <div className="w-full py-1.5 bg-emerald-600 text-white text-[10px] font-semibold rounded-lg text-center shadow-xs flex items-center justify-center gap-1.5">
                            <Check className="w-3 h-3" />
                            <span>Trial Invitation Dispatched</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Build Stage (4-Day Trial Sprint Kanban) */}
                    {activeStep === 2 && (
                      <div className="space-y-2.5 animate-in fade-in duration-300">
                        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[10px] text-amber-800 dark:text-amber-300 flex items-center justify-between">
                          <span className="font-semibold flex items-center gap-1">
                            <Zap className="w-3 h-3" /> 4-Day Trial Sprint
                          </span>
                          <span className="font-mono">Day 2 of 4</span>
                        </div>

                        {/* Kanban Snapshot */}
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-lg space-y-1">
                            <div className="text-[9px] font-mono text-emerald-600 font-bold uppercase">Shipped (3)</div>
                            <div className="p-1.5 bg-[var(--color-surface)] rounded border border-[var(--color-border)] text-[9px]">
                              Repo & CI/CD setup
                            </div>
                            <div className="p-1.5 bg-[var(--color-surface)] rounded border border-[var(--color-border)] text-[9px]">
                              Landing page v1
                            </div>
                          </div>

                          <div className="p-2 bg-[var(--color-surface-subtle)] border border-amber-300 dark:border-amber-700 rounded-lg space-y-1">
                            <div className="text-[9px] font-mono text-amber-600 font-bold uppercase flex items-center justify-between">
                              <span>In Progress</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            </div>
                            <div className="p-1.5 bg-[var(--color-surface)] rounded border border-[var(--color-border)] text-[9px] font-medium">
                              Stripe Checkout MVP
                            </div>
                          </div>
                        </div>

                        {/* Git Commit line */}
                        <div className="p-1.5 bg-[var(--color-surface-subtle)] rounded border border-[var(--color-border)] flex items-center gap-1.5 text-[9px] font-mono text-[var(--color-text-secondary)]">
                          <GitCommit className="w-3 h-3 text-emerald-600" />
                          <span className="truncate">git commit -m "feat: complete MVP sprint"</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Ship Stage (Live Project Card) */}
                    {activeStep === 3 && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[10px] text-blue-800 dark:text-blue-300 flex items-center justify-between">
                          <span className="font-semibold">🚀 Live in Production</span>
                          <span className="font-mono">v1.0 Deployed</span>
                        </div>

                        {/* Startup Card 2: Live Project */}
                        <div className="p-3 border-2 border-blue-500/60 rounded-xl space-y-2.5 bg-[var(--color-surface)] shadow-xs">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                              SW
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs text-[var(--color-text-primary)] truncate">Campus AI Tutor</span>
                                <span className="inline-flex items-center gap-1 text-[8px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                                  Live
                                </span>
                              </div>
                              <p className="text-[10px] text-[var(--color-text-secondary)] line-clamp-2 mt-0.5">
                                An AI study companion for students. Learn smarter, together.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-1.5 border-t border-[var(--color-border)]">
                            <div className="flex items-center gap-3">
                              <span>👥 12.4k users</span>
                              <span>💬 86 feedbacks</span>
                            </div>
                            <button 
                              onClick={() => setCurrentView('startups')}
                              className="text-[var(--color-text-primary)] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>View project</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Reputation Stage (Passport Stamp) */}
                    {activeStep === 4 && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[10px] text-purple-800 dark:text-purple-300 flex items-center justify-between">
                          <span className="font-semibold flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-purple-600" /> Build Passport Minted
                          </span>
                          <span className="font-mono">100% Verified</span>
                        </div>

                        <div className="p-3 border border-[var(--color-border)] rounded-xl space-y-2 bg-[var(--color-surface-subtle)] shadow-xs text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[var(--color-text-primary)]">Collaboration Review</span>
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded font-mono font-bold text-[9px]">
                              APPROVED
                            </span>
                          </div>
                          <p className="text-[var(--color-text-secondary)] text-[10px] italic">
                            "Arjun delivered clean React 19 components ahead of schedule during our 4-day trial sprint."
                          </p>
                          <div className="text-[9px] text-[var(--color-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
                            <span>Reviewed by: Riya Mehta</span>
                            <span className="text-emerald-600 font-semibold">★ Would Build Again</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Internal Sub-Col 3: People Suggestions */}
                  <div className="col-span-4 p-3.5 space-y-3 bg-[var(--color-surface)]">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-[var(--color-text-primary)]">People</h3>
                      <button 
                        onClick={() => setCurrentView('people')}
                        className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* People List */}
                    <div className="space-y-3 pt-1">
                      
                      {/* Person 1: Arjun Verma */}
                      <div className={`flex items-start justify-between gap-2 pb-2.5 border-b border-[var(--color-border)] transition-all ${
                        activeStep === 1 ? 'ring-2 ring-emerald-500/50 rounded-lg p-1.5 bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                      }`}>
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                            alt="Arjun Verma" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-[var(--color-text-primary)] truncate">Arjun Verma</div>
                            <div className="text-[var(--color-text-secondary)] truncate">Full-stack developer</div>
                            <div className="text-[var(--color-text-muted)] text-[9px]">React · Next.js</div>
                            <div className="flex items-center gap-1 text-[9px] text-[var(--color-text-secondary)] font-medium pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Available 10 hrs/week</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all shrink-0 cursor-pointer ${
                            activeStep === 1
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] hover:opacity-90'
                          }`}
                        >
                          {activeStep === 1 ? 'Invited' : 'Invite'}
                        </button>
                      </div>

                      {/* Person 2: Simran Kaur */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[var(--color-border)]">
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" 
                            alt="Simran Kaur" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-[var(--color-text-primary)] truncate">Simran Kaur</div>
                            <div className="text-[var(--color-text-secondary)] truncate">Product designer</div>
                            <div className="text-[var(--color-text-muted)] text-[9px]">Figma · Product</div>
                            <div className="flex items-center gap-1 text-[9px] text-[var(--color-text-secondary)] font-medium pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Open to collaborate</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-[10px] font-medium rounded-md hover:bg-[var(--color-surface-subtle)] transition-colors shrink-0 cursor-pointer shadow-2xs"
                        >
                          Invite
                        </button>
                      </div>

                      {/* Person 3: Aditya Rao */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" 
                            alt="Aditya Rao" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-[var(--color-text-primary)] truncate">Aditya Rao</div>
                            <div className="text-[var(--color-text-secondary)] truncate">Growth marketer</div>
                            <div className="text-[var(--color-text-muted)] text-[9px]">Content · Growth</div>
                            <div className="flex items-center gap-1 text-[9px] text-[var(--color-text-secondary)] font-medium pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Open to collaborate</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-[10px] font-medium rounded-md hover:bg-[var(--color-surface-subtle)] transition-colors shrink-0 cursor-pointer shadow-2xs"
                        >
                          Invite
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

              {/* =======================================================
                  3 FLOATING SATELLITE CARDS (FAR RIGHT OVERLAY)
                  Dynamically highlight in sync with the motion tour
                  ======================================================= */}
              <div className="hidden xl:flex flex-col gap-3.5 absolute -right-24 top-2 z-20 w-52 pointer-events-auto">
                
                {/* Floating Card 1: Invite Sent (Highlights in Connect Step) */}
                <div className={`p-3 rounded-xl border shadow-[0_12px_30px_-6px_rgba(0,0,0,0.10)] space-y-1 text-left transition-all duration-300 ${
                  activeStep === 1 
                    ? 'bg-[var(--color-surface)] border-emerald-500 ring-2 ring-emerald-500/30 scale-105' 
                    : 'bg-[var(--color-surface)]/95 backdrop-blur-md border-[var(--color-border)]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-text-primary)]">Invite sent</span>
                    </div>
                    <X className="w-3 h-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer" />
                  </div>
                  <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight pl-5.5">
                    Arjun has been invited to Campus AI Tutor
                  </p>
                </div>

                {/* Floating Card 2: Build Together Tasks (Highlights in Build Step) */}
                <div className={`p-3.5 rounded-xl border shadow-[0_12px_30px_-6px_rgba(0,0,0,0.10)] space-y-2 text-left transition-all duration-300 ${
                  activeStep === 2
                    ? 'bg-[var(--color-surface)] border-emerald-500 ring-2 ring-emerald-500/30 scale-105' 
                    : 'bg-[var(--color-surface)]/95 backdrop-blur-md border-[var(--color-border)]'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-text-primary)]">Build together</span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-mono">4/4 tasks</span>
                  </div>

                  <div className="space-y-1.5 text-[10px] text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-[var(--color-text-primary)]">Set up repo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-[var(--color-text-primary)]">Design landing page</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-[var(--color-text-primary)]">Build MVP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] shrink-0" />
                      <span className="text-[var(--color-text-muted)]">Launch and get users</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 3: Reputation Proof (Highlights in Reputation Step) */}
                <div className={`p-3.5 rounded-xl border shadow-[0_12px_30px_-6px_rgba(0,0,0,0.10)] space-y-2 text-left transition-all duration-300 ${
                  activeStep === 4
                    ? 'bg-[var(--color-surface)] border-purple-500 ring-2 ring-purple-500/30 scale-105' 
                    : 'bg-[var(--color-surface)]/95 backdrop-blur-md border-[var(--color-border)]'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-text-primary)]">Reputation</span>
                    <Info className="w-3 h-3 text-[var(--color-text-muted)]" />
                  </div>
                  <div className="text-[9px] text-[var(--color-text-muted)] -mt-1">Proof from shipped work</div>

                  <div className="space-y-2 pt-1 text-[10px]">
                    <div className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                      <span className="font-bold text-[var(--color-text-primary)]">3</span>
                      <span className="text-[var(--color-text-muted)] text-[9px]">shipped projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                      <span className="font-bold text-[var(--color-text-primary)]">2</span>
                      <span className="text-[var(--color-text-muted)] text-[9px]">verified collaborations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />
                      <span className="font-bold text-[var(--color-text-primary)]">Top 10%</span>
                      <span className="text-[var(--color-text-muted)] text-[9px]">builder rank</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* =========================================================
                PIPELINE STEPPER UNDERNEATH THE WINDOW
                These 5 steps explain the core features step-by-step!
                ========================================================= */}
            <div className="w-full max-w-lg mx-auto mt-7 flex flex-col items-center">
              
              {/* Stepper Track with Nodes */}
              <div className="relative w-full flex items-center justify-between px-2">
                {/* Connecting track line */}
                <div className="absolute top-1/2 left-6 right-6 h-[2px] -translate-y-1/2 bg-[var(--color-border)] -z-0" />
                
                {FEATURE_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = activeStep > idx;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelectStep(idx)}
                      title={`Step ${idx + 1}: ${step.name}`}
                      className="relative z-10 flex flex-col items-center group cursor-pointer"
                    >
                      {/* Node circle */}
                      <div className={`transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-500/25 shadow-xs'
                          : isPast
                          ? 'w-3 h-3 rounded-full bg-emerald-600/80 hover:scale-110'
                          : 'w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)] hover:scale-125'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Milestone Labels (Clickable!) */}
              <div className="w-full flex items-center justify-between text-xs pt-2.5 font-medium px-0.5">
                {FEATURE_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelectStep(idx)}
                      className={`transition-colors cursor-pointer text-center ${
                        isActive
                          ? 'text-[var(--color-text-primary)] font-bold'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      <span>{step.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live Feature Instruction Bar */}
              <div className="mt-3 px-3 py-1.5 rounded-lg bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] text-center max-w-md">
                <span className="font-semibold text-[var(--color-text-primary)]">{FEATURE_STEPS[activeStep].tagline}: </span>
                <span>{FEATURE_STEPS[activeStep].instruction}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
