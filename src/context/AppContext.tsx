import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  UserProfile, 
  BuildRecord, 
  FeedPost, 
  WorkspaceTask, 
  TrialBuild, 
  OnboardingState,
  NotificationItem
} from '../types';
import {
  SEED_BUILDERS,
  SEED_MESSAGES,
  type SeedStartup,
  type SeedBuilder,
  type SeedShipPadItem,
  type SeedWorkspace
} from '../data/seedData';

export type AppView = 
  | 'landing' 
  | 'onboarding' 
  | 'home' 
  | 'startups' 
  | 'people' 
  | 'feed' 
  | 'workspace' 
  | 'messages' 
  | 'profile'
  | 'premium'
  | 'bookmarks'
  | 'communities'
  | 'advertise'
  | 'notifications';

export interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  builders: UserProfile[];
  seedBuilders: SeedBuilder[];
  builds: BuildRecord[];
  seedStartups: SeedStartup[];
  feedPosts: FeedPost[];
  workspaceTasks: WorkspaceTask[];
  trialBuild: TrialBuild | null;
  
  // Weekly ShipPad Launches
  shipPadItems: SeedShipPadItem[];
  activeShipPadTab: 'feed' | 'shippad';
  setActiveShipPadTab: (tab: 'feed' | 'shippad') => void;
  voteShipPadItem: (id: string, signalType: 'tried' | 'wouldPay' | 'bug' | 'feedback' | 'collaborate') => void;

  // Workspaces & Build Rooms
  workspaces: SeedWorkspace[];
  activeWorkspaceId: string;
  setActiveWorkspaceId: (id: string) => void;
  addWorkspaceTask: (workspaceId: string, title: string, priority?: 'high' | 'medium' | 'low') => void;
  toggleWorkspaceTaskStatus: (workspaceId: string, taskId: string) => void;
  addWorkspaceShipLog: (workspaceId: string, logContent: string) => void;
  sendWorkspaceChatMessage: (workspaceId: string, text: string) => void;
  completeTrialSprint: (workspaceId: string, decision: string, verifiedTeammates: string[]) => void;
  shipToShipPad: (workspaceId: string, shipData: { title: string; tagline: string; description: string; demoUrl: string; category: string }) => void;
  startTrialSprintWithStartup: (startupId: string) => void;

  // Modals & Navigation
  selectedStartupId: string | null;
  setSelectedStartupId: (id: string | null) => void;
  selectedBuilderId: string | null;
  setSelectedBuilderId: (id: string | null) => void;
  openChatWithBuilder: (builderId: string, initialText?: string, contextTitle?: string) => void;
  
  // Hero handle claim
  claimHandleText: string;
  setClaimHandleText: (handle: string) => void;

  // Persona filter
  personaFilter: 'all' | 'founder' | 'builder' | 'designer';
  setPersonaFilter: (p: 'all' | 'founder' | 'builder' | 'designer') => void;

  // Auth modal
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Messages threads
  messagesThreads: typeof SEED_MESSAGES;
  activeThreadId: string;
  setActiveThreadId: (id: string) => void;
  sendMessageToThread: (threadId: string, text: string) => void;

  // Onboarding
  onboardingState: OnboardingState;
  updateOnboarding: (data: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  
  // Modals
  isPostBuildOpen: boolean;
  setIsPostBuildOpen: (open: boolean) => void;
  createBuild: (build: Omit<BuildRecord, 'id' | 'createdAt' | 'stats'>) => void;
  
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: (open: boolean) => void;
  submitFeedback: (category: string, text: string) => void;
  
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  bookmarks: string[];
  toggleBookmark: (id: string) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  toasts: { id: string; message: string; type?: 'success' | 'info' | 'warning' }[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_ONBOARDING: OnboardingState = {
  step1Goal: '',
  step2Interests: [],
  step3Skills: [],
  step4Stage: '',
  step5Location: { country: '', timezone: '' },
  step6Meet: [],
  step7Hours: '',
  claimedHandle: '',
  completed: false,
  
  // Compatibility
  objective: '',
  strengths: [],
  techStacks: [],
  experienceYears: '',
  industries: [],
  stage: '',
  weeklyHours: '',
  workingStyle: '',
  desiredCollaborators: [],
  compensationPhilosophy: '',
  trialAgreement: false,
  githubUsername: '',
  headline: '',
  country: '',
  timezone: ''
};

const LOCAL_STORAGE_KEY = 'shipwith_dark_prod_v1';

const CLEAN_INITIAL_USER: UserProfile = {
  id: 'usr_me',
  name: 'New Builder',
  username: 'builder',
  handle: '@builder',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'Builder & Collaborator',
  bio: '',
  role: 'Fullstack',
  country: 'United States',
  timezone: 'GMT-7:00 (San Francisco)',
  availability: 'Available',
  weeklyHours: '10–20 hrs/week',
  lookingFor: [],
  skills: [],
  proofLinks: {},
  stats: {
    shipsCount: 0,
    trialBuildsCount: 0,
    collaborationsCount: 0,
    repeatTeammatesCount: 0,
    positiveFeedbackPercent: 100
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Permanent Black & White Dark Theme (No Theme Toggle)
  const [theme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('shipwith_theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Locked into permanent dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  };

  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [claimHandleText, setClaimHandleText] = useState('kushagr');
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);
  const [selectedBuilderId, setSelectedBuilderId] = useState<string | null>(null);
  const [personaFilter, setPersonaFilter] = useState<'all' | 'founder' | 'builder' | 'designer'>('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeShipPadTab, setActiveShipPadTab] = useState<'feed' | 'shippad'>('shippad');

  // Load state from localStorage ("shipwith_dark_prod_v1")
  const loadStored = () => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const stored = loadStored();

  // CLEAN MAIN APP STATE: Zero fake data in the main app (seed data kept for landing demo only)
  const [currentUser, setCurrentUser] = useState<UserProfile>(stored?.currentUser || CLEAN_INITIAL_USER);
  const [builders] = useState<UserProfile[]>(stored?.builders || []);
  const [seedBuilders] = useState<SeedBuilder[]>(SEED_BUILDERS); // For Landing Page demo views only
  const [builds, setBuilds] = useState<BuildRecord[]>(stored?.builds || []);
  const [seedStartups, setSeedStartups] = useState<SeedStartup[]>(stored?.seedStartups || []);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(stored?.feedPosts || []);
  const [workspaceTasks] = useState<WorkspaceTask[]>(stored?.workspaceTasks || []);
  const [trialBuild] = useState<TrialBuild | null>(stored?.trialBuild || null);
  const [shipPadItems, setShipPadItems] = useState<SeedShipPadItem[]>(stored?.shipPadItems || []);
  const [workspaces, setWorkspaces] = useState<SeedWorkspace[]>(stored?.workspaces || []);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(stored?.activeWorkspaceId || '');
  const [messagesThreads, setMessagesThreads] = useState<typeof SEED_MESSAGES>(stored?.messagesThreads || []);
  const [activeThreadId, setActiveThreadId] = useState<string>(stored?.activeThreadId || '');
  const [notifications, setNotifications] = useState<NotificationItem[]>(stored?.notifications || []);
  const [bookmarks, setBookmarks] = useState<string[]>(stored?.bookmarks || []);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(stored?.onboardingState || DEFAULT_ONBOARDING);

  // Modals & UI helpers
  const [isPostBuildOpen, setIsPostBuildOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: 'success' | 'info' | 'warning' }[]>([]);

  // Auto-sync state to localStorage ("shipwith_v5_state")
  useEffect(() => {
    try {
      const stateToSave = {
        currentUser,
        builds,
        feedPosts,
        workspaceTasks,
        trialBuild,
        shipPadItems,
        workspaces,
        activeWorkspaceId,
        messagesThreads,
        notifications,
        bookmarks,
        onboardingState
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore quota errors
    }
  }, [
    currentUser,
    builds,
    feedPosts,
    workspaceTasks,
    trialBuild,
    shipPadItems,
    workspaces,
    activeWorkspaceId,
    messagesThreads,
    notifications,
    bookmarks,
    onboardingState
  ]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      addToast(exists ? 'Removed from bookmarks' : 'Saved to bookmarks', 'info');
      return next;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Weekly ShipPad voting signals (Tried It, Would Pay, Found a Bug, Feedback, Collaborate)
  const voteShipPadItem = (id: string, signalType: 'tried' | 'wouldPay' | 'bug' | 'feedback' | 'collaborate') => {
    setShipPadItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const wasVoted = item.userVoted[signalType];
      const delta = wasVoted ? -1 : 1;
      
      const newVoted = { ...item.userVoted, [signalType]: !wasVoted };
      const updated = {
        ...item,
        userVoted: newVoted,
        triedCount: signalType === 'tried' ? item.triedCount + delta : item.triedCount,
        wouldPayCount: signalType === 'wouldPay' ? item.wouldPayCount + delta : item.wouldPayCount,
        bugCount: signalType === 'bug' ? item.bugCount + delta : item.bugCount,
        feedbackCount: signalType === 'feedback' ? item.feedbackCount + delta : item.feedbackCount,
        collaborateCount: signalType === 'collaborate' ? item.collaborateCount + delta : item.collaborateCount
      };

      const labels = {
        tried: wasVoted ? 'Removed Tried It signal' : 'Marked as Tried It! ✔',
        wouldPay: wasVoted ? 'Removed Would Pay signal' : 'Validated purchase intent! 💳',
        bug: wasVoted ? 'Bug resolved' : 'Reported bug to makers! 🐛',
        feedback: wasVoted ? 'Feedback removed' : 'Signal recorded! 💬',
        collaborate: wasVoted ? 'Removed collaboration signal' : 'Requested collaboration! 🤝'
      };
      addToast(labels[signalType], 'success');
      return updated;
    }));
  };

  // Workspace actions
  const addWorkspaceTask = (workspaceId: string, title: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      assignee: currentUser.name,
      status: 'todo' as const,
      priority
    };
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id !== workspaceId) return ws;
      return { ...ws, tasks: [...ws.tasks, newTask] };
    }));
    addToast('Task added to sprint board', 'success');
  };

  const toggleWorkspaceTaskStatus = (workspaceId: string, taskId: string) => {
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id !== workspaceId) return ws;
      const nextTasks = ws.tasks.map(t => {
        if (t.id !== taskId) return t;
        const nextStatus = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo';
        return { ...t, status: nextStatus as any };
      });
      return { ...ws, tasks: nextTasks };
    }));
  };

  const addWorkspaceShipLog = (workspaceId: string, logContent: string) => {
    const newLog = {
      id: `log-${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar,
      content: logContent,
      time: 'Just now'
    };
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id !== workspaceId) return ws;
      return { ...ws, shipLogs: [newLog, ...ws.shipLogs] };
    }));

    // Update current user ships count and stats
    setCurrentUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        shipsCount: prev.stats.shipsCount + 1
      }
    }));

    addToast('Ship log published! Proof Heatmap square illuminated.', 'success');
  };

  const sendWorkspaceChatMessage = (workspaceId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser.name,
      avatar: currentUser.avatar,
      text,
      time: 'Just now'
    };
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id !== workspaceId) return ws;
      return { ...ws, chatMessages: [...ws.chatMessages, newMsg] };
    }));
  };

  const completeTrialSprint = (workspaceId: string, decision: string, verifiedTeammates: string[]) => {
    setWorkspaces(prev => prev.map(ws => {
      if (ws.id !== workspaceId) return ws;
      return { ...ws, isTrial: false, trialDaysLeft: 0 };
    }));
    
    // Increment passport stats
    setCurrentUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        trialBuildsCount: prev.stats.trialBuildsCount + 1,
        repeatTeammatesCount: prev.stats.repeatTeammatesCount + (decision === 'continue' ? 1 : 0)
      }
    }));

    addToast(`Trial sprint completed! Verified ${verifiedTeammates.length} collaborators on Build Passport.`, 'success');
  };

  const shipToShipPad = (workspaceId: string, shipData: { title: string; tagline: string; description: string; demoUrl: string; category: string }) => {
    const ws = workspaces.find(w => w.id === workspaceId);
    const newShip: SeedShipPadItem = {
      id: `ship-${Date.now()}`,
      rank: 1, // Ships to #1 spot as requested!
      week: 42,
      year: 2026,
      title: shipData.title,
      tagline: shipData.tagline,
      description: shipData.description,
      category: shipData.category,
      demoUrl: shipData.demoUrl,
      contributors: ws ? ws.team.map(t => ({ name: t.name, role: t.role, avatar: t.avatar, handle: t.handle })) : [
        { name: currentUser.name, role: 'Lead Architect', avatar: currentUser.avatar, handle: `@${currentUser.username}` }
      ],
      triedCount: 1,
      wouldPayCount: 0,
      bugCount: 0,
      feedbackCount: 0,
      collaborateCount: 0,
      userVoted: { tried: true, wouldPay: false, bug: false, feedback: false, collaborate: false },
      comments: []
    };

    setShipPadItems(prev => [newShip, ...prev.map(p => ({ ...p, rank: p.rank + 1 }))]);
    
    // Add feed post
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      type: 'shipped',
      author: {
        id: currentUser.username,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.headline
      },
      title: `Shipped ${shipData.title} to Week 42 ShipPad! 🚀`,
      content: shipData.description,
      tags: [shipData.category, 'Shipped', 'ShipPad Launch'],
      metadata: { demoUrl: shipData.demoUrl, feedbackCount: 0 },
      createdAt: 'Just now'
    };
    setFeedPosts(prev => [newPost, ...prev]);

    addToast(`Shipped to Week 42 ShipPad (#1 Spot) and added to Feed!`, 'success');
    setCurrentView('feed');
    setActiveShipPadTab('shippad');
  };

  const startTrialSprintWithStartup = (startupId: string) => {
    const startup = seedStartups.find(s => s.id === startupId);
    if (!startup) return;

    const newWs: SeedWorkspace = {
      id: `workspace-${startup.id}`,
      title: `${startup.name} Trial Sprint`,
      tagline: startup.tagline,
      isTrial: true,
      trialDaysLeft: 5,
      trialTotalDays: 5,
      objective: `5-Day Trial Build: Deliver scoped prototype slice for ${startup.name}`,
      team: [
        { id: 'usr-founder', name: startup.founder.name, role: startup.founder.role, avatar: startup.founder.avatar, handle: startup.founder.handle, confirmed: true },
        { id: 'usr-me', name: currentUser.name, role: 'Trial Collaborator', avatar: currentUser.avatar, handle: `@${currentUser.username}`, confirmed: true }
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, title: 'Agree on 5-day scoped milestone slice & zero-equity trial charter', assignee: currentUser.name, status: 'done', priority: 'high' },
        { id: `t-${Date.now()}-2`, title: 'Setup GitHub shared fork and review environment', assignee: startup.founder.name, status: 'in_progress', priority: 'high' },
        { id: `t-${Date.now()}-3`, title: 'Implement core milestone deliverables and push test preview', assignee: currentUser.name, status: 'todo', priority: 'high' }
      ],
      shipLogs: [
        {
          id: `sl-${Date.now()}`,
          author: startup.founder.name,
          avatar: startup.founder.avatar,
          content: `Initialized 5-Day Trial Sprint for ${startup.name}. Welcome to the Build Room!`,
          time: 'Just now'
        }
      ],
      chatMessages: [
        {
          id: `cm-${Date.now()}`,
          sender: startup.founder.name,
          avatar: startup.founder.avatar,
          text: `Welcome! Let’s focus on the first milestone: shipping the initial prototype slice.`,
          time: 'Just now'
        }
      ],
      connectedLinks: [
        { label: 'Live Demo', url: startup.demoUrl || 'https://shipwith.app', type: 'demo' },
        { label: 'Repository', url: startup.repoUrl || 'https://github.com/Rana-Kushagr/ShipWith', type: 'github' }
      ]
    };

    setWorkspaces(prev => {
      const exists = prev.find(w => w.id === newWs.id);
      return exists ? prev : [newWs, ...prev];
    });

    setActiveWorkspaceId(newWs.id);
    addToast(`5-Day Trial Sprint initiated for ${startup.name}! Navigating to Build Room.`, 'success');
    setCurrentView('workspace');
  };

  const openChatWithBuilder = (builderId: string, initialText?: string, contextTitle?: string) => {
    const builder = seedBuilders.find(b => b.id === builderId || b.handle.replace('@', '') === builderId.replace('@', ''));
    if (!builder) return;

    const threadId = `thread-builder-${builder.id}`;
    const existingThread = messagesThreads.find(t => t.id === threadId);

    if (!existingThread) {
      const newThread = {
        id: threadId,
        participant: {
          name: builder.name,
          handle: builder.handle,
          avatar: builder.avatar,
          role: builder.role,
          verified: true
        },
        contextStartup: contextTitle || 'Direct Collaboration',
        contextStage: '5-Day Trial Exploration',
        lastMessage: initialText || 'Hey! Excited to connect.',
        time: 'Just now',
        unread: false,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'me',
            text: initialText || `Hi ${builder.name}! Came across your profile on ShipWith and love your work. Open to exploring a 5-day trial sprint together?`,
            time: 'Just now'
          }
        ]
      };
      setMessagesThreads(prev => [newThread, ...prev]);
    }

    setActiveThreadId(threadId);
    setCurrentView('messages');
  };

  const sendMessageToThread = (threadId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text,
      time: 'Just now'
    };

    setMessagesThreads(prev => prev.map(t => {
      if (t.id !== threadId) return t;
      return {
        ...t,
        lastMessage: text,
        time: 'Just now',
        messages: [...t.messages, newMsg]
      };
    }));
  };

  const updateOnboarding = (data: Partial<OnboardingState>) => {
    setOnboardingState(prev => ({ ...prev, ...data }));
  };

  const completeOnboarding = () => {
    updateOnboarding({ completed: true });
    setCurrentUser(prev => ({
      ...prev,
      username: onboardingState.claimedHandle || prev.username,
      lookingFor: onboardingState.step6Meet.length > 0 ? onboardingState.step6Meet : prev.lookingFor,
      skills: onboardingState.step3Skills.length > 0 ? onboardingState.step3Skills : prev.skills,
      weeklyHours: (onboardingState.step7Hours || prev.weeklyHours) as any,
      country: onboardingState.step5Location.country || prev.country,
      timezone: onboardingState.step5Location.timezone || prev.timezone
    }));
    addToast('Onboarding complete! Personalizing ShipWith based on your answers.', 'success');
  };

  const resetOnboarding = () => {
    setOnboardingState(DEFAULT_ONBOARDING);
  };

  // "+ Post a Build" Single-Record Continuity (Adds to Startups, Feed, and Workspace simultaneously)
  const createBuild = (newBuildData: Omit<BuildRecord, 'id' | 'createdAt' | 'stats'>) => {
    const newBuildId = `build-${Date.now()}`;
    const newBuild: BuildRecord = {
      ...newBuildData,
      id: newBuildId,
      createdAt: 'Just now',
      stats: {
        interestedCount: 1,
        applicantsCount: 0
      }
    };

    setBuilds(prev => [newBuild, ...prev]);

    // Add to seedStartups
    const newSeedStartup: SeedStartup = {
      id: `startup-${newBuildId}`,
      name: newBuild.title,
      logoText: newBuild.title.substring(0, 2).toUpperCase(),
      logoBg: '#1A5052',
      tagline: newBuild.tagline,
      problem: newBuild.description,
      solution: newBuild.description,
      stage: newBuild.stage === 'Shipped' ? 'Live' : 'Building',
      industry: 'Software & Technology',
      techStack: newBuild.techStack,
      rolesNeeded: newBuild.neededRoles.map(r => ({
        role: r.role,
        commitment: r.commitment || '10–15 hrs/wk',
        skills: r.skills || ['React', 'TypeScript'],
        spots: 1
      })),
      weeklyHours: newBuild.hoursPerWeek,
      location: 'Remote · Worldwide',
      matchScore: 95,
      matchReasons: ['Newly created build', 'Ready for 5-day trial sprint'],
      founder: {
        name: currentUser.name,
        handle: (currentUser as any).handle || `@${currentUser.username || 'me'}`,
        avatar: currentUser.avatar,
        role: 'Founder'
      },
      demoUrl: newBuild.demoUrl || 'https://shipwith.app',
      repoUrl: newBuild.repoUrl,
      upvotesCount: 1,
      createdAt: 'Just now'
    };
    setSeedStartups(prev => [newSeedStartup, ...prev]);

    // Feed post
    const newFeedPost: FeedPost = {
      id: `post-${Date.now()}`,
      type: 'building',
      author: {
        id: currentUser.username,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.headline
      },
      title: `Building ${newBuild.title}: ${newBuild.tagline}`,
      content: newBuild.description,
      tags: newBuild.techStack,
      metadata: {
        rolesNeeded: newBuild.neededRoles.map(r => r.role),
        weeklyHours: newBuild.hoursPerWeek,
        demoUrl: newBuild.demoUrl
      },
      createdAt: 'Just now'
    };
    setFeedPosts(prev => [newFeedPost, ...prev]);

    // Initialize Build Room inside Workspace
    const newWs: SeedWorkspace = {
      id: `workspace-${newBuildId}`,
      title: newBuild.title,
      tagline: newBuild.tagline,
      isTrial: true,
      trialDaysLeft: 5,
      trialTotalDays: 5,
      objective: `Ship MVP slice for ${newBuild.title}`,
      team: [
        { id: 'usr-me', name: currentUser.name, role: 'Founder & Architect', avatar: currentUser.avatar, handle: `@${currentUser.username}`, confirmed: true }
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, title: 'Define core user problem & scope first milestone', assignee: currentUser.name, status: 'done', priority: 'high' },
        { id: `t-${Date.now()}-2`, title: 'Recruit co-founders & trial collaborators on ShipWith', assignee: currentUser.name, status: 'in_progress', priority: 'high' },
        { id: `t-${Date.now()}-3`, title: 'Ship first build to Week 42 ShipPad', assignee: currentUser.name, status: 'todo', priority: 'medium' }
      ],
      shipLogs: [
        {
          id: `sl-${Date.now()}`,
          author: currentUser.name,
          avatar: currentUser.avatar,
          content: `Created Build Room for ${newBuild.title}. Let's build what's next!`,
          time: 'Just now'
        }
      ],
      chatMessages: [
        {
          id: `cm-${Date.now()}`,
          sender: currentUser.name,
          avatar: currentUser.avatar,
          text: `Welcome to the ${newBuild.title} build room.`,
          time: 'Just now'
        }
      ],
      connectedLinks: [
        { label: 'Demo Preview', url: newBuild.demoUrl || 'https://shipwith.app', type: 'demo' }
      ]
    };
    setWorkspaces(prev => [newWs, ...prev]);
    setActiveWorkspaceId(newWs.id);

    // Update currentUser stats and notification
    setCurrentUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        shipsCount: prev.stats.shipsCount + 1
      }
    }));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Build Created',
      message: `Your build "${newBuild.title}" is live across Startups, Feed, and Workspace!`,
      type: 'feedback',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    addToast(`"${newBuild.title}" created across Startups, Feed, and Workspace!`, 'success');
    setIsPostBuildOpen(false);
  };

  const submitFeedback = (category: string, _text: string) => {
    addToast(`Thank you! Your feedback (${category}) was sent directly to Kushagr & team.`, 'success');
    setIsFeedbackOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        builders,
        seedBuilders,
        builds,
        seedStartups,
        feedPosts,
        workspaceTasks,
        trialBuild,
        shipPadItems,
        activeShipPadTab,
        setActiveShipPadTab,
        voteShipPadItem,
        workspaces,
        activeWorkspaceId,
        setActiveWorkspaceId,
        addWorkspaceTask,
        toggleWorkspaceTaskStatus,
        addWorkspaceShipLog,
        sendWorkspaceChatMessage,
        completeTrialSprint,
        shipToShipPad,
        startTrialSprintWithStartup,
        selectedStartupId,
        setSelectedStartupId,
        selectedBuilderId,
        setSelectedBuilderId,
        openChatWithBuilder,
        claimHandleText,
        setClaimHandleText,
        personaFilter,
        setPersonaFilter,
        isAuthModalOpen,
        setIsAuthModalOpen,
        messagesThreads,
        activeThreadId,
        setActiveThreadId,
        sendMessageToThread,
        onboardingState,
        updateOnboarding,
        completeOnboarding,
        resetOnboarding,
        isPostBuildOpen,
        setIsPostBuildOpen,
        createBuild,
        isFeedbackOpen,
        setIsFeedbackOpen,
        submitFeedback,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        bookmarks,
        toggleBookmark,
        notifications,
        markNotificationRead,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
