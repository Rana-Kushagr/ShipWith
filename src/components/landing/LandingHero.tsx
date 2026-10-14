import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShipWithLogoMark } from './LandingNavbar';
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
  MoreVertical 
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section className="relative pt-6 pb-20 overflow-hidden bg-[#fbfbfa] text-neutral-900">
      
      {/* Aesthetic Desk Corner Vignette in Bottom-Left */}
      <div 
        className="hidden lg:block absolute bottom-0 left-0 w-[460px] h-[340px] pointer-events-none select-none z-0 opacity-85"
        style={{
          maskImage: 'radial-gradient(ellipse 95% 95% at 0% 100%, black 55%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 95% at 0% 100%, black 55%, transparent 100%)',
        }}
      >
        <img 
          src="/hero-desk.jpg" 
          alt="Designer workspace desk corner" 
          className="w-full h-full object-cover object-bottom"
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-xs font-medium text-neutral-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#4a7c59]" />
              <span>Networking is only the beginning.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-bold tracking-tight text-neutral-900 leading-[1.06] font-display">
              Find your people.
              <br />
              Build what’s next.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-[17px] text-neutral-600 leading-relaxed font-normal max-w-md">
              Find founders and builders worth working with, build together, ship something real, and turn the work into reputation.
            </p>

            {/* Button Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => setCurrentView('onboarding')}
                className="bg-black text-white hover:bg-neutral-800 font-medium text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Try ShipWith free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('plans-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 font-medium text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer shadow-xs"
              >
                View plans
              </button>
            </div>

            {/* Microcopy */}
            <div className="text-xs text-neutral-500 pt-0.5">
              <span>No credit card required &nbsp;·&nbsp; Already have an account? </span>
              <button 
                onClick={() => setCurrentView('home')}
                className="text-neutral-900 underline underline-offset-2 font-medium hover:text-black cursor-pointer"
              >
                Log in
              </button>
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN: Showcase Window & Floating Satellite Cards
              ========================================================= */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            
            {/* The Main Container that holds the Browser Window + Floating Cards */}
            <div className="relative w-full max-w-[760px]">
              
              {/* Outer Browser Mockup Window */}
              <div 
                className="relative rounded-2xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.10)] overflow-hidden transition-all duration-300"
                style={{
                  transform: 'perspective(1400px) rotateY(-2.5deg) rotateX(1deg)',
                  transformOrigin: 'center center',
                }}
              >
                
                {/* Window Top Bar with Mac Dots */}
                <div className="h-9 px-4 bg-white border-b border-neutral-100 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>

                {/* Window Inner 3-Column Layout */}
                <div className="grid grid-cols-12 min-h-[440px] text-left">
                  
                  {/* Internal Sub-Col 1: Mini Sidebar */}
                  <div className="col-span-3 border-r border-neutral-100 p-3.5 flex flex-col justify-between bg-neutral-50/40">
                    <div className="space-y-4">
                      {/* Inner Logo */}
                      <div className="flex items-center gap-1.5 px-1 pt-1">
                        <ShipWithLogoMark className="w-4 h-4 text-black" />
                        <span className="font-display font-bold text-xs text-neutral-900">ShipWith</span>
                      </div>

                      {/* Nav Links */}
                      <nav className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-neutral-600 hover:text-neutral-900 cursor-pointer">
                          <Home className="w-3.5 h-3.5" />
                          <span>Home</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white text-neutral-900 font-semibold shadow-2xs border border-neutral-200/60 cursor-pointer">
                          <LayoutGrid className="w-3.5 h-3.5" />
                          <span>Startups</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-neutral-600 hover:text-neutral-900 cursor-pointer">
                          <Users className="w-3.5 h-3.5" />
                          <span>People</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-neutral-600 hover:text-neutral-900 cursor-pointer">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Messages</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-neutral-600 hover:text-neutral-900 cursor-pointer">
                          <FolderKanban className="w-3.5 h-3.5" />
                          <span>Workspace</span>
                        </div>
                      </nav>
                    </div>

                    {/* Bottom User Pill */}
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-neutral-100/70 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                          alt="Riya Mehta" 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="text-[10px] leading-tight">
                          <div className="font-semibold text-neutral-900">Riya Mehta</div>
                          <div className="text-neutral-500">Builder</div>
                        </div>
                      </div>
                      <MoreVertical className="w-3 h-3 text-neutral-400" />
                    </div>
                  </div>

                  {/* Internal Sub-Col 2: Startups Feed */}
                  <div className="col-span-5 border-r border-neutral-100 p-3.5 space-y-3 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-neutral-900">Startups</h3>
                      <button 
                        onClick={() => setCurrentView('startups')}
                        className="text-[10px] text-neutral-500 hover:text-neutral-900 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-3 text-[11px] border-b border-neutral-100 pb-1.5">
                      <span className="font-semibold text-neutral-900 cursor-pointer">For you</span>
                      <span className="text-neutral-400 hover:text-neutral-600 cursor-pointer">Trending</span>
                      <span className="text-neutral-400 hover:text-neutral-600 cursor-pointer">Latest</span>
                    </div>

                    {/* Startup Card 1: Workspace Build */}
                    <div className="border border-neutral-200/80 rounded-xl overflow-hidden shadow-2xs hover:border-neutral-300 transition-all">
                      <div className="relative h-20 bg-neutral-100 overflow-hidden">
                        <img 
                          src="/startup-workspace.jpg" 
                          alt="Campus AI Tutor Workspace" 
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/80 backdrop-blur-xs text-neutral-700 hover:bg-white shadow-2xs cursor-pointer">
                          <Bookmark className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="p-2.5 space-y-2">
                        <div>
                          <div className="font-bold text-xs text-neutral-900">Campus AI Tutor</div>
                          <p className="text-[10px] text-neutral-500 line-clamp-2 leading-snug mt-0.5">
                            AI study companion looking for a frontend developer and growth collaborator.
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">AI</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">EdTech</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-medium">Early stage</span>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-1 border-t border-neutral-100">
                          <span>👤 3 open roles</span>
                          <span>♡ 12 interested</span>
                        </div>

                        {/* Button */}
                        <button 
                          onClick={() => setCurrentView('startups')}
                          className="w-full py-1.5 bg-black text-white text-[10px] font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          <span>View build</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    {/* Startup Card 2: Live Project */}
                    <div className="p-2.5 border border-neutral-200/80 rounded-xl space-y-2 shadow-2xs">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          SW
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-neutral-900 truncate">Campus AI Tutor</span>
                            <span className="inline-flex items-center gap-1 text-[8px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              Live
                            </span>
                          </div>
                          <p className="text-[9px] text-neutral-500 line-clamp-1 mt-0.5">
                            An AI study companion for students. Learn smarter, together.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-1 border-t border-neutral-100">
                        <div className="flex items-center gap-2">
                          <span>👥 12.4k users</span>
                          <span>💬 86 feedbacks</span>
                        </div>
                        <button 
                          onClick={() => setCurrentView('startups')}
                          className="text-neutral-900 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>View project</span>
                          <ArrowRight className="w-2 h-2" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Internal Sub-Col 3: People Suggestions */}
                  <div className="col-span-4 p-3.5 space-y-3 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-neutral-900">People</h3>
                      <button 
                        onClick={() => setCurrentView('people')}
                        className="text-[10px] text-neutral-500 hover:text-neutral-900 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View all</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* People List */}
                    <div className="space-y-3 pt-1">
                      
                      {/* Person 1: Arjun Verma */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-100">
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                            alt="Arjun Verma" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-neutral-900 truncate">Arjun Verma</div>
                            <div className="text-neutral-500 truncate">Full-stack developer</div>
                            <div className="text-neutral-400 text-[9px]">React · Next.js</div>
                            <div className="flex items-center gap-1 text-[9px] text-neutral-600 font-medium pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Available 10 hrs/week</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-black text-white text-[10px] font-medium rounded-md hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
                        >
                          Invite
                        </button>
                      </div>

                      {/* Person 2: Simran Kaur */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-100">
                        <div className="flex items-start gap-2 min-w-0">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" 
                            alt="Simran Kaur" 
                            className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 text-[10px]">
                            <div className="font-bold text-neutral-900 truncate">Simran Kaur</div>
                            <div className="text-neutral-500 truncate">Product designer</div>
                            <div className="text-neutral-400 text-[9px]">Figma · Product</div>
                            <div className="flex items-center gap-1 text-[9px] text-neutral-600 font-medium pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Open to collaborate</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-white border border-neutral-200 text-neutral-800 text-[10px] font-medium rounded-md hover:bg-neutral-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
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
                            <div className="font-bold text-neutral-900 truncate">Aditya Rao</div>
                            <div className="text-neutral-500 truncate">Growth marketer</div>
                            <div className="text-neutral-400 text-[9px]">Content · Growth</div>
                            <div className="flex items-center gap-1 text-[9px] text-neutral-600 font-medium pt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Open to collaborate</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCurrentView('people')}
                          className="px-2.5 py-1 bg-white border border-neutral-200 text-neutral-800 text-[10px] font-medium rounded-md hover:bg-neutral-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
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
                  ======================================================= */}
              <div className="hidden xl:flex flex-col gap-3.5 absolute -right-24 top-2 z-20 w-52 pointer-events-auto">
                
                {/* Floating Card 1: Invite Sent */}
                <div className="p-3 bg-white/98 backdrop-blur-md rounded-xl border border-neutral-200/90 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold text-neutral-900">Invite sent</span>
                    </div>
                    <X className="w-3 h-3 text-neutral-400 hover:text-neutral-600 cursor-pointer" />
                  </div>
                  <p className="text-[10px] text-neutral-500 leading-tight pl-5.5">
                    Arjun has been invited to Campus AI Tutor
                  </p>
                </div>

                {/* Floating Card 2: Build Together Tasks */}
                <div className="p-3.5 bg-white/98 backdrop-blur-md rounded-xl border border-neutral-200/90 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">Build together</span>
                    <span className="text-[9px] text-neutral-400 font-mono">4/4 tasks</span>
                  </div>

                  <div className="space-y-1.5 text-[10px] text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-neutral-800">Set up repo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-neutral-800">Design landing page</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-neutral-800">Build MVP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded border border-neutral-300 bg-white shrink-0" />
                      <span className="text-neutral-500">Launch and get users</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 3: Reputation Proof */}
                <div className="p-3.5 bg-white/98 backdrop-blur-md rounded-xl border border-neutral-200/90 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.08)] space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">Reputation</span>
                    <Info className="w-3 h-3 text-neutral-400" />
                  </div>
                  <div className="text-[9px] text-neutral-400 -mt-1">Proof from shipped work</div>

                  <div className="space-y-2 pt-1 text-[10px]">
                    <div className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="font-bold text-neutral-900">3</span>
                      <span className="text-neutral-500 text-[9px]">shipped projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="font-bold text-neutral-900">2</span>
                      <span className="text-neutral-500 text-[9px]">verified collaborations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="font-bold text-neutral-900">Top 10%</span>
                      <span className="text-neutral-500 text-[9px]">builder rank</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* =========================================================
                PIPELINE STEPPER UNDERNEATH THE WINDOW
                Discover ── Connect ── Build ── Ship ── Reputation
                ========================================================= */}
            <div className="w-full max-w-md mx-auto mt-8 flex flex-col items-center">
              <div className="relative w-full flex items-center justify-between">
                {/* Connecting track line */}
                <div className="absolute top-1/2 left-3 right-3 h-[1px] -translate-y-1/2 bg-neutral-200 -z-0" />
                
                {/* 5 Milestone Nodes */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#4a7c59] ring-4 ring-[#4a7c59]/20" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-300" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-300" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-300" />
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-neutral-300" />
                </div>
              </div>

              {/* Milestone Labels */}
              <div className="w-full flex items-center justify-between text-[11px] text-neutral-500 pt-2 font-medium">
                <span className="text-neutral-900 font-semibold">Discover</span>
                <span>Connect</span>
                <span>Build</span>
                <span>Ship</span>
                <span>Reputation</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
