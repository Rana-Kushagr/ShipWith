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
    <section id="motion-showcase-section" className="relative pt-8 pb-20 overflow-hidden bg-[#09090b] text-white">
      
      {/* Background Ambience: Desk Corner Vignette in Bottom-Left */}
      <div 
        className="hidden md:block absolute bottom-0 left-0 w-[540px] lg:w-[660px] xl:w-[740px] h-[400px] lg:h-[480px] pointer-events-none select-none z-0 opacity-70 transition-all duration-500"
        style={{
          maskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, black 72%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 0% 100%, black 72%, transparent 100%)',
        }}
      >
        <img 
          src={heroDeskImg} 
          alt="Designer workspace desk corner" 
          className="w-full h-full object-cover object-bottom filter contrast-[1.08] brightness-[0.92]"
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-6 sm:px-10 z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4">
          
          {/* =========================================================
              LEFT COLUMN: Value Proposition & Artful Typography
              ========================================================= */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-sans font-medium text-zinc-200">Networking is only the beginning.</span>
            </div>

            {/* Master Heading with Artful Font Mixture (Outfit + Instrument Serif) */}
            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-extrabold tracking-tight text-white leading-[1.04] font-display">
              Find your{' '}
              <span className="font-serif italic font-normal text-zinc-100 text-[1.14em] tracking-normal inline-block pr-1">
                people.
              </span>
              <br />
              Build{' '}
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-black">
                what’s next.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-[18px] text-zinc-400 leading-relaxed font-normal max-w-md font-sans">
              Find founders and builders worth working with, build together, ship something real, and turn the work into reputation.
            </p>

            {/* Button Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => setCurrentView('onboarding')}
                className="bg-white text-black hover:bg-zinc-200 font-semibold text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Try ShipWith free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('plans-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#121215] hover:bg-zinc-800/80 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 font-medium text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer shadow-xs"
              >
                View plans
              </button>
            </div>

            {/* Microcopy */}
            <div className="text-xs text-zinc-400 pt-0.5">
              <span>No credit card required &nbsp;·&nbsp; Already have an account? </span>
              <button 
                onClick={() => setCurrentView('home')}
                className="text-white underline underline-offset-2 font-medium hover:text-zinc-200 cursor-pointer"
              >
                Log in
              </button>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN: Motion Graphic Video / Interactive Tour Card
              With Hover Floating Animation & Blurry White Light Glow
              ========================================================= */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            
            {/* The Main Container holding Browser Window + 3 Floating Cards (Group for Hover Effect) */}
            <div className="group/herocard relative w-full max-w-[760px]">
              
              {/* =======================================================
                  BLURRY GLOW OF VISIBLE WHITE LIGHT BEHIND HERO CARD
                  Appears and expands on hover with smooth atmospheric bloom
                  ======================================================= */}
              <div 
                className="absolute -inset-4 sm:-inset-8 -z-10 rounded-3xl opacity-35 group-hover/herocard:opacity-100 group-hover/herocard:scale-105 transition-all duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 72%)',
                  filter: 'blur(36px)',
                }}
              />

              {/* Outer Browser Mockup Window with Floating Hover Animation */}
              <div 
                className="relative rounded-2xl bg-[#121215] border border-zinc-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] group-hover/herocard:shadow-[0_30px_70px_-12px_rgba(255,255,255,0.08)] group-hover/herocard:-translate-y-2.5 group-hover/herocard:scale-[1.012] group-hover/herocard:border-zinc-700 overflow-hidden transition-all duration-500 ease-out"
                style={{
                  transform: 'perspective(1400px) rotateY(-2deg) rotateX(1deg)',
                  transformOrigin: 'center center',
                }}
              >
                
                {/* Window Top Bar: Mac Dots + Motion Video Controls */}
                <div className="h-10 px-4 bg-[#18181c] border-b border-zinc-800/80 flex items-center justify-between">
                  {/* Left: Mac Dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[11px] font-mono text-zinc-400 ml-2 hidden sm:inline">
                      ShipWith Interactive Tour
                    </span>
                  </div>

                  {/* Center: Current Step Status Pill with Live Progress Indicator */}
                  <div className="relative overflow-hidden px-2.5 py-0.5 rounded-full bg-[#0e0e11] border border-zinc-800 text-[10px] font-medium text-zinc-300 flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-semibold text-white">{FEATURE_STEPS[activeStep].name}</span>
                    <span className="text-zinc-500">• Step {activeStep + 1} of 5</span>
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
                      className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      title={isPlaying ? "Pause auto-tour" : "Play auto-tour"}
                      className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleNextStep}
                      title="Next Step"
                      className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Window Inner 3-Column Layout */}
                <div className="grid grid-cols-12 min-h-[440px] text-left">
                  
                  {/* Internal Sub-Col 1: Mini Sidebar */}
                  <div className="col-span-3 border-r border-zinc-800/80 p-3.5 flex flex-col justify-between bg-[#0e0e11]">
                    <div className="space-y-4">
                      {/* Inner Logo */}
                      <div className="flex items-center gap-1.5 px-1 pt-1">
                        <ShipWithLogoMark className="w-4 h-4 text-white" />
                        <span className="font-display font-bold text-xs text-white">ShipWith</span>
                      </div>

                      {/* Nav Links */}
                      <nav className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-white cursor-pointer transition-colors">
                          <Home className="w-3.5 h-3.5" />
                          <span>Home</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-all ${
                          activeStep === 0 || activeStep === 3
                            ? 'bg-zinc-800/80 text-white font-semibold shadow-2xs border border-zinc-700/80' 
                            : 'text-zinc-400 hover:text-white'
                        }`}>
                          <LayoutGrid className="w-3.5 h-3.5" />
                          <span>Startups</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-all ${
                          activeStep === 1
                            ? 'bg-zinc-800/80 text-white font-semibold shadow-2xs border border-zinc-700/80' 
                            : 'text-zinc-400 hover:text-white'
                        }`}>
                          <Users className="w-3.5 h-3.5" />
                          <span>People</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-white cursor-pointer transition-colors">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Messages</span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-all ${
                          activeStep === 2 || activeStep === 4
                            ? 'bg-zinc-800/80 text-white font-semibold shadow-2xs border border-zinc-700/80' 
                            : 'text-zinc-400 hover:text-white'
                        }`}>
                          <FolderKanban className="w-3.5 h-3.5" />
                          <span>Workspace</span>
                        </div>
                      </nav>
                    </div>

                    {/* Bottom User Pill */}
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-zinc-800/60 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                          alt="Riya Mehta" 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="text-[10px] leading-tight">
                          <div className="font-semibold text-zinc-200">Riya Mehta</div>
                          <div className="text-zinc-500 font-mono text-[9px]">Builder</div>
                        </div>
                      </div>
                      <MoreVertical className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>

                  {/* Internal Sub-Col 2: Dynamic Motion Graphic Center Stage */}
                  <div className="col-span-5 border-r border-zinc-800/80 p-3.5 space-y-3 bg-[#121215]">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">Startups</h3>
                      <button 
                        onClick={() => setCurrentView('startups')}
                        className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-3 text-[11px] border-b border-zinc-800 pb-1.5">
                      <span className="font-semibold text-white cursor-pointer">For you</span>
                      <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Trending</span>
                      <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Latest</span>
                    </div>

                    {/* STEP 0: Discover Stage (Highlighted Radar & Roles) */}
                    {activeStep === 0 && (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        {/* Simulated Search Typing */}
                        <div className="p-2 bg-[#18181c] border border-zinc-800 rounded-lg flex items-center gap-1.5 text-[10px]">
                          <Search className="w-3 h-3 text-zinc-400 shrink-0" />
                          <span className="font-mono text-zinc-200 font-medium">React 19 / Next.js / AI</span>
                          <span className="w-1.5 h-3 bg-emerald-500 animate-pulse ml-auto" />
                        </div>

                        {/* Startup Card 1 */}
                        <div className="border border-zinc-800 rounded-xl overflow-hidden shadow-2xs bg-[#151519]">
                          <div className="relative h-20 bg-zinc-900 overflow-hidden">
                            <img 
                              src={startupWorkspaceImg} 
                              alt="Campus AI Tutor Workspace" 
                              className="w-full h-full object-cover filter brightness-95"
                            />
                            <div className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 backdrop-blur-xs text-zinc-200 shadow-2xs">
                              <Bookmark className="w-2.5 h-2.5" />
                            </div>
                          </div>

                          <div className="p-2.5 space-y-1.5">
                            <div>
                              <div className="font-bold text-xs text-white">Campus AI Tutor</div>
                              <p className="text-[10px] text-zinc-400 line-clamp-2 leading-snug mt-0.5">
                                AI study companion looking for a frontend developer and growth collaborator.
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono">AI</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono">EdTech</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono">Early stage</span>
                            </div>

                            <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-1 border-t border-zinc-800">
                              <span className="text-emerald-400 font-semibold font-mono">👤 3 open roles</span>
                              <span className="font-mono">♡ 12 interested</span>
                            </div>

                            <button 
                              onClick={() => setCurrentView('startups')}
                              className="w-full py-1.5 bg-white text-black text-[10px] font-semibold rounded-lg flex items-center justify-center gap-1 hover:bg-zinc-200 transition-colors cursor-pointer"
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
                        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[10px] text-emerald-300 flex items-center justify-between font-mono">
                          <span className="font-semibold">⚡ High Synergy Match Found</span>
                          <span className="font-bold text-emerald-400">98% Match</span>
                        </div>

                        {/* Match Focus Card */}
                        <div className="p-3 border-2 border-emerald-500/70 rounded-xl space-y-2 bg-[#16171d] shadow-lg">
                          <div className="flex items-center gap-2">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                              alt="Arjun Verma" 
                              className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                            />
                            <div>
                              <div className="font-bold text-xs text-white">Arjun Verma</div>
                              <div className="text-[10px] text-zinc-300 font-sans">Full-stack React & Next.js</div>
                              <div className="text-[9px] text-emerald-400 font-medium font-mono">● Available 10 hrs/week</div>
                            </div>
                          </div>

                          <div className="p-2 bg-[#0e0e11] rounded-md border border-zinc-800 text-[9px] text-zinc-300 space-y-1 font-sans">
                            <div>• Complementary skill: Frontend + UI Polish</div>
                            <div>• Timezone: Aligned GMT+5:30</div>
                          </div>

                          <div className="w-full py-1.5 bg-emerald-600 text-white text-[10px] font-semibold rounded-lg text-center shadow-xs flex items-center justify-center gap-1.5 font-sans">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Trial Invitation Dispatched</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Build Stage (4-Day Trial Sprint Kanban) */}
                    {activeStep === 2 && (
                      <div className="space-y-2.5 animate-in fade-in duration-300">
                        <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-800/80 text-[10px] text-amber-300 flex items-center justify-between font-mono">
                          <span className="font-semibold flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-400" /> 4-Day Trial Sprint
                          </span>
                          <span>Day 2 of 4</span>
                        </div>

                        {/* Kanban Snapshot */}
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2 bg-[#0e0e11] border border-zinc-800 rounded-lg space-y-1">
                            <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Shipped (3)</div>
                            <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800 text-[9px] text-zinc-300">
                              Repo & CI/CD setup
                            </div>
                            <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800 text-[9px] text-zinc-300">
                              Landing page v1
                            </div>
                          </div>

                          <div className="p-2 bg-[#0e0e11] border border-amber-500/50 rounded-lg space-y-1">
                            <div className="text-[9px] font-mono text-amber-400 font-bold uppercase flex items-center justify-between">
                              <span>In Progress</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            </div>
                            <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800 text-[9px] text-white font-medium">
                              Stripe Checkout MVP
                            </div>
                          </div>
                        </div>

                        {/* Git Commit line */}
                        <div className="p-1.5 bg-[#0e0e11] rounded border border-zinc-800 flex items-center gap-1.5 text-[9px] font-mono text-zinc-300">
                          <GitCommit className="w-3 h-3 text-emerald-400" />
                          <span className="truncate">git commit -m "feat: complete MVP sprint"</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Ship Stage (Live Project Card) */}
                    {activeStep === 3 && (
                      <div className="space-y-3 animate-in fade-in duration-300">
                        <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800 text-[10px] text-blue-300 flex items-center justify-between font-mono">
                          <span className="font-semibold">🚀 Live in Production</span>
                          <span className="text-blue-400">v1.0 Deployed</span>
                        </div>

                        {/* Startup Card 2: Live Project */}
                        <div className="p-3 border-2 border-blue-500/60 rounded-xl space-y-2.5 bg-[#14151b] shadow-xs">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                              SW
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs text-white truncate">Campus AI Tutor</span>
                                <span className="inline-flex items-center gap-1 text-[8px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                                  Live
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-300 line-clamp-2 mt-0.5">
                                An AI study companion for students. Learn smarter, together.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 border-t border-zinc-800 font-mono">
                            <div className="flex items-center gap-3">
                              <span>👥 12.4k users</span>
                              <span>💬 86 feedbacks</span>
                            </div>
                            <button 
                              onClick={() => setCurrentView('startups')}
                              className="text-white font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
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
                        <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-800 text-[10px] text-purple-300 flex items-center justify-between font-mono">
                          <span className="font-semibold flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-purple-400" /> Build Passport Minted
                          </span>
                          <span className="text-purple-400">100% Verified</span>
                        </div>

                        <div className="p-3 border border-zinc-800 rounded-xl space-y-2 bg-[#15151a] shadow-xs text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">Collaboration Review</span>
                            <span className="px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded font-mono font-bold text-[9px] border border-emerald-700/60">
                              APPROVED
                            </span>
                          </div>
                          <p className="text-zinc-300 text-[10px] italic">
                            "Arjun delivered clean React 19 components ahead of schedule during our 4-day trial sprint."
                          </p>
                          <div className="text-[9px] text-zinc-400 flex items-center justify-between pt-1 border-t border-zinc-800 font-mono">
                            <span>Reviewed by: Riya Mehta</span>
                            <span className="text-emerald-400 font-semibold">★ Would Build Again</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Internal Sub-Col 3: People Suggestions */}
                  <div className="col-span-4 p-3.5 space-y-3 bg-[#121215]">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">People</h3>
                      <button 
                        onClick={() => setCurrentView('people')}
                        className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* People List */}
                    <div className="space-y-3 pt-1">
                      
                      {/* Person 1: Arjun Verma */}
                      <div className={`flex items-start justify-between gap-2 pb-2.5 border-b border-zinc-800 transition-all ${
                        activeStep === 1 ? 'ring-2 ring-emerald-500/60 rounded-lg p-1.5 bg-emerald-950/30' : ''
                      }`}>
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                            alt="Arjun Verma" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-white truncate">Arjun Verma</div>
                            <div className="text-zinc-400 truncate">Full-stack developer</div>
                            <div className="text-zinc-500 text-[9px] font-mono">React · Next.js</div>
                            <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-medium pt-0.5 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Available 10 hrs/week</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all shrink-0 cursor-pointer ${
                            activeStep === 1
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white text-black hover:bg-zinc-200'
                          }`}
                        >
                          {activeStep === 1 ? 'Invited' : 'Invite'}
                        </button>
                      </div>

                      {/* Person 2: Simran Kaur */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-zinc-800">
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" 
                            alt="Simran Kaur" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-white truncate">Simran Kaur</div>
                            <div className="text-zinc-400 truncate">Product designer</div>
                            <div className="text-zinc-500 text-[9px] font-mono">Figma · Product</div>
                            <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-medium pt-0.5 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Open to collaborate</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-[#18181c] border border-zinc-700 text-zinc-200 text-[10px] font-medium rounded-md hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer shadow-2xs"
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
                            <div className="font-bold text-white truncate">Aditya Rao</div>
                            <div className="text-zinc-400 truncate">Growth marketer</div>
                            <div className="text-zinc-500 text-[9px] font-mono">Content · Growth</div>
                            <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-medium pt-0.5 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Open to collaborate</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-[#18181c] border border-zinc-700 text-zinc-200 text-[10px] font-medium rounded-md hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer shadow-2xs"
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
                <div className={`p-3 rounded-xl border shadow-xl space-y-1 text-left transition-all duration-300 ${
                  activeStep === 1 
                    ? 'bg-[#18191f] border-emerald-500 ring-2 ring-emerald-500/40 scale-105 shadow-[0_0_25px_rgba(16,185,129,0.2)]' 
                    : 'bg-[#14151a]/95 backdrop-blur-md border-zinc-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold text-white">Invite sent</span>
                    </div>
                    <X className="w-3 h-3 text-zinc-500 hover:text-white cursor-pointer" />
                  </div>
                  <p className="text-[10px] text-zinc-300 leading-tight pl-5.5 font-sans">
                    Arjun has been invited to Campus AI Tutor
                  </p>
                </div>

                {/* Floating Card 2: Build Together Tasks (Highlights in Build Step) */}
                <div className={`p-3.5 rounded-xl border shadow-xl space-y-2 text-left transition-all duration-300 ${
                  activeStep === 2
                    ? 'bg-[#18191f] border-emerald-500 ring-2 ring-emerald-500/40 scale-105 shadow-[0_0_25px_rgba(16,185,129,0.2)]' 
                    : 'bg-[#14151a]/95 backdrop-blur-md border-zinc-800'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Build together</span>
                    <span className="text-[9px] text-zinc-400 font-mono">4/4 tasks</span>
                  </div>

                  <div className="space-y-1.5 text-[10px] text-zinc-300 font-sans">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-500 text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-zinc-100">Set up repo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-500 text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-zinc-100">Design landing page</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-500 text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-zinc-100">Build MVP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded border border-zinc-700 bg-zinc-900 shrink-0" />
                      <span className="text-zinc-400">Launch and get users</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 3: Reputation Proof (Highlights in Reputation Step) */}
                <div className={`p-3.5 rounded-xl border shadow-xl space-y-2 text-left transition-all duration-300 ${
                  activeStep === 4
                    ? 'bg-[#18191f] border-purple-500 ring-2 ring-purple-500/40 scale-105 shadow-[0_0_25px_rgba(168,85,247,0.2)]' 
                    : 'bg-[#14151a]/95 backdrop-blur-md border-zinc-800'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Reputation</span>
                    <Info className="w-3 h-3 text-zinc-500" />
                  </div>
                  <div className="text-[9px] text-zinc-400 -mt-1 font-mono">Proof from shipped work</div>

                  <div className="space-y-2 pt-1 text-[10px] font-sans">
                    <div className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-bold text-white font-mono">3</span>
                      <span className="text-zinc-400 text-[9px]">shipped projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-bold text-white font-mono">2</span>
                      <span className="text-zinc-400 text-[9px]">verified collaborations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-bold text-white font-mono">Top 10%</span>
                      <span className="text-zinc-400 text-[9px]">builder rank</span>
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
                <div className="absolute top-1/2 left-6 right-6 h-[2px] -translate-y-1/2 bg-zinc-800 -z-0" />
                
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
                          ? 'w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30 shadow-md'
                          : isPast
                          ? 'w-3 h-3 rounded-full bg-emerald-600 hover:scale-110'
                          : 'w-2.5 h-2.5 rounded-full bg-zinc-700 hover:scale-125'
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
                          ? 'text-white font-bold font-sans'
                          : 'text-zinc-500 hover:text-zinc-300 font-sans'
                      }`}
                    >
                      <span>{step.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live Feature Instruction Bar */}
              <div className="mt-3.5 px-4 py-2 rounded-lg bg-[#121215] border border-zinc-800 text-xs text-zinc-300 text-center max-w-md shadow-xs">
                <span className="font-semibold text-white">{FEATURE_STEPS[activeStep].tagline}: </span>
                <span className="text-zinc-400">{FEATURE_STEPS[activeStep].instruction}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
