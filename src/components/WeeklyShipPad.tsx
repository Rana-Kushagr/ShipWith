import React, { useState } from 'react';
import { 
  Trophy, 
  ExternalLink, 
  Flame, 
  ChevronUp, 
  CreditCard, 
  Bug, 
  MessageSquare, 
  Share2, 
  Calendar, 
  CheckCircle2, 
  UserPlus,
  Send,
  Rocket
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WeeklyShipPad: React.FC = () => {
  const { 
    shipPadItems, 
    voteShipPadItem, 
    openChatWithBuilder, 
    addToast,
    setSelectedBuilderId,
    setIsPostBuildOpen
  } = useApp();

  const [selectedWeek, setSelectedWeek] = useState<number>(42);
  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  const filteredItems = shipPadItems.filter((i) => i.week === selectedWeek);

  const handleShare = (item: any) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Check out ${item.title} on ShipWith ShipPad! https://rana-kushagr.github.io/ShipWith/`);
      addToast(`Copied launch link for ${item.title} to clipboard!`, 'success');
    }
  };

  const handleSendFeedback = (itemId: string) => {
    if (!feedbackInput.trim()) return;
    voteShipPadItem(itemId, 'feedback');
    addToast('Feedback sent directly to the build team!', 'success');
    setFeedbackInput('');
    setActiveFeedbackId(null);
  };

  return (
    <div className="space-y-6 text-white">
      {/* ShipPad Leaderboard Header */}
      <div className="bg-[#0C0C0E] rounded-xl border border-[var(--border-crisp)] p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-white bg-[#141418] px-2.5 py-0.5 rounded-full border border-[var(--border-crisp)]">
                PEERLIST LAUNCHPAD ARCHITECTURE
              </span>
            </div>
            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white mt-1.5 flex items-center gap-2">
              Weekly ShipPad Leaderboard
              <Trophy className="w-5 h-5 text-white inline" />
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Top peer-voted products shipped by ShipWith collaborative trial teams this week. Real products, real builder reputation.
            </p>
          </div>

          {/* Week Selector Pills */}
          <div className="flex items-center gap-2 bg-[#141418] p-1 rounded-lg border border-[var(--border-crisp)] self-start md:self-auto">
            {[42, 41, 40].map((week) => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedWeek === week
                    ? 'bg-white text-[#050506] shadow-xs font-bold border border-white'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
              >
                Week {week} {week === 42 && '(Active)'}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[var(--border-crisp)]">
          <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Ships Ranked</span>
            <span className="text-lg font-bold font-mono text-white mt-0.5 block">{filteredItems.length} Products</span>
          </div>
          <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Total Tried It</span>
            <span className="text-lg font-bold font-mono text-[#00D659] mt-0.5 block">
              {filteredItems.reduce((acc, i) => acc + i.triedCount, 0)} votes
            </span>
          </div>
          <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Would Pay Signal</span>
            <span className="text-lg font-bold font-mono text-white mt-0.5 block">
              {filteredItems.reduce((acc, i) => acc + i.wouldPayCount, 0)} buyers
            </span>
          </div>
          <div className="bg-[#141418] p-3 rounded-lg border border-[var(--border-crisp)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Verified Teams</span>
            <span className="text-lg font-bold font-mono text-white mt-0.5 block">100% Proven</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Product Cards or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="glow-card-perimeter p-8 sm:p-12 text-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            No launches submitted for Week {selectedWeek} yet
          </h2>
          <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
            There are no products posted to Week {selectedWeek} in this clean environment. Post your build or complete a 5-day trial sprint to launch on ShipPad.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsPostBuildOpen(true)}
              className="bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>+ Post a Build</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isTopThree = item.rank <= 3;
            const rankColors = [
              'bg-white text-[#050506] border-white font-extrabold',
              'bg-[#141418] text-white border-white/50 font-bold',
              'bg-[#141418] text-zinc-300 border-[var(--border-crisp)] font-medium'
            ];

            return (
              <div
                key={item.id}
                className={`bg-[#0C0C0E] rounded-xl border transition-all duration-200 p-6 shadow-[var(--shadow-card)] hover:border-white/30 ${
                  item.rank === 1 ? 'ring-1 ring-white/30' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  {/* Left: Rank + Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Rank Badge */}
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-9 h-9 rounded-lg font-mono text-sm flex items-center justify-center border shadow-2xs ${
                          isTopThree ? rankColors[item.rank - 1] : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)]'
                        }`}
                      >
                        #{item.rank}
                      </span>
                      {item.rank === 1 && (
                        <span className="text-[10px] font-mono font-bold text-white mt-1 flex items-center gap-0.5">
                          <Flame className="w-3 h-3 fill-white text-white" />
                          #1 Ship
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white hover:text-zinc-200 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono font-medium bg-[#141418] text-[var(--text-secondary)] px-2.5 py-0.5 rounded-full border border-[var(--border-crisp)]">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Week {item.week}, {item.year}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
                        {item.tagline}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Team Collaborators with Role Pills */}
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-[var(--text-muted)]">Built by:</span>
                        <div className="flex flex-wrap items-center gap-2">
                          {item.contributors.map((c, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (c.handle === '@kushagr') setSelectedBuilderId('builder-kushagr');
                                else if (c.handle === '@maya_ux') setSelectedBuilderId('builder-maya');
                                else if (c.handle === '@arjun_v') setSelectedBuilderId('builder-arjun');
                                else if (c.handle === '@ananya_ai') setSelectedBuilderId('builder-ananya');
                                else addToast(`Viewing profile of ${c.name} (${c.role})`, 'info');
                              }}
                              className="inline-flex items-center gap-1.5 bg-[#141418] hover:bg-[#1A1A22] border border-[var(--border-crisp)] px-2 py-0.5 rounded-full text-xs transition-colors cursor-pointer"
                            >
                              <img src={c.avatar} alt={c.name} className="w-4 h-4 rounded-full object-cover" />
                              <span className="font-medium text-white">{c.name}</span>
                              <span className="text-[10px] font-mono text-[var(--text-muted)]">({c.role})</span>
                              <CheckCircle2 className="w-3 h-3 text-[#00D659]" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions & Links */}
                  <div className="flex sm:flex-row lg:flex-col items-center lg:items-end gap-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#050506] bg-white hover:bg-zinc-200 border border-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {item.repoUrl && (
                        <a
                          href={item.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--text-secondary)] bg-[#141418] hover:bg-[#1A1A22] border border-[var(--border-crisp)] px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>Code</span>
                        </a>
                      )}
                      <button
                        onClick={() => handleShare(item)}
                        title="Share launch"
                        className="p-1.5 rounded-lg border border-[var(--border-crisp)] text-[var(--text-muted)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* High-Signal Action Buttons */}
                <div className="mt-5 pt-4 border-t border-[var(--border-crisp)] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Tried It (Primary Upvote) */}
                    <button
                      onClick={() => voteShipPadItem(item.id, 'tried')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${
                        item.userVoted?.tried
                          ? 'bg-white text-[#050506] border-white shadow-xs font-bold'
                          : 'bg-[#141418] text-white border-[var(--border-crisp)] hover:border-white/40'
                      }`}
                    >
                      <ChevronUp className={`w-3.5 h-3.5 ${item.userVoted?.tried ? 'stroke-[2.5px]' : ''}`} />
                      <span>▲ Tried It</span>
                      <span className={`px-1.5 py-0.5 rounded text-[11px] ${item.userVoted?.tried ? 'bg-black/20 font-bold' : 'bg-[#0C0C0E] text-[var(--text-secondary)]'}`}>
                        {item.triedCount}
                      </span>
                    </button>

                    {/* Would Pay */}
                    <button
                      onClick={() => voteShipPadItem(item.id, 'wouldPay')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border cursor-pointer ${
                        item.userVoted?.wouldPay
                          ? 'bg-white text-[#050506] border-white shadow-xs font-bold'
                          : 'bg-[#141418] text-white border-[var(--border-crisp)] hover:border-white/40'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>💳 Would Pay</span>
                      <span className={`px-1.5 py-0.5 rounded text-[11px] ${item.userVoted?.wouldPay ? 'bg-black/20 font-bold' : 'bg-[#0C0C0E] text-[var(--text-secondary)]'}`}>
                        {item.wouldPayCount}
                      </span>
                    </button>

                    {/* Found a Bug */}
                    <button
                      onClick={() => voteShipPadItem(item.id, 'bug')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer ${
                        item.userVoted?.bug
                          ? 'bg-white text-[#050506] border-white shadow-xs font-bold'
                          : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:border-white/40 hover:text-white'
                      }`}
                    >
                      <Bug className="w-3.5 h-3.5" />
                      <span>🐛 Bug</span>
                      <span className={`px-1.5 py-0.5 rounded text-[11px] ${item.userVoted?.bug ? 'bg-black/20 font-bold' : 'bg-[#0C0C0E]'}`}>
                        {item.bugCount}
                      </span>
                    </button>

                    {/* Give Feedback */}
                    <button
                      onClick={() => setActiveFeedbackId(activeFeedbackId === item.id ? null : item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border cursor-pointer ${
                        activeFeedbackId === item.id
                          ? 'bg-white text-[#050506] border-white font-bold'
                          : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:border-white/40 hover:text-white'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>💬 Feedback</span>
                      <span className="bg-[#0C0C0E] px-1.5 py-0.5 rounded text-[11px]">
                        {item.feedbackCount}
                      </span>
                    </button>
                  </div>

                  {/* Collaborate CTA */}
                  <button
                    onClick={() => {
                      const firstBuilder = item.contributors[0];
                      if (firstBuilder) {
                        openChatWithBuilder(firstBuilder.handle, `Hey! Loved seeing ${item.title} on ShipPad. I'd love to collaborate on the next release.`);
                      } else {
                        voteShipPadItem(item.id, 'collaborate');
                        addToast('Collaboration request sent to the team!', 'success');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white hover:bg-zinc-200 text-[#050506] border border-white transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>🤝 Collaborate</span>
                    <span className="bg-black/20 px-1.5 py-0.5 rounded text-[11px]">{item.collaborateCount}</span>
                  </button>
                </div>

                {/* Inline Feedback Drawer */}
                {activeFeedbackId === item.id && (
                  <div className="mt-4 pt-3 border-t border-[var(--border-crisp)] bg-[#141418] -mx-6 -mb-6 p-4 rounded-b-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white">
                        Direct Feedback to {item.title} Builders:
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        Private message to team
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendFeedback(item.id);
                        }}
                        placeholder="e.g. Loved the speed! On mobile Safari the nav bar overflowed slightly..."
                        className="flex-1 bg-[#0C0C0E] border border-[var(--border-crisp)] rounded-lg px-3 py-2 text-xs text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white font-mono"
                      />
                      <button
                        onClick={() => handleSendFeedback(item.id)}
                        className="bg-white hover:bg-zinc-200 text-[#050506] px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send</span>
                      </button>
                    </div>

                    {/* Previous comments preview */}
                    {item.comments && item.comments.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {item.comments.map((c) => (
                          <div key={c.id} className="bg-[#0C0C0E] p-2.5 rounded-lg border border-[var(--border-crisp)] text-xs flex items-start gap-2">
                            <img src={c.avatar} alt={c.author} className="w-5 h-5 rounded-full object-cover mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-white">{c.author}</span>
                                <span className="text-[10px] font-mono text-[var(--text-muted)]">{c.time}</span>
                              </div>
                              <p className="text-[var(--text-secondary)] mt-0.5">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
