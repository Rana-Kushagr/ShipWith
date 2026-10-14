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
  trialBuild: TrialBuild | null;
  
  onboardingState: OnboardingState;
  updateOnboarding: (data: Partial<OnboardingState>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  
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
  timezone: '',
  completed: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: permanently set to dark as requested
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('shipwith_theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Keep dark theme locked
    setTheme('dark');
  };

  // Navigation view state
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // App data state
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [builders] = useState<UserProfile[]>(MOCK_BUILDERS);
  const [builds, setBuilds] = useState<BuildRecord[]>(MOCK_BUILDS);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [workspaceTasks] = useState<WorkspaceTask[]>(MOCK_WORKSPACE_TASKS);
  const [trialBuild] = useState<TrialBuild | null>(MOCK_TRIAL_BUILD);

  // Modals state
  const [isPostBuildOpen, setIsPostBuildOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    addToast(bookmarks.includes(id) ? 'Removed from bookmarks' : 'Saved to bookmarks', 'info');
  };

  // Notifications (Real user notifications start empty)
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

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
        const parsed = JSON.parse(saved);
        // If it was the legacy default with 'Recruit for startup' and not completed, start fresh
        if (parsed?.objective === 'Recruit for startup' && !parsed?.completed) {
          localStorage.removeItem('shipwith_onboarding');
          return DEFAULT_ONBOARDING;
        }
        if (parsed && typeof parsed === 'object') {
          return {
            ...DEFAULT_ONBOARDING,
            ...parsed,
            strengths: Array.isArray(parsed?.strengths) ? parsed.strengths : [],
            techStacks: Array.isArray(parsed?.techStacks) ? parsed.techStacks : [],
            industries: Array.isArray(parsed?.industries) ? parsed.industries : [],
            desiredCollaborators: Array.isArray(parsed?.desiredCollaborators) ? parsed.desiredCollaborators : [],
          };
        }
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
      weeklyHours: (onboardingState.weeklyHours || prev.weeklyHours) as any,
      country: onboardingState.country || prev.country,
      timezone: onboardingState.timezone || prev.timezone
    }));
    addToast('Preferences saved! Welcome to ShipWith.', 'success');
    setCurrentView('home');
  };

  const resetOnboarding = () => {
    setOnboardingState(DEFAULT_ONBOARDING);
    localStorage.removeItem('shipwith_onboarding');
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
