import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Copy, 
  MessageSquare, 
  Zap, 
  Award, 
  ExternalLink, 
  Globe, 
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
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
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedBuilderId) return null;

  const builder = seedBuilders.find(b => b.id === selectedBuilderId);
  if (!builder) return null;

  const handleCopyHandle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://shipwith.app/${builder.handle.replace('@', '')}`);
      setCopiedLink(true);
      addToast(`Builder link shipwith.app/${builder.handle} copied!`, 'info');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleInviteToTrial = () => {
    openChatWithBuilder(
      builder.handle,
      `Hey ${builder.name}! I'd love to invite you to collaborate on a 5-day trial sprint. Are you open to discussing the scope?`,
      `Trial Sprint Invitation: @${builder.handle.replace('@', '')}`
    );
  };

  const handleSendMessage = () => {
    openChatWithBuilder(
      builder.handle,
      `Hi ${builder.name}! Checked out your Build Passport on ShipWith. Let's connect!`,
      `Direct Message: @${builder.handle.replace('@', '')}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-3xl w-full max-h-[92vh] overflow-y-auto p-0 relative scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#1A5052] via-[#0D9488] to-[#102223] rounded-t-2xl relative p-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-white/90 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#34D399]" />
              Verified ShipWith Builder Passport
            </span>
          </div>

          <button
            onClick={() => setSelectedBuilderId(null)}
            className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
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
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#00AA45] text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Proof of Work">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                    {builder.name}
                  </h2>
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono font-medium text-[var(--text-muted)]">{builder.handle}</span>
                  {/* Shareable Handle Pill */}
                  <button
                    onClick={handleCopyHandle}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[#1A5052] bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] px-2 py-0.5 rounded-md border border-[var(--border-crisp)] transition-colors"
                    title="Copy shareable link"
                  >
                    <span>shipwith.app/{builder.handle.replace('@', '')}</span>
                    {copiedLink ? <Check className="w-3 h-3 text-[#00AA45]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Availability & Actions */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleSendMessage}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-crisp)] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>
              <button
                onClick={handleInviteToTrial}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A5052] hover:bg-[#12393B] text-white text-xs font-mono font-bold shadow-xs transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Invite to Trial</span>
              </button>
            </div>
          </div>

          {/* Role & Bio */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-[#1A5052] font-['Plus_Jakarta_Sans']">
              {builder.role}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {builder.bio}
            </p>
          </div>

          {/* Quick Meta Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] mt-3 pt-3 border-t border-[var(--border-crisp)]">
            <span className="flex items-center gap-1 text-[#00AA45] font-semibold bg-[#E8F8EE] px-2 py-0.5 rounded border border-[#C6F0D6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AA45] animate-pulse" />
              {builder.availability}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {builder.weeklyHours}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {builder.location} ({builder.timezone})
            </span>
          </div>

          {/* Execution Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
            <div className="bg-[var(--bg-subtle)] p-2.5 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Products Shipped</span>
              <span className="text-base font-bold font-mono text-[var(--text-primary)] block mt-0.5">{builder.stats.ships} Ships</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-2.5 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Trial Sprints</span>
              <span className="text-base font-bold font-mono text-[#0D9488] block mt-0.5">{builder.stats.trialsCompleted} Sprints</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-2.5 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Repeat Teammates</span>
              <span className="text-base font-bold font-mono text-[#1A5052] block mt-0.5">{builder.stats.repeatTeammates} Builders</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-2.5 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Would Build Again</span>
              <span className="text-base font-bold font-mono text-[#00AA45] block mt-0.5">{builder.stats.wouldBuildAgainRate} ✔</span>
            </div>
          </div>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="px-6 sm:px-8 border-b border-[var(--border-crisp)] bg-[var(--bg-canvas)] sticky top-0 z-10 flex gap-4 overflow-x-auto scrollbar-none text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'ships', label: `Ships (${builder.shipHistory.length})` },
            { id: 'activity', label: 'Activity' },
            { id: 'passport', label: 'Build Passport ✔' },
            { id: 'links', label: 'Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 font-semibold border-b-2 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'border-[#1A5052] text-[#1A5052]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
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
              <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider block mb-2.5">
                  Verified Skills & Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {builder.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs font-mono bg-[var(--bg-subtle)] text-[var(--text-primary)] px-2.5 py-1 rounded-md border border-[var(--border-crisp)] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
                <span className="text-xs font-mono font-bold text-[#1A5052] uppercase tracking-wider block mb-2.5">
                  Looking to Collaborate With
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {builder.lookingFor.map((item, idx) => (
                    <span key={idx} className="text-xs font-mono bg-[var(--bg-selected)] text-[#0D9488] px-2.5 py-1 rounded-md border border-[#BCE5DC] font-medium">
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
                  <div key={idx} className="bg-white rounded-xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                          {ship.title}
                        </h4>
                        <span className="text-[10px] font-mono text-[#00AA45] bg-[#E8F8EE] px-2 py-0.5 rounded-full border border-[#C6F0D6]">
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
                        className="text-xs font-mono text-[#1A5052] bg-[var(--simplify-teal-soft)] hover:bg-[#D5EFEA] border border-[#BCE5DC] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
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
                  <div className="w-3 h-3 rounded-full bg-[#00AA45] border-2 border-white absolute -left-[23px] top-1 shadow-xs" />
                  <div className="bg-white p-3.5 rounded-xl border border-[var(--border-crisp)] text-xs">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">2 days ago</span>
                    <p className="font-semibold text-[var(--text-primary)] mt-0.5">
                      Completed 5-Day Trial Sprint for PulseAI Workflow Engine
                    </p>
                    <p className="text-[var(--text-secondary)] mt-1 font-mono text-[11px]">
                      Agreed to continue building long-term as Full-Stack Architect.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#1A5052] border-2 border-white absolute -left-[23px] top-1 shadow-xs" />
                  <div className="bg-white p-3.5 rounded-xl border border-[var(--border-crisp)] text-xs">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">1 week ago</span>
                    <p className="font-semibold text-[var(--text-primary)] mt-0.5">
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
              <div className="p-4 bg-[var(--bg-selected)] rounded-xl border border-[#BCE5DC] text-xs">
                <div className="flex items-center gap-2 text-[#1A5052] font-bold text-sm mb-1">
                  <Award className="w-4 h-4 text-[#00AA45]" />
                  Un-Buyable Builder Reputation Ledger
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed font-mono">
                  Reputation on ShipWith is mathematically computed from completed 3–7 day trial builds and verified peer reviews. It cannot be bought or faked.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-crisp)]">
                  <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                    Teammate Satisfaction & Retention
                  </span>
                  <span className="font-mono text-xs font-bold text-[#00AA45]">
                    {builder.stats.wouldBuildAgainRate}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-[var(--bg-subtle)] rounded-lg text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Maya Lin (Lead UI/UX)</span>
                      <span className="text-[10px] font-mono text-[#00AA45] font-bold">Verified Teammate ✔</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mt-1 text-[11px]">
                      "Hands down one of the cleanest frontend engineers I've worked with. Shipped the entire design system tokens in 3 days."
                    </p>
                  </div>

                  <div className="p-3 bg-[var(--bg-subtle)] rounded-lg text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Arjun Verma (Systems Architect)</span>
                      <span className="text-[10px] font-mono text-[#00AA45] font-bold">Verified Teammate ✔</span>
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
                  className="p-3.5 bg-white rounded-xl border border-[var(--border-crisp)] hover:border-[#1A5052] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span className="font-medium text-[var(--text-primary)]">GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>

                <a
                  href={`https://x.com/${builder.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white rounded-xl border border-[var(--border-crisp)] hover:border-[#1A5052] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="font-medium text-[var(--text-primary)]">X / Twitter</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </a>

                <a
                  href="https://shipwith.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white rounded-xl border border-[var(--border-crisp)] hover:border-[#1A5052] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#00AA45]" />
                    <span className="font-medium text-[var(--text-primary)]">Custom Portfolio</span>
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
