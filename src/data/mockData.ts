import type { UserProfile, BuildRecord, FeedPost, WorkspaceTask, TrialBuild } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_me',
  name: 'Lakshit Rana',
  username: 'lakshit_ui',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'Product Designer & Frontend Engineer building tools for creators',
  bio: 'Obsessed with high-density interfaces, typography, and micro-interactions. Previously shipped 2 SaaS tools with 3k+ active users. Seeking a backend co-founder for an AI-native workspace.',
  role: 'UI/UX Design',
  country: 'India',
  timezone: 'GMT+5:30 (Asia/Kolkata)',
  availability: 'Available',
  weeklyHours: '10–20 hrs/week',
  lookingFor: ['Backend Engineer', 'Fullstack Dev', 'AI / ML Specialist'],
  skills: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Next.js'],
  proofLinks: {
    github: 'https://github.com/lakshit',
    liveDemo: 'https://shipwith.dev',
    portfolio: 'https://lakshit.design',
    x: 'https://x.com/lakshit'
  },
  stats: {
    shipsCount: 3,
    trialBuildsCount: 2,
    collaborationsCount: 4,
    repeatTeammatesCount: 2,
    positiveFeedbackPercent: 100
  }
};

export const MOCK_BUILDERS: UserProfile[] = [
  {
    id: 'usr_1',
    name: 'Arjun Verma',
    username: 'arjun_v',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    headline: 'Full-stack developer building in public. Interested in AI & SaaS.',
    bio: 'Ex-startup engineer. Love shipping fast with Next.js, Postgres & Tailwind. Looking to join an early-stage team with strong product-market traction.',
    role: 'Fullstack',
    country: 'India',
    timezone: 'GMT+5:30 (Asia/Kolkata)',
    availability: 'Available',
    weeklyHours: '10–20 hrs/week',
    lookingFor: ['UI/UX Designer', 'Growth Marketer'],
    skills: ['React', 'Next.js', 'PostgreSQL', 'TypeScript', 'Node.js', 'Docker'],
    proofLinks: {
      github: 'https://github.com/arjun-v',
      liveDemo: 'https://ai-study-kit.vercel.app'
    },
    stats: {
      shipsCount: 4,
      trialBuildsCount: 3,
      collaborationsCount: 5,
      repeatTeammatesCount: 2,
      positiveFeedbackPercent: 100
    }
  },
  {
    id: 'usr_2',
    name: 'Simran Kaur',
    username: 'simran_design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    headline: 'Product Designer open to early stage, high-momentum projects.',
    bio: 'Crafting clean, accessible design systems that convert. Focusing on B2B SaaS and AI productivity workflows. 4+ years of agency & freelance experience.',
    role: 'UI/UX Design',
    country: 'United Kingdom',
    timezone: 'GMT+1:00 (London)',
    availability: 'Few hours',
    weeklyHours: '5–10 hrs/week',
    lookingFor: ['Technical Co-founder', 'Fullstack Engineer'],
    skills: ['Figma', 'Design Tokens', 'User Research', 'Design Systems', 'HTML/CSS'],
    proofLinks: {
      portfolio: 'https://simran.design',
      figma: 'https://figma.com/@simrankaur'
    },
    stats: {
      shipsCount: 2,
      trialBuildsCount: 2,
      collaborationsCount: 3,
      repeatTeammatesCount: 1,
      positiveFeedbackPercent: 100
    }
  },
  {
    id: 'usr_3',
    name: 'Aditya Rao',
    username: 'aditya_growth',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    headline: 'Growth marketer & GTM lead. Scaled 3 dev-tools from 0 to 10k users.',
    bio: 'SEO, programmatic content, cold outreach, and developer community building. Looking to team up with engineers who build kickass products.',
    role: 'Marketing & Growth',
    country: 'India',
    timezone: 'GMT+5:30 (Asia/Kolkata)',
    availability: 'Available',
    weeklyHours: '10–20 hrs/week',
    lookingFor: ['Technical Co-founder', 'Fullstack Developer'],
    skills: ['GTM Strategy', 'SEO', 'Developer Marketing', 'Cold Email', 'Analytics'],
    proofLinks: {
      x: 'https://x.com/adityarao'
    },
    stats: {
      shipsCount: 3,
      trialBuildsCount: 1,
      collaborationsCount: 4,
      repeatTeammatesCount: 2,
      positiveFeedbackPercent: 100
    }
  },
  {
    id: 'usr_4',
    name: 'Riya Mehta',
    username: 'riya_ai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    headline: 'AI / ML Engineer specializing in local LLMs and multi-agent systems.',
    bio: 'Fine-tuning models on specific domain datasets. Building agentic automation loops. Seeking a frontend lead who cares about polish.',
    role: 'AI / ML',
    country: 'United States',
    timezone: 'GMT-4:00 (New York)',
    availability: 'Available',
    weeklyHours: '20+ hrs/week',
    lookingFor: ['Frontend Engineer', 'UI/UX Designer'],
    skills: ['Python', 'PyTorch', 'LangChain', 'vLLM', 'FastAPI', 'PostgreSQL'],
    proofLinks: {
      github: 'https://github.com/riya-m'
    },
    stats: {
      shipsCount: 5,
      trialBuildsCount: 4,
      collaborationsCount: 6,
      repeatTeammatesCount: 3,
      positiveFeedbackPercent: 100
    }
  }
];

