import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Drawer } from '../common/Drawer';
import { Search, Trophy } from 'lucide-react';
import type { UserProfile } from '../../types';

export const PeopleDirectory: React.FC = () => {
  const { builders, builds, addToast, setCurrentView } = useApp();
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedBuilderForInvite, setSelectedBuilderForInvite] = useState<UserProfile | null>(null);
  const [selectedBuildId, setSelectedBuildId] = useState<string>(builds[0]?.id || '');
  const [inviteNote, setInviteNote] = useState('');
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  const filteredBuilders = builders.filter(b => {
    const matchesRole = selectedRole === 'all' || b.role.toLowerCase().includes(selectedRole.toLowerCase());
    const matchesSearch = b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          b.headline.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          b.skills.some(s => s.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingInvite(true);
    setTimeout(() => {
      addToast(`Invitation sent to ${selectedBuilderForInvite?.name}!`, 'success');
      setSelectedBuilderForInvite(null);
      setInviteNote('');
      setIsSendingInvite(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Find Builders & Teammates
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Discover verified developers, designers, and marketers with authentic proof of work.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Search builders by skill (e.g. React, Figma, Python)..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'fullstack', label: 'Fullstack' },
            { id: 'design', label: 'UI/UX Design' },
            { id: 'marketing', label: 'Growth & Marketing' },
            { id: 'ai', label: 'AI / ML' },
          ].map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedRole === role.id
                  ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)]'
                  : 'bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Builder Cards (Proof of Work) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilders.map(builder => (
          <div
            key={builder.id}
            className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:border-[var(--color-border-strong)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5">
              {/* Header: Avatar, Name, Role badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={builder.avatar}
                    alt={builder.name}
                    className="w-12 h-12 rounded-full object-cover border border-[var(--color-border)] shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-[var(--color-text-primary)] leading-snug">
                      {builder.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      @{builder.username}
                    </div>
                  </div>
                </div>
                <Badge variant="accent" size="sm">
                  {builder.role}
                </Badge>
              </div>

              {/* Status and Timezone */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)] pt-1 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                  <span className="text-[var(--color-text-primary)] font-medium">{builder.weeklyHours}</span>
                </div>
                <span>{builder.timezone.split(' ')[0]}</span>
              </div>

              {/* Headline */}
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                {builder.headline}
              </p>

              {/* Verified Skills */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                  Top Skills:
                </div>
                <div className="flex flex-wrap gap-1">
                  {builder.skills.slice(0, 4).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Execution Proof Signals */}
              <div className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[var(--color-warning)]" />
                  <span>{builder.stats.shipsCount} Ships</span>
                </div>
                <span className="text-[var(--color-text-muted)]">•</span>
                <span>{builder.stats.collaborationsCount} Collabs</span>
                <span className="text-[var(--color-text-muted)]">•</span>
                <span className="text-[var(--color-success)]">{builder.stats.positiveFeedbackPercent}% Positive</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[var(--color-border)] flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setCurrentView('messages')}
              >
                Message
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setSelectedBuilderForInvite(builder)}
              >
                Invite to Build
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredBuilders.length === 0 && (
        <div className="p-12 text-center rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] space-y-2">
          <p>No builders matching "{searchFilter}".</p>
          <Button variant="outline" size="sm" onClick={() => { setSearchFilter(''); setSelectedRole('all'); }}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Invite Drawer */}
      <Drawer
        isOpen={!!selectedBuilderForInvite}
        onClose={() => setSelectedBuilderForInvite(null)}
        title={`Invite ${selectedBuilderForInvite?.name}`}
        description="Select which of your active Builds you would like to invite them to."
      >
        <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Select Build / Project
            </label>
            <select
              value={selectedBuildId}
              onChange={e => setSelectedBuildId(e.target.value)}
              className="w-full p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            >
              {builds.map(b => (
                <option key={b.id} value={b.id}>{b.title} ({b.stage})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
              Invitation Note / Proposed Role
            </label>
            <textarea
              rows={4}
              required
              value={inviteNote}
              onChange={e => setInviteNote(e.target.value)}
              placeholder="Hi! We saw your work and would love to collaborate on our next 5-day trial milestone..."
              className="w-full p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBuilderForInvite(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSendingInvite}
              disabled={!inviteNote.trim()}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
