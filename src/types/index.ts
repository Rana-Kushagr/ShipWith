// ============================================================
// SHIPWITH TYPES & DATA CONTRACTS
// Aligned with Simplify.jobs & Peerlist.io specifications
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
  // Simplify-Style 7-Question Guided Flow
  step1Goal: string; // 1. How do you want to start? (Join a startup / Find people for mine / Start together)
  step2Interests: string[]; // 2. What are you most into? (Entrepreneurship, Tech, AI, etc.)
  step3Skills: string[]; // 3. What can you help with? (Max 3: Tech, Design, Marketing, etc.)
  step4Stage: string; // 4. Where are you right now? (Just starting / Building / Experienced)
  step5Location: { country: string; timezone: string }; // 5. Where are you based?
  step6Meet: string[]; // 6. Who do you want to meet? (Co-founder / Developer / Designer, etc.)
  step7Hours: string; // 7. How much time can you give?
  claimedHandle: string;
  completed: boolean;

  // Compatibility fields
  objective?: string;
  strengths?: string[];
  techStacks?: string[];
  experienceYears?: string;
  industries?: string[];
  stage?: string;
  weeklyHours?: CommitmentOption | '';
  workingStyle?: string;
  desiredCollaborators?: string[];
  compensationPhilosophy?: string;
  trialAgreement?: boolean;
  githubUsername?: string;
  headline?: string;
  country?: string;
  timezone?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  handle?: string;
  avatar: string;
  headline: string;
  bio: string;
  role: RoleCategory | string;
  country: string;
  timezone: string;
  location?: string;
  availability: 'Available' | 'Few hours' | 'Busy' | string;
  weeklyHours: CommitmentOption | string;
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
  verifiedWorkplaces?: string[];
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
