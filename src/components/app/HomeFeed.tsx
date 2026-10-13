import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Users, 
  Clock, 
  Globe, 
  ExternalLink, 
  CheckSquare,
  Sparkles,
  ChevronRight,
  Filter,
  Rocket,
  Plus
} from 'lucide-react';
import { Drawer } from '../common/Drawer';
import type { BuildRecord } from '../../types';

export const HomeFeed: React.FC = () => {
  const { 
    builds, 
    builders, 
    setCurrentView, 
    workspaceTasks, 
    trialBuild,
    addToast,
    toggleBookmark,
    bookmarks,
    setIsPostBuildOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'fresh' | 'looking' | 'shipped'>('fresh');
  const [selectedBuildForApply, setSelectedBuildForApply] = useState<BuildRecord | null>(null);
  const [pitchText, setPitchText] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Filter builds based on tab
  const displayedBuilds = builds.filter(b => {
    if (activeTab === 'looking') return b.stage === 'Building MVP' || b.stage === 'Idea & Validation';
    if (activeTab === 'shipped') return b.stage === 'Shipped';
    return true; // 'fresh' shows all
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchText.trim()) return;
    setIsApplying(true);
    setTimeout(() => {
      addToast(`Application sent for ${selectedBuildForApply?.title}!`, 'success');
      setSelectedBuildForApply(null);
      setPitchText('');
      setIsApplying(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Center Column: Builds Feed (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Segmented Tabs & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-1.5 p-1 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <button
                onClick={() => setActiveTab('fresh')}
                className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'fresh'
                    ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Fresh Builds
              </button>
              <button
                onClick={() => setActiveTab('looking')}
                className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'looking'
                    ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Looking for People
              </button>
              <button
                onClick={() => setActiveTab('shipped')}
                className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'shipped'
                    ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] shadow-xs'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                Shipped
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono">
              <Filter className="w-3.5 h-3.5" />
              <span>Sorted by Most Recent</span>
            </div>
          </div>

          {/* Builds Cards Stream */}
          <div className="space-y-4">
            {displayedBuilds.length === 0 ? (
              <div className="p-10 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] mx-auto flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                    No builds posted in this category yet
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
                    ShipWith is a 100% genuine maker platform with zero synthetic profiles or bots. Be the first real builder to post an MVP or recruit co-founders!
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsPostBuildOpen(true)}
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Post a Build
                  </Button>
                  {activeTab !== 'fresh' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('fresh')}
                    >
                      View All Categories
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              displayedBuilds.map(build => {
                const isShipped = build.stage === 'Shipped';
                const isSaved = bookmarks.includes(build.id);

                return (
                  <article
                    key={build.id}
                    className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:border-[var(--color-border-strong)] transition-all space-y-4 text-left"
                  >
                    {/* Top Status & Timestamp */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={isShipped ? 'success' : 'info'}
                          size="sm"
                        >
                          {isShipped ? 'Shipped Product' : 'Looking for teammates'}
                        </Badge>
                        <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                          {build.createdAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(build.id)}
                          className={`text-xs px-2 py-1 rounded transition-colors cursor-pointer ${
                            isSaved 
                              ? 'text-[var(--color-brand-accent)] font-semibold' 
                              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                          }`}
                        >
                          {isSaved ? '★ Saved' : '☆ Save'}
                        </button>
                      </div>
                    </div>

                    {/* Build Title & Pitch */}
                    <div className="space-y-1.5">
                      <h2 className="text-lg font-bold text-[var(--color-text-primary)] hover:underline cursor-pointer" onClick={() => setCurrentView('startups')}>
                        {build.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {build.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {build.techStack.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 text-[11px] font-mono rounded-[var(--radius-sm)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Metadata Row */}
                    <div className="pt-2 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
                      <div className="flex items-center gap-4">
                        {isShipped ? (
                          <>
                            <span className="font-semibold text-[var(--color-text-primary)]">Verified Shipped</span>
                            <span>•</span>
                            <span>Live Product</span>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
                              <span>{build.neededRoles.length} open roles</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{build.hoursPerWeek}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5" />
                              <span>Remote</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setCurrentView('startups')}
                        >
                          {isShipped ? 'View Details' : 'View Startup'}
                        </Button>
                        
                        {isShipped ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              if (build.demoUrl) {
                                window.open(build.demoUrl, '_blank');
                              } else {
                                addToast('No demo URL provided yet by creator.', 'info');
                              }
                            }}
                            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                          >
                            Try Demo
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedBuildForApply(build)}
                          >
                            Apply to Team
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {/* Right Rail: Context & Momentum Widgets (4 cols on desktop) */}
        <aside className="lg:col-span-4 space-y-6 text-left">
          
          {/* Widget 1: People for you (Matching Image 3) */}
          <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
                People for you
              </h3>
              <button 
                onClick={() => setCurrentView('people')}
                className="text-[11px] font-mono text-[var(--color-brand-accent)] hover:underline cursor-pointer"
              >
                View all →
              </button>
            </div>

            {builders.length === 0 ? (
              <div className="py-4 text-center space-y-2">
                <p className="text-xs text-[var(--color-text-secondary)]">No other builders joined yet.</p>
                <button
                  onClick={() => setCurrentView('onboarding')}
                  className="text-[11px] font-mono text-[var(--color-brand-accent)] hover:underline block mx-auto cursor-pointer"
                >
                  Mint your Builder Passport →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {builders.slice(0, 3).map(builder => (
                  <div key={builder.id} className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                    <div className="flex items-start gap-2.5">
                      <img 
                        src={builder.avatar} 
                        alt={builder.name} 
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-[var(--color-border)]"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[var(--color-text-primary)] leading-tight">
                          {builder.name}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                          {builder.headline}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-[var(--color-text-muted)]">
                          <span className="text-[var(--color-success)]">● Available</span>
                          <span>{builder.weeklyHours}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2.5 shrink-0"
                      onClick={() => addToast(`Invite sent to ${builder.name}!`, 'success')}
                    >
                      Invite
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Widget 2: Build together task checklist (Matching Image 3) */}
          <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
                Build Together Tracker
              </h3>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">Active Sprint</span>
            </div>

            {workspaceTasks.length === 0 ? (
              <div className="py-3 text-center space-y-1">
                <p className="text-xs text-[var(--color-text-secondary)]">No active trial sprint tasks.</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">Team up with a co-founder to launch 4-day sprint goals.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {workspaceTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <CheckSquare className={`w-3.5 h-3.5 shrink-0 ${task.status === 'done' ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`} />
                    <span className={task.status === 'done' ? 'line-through opacity-70' : ''}>{task.title}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setCurrentView('workspace')}
              className="w-full text-center text-xs font-semibold text-[var(--color-brand-accent)] hover:underline pt-2 border-t border-[var(--color-border)] cursor-pointer"
            >
              Open Build Room →
            </button>
          </div>

          {/* Widget 3: Workspace preview & Standup Prompt */}
          <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
                Workspace Preview
              </h3>
              <button 
                onClick={() => setCurrentView('workspace')}
                className="text-[11px] font-mono text-[var(--color-brand-accent)] cursor-pointer"
              >
                Open →
              </button>
            </div>

            {trialBuild ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                  <span>Active tasks:</span>
                  <span className="font-mono font-semibold text-[var(--color-text-primary)]">{workspaceTasks.length} tasks</span>
                </div>
                {trialBuild.repoUrl && (
                  <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                    <span>Code repo:</span>
                    <span className="font-mono text-[11px] text-[var(--color-brand-accent)]">{trialBuild.repoUrl.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                {trialBuild.demoUrl && (
                  <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                    <span>Preview:</span>
                    <span className="font-mono text-[11px] text-[var(--color-success)]">{trialBuild.demoUrl.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-2 text-center text-xs text-[var(--color-text-muted)] space-y-1">
                <p>No active trial sprint running.</p>
                <p className="text-[11px]">Join or post a build to launch a 4-day trial.</p>
              </div>
            )}

            {/* Daily shipping prompt (PRD WORK-03) */}
            <div 
              onClick={() => setCurrentView('workspace')}
              className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between text-xs cursor-pointer hover:bg-[var(--color-surface-strong)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
                <span className="font-medium text-[var(--color-text-primary)]">What did you ship today?</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            </div>
          </div>

          {/* Widget 4: Build Momentum (Reputation scorecard) */}
          <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
                Build Momentum
              </h3>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">This month</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">3</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Ships</div>
              </div>
              <div className="p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">2</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Collabs</div>
              </div>
              <div className="p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                <div className="text-xs font-bold font-mono text-[var(--color-success)] mt-1">Top 10%</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Builder Rank</div>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* Slide-over Pitch Drawer for Applying */}
      <Drawer
        isOpen={!!selectedBuildForApply}
        onClose={() => setSelectedBuildForApply(null)}
        title={`Apply to ${selectedBuildForApply?.title}`}
        description="Introduce yourself and share proof of what you have built."
      >
        <form onSubmit={handleApplySubmit} className="space-y-4">
          <div className="p-3 bg-[var(--color-surface-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)] text-xs space-y-1">
            <div className="font-semibold text-[var(--color-text-primary)]">Needed Roles:</div>
            <div className="text-[var(--color-text-secondary)]">
              {selectedBuildForApply?.neededRoles.map(r => r.role).join(', ')}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Your message to the founder
            </label>
            <textarea
              rows={4}
              required
              value={pitchText}
              onChange={e => setPitchText(e.target.value)}
              placeholder="Why this project excites you and what you will build in the first 5-day trial..."
              className="w-full text-xs p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Proof of Work (GitHub / Demo / Figma)
            </label>
            <input
              type="url"
              placeholder="https://github.com/your-username or portfolio link"
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBuildForApply(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isApplying}
              disabled={!pitchText.trim()}
            >
              Send Application
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
