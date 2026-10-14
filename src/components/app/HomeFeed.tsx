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
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeFeed: React.FC = () => {
  const { 
    seedStartups, 
    seedBuilders, 
    shipPadItems, 
    workspaces, 
    activeWorkspaceId,
    setActiveWorkspaceId,
    setCurrentView,
    setSelectedStartupId,
    setSelectedBuilderId,
    startTrialSprintWithStartup,
    voteShipPadItem,
    onboardingState
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP PERSONALIZATION PERSONA BAR */}
      <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00AA45] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#1A5052] uppercase tracking-wider">
                PERSONALIZED RADAR
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded">
                Based on: {onboardingState.step1Goal || 'Join a startup'} · {onboardingState.step7Hours || '10–20 hrs/wk'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] mt-1">
              Welcome back to ShipWith
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
                    ? 'bg-[#1A5052] text-white border-[#12393B] font-bold shadow-2xs'
                    : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
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
        <div className="bg-gradient-to-r from-[#1A5052] to-[#102223] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#34D399] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                ACTIVE TRIAL SPRINT • {activeWorkspace.trialDaysLeft ?? 5} DAYS REMAINING
              </span>
              <span className="text-xs font-mono text-white/80">
                Milestones: {activeWorkspace.tasks.filter(t => t.status === 'done').length}/{activeWorkspace.tasks.length} Done
              </span>
            </div>
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              {activeWorkspace.title}
            </h2>
            <p className="text-xs text-zinc-300 font-mono">
              Sprint Objective: {activeWorkspace.objective}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => {
                setActiveWorkspaceId(activeWorkspace.id);
                setCurrentView('workspace');
              }}
              className="bg-[#00AA45] hover:bg-[#008A37] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Open Build Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. HIGH-MATCH STARTUPS FOR YOU (With SVG Rings) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] flex items-center gap-2">
              High-Match Startups for You
              <Zap className="w-4 h-4 text-[#0D9488]" />
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Ranked by stack synergy, weekly hours, and stage compatibility.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('startups')}
            className="text-xs font-mono text-[#1A5052] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View all 8 startups</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStartups.slice(0, 4).map((startup) => (
            <div
              key={startup.id}
              className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 hover:border-[var(--border-hover)] shadow-[var(--shadow-card)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Circular SVG Match Ring */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div 
                      style={{ backgroundColor: startup.logoBg }}
                      className="w-10 h-10 rounded-xl text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs"
                    >
                      {startup.logoText}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                          {startup.name}
                        </h3>
                        <span className="text-[10px] font-mono font-semibold bg-[var(--bg-selected)] text-[#0D9488] px-2 py-0.5 rounded-full border border-[#BCE5DC]">
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
                          strokeDashoffset={2 * Math.PI * 19 * (1 - startup.matchScore / 100)}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-mono font-bold text-[#1A5052]">
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
                    <span key={idx} className="text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
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
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] px-2.5 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => startTrialSprintWithStartup(startup.id)}
                    className="bg-[#1A5052] hover:bg-[#12393B] text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#34D399]" />
                    <span>Start Trial</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BUILDERS TO MEET & RECENT SHIPPAD LAUNCHES (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (7 cols): Builders to Meet */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] flex items-center gap-2">
              Verified Builders to Meet
              <Users className="w-4 h-4 text-[#00AA45]" />
            </h2>
            <button
              onClick={() => setCurrentView('people')}
              className="text-xs font-mono text-[#1A5052] hover:underline font-semibold"
            >
              Browse all →
            </button>
          </div>

          <div className="space-y-3">
            {seedBuilders.slice(0, 3).map((builder) => (
              <div
                key={builder.id}
                onClick={() => setSelectedBuilderId(builder.id)}
                className="bg-white rounded-xl border border-[var(--border-crisp)] p-4 hover:border-[#1A5052] shadow-[var(--shadow-card)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <img src={builder.avatar} alt={builder.name} className="w-11 h-11 rounded-xl object-cover border border-[var(--border-crisp)]" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                        {builder.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA45]" />
                      <span className="text-xs font-mono text-[var(--text-muted)]">{builder.handle}</span>
                    </div>
                    <span className="text-xs font-medium text-[#1A5052] block mt-0.5">
                      {builder.role}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-[var(--text-muted)]">
                      <span>{builder.weeklyHours}</span>
                      <span>•</span>
                      <span>{builder.stats.ships} Ships</span>
                      <span>•</span>
                      <span className="text-[#00AA45] font-semibold">{builder.stats.wouldBuildAgainRate} Would Build Again ✔</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBuilderId(builder.id);
                  }}
                  className="bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-[var(--border-crisp)] self-start sm:self-auto shrink-0 transition-colors"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 cols): Week 42 ShipPad Launches */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] flex items-center gap-2">
              Week 42 ShipPad
              <Trophy className="w-4 h-4 text-amber-500" />
            </h2>
            <button
              onClick={() => setCurrentView('feed')}
              className="text-xs font-mono text-[#1A5052] hover:underline font-semibold"
            >
              Full Leaderboard →
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
            {shipPadItems.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-crisp)] space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-bold flex items-center justify-center border border-amber-300">
                      #{item.rank}
                    </span>
                    <h3 className="font-bold text-xs font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] bg-white px-1.5 py-0.5 rounded border border-[var(--border-crisp)]">
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
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                        item.userVoted?.tried
                          ? 'bg-[#00AA45] text-white border-[#008A37]'
                          : 'bg-white text-[var(--text-primary)] border-[var(--border-crisp)] hover:border-[#00AA45]'
                      }`}
                    >
                      <ChevronUp className="w-3 h-3" />
                      <span>{item.triedCount}</span>
                    </button>

                    <button
                      onClick={() => voteShipPadItem(item.id, 'wouldPay')}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                        item.userVoted?.wouldPay
                          ? 'bg-[#1A5052] text-white border-[#12393B]'
                          : 'bg-white text-[var(--text-primary)] border-[var(--border-crisp)] hover:border-[#1A5052]'
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
        </div>
      </div>
    </div>
  );
};
