import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { 
  CheckSquare, 
  ExternalLink, 
  Code2, 
  Layers, 
  Send, 
  Plus, 
  Sparkles
} from 'lucide-react';

export const WorkspaceView: React.FC = () => {
  const { workspaceTasks, trialBuild, addToast, currentUser } = useApp();
  const [tasks, setTasks] = useState(workspaceTasks);
  const [activeTab, setActiveTab] = useState<'tasks' | 'team' | 'links' | 'chat'>('tasks');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskOwner, setNewTaskOwner] = useState('Lakshit Rana');
  const [dailyStandupText, setDailyStandupText] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Arjun Verma', text: 'Hey Lakshit! Streaming OpenAI route is now tested on local branch.', time: '10:30 AM' },
    { id: '2', sender: 'Lakshit Rana', text: 'Awesome, working on the responsive card flip micro-interactions in Tailwind.', time: '10:45 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'done' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'in_progress';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `tsk_${Date.now()}`,
      title: newTaskTitle.trim(),
      ownerName: newTaskOwner,
      status: 'not_started' as const
    };
    setTasks(prev => [...prev, newTask]);
    addToast('Task added to workspace sprint!', 'success');
    setNewTaskTitle('');
    setIsAddTaskOpen(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, {
      id: String(Date.now()),
      sender: currentUser.name,
      text: chatInput,
      time: 'Just now'
    }]);
    setChatInput('');
  };

  const handleDailyStandup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyStandupText.trim()) return;
    addToast('Daily standup recorded! Team progress updated.', 'success');
    setDailyStandupText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      
      {/* Workspace Header & Trial Status Bar */}
      <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                {trialBuild.buildTitle} — Build Room
              </h1>
              <Badge variant="warning" size="sm">5-Day Trial Collaboration</Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Lightweight team alignment container. Connected to repo, tasks, and Ship proof.
            </p>
          </div>

          {/* Trial Decision Controls (PRD TRIAL-02) */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => addToast('Feedback recorded: Trial completed smoothly!', 'info')}
            >
              End Trial
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToast('Decision recorded: Continue building together!', 'success')}
            >
              Continue Together ✓
            </Button>
          </div>
        </div>

        {/* Weekly Objective Card */}
        <div className="p-3.5 bg-[var(--color-surface-subtle)] rounded-[var(--radius-md)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase">Weekly Sprint Objective:</span>
            <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">{trialBuild.objective}</div>
          </div>
          <div className="font-mono text-[11px] text-[var(--color-text-muted)]">
            Timeline: {trialBuild.startDate} – {trialBuild.endDate}
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] pb-2">
        {[
          { id: 'tasks', label: 'Tasks & Checklist', count: tasks.length },
          { id: 'chat', label: 'Team Chat', count: messages.length },
          { id: 'team', label: 'Collaborators', count: trialBuild.participants.length },
          { id: 'links', label: 'Links & Demos' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-1.5 opacity-80 font-mono text-[10px]">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Tasks & Standup */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
                Sprint Task Roster
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddTaskOpen(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Task
              </Button>
            </div>

            <div className="space-y-2">
              {tasks.map(task => {
                const isDone = task.status === 'done';
                return (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs flex items-center justify-between gap-3 hover:border-[var(--color-border-strong)] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-brand-accent)]"
                        aria-label="Toggle task status"
                      >
                        <CheckSquare className={`w-4 h-4 ${isDone ? 'text-[var(--color-success)]' : ''}`} />
                      </button>
                      <div>
                        <div className={`text-xs font-semibold text-[var(--color-text-primary)] ${isDone ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </div>
                        {task.ownerName && (
                          <div className="text-[10px] text-[var(--color-text-muted)] font-mono mt-0.5">
                            Assigned to: {task.ownerName}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isDone 
                        ? 'bg-[var(--color-success-subtle)] text-[var(--color-success)]'
                        : task.status === 'in_progress'
                        ? 'bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)]'
                        : 'bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)]'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Standup Box (PRD WORK-03) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--color-brand-accent)]" />
                <h3 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider font-mono">
                  Daily Check-in
                </h3>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Keep the team in sync. What did you ship or learn today?
              </p>
              <form onSubmit={handleDailyStandup} className="space-y-2">
                <textarea
                  rows={3}
                  value={dailyStandupText}
                  onChange={e => setDailyStandupText(e.target.value)}
                  placeholder="e.g. Completed Vercel deployment preview and tested token latency..."
                  className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none resize-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full"
                  disabled={!dailyStandupText.trim()}
                >
                  Record Update
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Team Chat */}
      {activeTab === 'chat' && (
        <div className="max-w-2xl mx-auto p-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
          <div className="h-64 overflow-y-auto space-y-3 p-2">
            {messages.map(m => (
              <div key={m.id} className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                  <span className="font-bold text-[var(--color-text-primary)]">{m.sender}</span>
                  <span>{m.time}</span>
                </div>
                <div className="text-[var(--color-text-secondary)]">{m.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Send message to build room..."
              className="flex-1 text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
            <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
              Send
            </Button>
          </form>
        </div>
      )}

      {/* Tab 3: Team */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {trialBuild.participants.map(p => (
            <div key={p.userId} className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">{p.name}</div>
                <div className="text-xs text-[var(--color-text-muted)] font-mono">{p.role}</div>
              </div>
              <Badge variant="success" size="sm">Active Member</Badge>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Links */}
      {activeTab === 'links' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://github.com/campus-ai"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all flex items-center gap-3 text-xs"
          >
            <Code2 className="w-5 h-5 text-[var(--color-text-primary)]" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">GitHub Repository</div>
              <div className="text-[11px] text-[var(--color-text-muted)] font-mono">github.com/campus-ai</div>
            </div>
          </a>

          <a
            href="https://figma.com/@campus-ai"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all flex items-center gap-3 text-xs"
          >
            <Layers className="w-5 h-5 text-[var(--color-text-primary)]" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">Figma Design Specs</div>
              <div className="text-[11px] text-[var(--color-text-muted)] font-mono">figma.com/@campus-ai</div>
            </div>
          </a>

          <a
            href="https://campus-ai.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all flex items-center gap-3 text-xs"
          >
            <ExternalLink className="w-5 h-5 text-[var(--color-brand-accent)]" />
            <div>
              <div className="font-bold text-[var(--color-text-primary)]">Vercel Live Preview</div>
              <div className="text-[11px] text-[var(--color-text-muted)] font-mono">campus-ai.vercel.app</div>
            </div>
          </a>
        </div>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title="Add Task to Workspace"
        description="Keep tasks scoped and clear for team execution."
      >
        <form onSubmit={handleAddTask} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Task Title
            </label>
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Implement user login session error recovery..."
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Assignee
            </label>
            <select
              value={newTaskOwner}
              onChange={e => setNewTaskOwner(e.target.value)}
              className="w-full text-xs p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
            >
              <option value="Lakshit Rana">Lakshit Rana (You)</option>
              <option value="Arjun Verma">Arjun Verma</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--color-border)]">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
