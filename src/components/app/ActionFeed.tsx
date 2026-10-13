import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Send, 
  MessageCircle, 
  ExternalLink, 
  DollarSign
} from 'lucide-react';
import type { PostType } from '../../types';

export const ActionFeed: React.FC = () => {
  const { feedPosts, currentUser, addToast, setCurrentView } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [newPostText, setNewPostText] = useState('');
  const [newPostType, setNewPostType] = useState<PostType>('building');

  const filteredPosts = feedPosts.filter(p => {
    if (selectedFilter === 'all') return true;
    return p.type === selectedFilter;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    addToast('Your update has been posted to the feed!', 'success');
    setNewPostText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Builder & Founder Feed
        </h1>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Action-oriented updates from founders and creators. No corporate fluff, just real work.
        </p>
      </div>

      {/* Composer Card */}
      <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-[var(--color-border)]"
          />
          <div className="flex-1">
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">
              Share what you are building or who you need
            </span>
          </div>
        </div>

        <form onSubmit={handlePostSubmit} className="space-y-3">
          <textarea
            rows={3}
            value={newPostText}
            onChange={e => setNewPostText(e.target.value)}
            placeholder="e.g. Building an AI vector search tool. Looking for a frontend developer who can commit 5-10 hrs/week..."
            className="w-full text-xs p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Post Type Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">Type:</span>
              {(['building', 'need_teammate', 'need_feedback', 'shipped'] as PostType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setNewPostType(type)}
                  className={`text-[11px] px-2.5 py-1 rounded-[var(--radius-sm)] font-mono transition-colors cursor-pointer ${
                    newPostType === type
                      ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] font-semibold'
                      : 'bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!newPostText.trim()}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Post Update
            </Button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Posts' },
          { id: 'need_teammate', label: 'Need Teammates' },
          { id: 'building', label: 'Work in Progress' },
          { id: 'shipped', label: 'Shipped Launches' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === filter.id
                ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)]'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isShipped = post.type === 'shipped';

          return (
            <article
              key={post.id}
              className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4"
            >
              {/* Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[var(--color-border)]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[var(--color-text-primary)]">
                      {post.author.name}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {post.author.role} • {post.createdAt}
                    </div>
                  </div>
                </div>

                <Badge variant={isShipped ? 'success' : 'accent'} size="sm">
                  {post.type.replace('_', ' ')}
                </Badge>
              </div>

              {/* Title & Body */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-[var(--color-text-primary)]">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {post.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)]">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Action Buttons specific to post type (PRD FEED-02) */}
              <div className="pt-3 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentView('messages')}
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {isShipped ? (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => addToast('Signal recorded: You tested this demo!', 'info')}
                      >
                        Tried It
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => addToast('Signal recorded: Would Pay for this!', 'success')}
                        leftIcon={<DollarSign className="w-3.5 h-3.5" />}
                      >
                        Would Pay
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          if (post.metadata?.demoUrl) {
                            window.open(post.metadata.demoUrl, '_blank');
                          } else {
                            addToast('No demo link attached to this update.', 'info');
                          }
                        }}
                        rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      >
                        Try Product
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentView('startups')}
                      >
                        View Startup
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToast(`Application sent to ${post.author.name}!`, 'success')}
                      >
                        Apply / Join
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-subtle)] border border-[var(--color-border)] mx-auto flex items-center justify-center text-[var(--color-brand-accent)]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">No updates posted yet</h3>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
              Use the composer above to share what you are building, request feedback, or announce looking for teammates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
