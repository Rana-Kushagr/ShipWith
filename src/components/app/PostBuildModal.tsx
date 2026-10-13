import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { BuildStage, CommitmentOption } from '../../types';

export const PostBuildModal: React.FC = () => {
  const { isPostBuildOpen, setIsPostBuildOpen, createBuild, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState<BuildStage>('Building MVP');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Tailwind');
  const [rolesNeededInput, setRolesNeededInput] = useState('Frontend Engineer, UI/UX Designer');
  const [hours, setHours] = useState<CommitmentOption>('10–20 hrs/week');
  const [equityOrTerms, setEquityOrTerms] = useState('Equal equity split for core team');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const neededRoles = rolesNeededInput.split(',').map(r => ({
        role: r.trim(),
        skills: ['Relevant skills'],
        commitment: hours,
        filled: false
      })).filter(r => r.role.length > 0);

      const techStack = techStackInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

      createBuild({
        title: title.trim(),
        tagline: tagline.trim(),
        description: description.trim() || tagline.trim(),
        stage,
        creatorId: currentUser.id,
        creatorName: currentUser.name,
        creatorAvatar: currentUser.avatar,
        neededRoles,
        techStack,
        team: [
          { userId: currentUser.id, userName: currentUser.name, userAvatar: currentUser.avatar, role: 'Founder', confirmed: true }
        ],
        hoursPerWeek: hours,
        isRemote: true,
        equityOrTerms,
        demoUrl: demoUrl.trim() || undefined,
        repoUrl: repoUrl.trim() || undefined
      });

      setIsSubmitting(false);
      setIsPostBuildOpen(false);
      // Reset form
      setTitle('');
      setTagline('');
      setDescription('');
    }, 400);
  };

  return (
    <Modal
      isOpen={isPostBuildOpen}
      onClose={() => setIsPostBuildOpen(false)}
      title="Post a Build"
      description="Create a central Build record. This links your post, team recruiting, workspace, and future Ship."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
        {/* Project Name & Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Project / Startup Name
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Developer Workflow Automation"
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Current Stage
            </label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as BuildStage)}
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            >
              <option value="Idea & Validation">Idea & Validation</option>
              <option value="Building MVP">Building MVP</option>
              <option value="Beta Testing">Beta Testing</option>
              <option value="Live & Monetizing">Live & Monetizing</option>
            </select>
          </div>
        </div>

        {/* One-Line Pitch */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
            One-Line Pitch / Tagline
          </label>
          <input
            type="text"
            required
            value={tagline}
            onChange={e => setTagline(e.target.value)}
            placeholder="e.g. AI-assisted companion helping STEM students master coursework"
            className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
            What are you building? (Problem & Solution)
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Explain what the product does and why someone should build it with you..."
            className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
          />
        </div>

        {/* Roles needed & Tech stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Roles Needed (comma-separated)
            </label>
            <input
              type="text"
              value={rolesNeededInput}
              onChange={e => setRolesNeededInput(e.target.value)}
              placeholder="e.g. Frontend Engineer, UI/UX Designer"
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Tech Stack & Tools
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={e => setTechStackInput(e.target.value)}
              placeholder="e.g. React, Next.js, Supabase, Tailwind"
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>
        </div>

        {/* Commitment & Terms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Weekly Commitment Expected
            </label>
            <select
              value={hours}
              onChange={e => setHours(e.target.value as CommitmentOption)}
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            >
              <option value="< 5 hrs/week">&lt; 5 hrs/week</option>
              <option value="5–10 hrs/week">5–10 hrs/week</option>
              <option value="10–20 hrs/week">10–20 hrs/week</option>
              <option value="20+ hrs/week">20+ hrs/week</option>
              <option value="Full-time">Full-time</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Equity / Collaboration Model
            </label>
            <input
              type="text"
              value={equityOrTerms}
              onChange={e => setEquityOrTerms(e.target.value)}
              placeholder="e.g. Equal equity split / Revenue share"
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>
        </div>

        {/* Demo & Repo links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Live Demo Link (Optional)
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={e => setDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              GitHub Repo (Optional)
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={e => setRepoUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--color-border)]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsPostBuildOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            disabled={!title.trim() || !tagline.trim()}
          >
            Publish Build
          </Button>
        </div>
      </form>
    </Modal>
  );
};
