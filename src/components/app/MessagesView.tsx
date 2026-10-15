import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Zap,
  MessageSquare,
  Users,
  Rocket
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagesView: React.FC = () => {
  const { 
    messagesThreads, 
    activeThreadId, 
    setActiveThreadId, 
    sendMessageToThread,
    startTrialSprintWithStartup,
    setCurrentView
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');

  const currentThread = messagesThreads.find(t => t.id === activeThreadId) || messagesThreads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentThread) return;
    sendMessageToThread(currentThread.id, inputMessage);
    setInputMessage('');
  };

  if (messagesThreads.length === 0 || !currentThread) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glow-card-perimeter bg-[#0C0C0E] rounded-2xl p-12 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto shadow-inner">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              No Direct Messages Yet
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono max-w-md mx-auto leading-relaxed">
              Reach out to vetted builders or startups on the radar to launch your first 5-day collaborative sprint.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <button
              onClick={() => setCurrentView('people')}
              className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Users className="w-4 h-4" />
              <span>Explore Builders</span>
            </button>
            <button
              onClick={() => setCurrentView('startups')}
              className="bg-[#141418] hover:bg-[#1A1A22] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold border border-[var(--border-crisp)] hover:border-white/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Browse Startups</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] shadow-xl overflow-hidden h-[750px] flex flex-col md:flex-row">
        {/* Left: Threads List (w-80) */}
        <div className="w-full md:w-80 border-r border-[var(--border-crisp)] bg-[#0C0C0E] flex flex-col shrink-0">
          <div className="p-4 border-b border-[var(--border-crisp)] bg-[#0C0C0E]">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-white">
              Direct Messages
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Contextual startup & sprint threads
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-crisp)]">
            {messagesThreads.map((thread) => {
              const isSelected = thread.id === currentThread.id;
              const lastMessage = thread.messages[thread.messages.length - 1];
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#141418] border-l-2 border-white'
                      : 'hover:bg-[#141418]/60'
                  }`}
                >
                  <img
                    src={thread.participant.avatar}
                    alt={thread.participant.name}
                    className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white truncate">
                        {thread.participant.name}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {lastMessage ? lastMessage.time : ''}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#00D659] font-semibold truncate block mt-0.5">
                      {thread.contextStartup ? `${thread.contextStartup} • ${thread.contextStage}` : thread.contextStage}
                    </span>

                    <p className="text-[11px] text-[var(--text-secondary)] truncate mt-1">
                      {lastMessage ? lastMessage.text : 'Start of conversation'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation */}
        <div className="flex-1 flex flex-col bg-[#0C0C0E]">
          {/* Shared Context Header */}
          <div className="p-4 border-b border-[var(--border-crisp)] bg-[#0C0C0E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={currentThread.participant.avatar}
                alt={currentThread.participant.name}
                className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-white">
                    {currentThread.participant.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" />
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {currentThread.participant.handle}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-secondary)] font-mono">
                  {currentThread.participant.role}
                </span>
              </div>
            </div>

            {/* Context Actions */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-[#141418] text-white px-2.5 py-1 rounded-lg border border-[var(--border-crisp)] font-semibold">
                Context: {currentThread.contextStartup} ({currentThread.contextStage})
              </span>
              {currentThread.contextStartup?.includes('PulseAI') && (
                <button
                  onClick={() => startTrialSprintWithStartup('startup-pulseai')}
                  className="bg-white hover:bg-zinc-200 text-[#050506] px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Zap className="w-3 h-3 text-[#050506]" />
                  <span>Start 5-Day Trial</span>
                </button>
              )}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#050506]">
            {currentThread.messages.map((msg) => {
              const isMe = msg.sender === 'me';
              const displayName = isMe ? 'You' : currentThread.participant.name;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-mono text-[var(--text-muted)]">
                    <span>{displayName}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs font-mono leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-white text-[#050506] font-medium rounded-br-xs'
                        : 'bg-[#141418] text-white border border-[var(--border-crisp)] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-crisp)] bg-[#0C0C0E] flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${currentThread.participant.name}...`}
              className="flex-1 bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
