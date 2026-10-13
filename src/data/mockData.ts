import type { UserProfile, BuildRecord, FeedPost, WorkspaceTask, TrialBuild } from '../types';

/**
 * Authentic, clean initial state with ZERO fake profiles, ZERO fake projects, and ZERO fake testimonials.
 * Real builders and real projects are created and added by genuine users.
 */

export const INITIAL_USER: UserProfile = {
  id: 'usr_me',
  name: 'New Builder',
  username: 'builder',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  headline: 'Builder on ShipWith ready to ship products',
  bio: 'Ready to connect with co-founders, start 4-day trial sprints, and build verifiable reputation.',
  role: 'Fullstack',
  country: 'India',
  timezone: 'GMT+5:30 (Asia/Kolkata)',
  availability: 'Available',
  weeklyHours: '10–20 hrs/week',
  lookingFor: [],
  skills: ['TypeScript', 'React', 'Tailwind CSS'],
  proofLinks: {},
  stats: {
    shipsCount: 0,
    trialBuildsCount: 0,
    collaborationsCount: 0,
    repeatTeammatesCount: 0,
    positiveFeedbackPercent: 0
  }
};

// Real network directories start empty until genuine creators join and post
export const MOCK_BUILDERS: UserProfile[] = [];
export const MOCK_BUILDS: BuildRecord[] = [];
export const MOCK_FEED_POSTS: FeedPost[] = [];
export const MOCK_WORKSPACE_TASKS: WorkspaceTask[] = [];
export const MOCK_TRIAL_BUILD: TrialBuild | null = null;
