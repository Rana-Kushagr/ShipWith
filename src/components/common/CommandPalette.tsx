import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Rocket, Moon, Sun, PlusCircle, ArrowRight, X } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    builds, 
    builders, 
    setCurrentView,
    theme,
    toggleTheme,
    setIsPostBuildOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredBuilds = builds.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredBuilders = builders.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    b.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    action();
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" 
        onClick={() => setIsCommandPaletteOpen(false)} 
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-overlay)] z-10 overflow-hidden flex flex-col max-h-[75vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--color-border)] gap-3">
          <Search className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search startups, builders, skills, or run command..."
            className="w-full text-sm bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="text-[11px] font-semibold text-[var(--color-text-muted)] px-3 py-1 uppercase tracking-wider">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleSelect(() => setIsPostBuildOpen(true))}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-[var(--radius-md)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-[var(--color-brand-accent)]" />
                  <span>Post a Build</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              </button>
              <button
                onClick={() => handleSelect(toggleTheme)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-[var(--radius-md)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--color-warning)]" /> : <Moon className="w-4 h-4 text-[var(--color-brand-accent)]" />}
                  <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} theme</span>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] font-mono">Theme</span>
              </button>
            </div>
          </div>

          {/* Startups & Builds */}
          {filteredBuilds.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[var(--color-text-muted)] px-3 py-1 uppercase tracking-wider">
                Startups & Builds
              </div>
              <div className="space-y-1">
                {filteredBuilds.slice(0, 3).map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(() => setCurrentView('startups'))}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-[var(--radius-md)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Rocket className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0" />
                      <div className="text-left">
                        <div className="font-medium text-[var(--color-text-primary)]">{b.title}</div>
                        <div className="text-[11px] text-[var(--color-text-muted)] truncate max-w-sm">{b.tagline}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-mono border border-[var(--color-border)] px-1.5 py-0.5 rounded-[var(--radius-sm)]">
                      {b.stage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Builders */}
          {filteredBuilders.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[var(--color-text-muted)] px-3 py-1 uppercase tracking-wider">
                Builders & Creators
              </div>
              <div className="space-y-1">
                {filteredBuilders.slice(0, 3).map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(() => setCurrentView('people'))}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-[var(--radius-md)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={b.avatar} alt={b.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                      <div className="text-left">
                        <div className="font-medium text-[var(--color-text-primary)]">{b.name}</div>
                        <div className="text-[11px] text-[var(--color-text-muted)]">{b.headline}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                      {b.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredBuilds.length === 0 && filteredBuilders.length === 0 && searchQuery && (
            <div className="p-6 text-center text-xs text-[var(--color-text-muted)]">
              No matching startups or builders found for "{searchQuery}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-[var(--color-surface-subtle)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
          <span>Navigate with mouse or arrow keys</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
