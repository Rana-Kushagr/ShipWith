import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Sparkles, Bug, HelpCircle, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeedbackModal: React.FC = () => {
  const { isFeedbackOpen, setIsFeedbackOpen, submitFeedback } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'feature' | 'bug' | 'question' | 'general'>('general');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'feature', label: 'Suggest a feature', icon: Sparkles, desc: 'What would make ShipWith better for your workflow?' },
    { id: 'bug', label: 'Report a bug', icon: Bug, desc: 'Something not working as expected?' },
    { id: 'question', label: 'Ask a question', icon: HelpCircle, desc: 'Need clarification on how ShipWith works?' },
    { id: 'general', label: 'General feedback', icon: MessageSquare, desc: 'Thoughts on the design, matching, or speed.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitFeedback(selectedCategory, feedbackText);
      setFeedbackText('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <Modal
      isOpen={isFeedbackOpen}
      onClose={() => setIsFeedbackOpen(false)}
      title="Give feedback"
      description="Help us make ShipWith the best platform for tech creators."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`p-3 text-left rounded-[var(--radius-md)] border transition-all cursor-pointer flex items-start gap-2.5 ${
                  isSelected
                    ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface-subtle)] ring-1 ring-[var(--color-brand-primary)]'
                    : 'border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[var(--color-brand-accent)]' : 'text-[var(--color-text-muted)]'}`} />
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text-primary)]">{cat.label}</div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{cat.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Text Input */}
        <div>
          <label htmlFor="feedback-input" className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
            Your notes or details
          </label>
          <textarea
            id="feedback-input"
            rows={4}
            value={feedbackText}
            onChange={e => setFeedbackText(e.target.value)}
            placeholder="Tell us what you experienced or what you'd like to see..."
            className="w-full text-sm p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsFeedbackOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            disabled={!feedbackText.trim()}
          >
            Send Feedback
          </Button>
        </div>
      </form>
    </Modal>
  );
};
