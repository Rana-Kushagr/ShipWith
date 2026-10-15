import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  MessageSquare, 
  Users,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PeopleDirectory: React.FC = () => {
  const { 
    builders, 
    setSelectedBuilderId, 
    openChatWithBuilder,
    setCurrentView
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  const filteredBuilders = builders.filter((b) => {
    const matchesRole = 
      selectedRole === 'all' || 
      b.role.toLowerCase().includes(selectedRole.toLowerCase());
    
    const matchesAvailability = 
      selectedAvailability === 'all' || 
      b.availability.toLowerCase().includes(selectedAvailability.toLowerCase());

    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.handle || b.username).toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.bio || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.lookingFor.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRole && matchesAvailability && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[var(--text-primary)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D659] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#141418] px-2.5 py-0.5 rounded-full border border-[var(--border-crisp)]">
              VERIFIED BUILDER NETWORK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white mt-1">
            Find Builders & Co-founders
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Connect with vetted builders who have authentic proof-of-work activity and verified build passports.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, handle, skill (e.g. React 19, Figma, Go), or looking for..."
              className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white"
            />
          </div>
        </div>

        {/* Role Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--border-crisp)] text-xs font-mono scrollbar-none">
          <span className="text-[var(--text-muted)] shrink-0">Role:</span>
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'engineer', label: 'Engineering' },
            { id: 'design', label: 'Design & UI/UX' },
            { id: 'ai', label: 'AI & Data' },
            { id: 'product', label: 'Product & Systems' },
            { id: 'growth', label: 'Growth & GTM' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`px-3 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                selectedRole === r.id
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Availability Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--border-crisp)] text-xs font-mono scrollbar-none">
          <span className="text-[var(--text-muted)] shrink-0">Availability:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'available', label: 'Available' },
            { id: 'part-time', label: 'Part-time' },
            { id: 'busy', label: 'Busy' }
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAvailability(a.id)}
              className={`px-3 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                selectedAvailability === a.id
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Builders Grid or Empty State */}
      {filteredBuilders.length === 0 ? (
        <div className="glow-card-perimeter p-8 sm:p-12 text-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Users className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            No builders registered yet
          </h2>
          <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
            There are no profiles registered yet in this clean environment. Complete your Build Passport to showcase your skills and invite peers to scoped 5-day trial sprints.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setCurrentView('profile')}
              className="bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Complete Profile</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBuilders.map((builder) => (
            <div
              key={builder.id}
              onClick={() => setSelectedBuilderId(builder.id)}
              className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 hover:border-white/30 shadow-[var(--shadow-card)] transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Avatar and Top Info */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={builder.avatar}
                    alt={builder.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[var(--border-crisp)] group-hover:border-white transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-white truncate group-hover:text-[#2DD4BF] transition-colors">
                        {builder.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D659] shrink-0" />
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] block truncate">
                      {builder.handle || `@${builder.username}`}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-secondary)] block mt-0.5 truncate">
                      {builder.role}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mt-3 line-clamp-2 leading-relaxed">
                  {builder.bio || builder.headline}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {builder.skills.slice(0, 4).map((s, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-[#141418] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                      {s}
                    </span>
                  ))}
                  {builder.skills.length > 4 && (
                    <span className="text-[10px] font-mono text-[var(--text-muted)] self-center">
                      +{builder.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom stats and action */}
              <div className="mt-4 pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[var(--text-muted)]">
                  {builder.weeklyHours}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openChatWithBuilder(builder.id);
                  }}
                  className="bg-[#141418] hover:bg-[#1A1A22] text-white hover:border-white border border-[var(--border-crisp)] px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3 h-3 text-[#2DD4BF]" />
                  <span>Connect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
