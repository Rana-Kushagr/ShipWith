import React, { useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Trophy, 
  Users, 
  ChevronRight, 
  ChevronUp, 
  CreditCard, 
  Eye,
  PlusCircle,
  Rocket
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeFeed: React.FC = () => {
  const { 
    seedStartups, 
    builders, 
    shipPadItems, 
    workspaces, 
    activeWorkspaceId,
    setCurrentView,
    setSelectedStartupId,
    setSelectedBuilderId,
    startTrialSprintWithStartup,
    voteShipPadItem,
    onboardingState,
    setIsPostBuildOpen
  } = useApp();

  const [personaFilter, setPersonaFilter] = useState<'all' | 'founder' | 'designer' | 'developer'>('all');

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  // Filter startups based on persona
  const filteredStartups = seedStartups.filter(s => {
    if (personaFilter === 'founder') return s.rolesNeeded.some(r => r.role.toLowerCase().includes('engineer') || r.role.toLowerCase().includes('developer'));
    if (personaFilter === 'designer') return s.rolesNeeded.some(r => r.role.toLowerCase().includes('design') || r.role.toLowerCase().includes('ui'));
    if (personaFilter === 'developer') return s.rolesNeeded.some(r => r.role.toLowerCase().includes('architect') || r.role.toLowerCase().includes('full-stack'));
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--text-primary)]">
      {/* 1. TOP PERSONALIZATION PERSONA BAR */}
      <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D659] animate-pulse" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                PERSONALIZED RADAR
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[#141418] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                Based on: {onboardingState.step1Goal || 'Join a startup'} · {onboardingState.step7Hours || '10–20 hrs/wk'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white mt-1">
              Welcome to ShipWith Workspace
            </h1>
          </div>

          {/* Quick Persona Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[var(--text-muted)] hidden lg:inline">Filter Mode:</span>
            {[
              { id: 'all', label: 'All Telemetry' },
              { id: 'founder', label: 'Founders Seeking Devs' },
              { id: 'designer', label: 'Design Collaborations' },
              { id: 'developer', label: 'Tech Co-founder' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPersonaFilter(p.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all border cursor-pointer ${
                  personaFilter === p.id
                    ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                    : 'bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. ACTIVE TRIAL SPRINT STATUS BANNER */}
      {activeWorkspace && activeWorkspace.isTrial && (
        <div className="bg-gradient-to-r from-[#141418] to-[#0C0C0E] border border-white/20 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#2DD4BF] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2DD4BF]" />
                ACTIVE TRIAL SPRINT • {activeWorkspace.trialDaysLeft ?? 5} DAYS REMAINING
              </span>
              <span className="text-xs font-mono text-zinc-300">
                Milestones: {activeWorkspace.tasks.filter(t => t.status === 'done').length}/{activeWorkspace.tasks.length} Done
              </span>
            </div>
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              {activeWorkspace.title}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] max-w-xl font-mono">
              {activeWorkspace.objective}
            </p>
          </div>

          <button
            onClick={() => setCurrentView('workspace')}
            className="bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Open Sprint Room</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. HIGH-MATCH STARTUPS FOR YOU (With SVG Rings) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white flex items-center gap-2">
              High-Match Startups for You
              <Zap className="w-4 h-4 text-[#2DD4BF]" />
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Ranked by stack synergy, weekly hours, and stage compatibility.
            </p>
          </div>

          {seedStartups.length > 0 && (
            <button
              onClick={() => setCurrentView('startups')}
              className="text-xs font-mono text-white hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View all {seedStartups.length} startups</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {filteredStartups.length === 0 ? (
          <div className="glow-card-perimeter p-8 sm:p-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-white">
              No builds listed yet
            </h3>
            <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-1 leading-relaxed">
              Post the first build to kick off matching, or complete your onboarding profile to calibrate your discovery radar.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsPostBuildOpen(true)}
                className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Post a Build</span>
              </button>
              <button
                onClick={() => setCurrentView('profile')}
                className="bg-[#141418] hover:bg-[#1A1A22] text-white border border-[var(--border-crisp)] px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer"
              >
                Complete Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStartups.slice(0, 4).map((startup) => (
              <div
                key={startup.id}
                className="bg-[#0C0C0E] rounded-xl border border-[var(--border-crisp)] p-5 hover:border-white/30 shadow-[var(--shadow-card)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header with Circular SVG Match Ring */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div 
                        style={{ backgroundColor: startup.logoBg }}
                        className="w-10 h-10 rounded-xl text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs border border-white/10"
                      >
                        {startup.logoText}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-white">
                            {startup.name}
                          </h3>
                          <span className="text-[10px] font-mono font-semibold bg-[#141418] text-[#2DD4BF] px-2 py-0.5 rounded-full border border-[#2DD4BF]/30">
                            {startup.stage}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">
                          {startup.industry}
                        </span>
                      </div>
                    </div>

                    {/* SVG Gauge */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="19"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="3.5"
                            fill="transparent"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="19"
                            stroke="#2DD4BF"
                            strokeWidth="3.5"
                            strokeDasharray={2 * Math.PI * 19}
                            strokeDashoffset={2 * Math.PI * 19 * (1 - startup.matchScore / 100)}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-mono font-bold text-white">
                          {startup.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed font-medium">
                    {startup.tagline}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {startup.techStack.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-[#141418] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                        {tech}
                      </span>
                    ))}
                    {startup.techStack.length > 4 && (
                      <span className="text-[10px] font-mono text-[var(--text-muted)] self-center">
                        +{startup.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {startup.weeklyHours}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedStartupId(startup.id)}
                      className="text-[var(--text-secondary)] hover:text-white hover:bg-[#141418] px-2.5 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => startTrialSprintWithStartup(startup.id)}
                      className="bg-white hover:bg-zinc-200 text-[#050506] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#00D659]" />
                      <span>Start Trial</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. BUILDERS TO MEET & RECENT SHIPPAD LAUNCHES (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (7 cols): Builders to Meet */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white flex items-center gap-2">
              Verified Builders to Meet
              <Users className="w-4 h-4 text-[#00D659]" />
            </h2>
            <button
              onClick={() => setCurrentView('people')}
              className="text-xs font-mono text-white hover:underline font-semibold cursor-pointer"
            >
              Browse all →
            </button>
          </div>

          {builders.length === 0 ? (
            <div className="glow-card-perimeter-subtle p-6 text-center">
              <Users className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
              <h3 className="font-bold text-sm text-white">No builders registered yet</h3>
              <p className="text-xs font-mono text-[var(--text-secondary)] mt-1">
                Be among the first to complete your Build Passport and start receiving 5-day trial invitations.
              </p>
              <button
                onClick={() => setCurrentView('profile')}
                className="mt-4 bg-white text-[#050506] hover:bg-zinc-200 px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer"
              >
                Complete Profile
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {builders.slice(0, 3).map((builder) => (
                <div
                  key={builder.id}
                  onClick={() => setSelectedBuilderId(builder.id)}
                  className="bg-[#0C0C0E] rounded-xl border border-[var(--border-crisp)] p-4 hover:border-white/30 shadow-[var(--shadow-card)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <img src={builder.avatar} alt={builder.name} className="w-11 h-11 rounded-xl object-cover border border-[var(--border-crisp)]" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-white">
                          {builder.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" />
                        <span className="text-xs font-mono text-[var(--text-muted)]">{builder.handle || `@${builder.username}`}</span>
                      </div>
                      <span className="text-xs font-medium text-[var(--text-secondary)] block mt-0.5">
                        {builder.role}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-[var(--text-muted)]">
                        <span>{builder.weeklyHours}</span>
                        <span>•</span>
                        <span>{builder.stats.shipsCount} Ships</span>
                        <span>•</span>
                        <span className="text-[#00D659] font-semibold">{builder.stats.positiveFeedbackPercent}% Would Build Again ✔</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBuilderId(builder.id);
                    }}
                    className="bg-[#141418] hover:bg-[#1A1A22] text-white px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-[var(--border-crisp)] self-start sm:self-auto shrink-0 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right (5 cols): ShipPad Launches */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white flex items-center gap-2">
              ShipPad Launches
              <Trophy className="w-4 h-4 text-amber-400" />
            </h2>
            <button
              onClick={() => setCurrentView('feed')}
              className="text-xs font-mono text-white hover:underline font-semibold cursor-pointer"
            >
              Full Leaderboard →
            </button>
          </div>

          {shipPadItems.length === 0 ? (
            <div className="glow-card-perimeter-subtle p-6 text-center">
              <Trophy className="w-8 h-8 text-amber-400/60 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-white">No products shipped this week yet</h3>
              <p className="text-xs font-mono text-[var(--text-secondary)] mt-1">
                Ship a build from your Workspace to claim the #1 spot on this week's ShipPad leaderboard!
              </p>
              <button
                onClick={() => setIsPostBuildOpen(true)}
                className="mt-4 bg-white text-[#050506] hover:bg-zinc-200 px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer"
              >
                + Post a Build
              </button>
            </div>
          ) : (
            <div className="bg-[#0C0C0E] rounded-xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
              {shipPadItems.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-[#141418] border border-[var(--border-crisp)] space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-white text-[#050506] text-[10px] font-mono font-bold flex items-center justify-center">
                        #{item.rank}
                      </span>
                      <h3 className="font-bold text-xs font-['Plus_Jakarta_Sans'] text-white">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[#0C0C0E] px-1.5 py-0.5 rounded border border-[var(--border-crisp)]">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                    {item.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs font-mono">
                    <span className="text-[10px] text-[var(--text-muted)]">
                      Built by {item.contributors[0]?.name}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => voteShipPadItem(item.id, 'tried')}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                          item.userVoted?.tried
                            ? 'bg-[#00D659] text-[#050506] border-[#00D659]'
                            : 'bg-[#0C0C0E] text-white border-[var(--border-crisp)] hover:border-white'
                        }`}
                      >
                        <ChevronUp className="w-3 h-3" />
                        <span>{item.triedCount}</span>
                      </button>

                      <button
                        onClick={() => voteShipPadItem(item.id, 'wouldPay')}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                          item.userVoted?.wouldPay
                            ? 'bg-white text-[#050506] border-white'
                            : 'bg-[#0C0C0E] text-white border-[var(--border-crisp)] hover:border-white'
                        }`}
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>{item.wouldPayCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
