import React from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  Shield, 
  ExternalLink, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_STARTUPS } from '../../data/seedData';

export const StartupDetailModal: React.FC = () => {
  const { 
    selectedStartupId, 
    setSelectedStartupId, 
    seedStartups, 
    bookmarks, 
    toggleBookmark,
    openChatWithBuilder,
    startTrialSprintWithStartup,
    addToast
  } = useApp();

  if (!selectedStartupId) return null;

  const startup = [...seedStartups, ...SEED_STARTUPS].find(s => s.id === selectedStartupId);
  if (!startup) return null;

  const isBookmarked = bookmarks.includes(startup.id);

  const handleStartTrial = () => {
    startTrialSprintWithStartup(startup.id);
    setSelectedStartupId(null);
  };

  const handleApplyRole = (role: string) => {
    addToast(`Applied to ${role} at ${startup.name}. Opening chat with founder...`, 'success');
    setSelectedStartupId(null);
    openChatWithBuilder(
      startup.founder.handle, 
      `Hi ${startup.founder.name}! I'm applying for the ${role} position at ${startup.name}. My build passport is ready for a 5-day trial sprint.`,
      `Application: ${startup.name} (${role})`
    );
  };

  const handleMessageFounder = () => {
    setSelectedStartupId(null);
    openChatWithBuilder(
      startup.founder.handle,
      `Hi ${startup.founder.name}! I discovered ${startup.name} on ShipWith. I love the concept of "${startup.tagline}". Let's connect!`,
      `Inquiry: ${startup.name}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative scrollbar-thin text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedStartupId(null)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Logo, Stage & Match Ring */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--border-crisp)]">
          <div className="flex items-start gap-4">
            <div 
              style={{ backgroundColor: startup.logoBg }} 
              className="w-14 h-14 rounded-2xl text-white font-mono font-bold text-xl flex items-center justify-center shrink-0 shadow-sm border border-white/20"
            >
              {startup.logoText}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                  {startup.name}
                </h2>
                <span className="text-xs font-mono font-semibold bg-[#141418] text-white px-2.5 py-0.5 rounded-full border border-[var(--border-crisp)]">
                  {startup.stage}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {startup.industry}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium leading-snug">
                {startup.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {startup.weeklyHours}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {startup.location}
                </span>
              </div>
            </div>
          </div>

          {/* SVG Circular Match Gauge */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="4.5"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#FFFFFF"
                  strokeWidth="4.5"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - startup.matchScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />
              </svg>
              <span className="absolute text-sm font-mono font-bold text-white">
                {startup.matchScore}%
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-white mt-0.5">Telemetry Match</span>
          </div>
        </div>

        {/* Why You Matched Telemetry Box */}
        <div className="my-5 p-3.5 bg-[#141418] rounded-xl border border-[var(--border-crisp)] text-xs font-mono">
          <div className="flex items-center gap-2 font-bold text-white mb-1.5">
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>Why you matched with {startup.name}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {startup.matchReasons.map((reason, idx) => (
              <span key={idx} className="bg-[#0C0C0E] text-white px-2.5 py-1 rounded-md border border-[var(--border-crisp)] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#00D659]" />
                {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="space-y-4 text-xs font-sans">
          <div className="bg-[#141418] p-4 rounded-xl border border-[var(--border-crisp)]">
            <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              The Problem
            </span>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {startup.problem}
            </p>
          </div>

          <div className="bg-[#141418] p-4 rounded-xl border border-[var(--border-crisp)]">
            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider block mb-1">
              The Solution & Architecture
            </span>
            <p className="text-sm text-white font-medium leading-relaxed">
              {startup.solution}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-5">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">
            Production Tech Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {startup.techStack.map((tech, idx) => (
              <span key={idx} className="text-xs font-mono bg-[#141418] text-white px-2.5 py-1 rounded-md border border-[var(--border-crisp)] font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Roles Needed */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Open Collaboration Roles ({startup.rolesNeeded.length})
            </span>
            <span className="text-[11px] font-mono text-[#00D659] font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" /> Zero-Equity Trial Safe
            </span>
          </div>

          <div className="space-y-2.5">
            {startup.rolesNeeded.map((r, idx) => (
              <div key={idx} className="p-3.5 bg-[#141418] rounded-xl border border-[var(--border-crisp)] hover:border-white/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white font-['Plus_Jakarta_Sans']">
                      {r.role}
                    </h4>
                    <span className="text-[11px] font-mono text-white bg-[#0C0C0E] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                      {r.spots} spot open
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-muted)] mt-1">
                    <span>{r.commitment}</span>
                    <span>•</span>
                    <span>Skills: {r.skills.join(', ')}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyRole(r.role)}
                  className="bg-[#0C0C0E] hover:bg-white hover:text-[#050506] text-white border border-[var(--border-crisp)] px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors self-start sm:self-auto shrink-0 cursor-pointer"
                >
                  Apply to Role
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Info & Links */}
        <div className="mt-6 pt-5 border-t border-[var(--border-crisp)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={startup.founder.avatar} 
              alt={startup.founder.name} 
              className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white">{startup.founder.name}</span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">{startup.founder.handle}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" />
              </div>
              <span className="text-xs text-[var(--text-secondary)]">{startup.founder.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {startup.demoUrl && (
              <a
                href={startup.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 bg-[#141418] px-2.5 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {startup.repoUrl && (
              <a
                href={startup.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 bg-[#141418] px-2.5 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Repo</span>
              </a>
            )}
            <button
              onClick={() => toggleBookmark(startup.id)}
              className="p-2 rounded-lg border border-[var(--border-crisp)] text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark startup'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-white fill-white" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Primary Action Buttons Footer */}
        <div className="mt-6 pt-5 border-t border-[var(--border-crisp)] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleMessageFounder}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-crisp)] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message Founder</span>
          </button>

          <button
            onClick={handleStartTrial}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-[#050506] text-xs font-mono font-bold shadow-xs transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#050506]" />
            <span>Start 5-Day Trial Build</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
