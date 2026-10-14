import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  Edit3, 
  Award, 
  ExternalLink, 
  Globe, 
  Sparkles, 
  X,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProofHeatmap } from '../ProofHeatmap';

export const ProfileView: React.FC = () => {
  const { currentUser, setCurrentUser, addToast, claimHandleText } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'ships' | 'activity' | 'passport' | 'links'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form states
  const [name, setName] = useState(currentUser.name || 'Kushagr Rana');
  const [role, setRole] = useState(currentUser.role || 'Full-Stack Engineer & Systems Builder');
  const [headline, setHeadline] = useState(currentUser.headline || 'Building autonomous agent workflows and peer-to-peer software.');
  const [bio, setBio] = useState(currentUser.bio || 'Obsessed with high-craft software, autonomous agent loops, and peer-to-peer collaboration. Shipped 4 production apps in 2025.');
  const [weeklyHours, setWeeklyHours] = useState(currentUser.weeklyHours || '15 hrs/wk');
  const [availability, setAvailability] = useState(currentUser.availability || 'Available for 5-Day Trial');

  const handleCopyLink = () => {
    const handleStr = currentUser.handle || claimHandleText || 'kushagr';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://shipwith.app/${handleStr.replace('@', '')}`);
      setCopiedLink(true);
      addToast(`Public link copied: shipwith.app/${handleStr.replace('@', '')}`, 'info');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      role,
      headline,
      bio,
      weeklyHours,
      availability
    }));
    addToast('Profile updated successfully!', 'success');
    setIsEditModalOpen(false);
  };

  const userShips = [
    {
      title: 'PulseAI Workflow Engine',
      role: 'Full-Stack Architect',
      year: '2026',
      tagline: 'Autonomous background workflow engine for modern dev teams',
      demoUrl: 'https://pulseai.dev',
      repoUrl: 'https://github.com/Rana-Kushagr/ShipWith',
      stack: ['React 19', 'Next.js 15', 'Python', 'FastAPI', 'PostgreSQL']
    },
    {
      title: 'ShipWith Network',
      role: 'Lead Frontend Engineer',
      year: '2025',
      tagline: 'The peer collaboration network for serious builders',
      demoUrl: 'https://shipwith.app',
      repoUrl: 'https://github.com/Rana-Kushagr/ShipWith',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      title: 'DevRadar CLI',
      role: 'Open Source Creator',
      year: '2025',
      tagline: 'Developer metrics and telemetry aggregator in your terminal',
      demoUrl: 'https://github.com/Rana-Kushagr/ShipWith',
      stack: ['Go', 'Cobra', 'SQLite']
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. PROFILE HEADER CARD WITH PEERLIST STYLING */}
      <div className="bg-white rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-card)] overflow-hidden">
        {/* Banner */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-[#1A5052] via-[#0D9488] to-[#102223] relative p-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-white/90 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#34D399]" />
              Official Verified Build Passport
            </span>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[var(--text-primary)] px-3 py-1.5 rounded-xl text-xs font-mono font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Identity & Execution Metrics */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative border-b border-[var(--border-crisp)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#00AA45] text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Proof of Work">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                    {currentUser.name}
                  </h1>
                  <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {currentUser.handle || `@${claimHandleText || 'kushagr'}`}
                  </span>
                  {/* Shareable Handle Pill */}
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[#1A5052] bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] px-2 py-0.5 rounded-md border border-[var(--border-crisp)] transition-colors cursor-pointer"
                    title="Copy shareable link"
                  >
                    <span>shipwith.app/{(currentUser.handle || claimHandleText || 'kushagr').replace('@', '')}</span>
                    {copiedLink ? <Check className="w-3 h-3 text-[#00AA45]" /> : <Copy className="w-3 h-3 text-[var(--text-muted)]" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Role & Bio */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-[#1A5052] font-['Plus_Jakarta_Sans']">
              {currentUser.role}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {currentUser.bio}
            </p>
          </div>

          {/* Quick Meta Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] mt-3.5 pt-3 border-t border-[var(--border-crisp)]">
            <span className="flex items-center gap-1 text-[#00AA45] font-semibold bg-[#E8F8EE] px-2.5 py-0.5 rounded-md border border-[#C6F0D6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AA45] animate-pulse" />
              {currentUser.availability || 'Available for 5-Day Trial'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentUser.weeklyHours || '15 hrs/wk'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {currentUser.location || 'New Delhi, India'} ({currentUser.timezone || 'GMT+5:30'})
            </span>
          </div>

          {/* Execution Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Products Shipped</span>
              <span className="text-base font-bold font-mono text-[var(--text-primary)] block mt-0.5">{userShips.length} Live Ships</span>
            </div>
            <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Trial Sprints</span>
              <span className="text-base font-bold font-mono text-[#0D9488] block mt-0.5">5 Completed</span>
            </div>
            <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Repeat Teammates</span>
              <span className="text-base font-bold font-mono text-[#1A5052] block mt-0.5">4 Builders</span>
            </div>
            <div className="bg-[var(--bg-canvas)] p-3 rounded-xl border border-[var(--border-crisp)]">
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Would Build Again</span>
              <span className="text-base font-bold font-mono text-[#00AA45] block mt-0.5">4/4 (100%) ✔</span>
            </div>
          </div>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="px-6 sm:px-8 bg-[var(--bg-canvas)] border-b border-[var(--border-crisp)] flex gap-4 overflow-x-auto scrollbar-none text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'ships', label: `Ships (${userShips.length})` },
            { id: 'activity', label: 'Activity' },
            { id: 'passport', label: 'Build Passport ✔' },
            { id: 'links', label: 'Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 font-semibold border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#1A5052] text-[#1A5052]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB BODY CONTENTS */}
      <div className="space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 52-Week Proof Heatmap */}
            <ProofHeatmap 
              totalShips={userShips.length} 
              builderName={currentUser.name} 
            />

            {/* Currently Building Card */}
            <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                <span className="text-xs font-mono font-bold text-[#1A5052] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#D94E1F]" />
                  Currently Building
                </span>
                <span className="text-[10px] font-mono text-[#00AA45] bg-[#E8F8EE] px-2 py-0.5 rounded border border-[#C6F0D6] font-bold">
                  Day 4 of 5 Trial Sprint
                </span>
              </div>
              <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                PulseAI Workflow Engine
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Autonomous background workflow engine for modern dev teams. Co-building with Maya Lin and Arjun Verma.
              </p>
            </div>

            {/* Skills & Stack */}
            <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)]">
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider block mb-2.5">
                Technical Stack & Core Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'FastAPI', 'Python', 'Redis', 'Docker'].map((skill, idx) => (
                  <span key={idx} className="text-xs font-mono bg-[var(--bg-subtle)] text-[var(--text-primary)] px-2.5 py-1 rounded-md border border-[var(--border-crisp)] font-medium">
                    {skill}
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
              Production Products & Codebases Contributed to
            </span>

            <div className="space-y-3">
              {userShips.map((ship, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                        {ship.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#00AA45] bg-[#E8F8EE] px-2 py-0.5 rounded-full border border-[#C6F0D6] font-bold">
                        {ship.year}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#1A5052] font-semibold block">
                      Role Credit: {ship.role}
                    </span>
                    <p className="text-xs text-[var(--text-secondary)]">{ship.tagline}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {ship.stack.map((s, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono bg-[var(--bg-subtle)] px-2 py-0.5 rounded border border-[var(--border-crisp)] text-[var(--text-secondary)]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <a
                      href={ship.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#1A5052] bg-[var(--simplify-teal-soft)] hover:bg-[#D5EFEA] border border-[#BCE5DC] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {ship.repoUrl && (
                      <a
                        href={ship.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] border border-[var(--border-crisp)] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITY */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider block">
              Timeline of Ships, Trial Sprints & Daily Logs
            </span>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-crisp)]">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-[#00AA45] border-2 border-white absolute -left-[23px] top-1 shadow-xs" />
                <div className="bg-white p-4 rounded-xl border border-[var(--border-crisp)] text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Today</span>
                  <p className="font-semibold text-[var(--text-primary)] mt-0.5">
                    Logged ship in PulseAI Sprint: "Wired LangGraph subagent execution retry fallback"
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-[#1A5052] border-2 border-white absolute -left-[23px] top-1 shadow-xs" />
                <div className="bg-white p-4 rounded-xl border border-[var(--border-crisp)] text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">2 days ago</span>
                  <p className="font-semibold text-[var(--text-primary)] mt-0.5">
                    Completed 5-Day Trial Sprint milestone: Redis Event Stream webhook integration
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white absolute -left-[23px] top-1 shadow-xs" />
                <div className="bg-white p-4 rounded-xl border border-[var(--border-crisp)] text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Week 41</span>
                  <p className="font-semibold text-[var(--text-primary)] mt-0.5">
                    Shipped DevRadar CLI to Weekly ShipPad (#2 Product of the Week)
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
                <span>Verified Peer Trust Ledger</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed font-mono">
                Every record on this passport is countersigned by collaborators at the conclusion of 3–7 day trial sprints.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-crisp)]">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  Teammate Verification & Repeat Collaboration
                </span>
                <span className="font-mono text-xs font-bold text-[#00AA45]">
                  4/4 (100%) Would Build Again ✔
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 bg-[var(--bg-canvas)] rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-primary)]">Maya Lin (Lead UI/UX Designer)</span>
                    <span className="text-[10px] font-mono text-[#00AA45] font-bold">Verified Teammate ✔</span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-mono text-[11px]">
                    "Kushagr built and shipped the entire design system tokens in 3 days. Extraordinary technical craft and async speed."
                  </p>
                </div>

                <div className="p-3.5 bg-[var(--bg-canvas)] rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-primary)]">Arjun Verma (Systems Architect)</span>
                    <span className="text-[10px] font-mono text-[#00AA45] font-bold">Verified Teammate ✔</span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-mono text-[11px]">
                    "Very clean understanding of edge cache boundaries and reliable async daily ship logs."
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
              Verified External Toolchains & Portfolios
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <a
                href="https://github.com/Rana-Kushagr/ShipWith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-white rounded-xl border border-[var(--border-crisp)] hover:border-[#1A5052] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="font-medium text-[var(--text-primary)]">GitHub: Rana-Kushagr</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-white rounded-xl border border-[var(--border-crisp)] hover:border-[#1A5052] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current text-[var(--text-primary)]" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="font-medium text-[var(--text-primary)]">X: @kushagr</span>
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
                  <span className="font-medium text-[var(--text-primary)]">Custom Domain: shipwith.app</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 3. EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] mb-4">
              Edit Builder Profile
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-hidden focus:border-[#1A5052]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Primary Role
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-hidden focus:border-[#1A5052]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-hidden focus:border-[#1A5052]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Bio / Philosophy
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl p-3 text-xs text-[var(--text-primary)] focus:outline-hidden focus:border-[#1A5052] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                    Weekly Hours
                  </label>
                  <input
                    type="text"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-hidden focus:border-[#1A5052]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                    Trial Availability
                  </label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-hidden focus:border-[#1A5052]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1A5052] hover:bg-[#12393B] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold shadow-xs cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
