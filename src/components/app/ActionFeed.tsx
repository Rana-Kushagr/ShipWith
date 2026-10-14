import React, { useState } from 'react';
import { 
  Trophy, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Zap, 
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WeeklyShipPad } from '../WeeklyShipPad';
import type { SeedFeedPost } from '../../data/seedData';
import { SEED_FEED_POSTS } from '../../data/seedData';

export const ActionFeed: React.FC = () => {
  const { 
    currentUser, 
    activeShipPadTab, 
    setActiveShipPadTab, 
    openChatWithBuilder, 
    setSelectedStartupId,
    addToast 
  } = useApp();

  const [posts, setPosts] = useState<SeedFeedPost[]>(SEED_FEED_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newPostText, setNewPostText] = useState<string>('');
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostType, setNewPostType] = useState<SeedFeedPost['type']>('Building');

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.type.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostText.trim()) {
      addToast('Please enter both title and content for your post.', 'warning');
      return;
    }

    const created: SeedFeedPost = {
      id: `post-${Date.now()}`,
      type: newPostType,
      author: {
        name: currentUser.name || 'Kushagr Rana',
        handle: currentUser.handle || '@kushagr',
        avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: currentUser.role || 'Full-Stack Builder'
      },
      title: newPostTitle,
      content: newPostText,
      tags: ['React', 'Next.js', 'Collaboration'],
      repliesCount: 0,
      createdAt: 'Just now'
    };

    setPosts([created, ...posts]);
    setNewPostTitle('');
    setNewPostText('');
    addToast('Post published to the Builder Feed!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Main Mode Toggle: Weekly ShipPad vs Builder Feed */}
      <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-2 shadow-[var(--shadow-card)] flex items-center justify-between gap-2">
        <div className="grid grid-cols-2 gap-2 w-full font-mono text-xs">
          <button
            onClick={() => setActiveShipPadTab('shippad')}
            className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeShipPadTab === 'shippad'
                ? 'bg-[#1A5052] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Weekly ShipPad Leaderboard (Week 42)</span>
          </button>

          <button
            onClick={() => setActiveShipPadTab('feed')}
            className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeShipPadTab === 'feed'
                ? 'bg-[#1A5052] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
            }`}
          >
            <Flame className="w-4 h-4 text-[#D94E1F]" />
            <span>Action-Oriented Builder Feed</span>
          </button>
        </div>
      </div>

      {/* RENDER CHOSEN TAB */}
      {activeShipPadTab === 'shippad' ? (
        <WeeklyShipPad />
      ) : (
        <div className="space-y-6">
          {/* Post Composer */}
          <div className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-[var(--border-crisp)]"
              />
              <div>
                <span className="font-bold text-xs text-[var(--text-primary)] block">
                  Post a Build Update or Teammate Request
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Actionable updates only. Reach active collaborators directly.
                </span>
              </div>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(['Building', 'Need Teammate', 'Need Help', 'Need Users', 'Need Feedback', 'Shipped'] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setNewPostType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                      newPostType === type
                        ? 'bg-[#1A5052] text-white border-[#12393B] font-bold'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:border-[#1A5052]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Brief title: e.g. Looking for a React 19 dev for 5-day trial sprint..."
                className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-3.5 py-2 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[#1A5052]"
              />

              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What are you building, what's the trial scope, and what exact skills do you need?"
                className="w-full bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[#1A5052] font-mono resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1A5052] hover:bg-[#12393B] text-white px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Update</span>
                </button>
              </div>
            </form>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
            <span className="text-[var(--text-muted)] shrink-0">Filter:</span>
            {['all', 'Building', 'Need Teammate', 'Need Help', 'Need Users', 'Need Feedback', 'Shipped'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg border transition-all shrink-0 cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#1A5052] text-white border-[#12393B] font-bold shadow-2xs'
                    : 'bg-white hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-crisp)]'
                }`}
              >
                {cat === 'all' ? 'All Updates' : cat}
              </button>
            ))}
          </div>

          {/* Feed Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3.5"
              >
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                          {post.author.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA45]" />
                        <span className="text-xs font-mono text-[var(--text-muted)]">{post.author.handle}</span>
                      </div>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {post.author.role} · {post.createdAt}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    post.type === 'Need Teammate'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : post.type === 'Shipped'
                      ? 'bg-[#E8F8EE] text-[#00AA45] border-[#C6F0D6]'
                      : 'bg-[var(--bg-selected)] text-[#0D9488] border-[#BCE5DC]'
                  }`}>
                    {post.type}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed font-sans">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-muted)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Open roles needed badge if present */}
                {post.rolesNeeded && post.rolesNeeded.length > 0 && (
                  <div className="p-2.5 bg-[var(--bg-canvas)] rounded-lg border border-[var(--border-crisp)] text-xs font-mono">
                    <span className="font-bold text-[#1A5052] block mb-1">Roles Needed:</span>
                    <div className="flex flex-wrap gap-2">
                      {post.rolesNeeded.map((r, idx) => (
                        <span key={idx} className="bg-white text-[var(--text-primary)] px-2 py-0.5 rounded border border-[var(--border-crisp)] text-[11px]">
                          • {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 border-t border-[var(--border-crisp)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-[var(--text-muted)] flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.repliesCount} replies</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openChatWithBuilder(post.author.handle, `Hi ${post.author.name}! Reaching out regarding your post "${post.title}".`)}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border-crisp)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
                    >
                      Message
                    </button>

                    {post.startupName && (
                      <button
                        onClick={() => {
                          if (post.startupName?.includes('PulseAI')) setSelectedStartupId('startup-pulseai');
                          else if (post.startupName?.includes('LayerMint')) setSelectedStartupId('startup-layermint');
                          else setSelectedStartupId('startup-pulseai');
                        }}
                        className="px-3 py-1.5 rounded-lg border border-[#BCE5DC] bg-[var(--simplify-teal-soft)] text-[#1A5052] hover:bg-[#D5EFEA] transition-colors cursor-pointer"
                      >
                        View Startup
                      </button>
                    )}

                    <button
                      onClick={() => {
                        openChatWithBuilder(
                          post.author.handle,
                          `Hi ${post.author.name}! I would love to join your build on a 5-day trial sprint.`,
                          `Trial Collaboration Request`
                        );
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1A5052] hover:bg-[#12393B] text-white font-bold transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 text-[#34D399]" />
                      <span>Start Trial</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
