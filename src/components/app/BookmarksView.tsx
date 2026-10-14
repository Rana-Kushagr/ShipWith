import React from 'react';
import { Bookmark, Eye, Trash2 } from 'lucide-react';
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
            <Bookmark className="w-4 h-4 text-[#1A5052]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A5052]">
              SAVED BUILDS & BUILDERS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] mt-1">
            Your Bookmarks ({bookmarks.length})
          </h1>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-12 text-center space-y-4 shadow-[var(--shadow-card)]">
          <div className="w-12 h-12 rounded-xl bg-[var(--bg-subtle)] text-[var(--text-muted)] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
            No bookmarks saved yet
          </h3>
          <p className="text-xs text-[var(--text-secondary)] font-mono max-w-sm mx-auto">
            Save interesting startups and builders to revisit them anytime.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('startups')}
              className="bg-[#1A5052] text-white px-4 py-2 rounded-xl text-xs font-mono font-bold"
            >
              Explore Startups
            </button>
            <button
              onClick={() => setCurrentView('people')}
              className="bg-[var(--bg-subtle)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-xs font-mono font-bold border border-[var(--border-crisp)]"
            >
              Find Builders
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {savedStartups.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Saved Startups ({savedStartups.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedStartups.map(s => (
                  <div key={s.id} className="bg-white p-5 rounded-2xl border border-[var(--border-crisp)] shadow-xs flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-base text-[var(--text-primary)]">{s.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{s.tagline}</p>
                      <span className="text-[10px] font-mono text-[#0D9488] mt-2 block">{s.matchScore}% Match</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedStartupId(s.id)}
                        className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[#1A5052]"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(s.id)}
                        className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-red-600"
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
              <h2 className="text-sm font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Saved Builders ({savedBuilders.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedBuilders.map(b => (
                  <div key={b.id} className="bg-white p-5 rounded-2xl border border-[var(--border-crisp)] shadow-xs flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-base text-[var(--text-primary)]">{b.name}</h4>
                        <span className="text-xs font-mono text-[var(--text-muted)]">{b.handle}</span>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{b.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBuilderId(b.id)}
                        className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[#1A5052]"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleBookmark(b.id)}
                        className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-red-600"
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
