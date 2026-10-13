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
  INITIAL_USER, 
  MOCK_BUILDERS, 
  MOCK_BUILDS, 
  MOCK_FEED_POSTS, 
  MOCK_WORKSPACE_TASKS, 
  MOCK_TRIAL_BUILD 
} from '../data/mockData';

export type AppView = 
  | 'landing' 
  | 'onboarding' 
  | 'home' 
  | 'startups' 
  | 'people' 
  | 'feed' 
  | 'workspace' 
  | 'messages' 
  | 'profile';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  
  currentUser: UserProfile;
  builders: UserProfile[];
  builds: BuildRecord[];
  feedPosts: FeedPost[];
  workspaceTasks: WorkspaceTask[];
  trialBuild: TrialBuild;
  
  onboardingState: OnboardingState;
  updateOnboarding: (data: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
  
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
  objective: 'Find people for mine',
  interests: ['Tech', 'AI'],
  strengths: ['UI/UX Design', 'Tech'],
  stage: 'Building something',
  country: 'India',
  timezone: 'GMT+5:30 (Asia/Kolkata)',
  desiredCollaborators: ['Developer', 'Co-founder'],
  weeklyHours: '10–20 hrs/week',
  completed: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('shipwith_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shipwith_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Navigation view state
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // App data state
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [builders] = useState<UserProfile[]>(MOCK_BUILDERS);
  const [builds, setBuilds] = useState<BuildRecord[]>(MOCK_BUILDS);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [workspaceTasks] = useState<WorkspaceTask[]>(MOCK_WORKSPACE_TASKS);
  const [trialBuild] = useState<TrialBuild>(MOCK_TRIAL_BUILD);

  // Modals state
  const [isPostBuildOpen, setIsPostBuildOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(['bld_1', 'usr_1']);
  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    addToast(bookmarks.includes(id) ? 'Removed from bookmarks' : 'Saved to bookmarks', 'info');
  };

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'New application',
      message: 'Arjun Verma applied for Frontend Engineer on your build.',
      type: 'application',
      timestamp: '10m ago',
      read: false
    },
    {
      id: 'notif_2',
      title: 'Trial Build updated',
      message: 'Campus AI Tutor milestone check-in is scheduled for tomorrow.',
      type: 'trial',
      timestamp: '2h ago',
      read: false
    }
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Toasts
  const [toasts, setToasts] = useState<{ id: string; message: string; type?: 'success' | 'info' | 'warning' }[]>([]);
  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Onboarding
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem('shipwith_onboarding');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return DEFAULT_ONBOARDING;
  });

  const updateOnboarding = (data: Partial<OnboardingState>) => {
    setOnboardingState(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('shipwith_onboarding', JSON.stringify(updated));
      return updated;
    });
  };

  const completeOnboarding = () => {
    updateOnboarding({ completed: true });
    // Update current user lookingFor based on answers
    setCurrentUser(prev => ({
      ...prev,
      lookingFor: onboardingState.desiredCollaborators,
      weeklyHours: onboardingState.weeklyHours,
      country: onboardingState.country,
      timezone: onboardingState.timezone
    }));
    addToast('Preferences saved! Welcome to ShipWith.', 'success');
    setCurrentView('home');
  };

  const createBuild = (newBuildData: Omit<BuildRecord, 'id' | 'createdAt' | 'stats'>) => {
    const newBuild: BuildRecord = {
      ...newBuildData,
      id: `bld_${Date.now()}`,
      createdAt: 'Just now',
      stats: { interestedCount: 1, applicantsCount: 0 }
    };
    setBuilds(prev => [newBuild, ...prev]);

    // Also add corresponding feed post automatically (continuity principle)
    const newPost: FeedPost = {
      id: `post_${Date.now()}`,
      type: 'need_teammate',
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role
      },
      buildId: newBuild.id,
      title: newBuild.title,
      content: newBuild.description,
      tags: newBuild.techStack.slice(0, 3),
      metadata: {
        rolesNeeded: newBuild.neededRoles.map(r => r.role),
        weeklyHours: newBuild.hoursPerWeek,
        demoUrl: newBuild.demoUrl
      },
      createdAt: 'Just now'
    };
    setFeedPosts(prev => [newPost, ...prev]);

    addToast('Your Build has been published!', 'success');
  };

  const submitFeedback = (category: string, text: string) => {
    // In production, persists to API
    addToast(`Feedback recorded (${category}): "${text.slice(0, 30)}..."`, 'success');
    setIsFeedbackOpen(false);
  };

  // Keyboard shortcut for Cmd/Ctrl + K command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        currentUser,
        builders,
        builds,
        feedPosts,
        workspaceTasks,
        trialBuild,
        onboardingState,
        updateOnboarding,
        completeOnboarding,
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
