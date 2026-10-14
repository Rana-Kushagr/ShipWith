import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Zap, 
  PlusCircle, 
  Eye, 
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StartupsDirectory: React.FC = () => {
  const { 
    seedStartups, 
    setSelectedStartupId, 
    startTrialSprintWithStartup,
    setIsPostBuildOpen 
  } = useApp();

  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'match' | 'newest'>('match');

  const filteredStartups = seedStartups.filter((s) => {
    const matchesStage = selectedStage === 'all' || s.stage.toLowerCase() === selectedStage.toLowerCase();
    const matchesIndustry = selectedIndustry === 'all' || s.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.rolesNeeded.some(r => r.role.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStage && matchesIndustry && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    return b.upvotesCount - a.upvotesCount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A5052] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A5052] bg-[var(--simplify-teal-soft)] px-2.5 py-0.5 rounded-full border border-[#BCE5DC]">
              STARTUP RADAR & DIRECTORY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] mt-1">
            Explore Active Startups & Builds
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Discover real products in active development. Filter by stage, stack, and step into 5-day trial sprints.
          </p>
        </div>

        <button
          onClick={() => setIsPostBuildOpen(true)}
          className="bg-[#D94E1F] hover:bg-[#C2410C] text-white px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Post a Build</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by startup name, stack (e.g. React 19, Python), or role needed..."
              className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[#1A5052]"
            />
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs font-mono self-end md:self-auto">
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <button
              onClick={() => setSortBy('match')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                sortBy === 'match'
                  ? 'bg-[#1A5052] text-white border-[#12393B] font-bold shadow-2xs'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
              }`}
            >
              Best Match %
            </button>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                sortBy === 'newest'
                  ? 'bg-[#1A5052] text-white border-[#12393B] font-bold shadow-2xs'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
              }`}
            >
              Most Upvoted
            </button>
          </div>
        </div>

        {/* Stage Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--border-crisp)] text-xs font-mono scrollbar-none">
          <span className="text-[var(--text-muted)] shrink-0">Stage:</span>
          {['all', 'Building', 'Hiring', 'Beta', 'Live'].map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`px-3 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                selectedStage === stg
                  ? 'bg-[#1A5052] text-white border-[#12393B] font-bold shadow-2xs'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
              }`}
            >
              {stg === 'all' ? 'All Stages' : stg}
            </button>
          ))}
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--border-crisp)] text-xs font-mono scrollbar-none">
          <span className="text-[var(--text-muted)] shrink-0">Industry:</span>
          {['all', 'AI', 'Developer Tools', 'Fintech', 'Productivity', 'Creator'].map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-[#0D9488] text-white border-[#0F766E] font-bold shadow-2xs'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
              }`}
            >
              {ind === 'all' ? 'All Industries' : ind}
            </button>
          ))}
        </div>
      </div>

      {/* Startups Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredStartups.map((startup) => (
          <div
            key={startup.id}
            className="bg-white rounded-2xl border border-[var(--border-crisp)] p-6 hover:border-[var(--border-hover)] shadow-[var(--shadow-card)] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Top: Logo, Name, Match Ring */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    style={{ backgroundColor: startup.logoBg }}
                    className="w-12 h-12 rounded-xl text-white font-mono font-bold text-base flex items-center justify-center shrink-0 shadow-2xs"
                  >
                    {startup.logoText}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] hover:text-[#1A5052] transition-colors cursor-pointer"
                        onClick={() => setSelectedStartupId(startup.id)}
                      >
                        {startup.name}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold bg-[var(--bg-selected)] text-[#0D9488] px-2 py-0.5 rounded-full border border-[#BCE5DC]">
                        {startup.stage}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)] mt-0.5 block">
                      {startup.industry}
                    </span>
                  </div>
                </div>

                {/* SVG Circular Match Gauge */}
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
                  <span className="text-[8px] font-mono font-bold text-[#0D9488]">Match</span>
                </div>
              </div>

              {/* Tagline Pitch */}
              <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed font-medium">
                {startup.tagline}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {startup.techStack.map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] px-2.5 py-0.5 rounded-md border border-[var(--border-crisp)] font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Roles Needed preview */}
              <div className="mt-4 pt-3 border-t border-[var(--border-crisp)]">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                  Open Roles ({startup.rolesNeeded.length})
                </span>
                <div className="space-y-1">
                  {startup.rolesNeeded.map((r, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-primary)] font-semibold truncate max-w-[200px]">
                        • {r.role}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">{r.commitment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-5 pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {startup.weeklyHours}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedStartupId(startup.id)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => startTrialSprintWithStartup(startup.id)}
                  className="bg-[#1A5052] hover:bg-[#12393B] text-white px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Zap className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Start 5-Day Trial</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
