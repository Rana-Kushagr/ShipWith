import React, { useState } from 'react';
import { 
  Trophy, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Zap, 
  Flame,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WeeklyShipPad } from '../WeeklyShipPad';

export const ActionFeed: React.FC = () => {
  const { 
    currentUser, 
    activeShipPadTab, 
    setActiveShipPadTab, 
    openChatWithBuilder, 
    addToast,
    feedPosts,
    setIsPostBuildOpen
  } = useApp();

  const [posts, setPosts] = useState<any[]>(feedPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newPostText, setNewPostText] = useState<string>('');
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostType, setNewPostType] = useState<string>('Building');

  // Keep posts in sync with context feedPosts
  React.useEffect(() => {
    setPosts(feedPosts);
  }, [feedPosts]);

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return (p.type || '').toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostText.trim()) {
      addToast('Please enter both title and content for your post.', 'warning');
      return;
    }

    const created = {
      id: `post-${Date.now()}`,
      type: newPostType,
      author: {
        name: currentUser.name || 'Builder',
        handle: currentUser.handle || `@${currentUser.username}`,
        avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: currentUser.role || 'Fullstack Builder'
      },
      title: newPostTitle,
      content: newPostText,
      tags: ['Building', 'ShipWith'],
      repliesCount: 0,
      createdAt: 'Just now'
    };

    setPosts([created, ...posts]);
    setNewPostTitle('');
    setNewPostText('');
    addToast('Post published to the Builder Feed!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[var(--text-primary)]">
      {/* Top Main Mode Toggle: Weekly ShipPad vs Builder Feed */}
      <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-2 shadow-[var(--shadow-card)] flex items-center justify-between gap-2">
        <div className="grid grid-cols-2 gap-2 w-full font-mono text-xs">
          <button
            onClick={() => setActiveShipPadTab('shippad')}
            className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeShipPadTab === 'shippad'
                ? 'bg-white text-[#050506] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Weekly ShipPad Leaderboard (Week 42)</span>
          </button>

          <button
            onClick={() => setActiveShipPadTab('feed')}
            className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeShipPadTab === 'feed'
                ? 'bg-white text-[#050506] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
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
          <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-[var(--border-crisp)]"
              />
              <div>
                <span className="font-bold text-xs text-white block">
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
                        ? 'bg-white text-[#050506] border-white font-bold'
                        : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:border-white hover:text-white'
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
                className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white"
              />

              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What are you building, what's the trial scope, and what exact skills do you need?"
                className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl p-3 text-xs text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white font-mono resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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
                    ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                    : 'bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Updates' : cat}
              </button>
            ))}
          </div>

          {/* Feed Posts List or Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="glow-card-perimeter p-8 sm:p-12 text-center my-6">
              <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Flame className="w-7 h-7 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                No feed updates yet
              </h2>
              <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
                Publish the first update above or create a new build to share your roadmap and request trial sprint collaborators.
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setIsPostBuildOpen(true)}
                  className="bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Post a Build</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3.5"
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
                          <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-white">
                            {post.author.name}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" />
                          <span className="text-xs font-mono text-[var(--text-muted)]">{post.author.handle}</span>
                        </div>
                        <span className="text-xs font-mono text-[var(--text-secondary)]">
                          {post.author.role} · {post.createdAt}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                      post.type === 'Need Teammate'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : post.type === 'Shipped'
                        ? 'bg-[#00D659]/10 text-[#00D659] border-[#00D659]/30'
                        : 'bg-[#141418] text-[#2DD4BF] border-[#2DD4BF]/30'
                    }`}>
                      {post.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-white">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed font-sans">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t: string, idx: number) => (
                        <span key={idx} className="text-[10px] font-mono bg-[#141418] text-[var(--text-muted)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-[var(--border-crisp)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[var(--text-muted)] flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.repliesCount || 0} replies</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openChatWithBuilder(post.author.handle, `Hi ${post.author.name}! Reaching out regarding your post "${post.title}".`)}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border-crisp)] text-[var(--text-secondary)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
                      >
                        Message
                      </button>

                      <button
                        onClick={() => {
                          openChatWithBuilder(
                            post.author.handle,
                            `Hi ${post.author.name}! I would love to join your build on a 5-day trial sprint.`,
                            `Trial Collaboration Request`
                          );
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-[#050506] font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 text-[#00D659]" />
                        <span>Start Trial</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
