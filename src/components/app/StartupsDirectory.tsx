import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Zap, 
  PlusCircle, 
  Eye, 
  ArrowUpDown,
  Rocket
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[var(--text-primary)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D659] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#141418] px-2.5 py-0.5 rounded-full border border-[var(--border-crisp)]">
              STARTUP RADAR & DIRECTORY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white mt-1">
            Explore Active Startups & Builds
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Discover real products in active development. Filter by stage, stack, and step into 5-day trial sprints.
          </p>
        </div>

        <button
          onClick={() => setIsPostBuildOpen(true)}
          className="bg-white hover:bg-zinc-200 text-[#050506] px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Post a Build</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by startup name, stack (e.g. React 19, Python), or role needed..."
              className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white"
            />
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs font-mono self-end md:self-auto">
            <span className="text-[var(--text-muted)] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <button
              onClick={() => setSortBy('match')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                sortBy === 'match'
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
              }`}
            >
              Best Match %
            </button>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                sortBy === 'newest'
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
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
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
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
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
              }`}
            >
              {ind === 'all' ? 'All Industries' : ind}
            </button>
          ))}
        </div>
      </div>

      {/* Startups Cards Grid or Empty State */}
      {filteredStartups.length === 0 ? (
        <div className="glow-card-perimeter p-8 sm:p-12 text-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            No startups or builds found
          </h2>
          <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
            There are currently no startups matching your criteria. Post your own build to start receiving collaborator applications and trial sprint requests.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsPostBuildOpen(true)}
              className="bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post a Build</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredStartups.map((startup) => (
            <div
              key={startup.id}
              className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 hover:border-white/30 shadow-[var(--shadow-card)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Logo, Name, Match Ring */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      style={{ backgroundColor: startup.logoBg }}
                      className="w-12 h-12 rounded-xl text-white font-mono font-bold text-base flex items-center justify-center shrink-0 shadow-2xs border border-white/10"
                    >
                      {startup.logoText}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 
                          className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-white hover:text-[#2DD4BF] transition-colors cursor-pointer"
                          onClick={() => setSelectedStartupId(startup.id)}
                        >
                          {startup.name}
                        </h3>
                        <span className="text-[10px] font-mono font-semibold bg-[#141418] text-[#2DD4BF] px-2 py-0.5 rounded-full border border-[#2DD4BF]/30">
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
                    <span className="text-[8px] font-mono font-bold text-[#2DD4BF]">Match</span>
                  </div>
                </div>

                {/* Tagline Pitch */}
                <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed font-medium">
                  {startup.tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {startup.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-[#141418] text-[var(--text-secondary)] px-2.5 py-0.5 rounded-md border border-[var(--border-crisp)] font-medium">
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
                        <span className="text-white font-semibold truncate max-w-[200px]">
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
                    className="text-[var(--text-secondary)] hover:text-white hover:bg-[#141418] px-3 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => startTrialSprintWithStartup(startup.id)}
                    className="bg-white hover:bg-zinc-200 text-[#050506] px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#00D659]" />
                    <span>Start 5-Day Trial</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
