import {
  SEED_STARTUPS,
  SEED_BUILDERS,
  SEED_FEED_POSTS,
  SEED_WORKSPACES,
  SEED_NOTIFICATIONS
} from './seedData';
import type { UserProfile, BuildRecord, FeedPost, WorkspaceTask, TrialBuild, NotificationItem } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_me',
  name: 'Kushagr Rana',
  username: 'kushagr',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'Full-Stack Builder & Systems Architect',
  bio: 'Building autonomous agent tools, high-craft web interfaces, and fast trial sprints on ShipWith.',
  role: 'Fullstack',
  country: 'India',
  timezone: 'GMT+5:30 (Asia/Kolkata)',
  availability: 'Available',
  weeklyHours: '10–20 hrs/week',
  lookingFor: ['Product Designer', 'AI Agent Architect', 'Growth Lead'],
  skills: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
  proofLinks: {
    github: 'https://github.com/Rana-Kushagr',
    x: 'https://x.com/kushagr_dev',
    portfolio: 'https://kushagr.dev'
  },
  stats: {
    shipsCount: 4,
    trialBuildsCount: 6,
    collaborationsCount: 8,
    repeatTeammatesCount: 4,
    positiveFeedbackPercent: 100
  }
};

// Map seed startups to BuildRecord
export const MOCK_BUILDS: BuildRecord[] = SEED_STARTUPS.map((s) => ({
  id: s.id,
  title: s.name,
  tagline: s.tagline,
  description: `${s.problem} ${s.solution}`,
  stage: s.stage === 'Building' ? 'Building MVP' : s.stage === 'Beta' ? 'Beta Testing' : s.stage === 'Live' ? 'Live & Monetizing' : 'Idea & Validation',
  creatorId: s.founder.handle,
  creatorName: s.founder.name,
  creatorAvatar: s.founder.avatar,
  neededRoles: s.rolesNeeded.map((r) => ({
    role: r.role,
    skills: r.skills,
    commitment: (r.commitment.includes('15') ? '10–20 hrs/week' : '5–10 hrs/week') as any,
    filled: false
  })),
  techStack: s.techStack,
  team: [
    {
      userId: s.founder.handle,
      userName: s.founder.name,
      userAvatar: s.founder.avatar,
      role: s.founder.role,
      confirmed: true
    }
  ],
  hoursPerWeek: (s.weeklyHours.includes('15') ? '10–20 hrs/week' : '5–10 hrs/week') as any,
  isRemote: true,
  equityOrTerms: 'Equal / Fair Equity Split',
  demoUrl: s.demoUrl,
  repoUrl: s.repoUrl,
  createdAt: s.createdAt,
  stats: {
    interestedCount: s.upvotesCount,
    applicantsCount: Math.floor(s.upvotesCount / 4) + 2
  }
}));

// Map seed builders to UserProfile
export const MOCK_BUILDERS: UserProfile[] = SEED_BUILDERS.map((b) => ({
  id: b.id,
  name: b.name,
  username: b.handle.replace('@', ''),
  avatar: b.avatar,
  headline: b.role,
  bio: b.bio,
  role: b.role.toLowerCase().includes('design') ? 'UI/UX Design' : b.role.toLowerCase().includes('ai') ? 'AI / ML' : 'Fullstack',
  country: b.location.split(',')[1]?.trim() || b.location,
  timezone: b.timezone,
  availability: b.availability.includes('Available') ? 'Available' : 'Few hours',
  weeklyHours: '10–20 hrs/week',
  lookingFor: b.lookingFor,
  skills: b.skills,
  proofLinks: {
    github: `https://github.com/${b.handle.replace('@', '')}`,
    portfolio: `https://${b.handle.replace('@', '')}.dev`
  },
  stats: {
    shipsCount: b.stats.ships,
    trialBuildsCount: b.stats.trialsCompleted,
    collaborationsCount: b.stats.ships + b.stats.trialsCompleted,
    repeatTeammatesCount: b.stats.repeatTeammates,
    positiveFeedbackPercent: 100
  }
}));

// Map seed feed posts to FeedPost
export const MOCK_FEED_POSTS: FeedPost[] = SEED_FEED_POSTS.map((p) => ({
  id: p.id,
  type: (p.type === 'Building' ? 'building' : p.type === 'Need Teammate' ? 'need_teammate' : p.type === 'Need Help' ? 'need_help' : p.type === 'Need Users' ? 'need_users' : p.type === 'Need Feedback' ? 'need_feedback' : 'shipped') as any,
  author: {
    id: p.author.handle,
    name: p.author.name,
    avatar: p.author.avatar,
    role: p.author.role
  },
  title: p.title,
  content: p.content,
  tags: p.tags,
  metadata: {
    rolesNeeded: p.rolesNeeded,
    weeklyHours: p.weeklyHours,
    feedbackCount: p.metrics?.feedback,
    demoUrl: 'https://pulseai.dev'
  },
  createdAt: p.createdAt
}));

export const MOCK_WORKSPACE_TASKS: WorkspaceTask[] = SEED_WORKSPACES[0].tasks.map((t) => ({
  id: t.id,
  title: t.title,
  ownerName: t.assignee,
  status: (t.status === 'in_progress' ? 'in_progress' : t.status === 'done' ? 'done' : 'not_started') as any
}));

export const MOCK_TRIAL_BUILD: TrialBuild = {
  id: 'trial-active-1',
  buildId: 'startup-pulseai',
  buildTitle: 'PulseAI Workflow Engine',
  objective: 'Ship v1.0 PR triage agent with GitHub Webhook integration and test dashboard',
  startDate: 'Day 1',
  endDate: 'Day 5 (1 Day Remaining)',
  status: 'active',
  repoUrl: 'https://github.com/Rana-Kushagr/ShipWith',
  demoUrl: 'https://pulseai.dev',
  participants: [
    { userId: 'usr-1', name: 'Kushagr Rana', role: 'Full-Stack Lead' },
    { userId: 'usr-2', name: 'Maya Lin', role: 'UI/UX Designer' },
    { userId: 'usr-3', name: 'Arjun Verma', role: 'Backend Systems' }
  ]
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = SEED_NOTIFICATIONS.map((n) => ({
  id: n.id,
  title: n.title,
  message: n.message,
  type: (n.type === 'invite' ? 'invite' : n.type === 'match' ? 'application' : n.type === 'ship' ? 'feedback' : 'trial') as any,
  timestamp: n.time,
  read: n.read,
  linkTarget: n.linkTarget
}));
