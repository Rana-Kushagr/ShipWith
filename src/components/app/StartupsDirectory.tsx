import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { ExternalLink, Search, Code2 } from 'lucide-react';
import type { BuildRecord } from '../../types';

export const StartupsDirectory: React.FC = () => {
  const { builds, addToast } = useApp();
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedBuildForDetails, setSelectedBuildForDetails] = useState<BuildRecord | null>(null);

  const filteredBuilds = builds.filter(b => {
    const matchesStage = selectedStage === 'all' || b.stage.toLowerCase().includes(selectedStage.toLowerCase());
    const matchesSearch = b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          b.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          b.techStack.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      {/* Page Title & Context */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Explore Startups & Builds
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Discover real products being built right now. Filter by stage, stack, and needed roles.
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
            placeholder="Search startups by name, problem, or stack..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
          />
        </div>

        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Stages' },
            { id: 'mvp', label: 'Building MVP' },
            { id: 'shipped', label: 'Shipped' },
            { id: 'idea', label: 'Ideation' },
          ].map(stg => (
            <button
              key={stg.id}
              onClick={() => setSelectedStage(stg.id)}
              className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedStage === stg.id
                  ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)]'
                  : 'bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {stg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Startup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilds.map(build => (
          <div
            key={build.id}
            className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:border-[var(--color-border-strong)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header with Stage badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text-primary)] leading-snug">
                    {build.title}
                  </h3>
                  <div className="text-[11px] text-[var(--color-text-muted)] font-mono mt-0.5">
                    Founded by {build.creatorName}
                  </div>
                </div>
                <Badge variant={build.stage === 'Shipped' ? 'success' : 'info'} size="sm">
                  {build.stage}
                </Badge>
              </div>

              {/* Tagline */}
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                {build.description}
              </p>

              {/* Needed Roles Pills */}
              {build.neededRoles.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    Seeking:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {build.neededRoles.map(r => (
                      <span
                        key={r.role}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/20"
                      >
                        {r.role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 pt-1">
                {build.techStack.map(tech => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                {build.hoursPerWeek}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedBuildForDetails(build)}
              >
                View Startup →
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredBuilds.length === 0 && (
        <div className="p-12 text-center rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] space-y-2">
          <p>No startups matching "{searchFilter}".</p>
          <Button variant="outline" size="sm" onClick={() => { setSearchFilter(''); setSelectedStage('all'); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Startup Detail Modal */}
      <Modal
        isOpen={!!selectedBuildForDetails}
        onClose={() => setSelectedBuildForDetails(null)}
        title={selectedBuildForDetails?.title || ''}
        description={selectedBuildForDetails?.tagline}
        maxWidth="lg"
      >
        {selectedBuildForDetails && (
          <div className="space-y-5 text-left text-xs">
            {/* Stage and Terms bar */}
            <div className="p-3 bg-[var(--color-surface-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 font-mono">
              <div>Stage: <strong className="text-[var(--color-text-primary)]">{selectedBuildForDetails.stage}</strong></div>
              <div>Terms: <strong className="text-[var(--color-text-primary)]">{selectedBuildForDetails.equityOrTerms}</strong></div>
              <div>Commitment: <strong className="text-[var(--color-text-primary)]">{selectedBuildForDetails.hoursPerWeek}</strong></div>
            </div>

            {/* Problem & Vision */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm text-[var(--color-text-primary)]">About this Project</h4>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {selectedBuildForDetails.description}
              </p>
            </div>

            {/* Open Roles */}
            {selectedBuildForDetails.neededRoles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[var(--color-text-primary)]">Open Roles Needed</h4>
                <div className="space-y-1.5">
                  {selectedBuildForDetails.neededRoles.map(r => (
                    <div key={r.role} className="p-2.5 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[var(--color-text-primary)]">{r.role}</div>
                        <div className="text-[11px] text-[var(--color-text-muted)]">Skills: {r.skills.join(', ')}</div>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--color-brand-accent)]">{r.commitment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Team */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[var(--color-text-primary)]">Team Members</h4>
              <div className="flex items-center gap-3">
                {selectedBuildForDetails.team.map(member => (
                  <div key={member.userId} className="flex items-center gap-2 p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                    <img src={member.userAvatar} alt={member.userName} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-[var(--color-text-primary)] leading-tight">{member.userName}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-3 pt-2 border-t border-[var(--color-border)]">
              {selectedBuildForDetails.demoUrl && (
                <a
                  href={selectedBuildForDetails.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--color-brand-accent)] hover:underline font-mono"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedBuildForDetails.repoUrl && (
                <a
                  href={selectedBuildForDetails.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:underline font-mono"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--color-border)]">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedBuildForDetails(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  addToast(`Application request initiated for ${selectedBuildForDetails.title}!`, 'success');
                  setSelectedBuildForDetails(null);
                }}
              >
                Apply / Start Trial
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