export const MOCK_BUILDS: BuildRecord[] = [
  {
    id: 'bld_1',
    title: 'AI study tool for students',
    tagline: 'Personalized interactive flashcards, notes, and doubt solver.',
    description: 'We are building an AI-assisted companion that helps university students master STEM subjects with automated practice flows and spaced repetition.',
    stage: 'Building MVP',
    creatorId: 'usr_1',
    creatorName: 'Arjun Verma',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    neededRoles: [
      { role: 'Frontend Engineer', skills: ['React', 'Tailwind'], commitment: '5–10 hrs/week', filled: false },
      { role: 'UI/UX Designer', skills: ['Figma', 'Wireframing'], commitment: '5–10 hrs/week', filled: false },
      { role: 'Growth Marketer', skills: ['Campus Outreach', 'TikTok/Reels'], commitment: '< 5 hrs/week', filled: false }
    ],
    techStack: ['React', 'Next.js', 'FastAPI', 'Supabase', 'Tailwind CSS'],
    team: [
      { userId: 'usr_1', userName: 'Arjun Verma', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Fullstack Dev & Founder', confirmed: true }
    ],
    hoursPerWeek: '10–20 hrs/week',
    isRemote: true,
    equityOrTerms: 'Equal equity split for early core contributors',
    demoUrl: 'https://campus-ai.vercel.app',
    repoUrl: 'https://github.com/arjun-v/campus-ai',
    createdAt: '2 hours ago',
    stats: {
      interestedCount: 14,
      applicantsCount: 6
    }
  },
  {
    id: 'bld_2',
    title: 'D2C Analytics Workspace',
    tagline: 'Clean telemetry and customer cohort analysis for Shopify brands.',
    description: 'Replacing bloated enterprise dashboards with a lightweight daily command center for indie e-commerce founders.',
    stage: 'Building MVP',
    creatorId: 'usr_3',
    creatorName: 'Aditya Rao',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    neededRoles: [
      { role: 'Frontend Lead', skills: ['React', 'Chart.js', 'Tailwind'], commitment: '10–20 hrs/week', filled: false },
      { role: 'Backend Data Eng', skills: ['Python', 'DuckDB', 'Shopify API'], commitment: '10–20 hrs/week', filled: false }
    ],
    techStack: ['TypeScript', 'Tailwind', 'Python', 'DuckDB', 'Shopify API'],
    team: [
      { userId: 'usr_3', userName: 'Aditya Rao', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'Product & Growth', confirmed: true }
    ],
    hoursPerWeek: '10–20 hrs/week',
    isRemote: true,
    equityOrTerms: 'Revenue share + 35% equity pool',
    demoUrl: 'https://d2c-analytics-demo.vercel.app',
    createdAt: '5 hours ago',
    stats: {
      interestedCount: 22,
      applicantsCount: 9
    }
  },
  {
    id: 'bld_3',
    title: 'Campus AI Tutor',
    tagline: 'Live interactive study companion for college students.',
    description: 'Launched demo with 1,200 active users. Verified proof of execution with community ratings.',
    stage: 'Shipped',
    creatorId: 'usr_1',
    creatorName: 'Arjun Verma',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    neededRoles: [],
    techStack: ['Next.js', 'OpenAI', 'Tailwind CSS', 'Vercel'],
    team: [
      { userId: 'usr_1', userName: 'Arjun Verma', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Fullstack Dev', confirmed: true },
      { userId: 'usr_2', userName: 'Simran Kaur', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'UI/UX Designer', confirmed: true }
    ],
    hoursPerWeek: 'Full-time',
    isRemote: true,
    equityOrTerms: 'Co-founded',
    demoUrl: 'https://campus-ai.live',
    repoUrl: 'https://github.com/campus-ai/app',
    createdAt: '1 day ago',
    stats: {
      interestedCount: 85,
      applicantsCount: 0
    }
  }
];

export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: 'post_1',
    type: 'need_teammate',
    author: {
      id: 'usr_1',
      name: 'Arjun Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Full-stack Developer'
    },
    buildId: 'bld_1',
    title: 'AI study tool for students',
    content: 'Building an AI-powered study platform to help students learn faster with personalized notes, quizzes, and practice flows. Looking for a frontend developer who loves clean UX.',
    tags: ['AI', 'EdTech', 'Early stage'],
    metadata: {
      rolesNeeded: ['Frontend Engineer', 'UI/UX Designer'],
      weeklyHours: '6 hrs/week',
      demoUrl: 'https://campus-ai.vercel.app'
    },
    createdAt: '2h ago'
  },
  {
    id: 'post_2',
    type: 'building',
    author: {
      id: 'usr_3',
      name: 'Aditya Rao',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Growth Marketer'
    },
    buildId: 'bld_2',
    title: 'D2C analytics workspace',
    content: 'Need a frontend builder and part-time marketer to help launch an MVP for D2C brands tracking sales and customer retention cohorts. Working prototype ready.',
    tags: ['SaaS', 'E-commerce', 'MVP'],
    metadata: {
      rolesNeeded: ['Frontend Lead', 'Backend Data Eng'],
      weeklyHours: '10 hrs/week'
    },
    createdAt: '5h ago'
  },
  {
    id: 'post_3',
    type: 'shipped',
    author: {
      id: 'usr_1',
      name: 'Arjun Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Full-stack Developer'
    },
    buildId: 'bld_3',
    title: 'Campus AI Tutor — Launched live!',
    content: 'Launched live demo! Getting first users and student feedback. College study companion with auto flashcards and doubt solving.',
    tags: ['AI', 'Education', 'Productivity'],
    metadata: {
      userCount: '1.2k users',
      feedbackCount: 85,
      demoUrl: 'https://campus-ai.live'
    },
    createdAt: '1d ago'
  }
];

