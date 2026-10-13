import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Drawer } from '../common/Drawer';
import { 
  Trophy, 
  ExternalLink, 
  Code2, 
  Globe, 
  Edit3, 
  CheckCircle2, 
  Share2, 
  ShieldCheck, 
  Users
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, builds, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'ships' | 'activity' | 'passport' | 'links'>('overview');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editHeadline, setEditHeadline] = useState(currentUser.headline);
  const [editBio, setEditBio] = useState(currentUser.bio);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.name = editName;
    currentUser.headline = editHeadline;
    currentUser.bio = editBio;
    addToast('Profile updated successfully!', 'success');
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      
      {/* Profile Header Card */}
      <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-6">
        
        {/* Top identity row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[var(--color-border)] shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {currentUser.name}
                </h1>
                <Badge variant="accent" size="sm">{currentUser.role}</Badge>
              </div>
              <div className="text-xs font-mono text-[var(--color-text-muted)]">
                @{currentUser.username} • {currentUser.timezone}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] pt-0.5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                <span className="text-[var(--color-text-primary)] font-semibold">{currentUser.availability}</span>
                <span>({currentUser.weeklyHours})</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                addToast('Profile link copied to clipboard!', 'info');
              }}
              leftIcon={<Share2 className="w-3.5 h-3.5" />}
            >
              Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Headline & Bio */}
        <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {currentUser.headline}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
            {currentUser.bio}
          </p>
        </div>

        {/* Execution Metrics Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-[var(--color-border)] text-center font-mono">
          <div className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
            <div className="text-lg font-bold text-[var(--color-text-primary)]">{currentUser.stats.shipsCount}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Products Shipped</div>
          </div>
          <div className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
            <div className="text-lg font-bold text-[var(--color-text-primary)]">{currentUser.stats.trialBuildsCount}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Trial Builds</div>
          </div>
          <div className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
            <div className="text-lg font-bold text-[var(--color-text-primary)]">{currentUser.stats.collaborationsCount}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Collaborations</div>
          </div>
          <div className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
            <div className="text-lg font-bold text-[var(--color-text-primary)]">{currentUser.stats.repeatTeammatesCount}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Repeat Teammates</div>
          </div>
          <div className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
            <div className="text-lg font-bold text-[var(--color-success)]">{currentUser.stats.positiveFeedbackPercent}%</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Positive Feedback</div>
          </div>
        </div>

      </div>

      {/* 5 Profile Tabs (PRD PROF-02) */}
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'ships', label: 'Shipped Products' },
          { id: 'passport', label: 'Build Passport (Verified)' },
          { id: 'activity', label: 'Activity' },
          { id: 'links', label: 'Verified Links' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Skills & Tools */}
          <div className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
              Skills & Daily Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.skills.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-1 text-xs font-mono rounded-[var(--radius-sm)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
              Looking to Team Up With
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.lookingFor.map(item => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-medium rounded-[var(--radius-md)] bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/20"
                >
                  Seeking: {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Shipped Products with Explicit Contributor Role Attribution (PRD PROOF-01) */}
      {activeTab === 'ships' && (
        <div className="space-y-4">
          {builds.filter(b => b.creatorId === currentUser.id && b.stage === 'Shipped').length > 0 ? (
            builds.filter(b => b.creatorId === currentUser.id && b.stage === 'Shipped').map(ship => (
              <div key={ship.id} className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                        {ship.title}
                      </h3>
                      <Badge variant="success" size="sm">Shipped & Live</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      {ship.description}
                    </p>
                  </div>
                  {ship.demoUrl && (
                    <a
                      href={ship.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-brand-accent)] hover:underline font-mono"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{ship.demoUrl.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                </div>

                <div className="p-3 bg-[var(--color-surface-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-success)]" />
                    <span>Contributor Role: <strong className="text-[var(--color-text-primary)]">Product Lead & Creator</strong></span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--color-success)]">● Verified Creator</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] mx-auto flex items-center justify-center text-[var(--color-text-muted)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">No Shipped Products Yet</h3>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto">
                Products you create, validate, and ship with real collaborators will be verified and permanently showcased here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Build Passport (Structured Evidence, NOT an opaque score - PRD §19) */}
      {activeTab === 'passport' && (
        <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[var(--color-warning)]" />
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Build Passport
                </h2>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Auditable proof of execution earned from shipped products and genuine team feedback.
              </p>
            </div>
            <Badge variant="accent" size="md">
              {currentUser.stats.shipsCount > 0 ? 'Verified Builder' : 'New Maker Passport'}
            </Badge>
          </div>

          {/* Structured Evidence Checklist */}
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${currentUser.stats.shipsCount > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`} />
                <span className="font-medium text-[var(--color-text-primary)]">
                  {currentUser.stats.shipsCount} Verified Product Ships
                </span>
              </div>
              <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                {currentUser.stats.shipsCount > 0 ? 'Verified through public release' : 'Earned upon shipping first product'}
              </span>
            </div>

            <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${currentUser.stats.trialBuildsCount > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`} />
                <span className="font-medium text-[var(--color-text-primary)]">
                  {currentUser.stats.trialBuildsCount} Completed Trial Builds
                </span>
              </div>
              <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                {currentUser.stats.trialBuildsCount > 0 ? 'Recorded from completed 4-day trial sprints' : 'Earned by finishing collaborative trial builds'}
              </span>
            </div>

            <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className={`w-4 h-4 ${currentUser.stats.repeatTeammatesCount > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`} />
                <span className="font-medium text-[var(--color-text-primary)]">
                  Teammate Feedback & Repeat Collaborations
                </span>
              </div>
              <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                {currentUser.stats.collaborationsCount > 0 
                  ? `${currentUser.stats.positiveFeedbackPercent}% positive (${currentUser.stats.repeatTeammatesCount} repeat partners)`
                  : 'Requires at least 1 completed collaboration'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Activity Log */}
      {activeTab === 'activity' && (
        <div className="p-8 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] mx-auto flex items-center justify-center text-[var(--color-text-muted)]">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">No Public Activity Yet</h3>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto">
            Your contributions, trial sprint milestones, and shipped product releases will appear here in chronological order.
          </p>
        </div>
      )}

      {/* Tab 5: Verified Links */}
      {activeTab === 'links' && (
        <div className="space-y-4">
          {currentUser.proofLinks && (currentUser.proofLinks.github || currentUser.proofLinks.website) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentUser.proofLinks.github && (
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-[var(--color-text-primary)]" />
                    <span>github.com/{currentUser.proofLinks.github}</span>
                  </div>
                  <span className="text-[11px] text-[var(--color-success)]">Verified ✓</span>
                </div>
              )}
              {currentUser.proofLinks.website && (
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[var(--color-brand-accent)]" />
                    <span>{currentUser.proofLinks.website}</span>
                  </div>
                  <span className="text-[11px] text-[var(--color-success)]">Verified ✓</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] mx-auto flex items-center justify-center text-[var(--color-text-muted)]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">No Verified Links Added</h3>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto">
                Connect your GitHub, portfolio, or live product domains to build verifiable credibility on your passport.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Drawer */}
      <Drawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile"
        description="Update your public builder persona and daily stack."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="w-full p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Headline</label>
            <input
              type="text"
              value={editHeadline}
              onChange={e => setEditHeadline(e.target.value)}
              className="w-full p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Bio</label>
            <textarea
              rows={4}
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              className="w-full p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[var(--color-border)]">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Drawer>

    </div>
  );
};
