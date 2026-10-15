import React from 'react';
import { Bookmark, Eye, Trash2, Rocket, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BookmarksView: React.FC = () => {
  const { bookmarks, toggleBookmark, seedStartups, seedBuilders, setSelectedStartupId, setSelectedBuilderId, setCurrentView } = useApp();

  const savedStartups = seedStartups.filter(s => bookmarks.includes(s.id));
  const savedBuilders = seedBuilders.filter(b => bookmarks.includes(b.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-white" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
              SAVED BUILDS & BUILDERS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-white mt-1">
            Your Bookmarks ({bookmarks.length})
          </h1>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="glow-card-perimeter bg-[#0C0C0E] rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto shadow-inner">
            <Bookmark className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              No bookmarks saved yet
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono max-w-sm mx-auto">
              Save high-signal startups and vetted builders to track their launches or initiate a 5-day trial.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-3">
            <button
              onClick={() => setCurrentView('startups')}
              className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Rocket className="w-4 h-4" />
              <span>Explore Startups</span>
            </button>
            <button
              onClick={() => setCurrentView('people')}
              className="bg-[#141418] hover:bg-[#1A1A22] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold border border-[var(--border-crisp)] hover:border-white/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Find Builders</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {savedStartups.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Saved Startups ({savedStartups.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedStartups.map(s => (
                  <div key={s.id} className="bg-[#0C0C0E] p-5 rounded-2xl border border-[var(--border-crisp)] shadow-sm hover:border-white/20 transition-colors flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-base text-white">{s.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{s.tagline}</p>
                      <span className="text-[10px] font-mono text-[#00D659] font-bold mt-2.5 block">{s.matchScore}% Match</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedStartupId(s.id)}
                        className="p-2 rounded-lg bg-[#141418] text-[var(--text-secondary)] hover:text-white border border-[var(--border-crisp)] hover:border-white/20 transition-colors cursor-pointer"
                        title="View Startup"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(s.id)}
                        className="p-2 rounded-lg bg-[#141418] text-[var(--text-secondary)] hover:text-red-400 border border-[var(--border-crisp)] hover:border-red-500/30 transition-colors cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {savedBuilders.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Saved Builders ({savedBuilders.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedBuilders.map(b => (
                  <div key={b.id} className="bg-[#0C0C0E] p-5 rounded-2xl border border-[var(--border-crisp)] shadow-sm hover:border-white/20 transition-colors flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-xl object-cover border border-[var(--border-crisp)]" />
                      <div>
                        <h4 className="font-bold text-base text-white">{b.name}</h4>
                        <span className="text-xs font-mono text-[var(--text-muted)]">{b.handle}</span>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{b.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBuilderId(b.id)}
                        className="p-2 rounded-lg bg-[#141418] text-[var(--text-secondary)] hover:text-white border border-[var(--border-crisp)] hover:border-white/20 transition-colors cursor-pointer"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(b.id)}
                        className="p-2 rounded-lg bg-[#141418] text-[var(--text-secondary)] hover:text-red-400 border border-[var(--border-crisp)] hover:border-red-500/30 transition-colors cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
