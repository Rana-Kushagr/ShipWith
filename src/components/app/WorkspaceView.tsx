import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Plus, 
  Send, 
  ExternalLink, 
  Award, 
  Rocket, 
  Zap, 
  Code2, 
  Palette, 
  Globe, 
  FileText,
  X,
  Check,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkspaceView: React.FC = () => {
  const { 
    workspaces, 
    activeWorkspaceId, 
    setActiveWorkspaceId, 
    addWorkspaceTask, 
    toggleWorkspaceTaskStatus, 
    addWorkspaceShipLog, 
    sendWorkspaceChatMessage, 
    completeTrialSprint, 
    shipToShipPad, 
    addToast,
    setCurrentView,
    setIsPostBuildOpen
  } = useApp();

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'chat' | 'team' | 'links'>('overview');
  const [dailyLogInput, setDailyLogInput] = useState<string>('');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [chatMessage, setChatMessage] = useState<string>('');
  
  // Trial completion review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [reviewDecision, setReviewDecision] = useState<string>('continue');
  const [teammateChecks, setTeammateChecks] = useState<{ [id: string]: boolean }>({
    'work': true,
    'comm': true,
    'again': true
  });

  // Ship to ShipPad modal
  const [isShipModalOpen, setIsShipModalOpen] = useState<boolean>(false);
  const [shipTitle, setShipTitle] = useState<string>(activeWorkspace ? activeWorkspace.title : '');
  const [shipTagline, setShipTagline] = useState<string>(activeWorkspace ? activeWorkspace.tagline : 'Autonomous background workflow engine for modern dev teams');
  const [shipCategory, setShipCategory] = useState<string>('Developer Tools & AI');
  const [shipDemoUrl, setShipDemoUrl] = useState<string>('https://pulseai.dev');

  if (!activeWorkspace) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glow-card-perimeter p-8 sm:p-12 text-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Layers className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            No active build rooms yet
          </h2>
          <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
            You are not enrolled in any collaborative trial sprint yet. Browse open startups to initiate a 5-day trial sprint or post your own build to create a room.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCurrentView('startups')}
              className="bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Explore Startups</span>
            </button>
            <button
              onClick={() => setIsPostBuildOpen(true)}
              className="bg-[#141418] hover:bg-[#1A1A22] text-white border border-[var(--border-crisp)] font-mono font-semibold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>+ Post a Build</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyLogInput.trim()) return;
    addWorkspaceShipLog(activeWorkspace.id, dailyLogInput);
    addToast('Daily ship log submitted! Proof heatmap updated.', 'success');
    setDailyLogInput('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addWorkspaceTask(activeWorkspace.id, newTaskTitle);
    addToast('Task added to sprint!', 'info');
    setNewTaskTitle('');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    sendWorkspaceChatMessage(activeWorkspace.id, chatMessage);
    setChatMessage('');
  };

  const handleCompleteTrial = () => {
    completeTrialSprint(activeWorkspace.id, reviewDecision, ['Maya Lin', 'Arjun Verma']);
    setIsReviewModalOpen(false);
  };

  const handleShipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    shipToShipPad(activeWorkspace.id, {
      title: shipTitle,
      tagline: shipTagline,
      description: `Shipped by the ${activeWorkspace.title} collaborative trial team on ShipWith.`,
      demoUrl: shipDemoUrl,
      category: shipCategory
    });
    setIsShipModalOpen(false);
    setCurrentView('feed');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-white">
      {/* 1. TOP PROJECT SWITCHER BAR */}
      <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-[#050506] flex items-center justify-center font-bold text-sm shadow-2xs">
            {activeWorkspace.title.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base font-['Plus_Jakarta_Sans'] text-white">
                {activeWorkspace.title}
              </span>
              {activeWorkspace.isTrial && (
                <span className="text-[10px] font-mono font-bold bg-[#141418] text-[#00D659] px-2 py-0.5 rounded-full border border-[var(--border-crisp)]">
                  Trial Sprint
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Lightweight Build Room
            </span>
          </div>
        </div>

        {/* Switcher Pills */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[var(--text-muted)] text-[11px] hidden md:inline">Active Rooms:</span>
          {workspaces.map((w) => (
            <button
              key={w.id}
              onClick={() => setActiveWorkspaceId(w.id)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeWorkspace.id === w.id
                  ? 'bg-white text-[#050506] border-white font-bold shadow-2xs'
                  : 'bg-[#141418] text-[var(--text-secondary)] border-[var(--border-crisp)] hover:border-white/40 hover:text-white'
              }`}
            >
              {w.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TRIAL BUILD COUNTDOWN BANNER (If Trial) */}
      {activeWorkspace.isTrial && (
        <div className="bg-gradient-to-r from-[#141418] via-[#0C0C0E] to-[#141418] text-white rounded-2xl p-6 shadow-md border border-[var(--border-crisp)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#00D659] bg-[#141418] px-2.5 py-0.5 rounded-full border border-[var(--border-crisp)] font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-white" />
                DAY 4 OF 5 TRIAL SPRINT • {activeWorkspace.trialDaysLeft || 5} DAYS REMAINING
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Zero Equity Risk Protection
              </span>
            </div>
            <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              Sprint Objective: {activeWorkspace.objective}
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Build Room Members: {activeWorkspace.team.map(m => `${m.name} (${m.role})`).join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-white hover:bg-zinc-200 text-[#050506] px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Complete Trial & Review</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-[var(--border-crisp)] pb-2 font-mono text-xs overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview & Daily Log' },
          { id: 'tasks', label: `Sprint Tasks (${activeWorkspace.tasks.length})` },
          { id: 'chat', label: `Team Chat (${activeWorkspace.chatMessages.length})` },
          { id: 'team', label: `Team & Roles (${activeWorkspace.team.length})` },
          { id: 'links', label: 'Connected Links & Demo' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl transition-all font-semibold shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-[#050506] shadow-xs font-bold'
                : 'text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. MAIN WORKSPACE CONTENT */}
      {/* TAB: OVERVIEW & DAILY LOG */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left (7 cols): Daily Log Prompt & Activity */}
          <div className="lg:col-span-7 space-y-6">
            {/* Daily Prompt Input */}
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-white" />
                  <span>"What did you ship today?"</span>
                </label>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Updates your Proof Heatmap
                </span>
              </div>

              <form onSubmit={handleAddLog} className="space-y-3">
                <textarea
                  rows={3}
                  value={dailyLogInput}
                  onChange={(e) => setDailyLogInput(e.target.value)}
                  placeholder="e.g. Wired up LangGraph subagent execution retry logic and passed dry run regressions."
                  className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl p-3 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white resize-none"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Share concise technical progress with your trial team.
                  </span>
                  <button
                    type="submit"
                    className="bg-white hover:bg-zinc-200 text-[#050506] px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Log Ship</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Daily Ship Logs Feed */}
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block pb-2 border-b border-[var(--border-crisp)]">
                Recent Daily Ship Logs
              </span>

              <div className="space-y-3">
                {activeWorkspace.shipLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-[#141418] rounded-xl border border-[var(--border-crisp)] text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{log.author}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{log.time}</span>
                    </div>
                    <p className="text-[var(--text-secondary)]">{log.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right (5 cols): Demo Preview + Primary Ship Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-4">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Final Product Launch
              </span>

              <div className="p-4 bg-[#141418] rounded-xl border border-[var(--border-crisp)] space-y-2">
                <h4 className="font-bold text-sm font-['Plus_Jakarta_Sans'] text-white">
                  {activeWorkspace.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  Ready to present your collaboration to the ShipWith community? Publishing adds your product directly to Week 42 ShipPad.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                  <Globe className="w-3.5 h-3.5 text-[#00D659]" />
                  <span>Demo: https://pulseai.dev</span>
                </div>
              </div>

              <button
                onClick={() => setIsShipModalOpen(true)}
                className="w-full bg-white hover:bg-zinc-200 text-[#050506] py-3 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>Ship to Weekly ShipPad</span>
              </button>
            </div>

            {/* Quick Connected Links Card */}
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] space-y-3">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Toolchain Links
              </span>
              <div className="space-y-2 text-xs font-mono">
                {activeWorkspace.connectedLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#141418] hover:bg-[#1A1A22] text-white flex items-center justify-between transition-colors border border-[var(--border-crisp)]"
                  >
                    <span className="flex items-center gap-2">
                      {link.type === 'github' && <Code2 className="w-4 h-4" />}
                      {link.type === 'figma' && <Palette className="w-4 h-4 text-white" />}
                      {link.type === 'demo' && <Globe className="w-4 h-4 text-[#00D659]" />}
                      {link.type === 'docs' && <FileText className="w-4 h-4 text-white" />}
                      <span>{link.label}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SPRINT TASKS */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Add Task Bar */}
          <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)]">
            <form onSubmit={handleCreateTask} className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add sprint milestone task..."
                className="flex-1 bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white"
              />
              <button
                type="submit"
                className="bg-white hover:bg-zinc-200 text-[#050506] px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </form>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Column 1: Todo */}
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
                  Todo ({activeWorkspace.tasks.filter(t => t.status === 'todo').length})
                </span>
              </div>
              <div className="space-y-2">
                {activeWorkspace.tasks.filter(t => t.status === 'todo').map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleWorkspaceTaskStatus(activeWorkspace.id, task.id)}
                    className="p-3 bg-[#141418] hover:bg-[#1A1A22] rounded-xl border border-[var(--border-crisp)] transition-all cursor-pointer space-y-1"
                  >
                    <span className="text-xs font-medium text-white block">
                      {task.title}
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                      <span>{task.assignee}</span>
                      <span className="text-white font-semibold">Click to advance →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                <span className="text-xs font-mono font-bold text-white uppercase">
                  In Progress ({activeWorkspace.tasks.filter(t => t.status === 'in_progress').length})
                </span>
              </div>
              <div className="space-y-2">
                {activeWorkspace.tasks.filter(t => t.status === 'in_progress').map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleWorkspaceTaskStatus(activeWorkspace.id, task.id)}
                    className="p-3 bg-[#141418] hover:bg-[#1A1A22] rounded-xl border border-white/30 transition-all cursor-pointer space-y-1"
                  >
                    <span className="text-xs font-medium text-white block">
                      {task.title}
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                      <span>{task.assignee}</span>
                      <span className="font-semibold text-white">Click to mark Done ✔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Done */}
            <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-4 shadow-[var(--shadow-card)] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                <span className="text-xs font-mono font-bold text-[#00D659] uppercase">
                  Done ({activeWorkspace.tasks.filter(t => t.status === 'done').length}) ✔
                </span>
              </div>
              <div className="space-y-2">
                {activeWorkspace.tasks.filter(t => t.status === 'done').map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleWorkspaceTaskStatus(activeWorkspace.id, task.id)}
                    className="p-3 bg-[#141418] hover:bg-[#1A1A22] rounded-xl border border-[var(--border-crisp)] transition-all cursor-pointer space-y-1"
                  >
                    <span className="text-xs font-medium text-[var(--text-secondary)] line-through block">
                      {task.title}
                    </span>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#00D659]">
                      <span>{task.assignee}</span>
                      <span className="font-bold">Shipped ✔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: TEAM CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-[var(--shadow-card)] space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-crisp)]">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {activeWorkspace.title} Sprint Team Chat
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              End-to-end encrypted build room
            </span>
          </div>

          <div className="space-y-3 min-h-[280px] max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
            {activeWorkspace.chatMessages.map((msg) => (
              <div key={msg.id} className="p-3 rounded-xl bg-[#141418] border border-[var(--border-crisp)] text-xs font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{msg.sender}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{msg.time}</span>
                </div>
                <p className="text-[var(--text-secondary)] font-sans">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-[var(--border-crisp)]">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Send a message to sprint collaborators..."
              className="flex-1 bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white"
            />
            <button
              type="submit"
              className="bg-white hover:bg-zinc-200 text-[#050506] px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB: TEAM & ROLES */}
      {activeTab === 'team' && (
        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-[var(--shadow-card)] space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block pb-2 border-b border-[var(--border-crisp)]">
            Sprint Collaborators & Exact Role Credits
          </span>

          <div className="space-y-3">
            {activeWorkspace.team.map((member, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#141418] border border-[var(--border-crisp)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-[var(--border-crisp)]" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{member.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D659]" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">{member.role}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#00D659] bg-[#0C0C0E] px-2.5 py-1 rounded-full border border-[var(--border-crisp)] font-semibold">
                  Verified Active ✔
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: CONNECTED LINKS */}
      {activeTab === 'links' && (
        <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] p-6 shadow-[var(--shadow-card)] space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block pb-2 border-b border-[var(--border-crisp)]">
            Connected Build Toolchain
          </span>

          <div className="space-y-3 text-xs font-mono">
            {activeWorkspace.connectedLinks.map((link, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#141418] border border-[var(--border-crisp)] flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold">
                  {link.type === 'github' && <Code2 className="w-4 h-4" />}
                  {link.type === 'figma' && <Palette className="w-4 h-4 text-white" />}
                  {link.type === 'demo' && <Globe className="w-4 h-4 text-[#00D659]" />}
                  {link.type === 'docs' && <FileText className="w-4 h-4 text-white" />}
                  <span>{link.label}</span>
                </span>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white hover:underline flex items-center gap-1">
                  <span>Open URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. MODAL: COMPLETE TRIAL & REVIEW */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-lg w-full p-6 sm:p-8 relative text-white">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-white text-[#050506] flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                Complete Trial Sprint & Review
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Structured decision for {activeWorkspace.title}. Submitting updates all teammates' Build Passport reputation.
              </p>
            </div>

            <div className="my-5 space-y-4 text-xs font-mono">
              {/* Decision Selector */}
              <div>
                <label className="block font-bold text-white mb-1.5">
                  Collaboration Decision:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'continue', label: 'Continue building together long-term (Co-founder / Core Teammate)' },
                    { id: 'another', label: 'Try another scoped project collaboration' },
                    { id: 'end', label: 'End collaboration amicably with positive reputation marks' }
                  ].map((dec) => (
                    <button
                      key={dec.id}
                      type="button"
                      onClick={() => setReviewDecision(dec.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        reviewDecision === dec.id
                          ? 'bg-[#141418] border-white font-bold text-white'
                          : 'bg-[#0C0C0E] border-[var(--border-crisp)] text-[var(--text-secondary)] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span>{dec.label}</span>
                      {reviewDecision === dec.id && <Check className="w-4 h-4 text-[#00D659]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teammate Verification Checkboxes */}
              <div className="p-4 bg-[#141418] rounded-xl border border-[var(--border-crisp)] space-y-2.5">
                <span className="font-bold text-white block">
                  Teammate Verification Ledger:
                </span>
                {[
                  { id: 'work', label: 'Completed all agreed trial deliverables' },
                  { id: 'comm', label: 'Communicated clearly and met async deadlines' },
                  { id: 'again', label: 'Would build together again (Increments Build Passport ✔)' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={teammateChecks[item.id] !== false}
                      onChange={(e) => setTeammateChecks({ ...teammateChecks, [item.id]: e.target.checked })}
                      className="rounded border-[var(--border-crisp)] bg-[#0C0C0E] text-white focus:ring-0"
                    />
                    <span className="text-[var(--text-secondary)]">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:bg-[#141418] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCompleteTrial}
                className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold shadow-xs cursor-pointer"
              >
                Submit & Sign Ledger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: SHIP TO SHIPPAD */}
      {isShipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-lg w-full p-6 sm:p-8 relative text-white">
            <button
              onClick={() => setIsShipModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-white text-[#050506] flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
                Launch to Weekly ShipPad
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Present {activeWorkspace.title} on the Week 42 Leaderboard.
              </p>
            </div>

            <form onSubmit={handleShipSubmit} className="my-5 space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={shipTitle}
                  onChange={(e) => setShipTitle(e.target.value)}
                  className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  1-Line Tagline
                </label>
                <input
                  type="text"
                  required
                  value={shipTagline}
                  onChange={(e) => setShipTagline(e.target.value)}
                  className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  required
                  value={shipDemoUrl}
                  onChange={(e) => setShipDemoUrl(e.target.value)}
                  className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={shipCategory}
                  onChange={(e) => setShipCategory(e.target.value)}
                  className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsShipModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-[var(--text-secondary)] hover:bg-[#141418] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-[#050506] px-5 py-2.5 rounded-xl text-xs font-mono font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Publish to ShipPad</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
