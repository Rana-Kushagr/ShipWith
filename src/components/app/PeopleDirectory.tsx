import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PeopleDirectory: React.FC = () => {
  const { 
    seedBuilders, 
    setSelectedBuilderId, 
    openChatWithBuilder
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');

  const filteredBuilders = seedBuilders.filter((b) => {
    const matchesRole = 
      selectedRole === 'all' || 
      b.role.toLowerCase().includes(selectedRole.toLowerCase());
    
    const matchesAvailability = 
      selectedAvailability === 'all' || 
      b.availability.toLowerCase().includes(selectedAvailability.toLowerCase());

    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.lookingFor.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRole && matchesAvailability && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00AA45] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00AA45] bg-[#E8F8EE] px-2.5 py-0.5 rounded-full border border-[#C6F0D6]">
              VERIFIED BUILDER NETWORK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] mt-1">
            Find Builders & Co-founders
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Connect with vetted builders who have authentic 52-week ship activity and un-buyable build passports.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, handle, skill (e.g. React 19, Figma, Go), or looking for..."
              className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[#1A5052]"
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
                  ? 'bg-[#1A5052] text-white border-[#12393B] font-bold shadow-2xs'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Availability Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--border-crisp)] text-xs font-mono scrollbar-none">
          <span className="text-[var(--text-muted)] shrink-0">Availability:</span>
          {[
            { id: 'all', label: 'All Availability' },
            { id: 'trial', label: '5-Day Trial' },
            { id: 'flexible', label: 'Flexible' },
            { id: 'available', label: 'Ready Now' }
          ].map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAvailability(a.id)}
              className={`px-3 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                selectedAvailability === a.id
                  ? 'bg-[#00AA45] text-white border-[#008A37] font-bold shadow-2xs'
                  : 'bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Builders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBuilders.map((builder) => (
          <div
            key={builder.id}
            className="bg-white rounded-2xl border border-[var(--border-crisp)] p-6 hover:border-[var(--border-hover)] shadow-[var(--shadow-card)] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar, Name, Role, Match Badge */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img
                      src={builder.avatar}
                      alt={builder.name}
                      className="w-13 h-13 rounded-2xl object-cover border border-[var(--border-crisp)] shadow-2xs"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-[#00AA45] text-white p-0.5 rounded-full border-2 border-white">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3
                        onClick={() => setSelectedBuilderId(builder.id)}
                        className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] hover:text-[#1A5052] transition-colors cursor-pointer"
                      >
                        {builder.name}
                      </h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA45]" />
                      <span className="text-xs font-mono text-[var(--text-muted)]">{builder.handle}</span>
                    </div>

                    <span className="text-xs font-medium text-[#1A5052] block mt-0.5">
                      {builder.role}
                    </span>

                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {builder.location}
                      </span>
                      <span>•</span>
                      <span>{builder.timezone}</span>
                    </div>
                  </div>
                </div>

                {/* Match Badge */}
                <div className="bg-[var(--bg-selected)] border border-[#BCE5DC] text-[#0D9488] px-2.5 py-1 rounded-lg text-xs font-mono font-bold shrink-0">
                  {builder.matchScore}% Match
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[var(--text-secondary)] mt-3.5 leading-relaxed font-sans">
                {builder.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {builder.skills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded border border-[var(--border-crisp)] font-medium">
                    {skill}
                  </span>
                ))}
                {builder.skills.length > 5 && (
                  <span className="text-[10px] font-mono text-[var(--text-muted)] self-center">
                    +{builder.skills.length - 5}
                  </span>
                )}
              </div>

              {/* Looking for tags */}
              <div className="mt-3.5 pt-3 border-t border-[var(--border-crisp)] flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Looking for:
                </span>
                {builder.lookingFor.map((item, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-[var(--simplify-teal-soft)] text-[#1A5052] px-2 py-0.5 rounded border border-[#BCE5DC]">
                    {item}
                  </span>
                ))}
              </div>

              {/* Execution Proof Metric Pills */}
              <div className="mt-3 pt-3 border-t border-[var(--border-crisp)] grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--border-crisp)]">
                  <span className="text-[10px] text-[var(--text-muted)] block">Ships</span>
                  <span className="font-bold text-[var(--text-primary)]">{builder.stats.ships}</span>
                </div>
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--border-crisp)]">
                  <span className="text-[10px] text-[var(--text-muted)] block">Trials</span>
                  <span className="font-bold text-[#0D9488]">{builder.stats.trialsCompleted}</span>
                </div>
                <div className="bg-[var(--bg-canvas)] p-2 rounded-lg border border-[var(--border-crisp)]">
                  <span className="text-[10px] text-[var(--text-muted)] block">Repeat Team</span>
                  <span className="font-bold text-[#00AA45]">{builder.stats.wouldBuildAgainRate} ✔</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-5 pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {builder.weeklyHours}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openChatWithBuilder(builder.handle, `Hey ${builder.name}! Found your profile on ShipWith. Would love to connect.`)}
                  className="p-2 rounded-lg border border-[var(--border-crisp)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
                  title="Direct Message"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedBuilderId(builder.id)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors cursor-pointer"
                >
                  View Profile
                </button>

                <button
                  onClick={() => {
                    openChatWithBuilder(
                      builder.handle,
                      `Hey ${builder.name}! I'd love to invite you to collaborate on a 5-day trial sprint. Are you free to discuss?`,
                      `Trial Sprint Invite: ${builder.name}`
                    );
                  }}
                  className="bg-[#1A5052] hover:bg-[#12393B] text-white px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                >
                  <Zap className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Invite to Trial</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