export const MOCK_WORKSPACE_TASKS: WorkspaceTask[] = [
  { id: 'tsk_1', title: 'Setup GitHub repository & branch protections', ownerName: 'Arjun Verma', status: 'done' },
  { id: 'tsk_2', title: 'Design landing page hero & cards in Figma', ownerName: 'Lakshit Rana', status: 'in_progress' },
  { id: 'tsk_3', title: 'Integrate OpenAI streaming endpoint', ownerName: 'Arjun Verma', status: 'in_progress' },
  { id: 'tsk_4', title: 'Conduct student usability testing sessions', ownerName: 'Aditya Rao', status: 'not_started' },
  { id: 'tsk_5', title: 'Launch MVP and recruit first 100 campus users', status: 'not_started' }
];

export const MOCK_TRIAL_BUILD: TrialBuild = {
  id: 'trl_1',
  buildId: 'bld_1',
  buildTitle: 'Campus AI Tutor',
  objective: 'Build and deploy a responsive interactive flashcard generator in 5 days.',
  startDate: '14 Oct 2026',
  endDate: '19 Oct 2026',
  status: 'active',
  participants: [
    { userId: 'usr_1', name: 'Arjun Verma', role: 'Fullstack Dev' },
    { userId: 'usr_me', name: 'Lakshit Rana', role: 'Frontend & UI' }
  ]
};
