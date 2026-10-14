import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagesView: React.FC = () => {
  const { 
    messagesThreads, 
    activeThreadId, 
    setActiveThreadId, 
    sendMessageToThread,
    startTrialSprintWithStartup
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');

  const currentThread = messagesThreads.find(t => t.id === activeThreadId) || messagesThreads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessageToThread(currentThread.id, inputMessage);
    setInputMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-card)] overflow-hidden h-[750px] flex flex-col md:flex-row">
        {/* Left: Threads List (w-80) */}
        <div className="w-full md:w-80 border-r border-[var(--border-crisp)] bg-[var(--bg-canvas)] flex flex-col shrink-0">
          <div className="p-4 border-b border-[var(--border-crisp)] bg-white">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[var(--text-primary)]">
              Direct Messages
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Contextual startup & trial threads
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
                      ? 'bg-white border-l-4 border-[#1A5052]'
                      : 'hover:bg-white/60'
                  }`}
                >
                  <img
                    src={thread.participant.avatar}
                    alt={thread.participant.name}
                    className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                        {thread.participant.name}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {lastMessage ? lastMessage.time : ''}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#1A5052] font-semibold truncate block">
                      {thread.contextStartup ? `${thread.contextStartup} • ${thread.contextStage}` : thread.contextStage}
                    </span>

                    <p className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">
                      {lastMessage ? lastMessage.text : 'Start of conversation'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Shared Context Header */}
          <div className="p-4 border-b border-[var(--border-crisp)] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={currentThread.participant.avatar}
                alt={currentThread.participant.name}
                className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                    {currentThread.participant.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AA45]" />
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
              <span className="text-xs font-mono bg-[var(--bg-selected)] text-[#0D9488] px-2.5 py-1 rounded-lg border border-[#BCE5DC] font-semibold">
                Context: {currentThread.contextStartup} ({currentThread.contextStage})
              </span>
              {currentThread.contextStartup.includes('PulseAI') && (
                <button
                  onClick={() => startTrialSprintWithStartup('startup-pulseai')}
                  className="bg-[#1A5052] hover:bg-[#12393B] text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-[#34D399]" />
                  <span>Start 5-Day Trial</span>
                </button>
              )}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--bg-canvas)]">
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
                    className={`max-w-md p-3.5 rounded-2xl text-xs font-mono leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-[#1A5052] text-white rounded-br-xs'
                        : 'bg-white text-[var(--text-primary)] border border-[var(--border-crisp)] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-crisp)] bg-white flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${currentThread.participant.name}...`}
              className="flex-1 bg-[var(--bg-canvas)] border border-[var(--border-crisp)] rounded-xl px-4 py-2.5 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[#1A5052]"
            />
            <button
              type="submit"
              className="bg-[#1A5052] hover:bg-[#12393B] text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
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
