import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Send, Rocket, MessageSquare } from 'lucide-react';
import type { UserProfile } from '../../types';

export const MessagesView: React.FC = () => {
  const { builders, currentUser, setCurrentView } = useApp();
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(builders[0] || null);
  const [threads, setThreads] = useState<{ userId: string; messages: { id: string; sender: string; text: string; time: string }[] }[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  if (builders.length === 0 || !selectedUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-left space-y-6">
        <div className="p-10 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] mx-auto flex items-center justify-center">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              No Direct Messages Yet
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              When genuine founders or builders connect with you from the talent radar, apply to your builds, or initiate trial sprints, direct conversations will appear here.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentView('startups')}
              leftIcon={<Rocket className="w-4 h-4" />}
            >
              Explore Startups & Apply
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setCurrentView('people')}
            >
              Discover Builders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentThread = threads.find(t => t.userId === selectedUser.id) || { userId: selectedUser.id, messages: [] };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      sender: currentUser.name,
      text: inputMessage.trim(),
      time: 'Just now'
    };

    setThreads(prev => prev.map(t => {
      if (t.userId === selectedUser.id) {
        return { ...t, messages: [...t.messages, newMsg] };
      }
      return t;
    }));

    setInputMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-left">
      <div className="h-[calc(100vh-140px)] rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex overflow-hidden">
        
        {/* Left: Conversations list */}
        <div className="w-72 sm:w-80 border-r border-[var(--color-border)] flex flex-col shrink-0">
          <div className="p-3.5 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
            {builders.map(builder => {
              const isSelected = selectedUser.id === builder.id;
              return (
                <button
                  key={builder.id}
                  onClick={() => setSelectedUser(builder)}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-[var(--color-surface-subtle)]' : 'hover:bg-[var(--color-surface-hover)]'
                  }`}
                >
                  <img
                    src={builder.avatar}
                    alt={builder.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-[var(--color-border)]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                        {builder.name}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)]">11:12 AM</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] truncate mt-0.5">
                      {builder.headline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Conversation */}
        <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-canvas)]">
          
          {/* Conversation Header with Project Context (PRD MSG-02) */}
          <div className="p-3.5 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-8 h-8 rounded-full object-cover border border-[var(--color-border)]"
              />
              <div>
                <div className="text-xs font-bold text-[var(--color-text-primary)]">
                  {selectedUser.name}
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  {selectedUser.role} • {selectedUser.timezone}
                </div>
              </div>
            </div>

            {/* Context Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-[11px] text-[var(--color-text-muted)] font-mono">
              <Rocket className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
              <span>Context: Direct Collaboration</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {currentThread.messages.map(msg => {
              const isMine = msg.sender === currentUser.name;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-sm sm:max-w-md p-3 rounded-[var(--radius-lg)] text-xs ${
                    isMine
                      ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] rounded-br-xs'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-bl-xs'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Composer Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder={`Message ${selectedUser.name}...`}
              className="flex-1 text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputMessage.trim()}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Send
            </Button>
          </form>

        </div>

      </div>
    </div>
  );
};
