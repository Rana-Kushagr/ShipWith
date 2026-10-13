// ============================================================
// SHIPWITH TYPES & DATA CONTRACTS
// Aligned with ShipWith PRD v1.0 and Product Quality Constitution
// ============================================================

export type RoleCategory = 
  | 'Frontend' 
  | 'Backend' 
  | 'Fullstack' 
  | 'AI / ML' 
  | 'UI/UX Design' 
  | 'Product Management' 
  | 'Marketing & Growth' 
  | 'E-commerce'
  | 'Content & Creator';

export type BuildStage = 
  | 'Idea & Validation' 
  | 'Building MVP' 
  | 'Beta Testing' 
  | 'Live & Monetizing'
  | 'Shipped';

export type CommitmentOption = 
  | '< 5 hrs/week' 
  | '5–10 hrs/week' 
  | '10–20 hrs/week' 
  | '20+ hrs/week' 
  | 'Full-time';

export type PostType = 
  | 'building' 
  | 'need_teammate' 
  | 'need_help' 
  | 'need_users' 
  | 'need_feedback' 
  | 'shipped';

export interface OnboardingState {
  objective: string;                 // Question 1: Primary goal
  strengths: string[];               // Question 2: Core crafts (multi-select)
  techStacks: string[];              // Question 3: Primary tools/stacks (multi-select)
  experienceYears: string;           // Question 4: Years of experience
  industries: string[];              // Question 5: Domains / industries (multi-select)
  stage: string;                     // Question 6: Project stage
  weeklyHours: CommitmentOption;     // Question 7: Weekly availability
  workingStyle: string;              // Question 8: Async / Hybrid / Live
  desiredCollaborators: string[];    // Question 9: Missing roles (multi-select)
  compensationPhilosophy: string;   // Question 10: Equity & terms
  trialAgreement: boolean;           // Question 11: 4-Day Trial Sprint Protocol
  githubUsername?: string;           // Question 12: GitHub / Portfolio link
  headline?: string;                 // Question 12: 1-sentence bio
  country: string;
  timezone: string;
  completed: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  headline: string;
  bio: string;
  role: RoleCategory;
  country: string;
  timezone: string;
  availability: 'Available' | 'Few hours' | 'Busy';
  weeklyHours: CommitmentOption;
  lookingFor: string[];
  skills: string[];
  proofLinks: {
    github?: string;
    figma?: string;
    liveDemo?: string;
    website?: string;
    x?: string;
    portfolio?: string;
  };
  stats: {
    shipsCount: number;
    trialBuildsCount: number;
    collaborationsCount: number;
    repeatTeammatesCount: number;
    positiveFeedbackPercent: number;
  };
}

export interface ContributorRole {
  userId: string;
  userName: string;
  userAvatar: string;
  role: string;
  confirmed: boolean;
}

export interface BuildRecord {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stage: BuildStage;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  neededRoles: {
    role: string;
    skills: string[];
    commitment: CommitmentOption;
    filled: boolean;
  }[];
  techStack: string[];
  team: ContributorRole[];
  hoursPerWeek: CommitmentOption;
  isRemote: boolean;
  equityOrTerms: string;
  demoUrl?: string;
  repoUrl?: string;
  createdAt: string;
  stats: {
    interestedCount: number;
    applicantsCount: number;
  };
}

export interface FeedPost {
  id: string;
  type: PostType;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  buildId?: string;
  title: string;
  content: string;
  tags: string[];
  metadata?: {
    rolesNeeded?: string[];
    weeklyHours?: string;
    userCount?: string;
    feedbackCount?: number;
    demoUrl?: string;
  };
  createdAt: string;
}

export interface WorkspaceTask {
  id: string;
  title: string;
  ownerId?: string;
  ownerName?: string;
  status: 'not_started' | 'in_progress' | 'done';
  dueDate?: string;
}

export interface TrialBuild {
  id: string;
  buildId: string;
  buildTitle: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'decision_pending' | 'continued' | 'ended';
  repoUrl?: string;
  demoUrl?: string;
  figmaUrl?: string;
  participants: {
    userId: string;
    name: string;
    role: string;
  }[];
}

export interface ProductSignal {
  type: 'tried_it' | 'found_bug' | 'would_pay' | 'want_collaborate';
  count: number;
  userVoted: boolean;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  contextBuildTitle?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'invite' | 'application' | 'trial' | 'feedback' | 'message';
  timestamp: string;
  read: boolean;
  linkTarget?: string;
}
