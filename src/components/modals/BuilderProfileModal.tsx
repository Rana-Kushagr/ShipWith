import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  Zap, 
  Award, 
  Copy, 
  Globe 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_BUILDERS } from '../../data/seedData';
import { ProofHeatmap } from '../ProofHeatmap';

export const BuilderProfileModal: React.FC = () => {
  const { 
    selectedBuilderId, 
    setSelectedBuilderId, 
    seedBuilders, 
    openChatWithBuilder, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'ships' | 'activity' | 'passport' | 'links'>('overview');

  if (!selectedBuilderId) return null;

  const builder = [...seedBuilders, ...SEED_BUILDERS].find(b => b.id === selectedBuilderId);
  if (!builder) return null;

  const handleCopyHandle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://rana-kushagr.github.io/ShipWith/?user=${builder.handle.replace('@', '')}`);
      addToast(`Copied ${builder.handle}'s profile link!`, 'success');
    }
  };

  const handleMessageBuilder = () => {
    setSelectedBuilderId(null);
    openChatWithBuilder(
      builder.handle,
      `Hi ${builder.name}! Checked out your Build Passport on ShipWith. Let's connect!`,
      `Direct Message: @${builder.handle.replace('@', '')}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-3xl w-full max-h-[92vh] overflow-y-auto p-0 relative scrollbar-thin text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#141418] via-[#0C0C0E] to-[#141418] border-b border-[var(--border-crisp)] rounded-t-2xl relative p-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[var(--border-crisp)] flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#00D659]" />
              Verified ShipWith Builder Passport
            </span>
          </div>

          <button
            onClick={() => setSelectedBuilderId(null)}
            className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="px-6 sm:px-8 pb-5 pt-0 relative border-b border-[var(--border-crisp)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            {/* Avatar & Basic Info */}
            <div className="flex items-end gap-4">
              <div className="relative">
                <img 
                  src={builder.avatar} 
                  alt={builder.name} 
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-[#0C0C0E] shadow-md bg-[#141418]"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#00D659] text-white p-1 rounded-full border-2 border-[#0C0C0E] shadow-xs" title="Verified Proof of Work">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                    {builder.name}
                  </h2>
                  <CheckCircle2 className="w-4 h-4 text-[#00D659]" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono font-medium text-[var(--text-muted)]">{builder.handle}</span>
                  <button
                    onClick={handleCopyHandle}
                    className="text-[10px] font-mono text-[var(--text-muted)] hover:text-white flex items-center gap-1 bg-[#141418] px-2 py-0.5 rounded border border-[var(--border-crisp)] transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Message Action Button */}
            <button
              onClick={handleMessageBuilder}
              className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md self-start sm:self-end cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Connect & Collaborate</span>
            </button>
          </div>

          <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed max-w-2xl">
            {builder.bio}
          </p>

          {/* Quick Telemetry Pills */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-secondary)] mt-3">
            <span className="flex items-center gap-1 bg-[#141418] px-2.5 py-1 rounded-md border border-[var(--border-crisp)]">
              <span className="w-2 h-2 rounded-full bg-[#00D659]" /> {builder.availability}
            </span>
            <span className="flex items-center gap-1 bg-[#141418] px-2.5 py-1 rounded-md border border-[var(--border-crisp)]">
              <Clock className="w-3.5 h-3.5 text-white" /> {builder.weeklyHours}
            </span>
            <span className="flex items-center gap-1 bg-[#141418] px-2.5 py-1 rounded-md border border-[var(--border-crisp)]">
              <MapPin className="w-3.5 h-3.5 text-white" /> {builder.location} ({builder.timezone})
            </span>
          </div>

          {/* Proven Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[var(--border-crisp)]">
            <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)] text-center">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Live Ships</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">{builder.stats.ships} Products</span>
            </div>
            <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)] text-center">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">5-Day Trials</span>
              <span className="text-lg font-bold font-mono text-[#00D659] mt-0.5 block">{builder.stats.trialsCompleted} Done</span>
            </div>
            <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)] text-center">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Sprint Vouch</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">{builder.stats.wouldBuildAgainRate}</span>
            </div>
            <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)] text-center">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Repeat Team</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">{builder.stats.repeatTeammates} builders</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6 px-6 sm:px-8 border-b border-[var(--border-crisp)] text-xs font-mono overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Heatmap' },
            { id: 'ships', label: `Ships (${builder.shipHistory.length})` },
            { id: 'activity', label: 'Activity Log' },
            { id: 'passport', label: 'Build Passport' },
            { id: 'links', label: 'External Links' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 border-b-2 font-medium transition-colors shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-[var(--text-muted)] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body Contents */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 52-Week Proof Heatmap Component */}
              <ProofHeatmap 
                days={builder.heatmapDays} 
                totalShips={builder.stats.ships}
                builderName={builder.name} 
              />

              {/* Skills & Stack */}
              <div className="bg-[#141418] rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-2.5">
                  Verified Skills & Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {builder.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs font-mono bg-[#0C0C0E] text-white px-2.5 py-1 rounded-md border border-[var(--border-crisp)] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              <div className="bg-[#141418] rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-2.5">
                  Looking to Collaborate With
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {builder.lookingFor.map((item, idx) => (
                    <span key={idx} className="text-xs font-mono bg-[#0C0C0E] text-white px-2.5 py-1 rounded-md border border-[var(--border-crisp)] font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SHIPS */}
          {activeTab === 'ships' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Products & Codebases Contributed to by {builder.name}
              </span>

              <div className="space-y-3">
                {builder.shipHistory.map((ship, idx) => (
                  <div key={idx} className="bg-[#141418] rounded-xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-white">
                          {ship.title}
                        </h4>
                        <span className="text-[10px] font-mono text-[#00D659] bg-[#0C0C0E] px-2 py-0.5 rounded-full border border-[var(--border-crisp)]">
                          {ship.year}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[var(--text-secondary)] mt-0.5 block">
                        Exact Role: <strong>{ship.role}</strong>
                      </span>
                    </div>

                    {ship.link && (
                      <a
                        href={ship.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-white bg-[#0C0C0E] hover:bg-white hover:text-[#050506] border border-[var(--border-crisp)] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Recent Shipping & Trial Sprint Milestones
              </span>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-crisp)]">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#00D659] border-2 border-[#0C0C0E] absolute -left-[23px] top-1 shadow-xs" />
                  <div className="bg-[#141418] p-3.5 rounded-xl border border-[var(--border-crisp)] text-xs">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">2 days ago</span>
                    <p className="font-semibold text-white mt-0.5">
                      Completed 5-Day Trial Sprint for PulseAI Workflow Engine
                    </p>
                    <p className="text-[var(--text-secondary)] mt-1 font-mono text-[11px]">
                      Agreed to continue building long-term as Full-Stack Architect.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-[#0C0C0E] absolute -left-[23px] top-1 shadow-xs" />
                  <div className="bg-[#141418] p-3.5 rounded-xl border border-[var(--border-crisp)] text-xs">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">1 week ago</span>
                    <p className="font-semibold text-white mt-0.5">
                      Shipped DevRadar CLI v2.1 to Weekly ShipPad
                    </p>
                    <p className="text-[var(--text-secondary)] mt-1 font-mono text-[11px]">
                      Ranked #2 Ship of Week 41 with 64 ▲ Tried It votes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BUILD PASSPORT */}
          {activeTab === 'passport' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#141418] rounded-xl border border-[var(--border-crisp)] text-xs">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                  <Award className="w-4 h-4 text-[#00D659]" />
                  Un-Buyable Builder Reputation Ledger
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed font-mono">
                  Reputation on ShipWith is mathematically computed from completed 3–7 day trial builds and verified peer reviews. It cannot be bought or faked.
                </p>
              </div>

              <div className="bg-[#141418] rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-crisp)]">
                  <span className="font-mono text-xs font-bold text-white">
                    Teammate Satisfaction & Retention
                  </span>
                  <span className="font-mono text-xs font-bold text-[#00D659]">
                    {builder.stats.wouldBuildAgainRate}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-[#0C0C0E] rounded-lg text-xs border border-[var(--border-crisp)]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Maya Lin (Lead UI/UX)</span>
                      <span className="text-[10px] font-mono text-[#00D659] font-bold">Verified Teammate ✔</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mt-1 text-[11px]">
                      "Hands down one of the cleanest frontend engineers I've worked with. Shipped the entire design system tokens in 3 days."
                    </p>
                  </div>

                  <div className="p-3 bg-[#0C0C0E] rounded-lg text-xs border border-[var(--border-crisp)]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Arjun Verma (Systems Architect)</span>
                      <span className="text-[10px] font-mono text-[#00D659] font-bold">Verified Teammate ✔</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mt-1 text-[11px]">
                      "Great async communicator and strong understanding of edge cache boundaries."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LINKS */}
          {activeTab === 'links' && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                Verified External Profiles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href={`https://github.com/${builder.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#141418] rounded-xl border border-[var(--border-crisp)] hover:border-white/40 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="font-medium text-white">GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>

                <a
                  href={`https://x.com/${builder.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#141418] rounded-xl border border-[var(--border-crisp)] hover:border-white/40 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="font-medium text-white">X / Twitter</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>

                <a
                  href="https://shipwith.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#141418] rounded-xl border border-[var(--border-crisp)] hover:border-white/40 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#00D659]" />
                    <span className="font-medium text-white">Custom Portfolio</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
