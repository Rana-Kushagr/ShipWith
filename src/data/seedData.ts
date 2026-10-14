// ============================================================
// SHIPWITH SEED DATA ENGINE
// Rich, production-grade dataset for Startups, Builders,
// Weekly ShipPad Launches, Active Workspaces, Messages & Notifications
// ============================================================

export interface SeedStartup {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  tagline: string;
  problem: string;
  solution: string;
  stage: 'Building' | 'Hiring' | 'Beta' | 'Live';
  industry: string;
  techStack: string[];
  rolesNeeded: { role: string; commitment: string; skills: string[]; spots: number }[];
  weeklyHours: string;
  location: string;
  matchScore: number;
  matchReasons: string[];
  founder: { name: string; handle: string; avatar: string; role: string };
  demoUrl?: string;
  repoUrl?: string;
  upvotesCount: number;
  createdAt: string;
}

export interface SeedBuilder {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  timezone: string;
  availability: string;
  weeklyHours: string;
  skills: string[];
  lookingFor: string[];
  matchScore: number;
  verifiedWorkplaces: string[];
  stats: {
    ships: number;
    trialsCompleted: number;
    repeatTeammates: number;
    wouldBuildAgainRate: string;
  };
  shipHistory: { title: string; role: string; year: string; link?: string }[];
  heatmapDays: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
}

export interface SeedShipPadItem {
  id: string;
  rank: number;
  week: number;
  year: number;
  title: string;
  tagline: string;
  description: string;
  category: string;
  demoUrl: string;
  repoUrl?: string;
  contributors: { name: string; role: string; avatar: string; handle: string }[];
  triedCount: number;
  wouldPayCount: number;
  bugCount: number;
  feedbackCount: number;
  collaborateCount: number;
  userVoted: {
    tried: boolean;
    wouldPay: boolean;
    bug: boolean;
    feedback: boolean;
    collaborate: boolean;
  };
  comments: { id: string; author: string; avatar: string; text: string; time: string }[];
}

export interface SeedFeedPost {
  id: string;
  type: 'Building' | 'Need Teammate' | 'Need Help' | 'Need Users' | 'Need Feedback' | 'Shipped';
  author: {
    name: string;
    handle: string;
    avatar: string;
    role: string;
  };
  title: string;
  content: string;
  tags: string[];
  startupName?: string;
  rolesNeeded?: string[];
  weeklyHours?: string;
  metrics?: { tried: number; wouldPay: number; feedback: number; replies: number };
  repliesCount?: number;
  createdAt: string;
}

export interface SeedWorkspace {
  id: string;
  title: string;
  tagline: string;
  isTrial: boolean;
  trialDaysLeft?: number;
  trialTotalDays?: number;
  objective: string;
  team: { id: string; name: string; role: string; avatar: string; handle: string; confirmed: boolean }[];
  tasks: { id: string; title: string; assignee: string; status: 'todo' | 'in_progress' | 'done'; priority: 'high' | 'medium' | 'low' }[];
  shipLogs: { id: string; author: string; avatar: string; content: string; time: string; links?: string[] }[];
  chatMessages: { id: string; sender: string; avatar: string; text: string; time: string }[];
  connectedLinks: { label: string; url: string; type: 'github' | 'figma' | 'demo' | 'docs' }[];
  demoEmbedUrl?: string;
}

export type HeatmapDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

// Generate realistic 52-week activity heatmap data (364 days)
export function generateHeatmap(seedFactor: number): HeatmapDay[] {
  const days: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  const today = new Date();
  
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Pseudo-random distribution with active streaks
    const pseudoRand = Math.sin(i * 0.45 + seedFactor) * 10000;
    const val = Math.abs(pseudoRand - Math.floor(pseudoRand));
    
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (val > 0.4) {
      if (val > 0.88) { count = Math.floor(val * 9) + 4; level = 4; }
      else if (val > 0.72) { count = Math.floor(val * 6) + 3; level = 3; }
      else if (val > 0.55) { count = Math.floor(val * 4) + 2; level = 2; }
      else { count = 1; level = 1; }
    }
    
    days.push({ date: dateStr, count, level });
  }
  return days;
}

export const SEED_STARTUPS: SeedStartup[] = [
  {
    id: 'startup-pulseai',
    name: 'PulseAI',
    logoText: 'PA',
    logoBg: '#1A5052',
    tagline: 'Autonomous background workflow engine for modern dev teams',
    problem: 'Dev teams lose 14+ hours a week switching contexts between Jira, Slack, and terminal pull requests.',
    solution: 'PulseAI coordinates autonomous worker agents that draft PRs, run dry regressions, and auto-triage incoming bug reports.',
    stage: 'Building',
    industry: 'AI & Developer Tools',
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
    rolesNeeded: [
      { role: 'Lead Full-Stack Engineer', commitment: '15 hrs/wk', skills: ['React 19', 'Next.js', 'PostgreSQL'], spots: 1 },
      { role: 'AI Agent Architect', commitment: '10 hrs/wk', skills: ['Python', 'LangGraph', 'FastAPI'], spots: 1 }
    ],
    weeklyHours: '10–15 hrs/wk',
    location: 'Remote · GMT+5:30 / Flexible',
    matchScore: 96,
    matchReasons: ['React 19 & TypeScript stack match', '15 hrs/wk schedule compatibility', 'Building MVP phase alignment'],
    founder: {
      name: 'Kushagr Rana',
      handle: '@kushagr',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Founder & Full-Stack'
    },
    demoUrl: 'https://pulseai.dev',
    repoUrl: 'https://github.com/Rana-Kushagr/ShipWith',
    upvotesCount: 84,
    createdAt: '2 days ago'
  },
  {
    id: 'startup-layermint',
    name: 'LayerMint',
    logoText: 'LM',
    logoBg: '#0D9488',
    tagline: 'Instant micro-bounties for open-source component polish',
    problem: 'Open source maintainers lack an easy way to pay contributors for fast 2-hour bug fixes and Tailwind micro-polish.',
    solution: 'One-click GitHub bounty bots that escrow funds and instantly distribute micro-rewards when PRs merge.',
    stage: 'Beta',
    industry: 'Fintech & DevTools',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe Connect'],
    rolesNeeded: [
      { role: 'UI/UX Product Designer', commitment: '10 hrs/wk', skills: ['Figma', 'Design Systems', 'Micro-interactions'], spots: 1 },
      { role: 'Growth & Developer Relations', commitment: '5–10 hrs/wk', skills: ['Content', 'Open Source', 'Community'], spots: 1 }
    ],
    weeklyHours: '10 hrs/wk',
    location: 'Remote · Worldwide',
    matchScore: 93,
    matchReasons: ['Figma to code fidelity', 'Micro-milestone trial preference', 'Tailwind CSS mastery'],
    founder: {
      name: 'Maya Lin',
      handle: '@maya_ux',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      role: 'Co-founder & Product Lead'
    },
    demoUrl: 'https://layermint.io',
    repoUrl: 'https://github.com/layermint/core',
    upvotesCount: 67,
    createdAt: '3 days ago'
  },
  {
    id: 'startup-synclabs',
    name: 'SyncLabs',
    logoText: 'SL',
    logoBg: '#D94E1F',
    tagline: 'Real-time collaborative audio studio directly in your browser',
    problem: 'Remote podcast and music creators suffer from 300ms network latency and distorted audio during live sessions.',
    solution: 'WebRTC + WebAudio native workstation that records uncompressed stems locally and syncs them automatically.',
    stage: 'Building',
    industry: 'Creator Economy & Audio',
    techStack: ['WebAudio API', 'WebRTC', 'React', 'Rust / Wasm', 'Node.js'],
    rolesNeeded: [
      { role: 'Rust / Wasm Audio Engineer', commitment: '12 hrs/wk', skills: ['Rust', 'WebAssembly', 'DSP'], spots: 1 },
      { role: 'Frontend Audio UI Specialist', commitment: '10 hrs/wk', skills: ['Canvas API', 'React', 'TypeScript'], spots: 1 }
    ],
    weeklyHours: '10–15 hrs/wk',
    location: 'Remote · US & EU Friendly',
    matchScore: 91,
    matchReasons: ['Browser-native performance focus', 'High craft design standards', 'Trial-to-hire path'],
    founder: {
      name: 'Devon Vance',
      handle: '@devon_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Audio Systems Engineer'
    },
    demoUrl: 'https://synclabs.audio',
    upvotesCount: 92,
    createdAt: '5 days ago'
  },
  {
    id: 'startup-candidflow',
    name: 'CandidFlow',
    logoText: 'CF',
    logoBg: '#102223',
    tagline: 'Async video standups with automatic AI action item extraction',
    problem: 'Remote distributed startups waste the first 45 minutes of everyday doing live round-robin standups across 6 timezones.',
    solution: '60-second Loom-like snippets automatically summarized into actionable linear tasks with smart blocker alerts.',
    stage: 'Live',
    industry: 'Productivity & B2B SaaS',
    techStack: ['Next.js 15', 'Python Whisper', 'PostgreSQL', 'Tailwind', 'FFmpeg'],
    rolesNeeded: [
      { role: 'GTM & Growth Lead', commitment: '15 hrs/wk', skills: ['B2B SaaS', 'Cold Outreach', 'Product Hunt'], spots: 1 }
    ],
    weeklyHours: '15 hrs/wk',
    location: 'Remote · GMT+1 to GMT+5:30',
    matchScore: 88,
    matchReasons: ['Async-first culture', 'B2B SaaS experience', 'Fast ship cadences'],
    founder: {
      name: 'Sofia Chen',
      handle: '@sofiac',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Founder & CEO'
    },
    demoUrl: 'https://candidflow.app',
    upvotesCount: 114,
    createdAt: '1 week ago'
  },
  {
    id: 'startup-omnicache',
    name: 'OmniCache',
    logoText: 'OC',
    logoBg: '#2563EB',
    tagline: 'Distributed edge caching layer for LLM prompt embeddings',
    problem: 'Companies calling OpenAI/Anthropic APIs spend $10k+/mo repeating the exact same vector lookups.',
    solution: 'Sub-2ms edge semantic cache that detects semantic parity and returns cached generations at 90% reduced cost.',
    stage: 'Hiring',
    industry: 'AI Infrastructure',
    techStack: ['Go', 'Redis', 'Cloudflare Workers', 'pgvector', 'TypeScript'],
    rolesNeeded: [
      { role: 'Backend Distributed Systems Engineer', commitment: '20 hrs/wk', skills: ['Go', 'Redis', 'Distributed KV'], spots: 1 },
      { role: 'DevRel Advocate', commitment: '10 hrs/wk', skills: ['Technical Writing', 'SDKs', 'Demos'], spots: 1 }
    ],
    weeklyHours: '15–20 hrs/wk',
    location: 'Remote · Flexible',
    matchScore: 87,
    matchReasons: ['High throughput backend interest', 'Cloudflare ecosystem synergy'],
    founder: {
      name: 'Arjun Verma',
      handle: '@arjun_v',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Systems Architect'
    },
    demoUrl: 'https://omnicache.dev',
    upvotesCount: 78,
    createdAt: '4 days ago'
  },
  {
    id: 'startup-paperforge',
    name: 'PaperForge',
    logoText: 'PF',
    logoBg: '#7C3AED',
    tagline: 'AI interactive reading environment for deep technical papers',
    problem: 'Reading arxiv machine learning papers is grueling; formulas and architecture diagrams lack dynamic exploration.',
    solution: 'Turn any arXiv PDF into an executable notebook where equations are live sliders and tensor shapes are visualized.',
    stage: 'Beta',
    industry: 'EdTech & Research AI',
    techStack: ['React', 'Python', 'KaTeX', 'PyTorch', 'FastAPI'],
    rolesNeeded: [
      { role: 'Full-Stack React Engineer', commitment: '10 hrs/wk', skills: ['React', 'TypeScript', 'Canvas'], spots: 1 }
    ],
    weeklyHours: '10 hrs/wk',
    location: 'Remote · Worldwide',
    matchScore: 85,
    matchReasons: ['Complex visual frontend alignment', 'AI paper comprehension'],
    founder: {
      name: 'Elena Rostova',
      handle: '@elena_r',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'AI Researcher'
    },
    demoUrl: 'https://paperforge.ai',
    upvotesCount: 95,
    createdAt: '6 days ago'
  },
  {
    id: 'startup-fleetgrid',
    name: 'FleetGrid',
    logoText: 'FG',
    logoBg: '#059669',
    tagline: 'Decentralized compute pooling for local fine-tuning jobs',
    problem: 'Indie builders cannot afford $4/hr H100 instances for small LoRA runs on open weights.',
    solution: 'Peer-to-peer idle GPU cluster with cryptographically verified training checkpoints.',
    stage: 'Building',
    industry: 'AI & Distributed Compute',
    techStack: ['Rust', 'Python', 'Docker', 'WebSockets', 'React'],
    rolesNeeded: [
      { role: 'Rust P2P Network Engineer', commitment: '15 hrs/wk', skills: ['Rust', 'libp2p', 'Cryptography'], spots: 1 }
    ],
    weeklyHours: '15 hrs/wk',
    location: 'Remote',
    matchScore: 83,
    matchReasons: ['Decentralized compute curiosity', 'Rust architecture'],
    founder: {
      name: 'Liam O’Connor',
      handle: '@liam_oc',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      role: 'Infrastructure Lead'
    },
    demoUrl: 'https://fleetgrid.network',
    upvotesCount: 62,
    createdAt: '1 week ago'
  },
  {
    id: 'startup-cartmatrix',
    name: 'CartMatrix',
    logoText: 'CM',
    logoBg: '#EA580C',
    tagline: 'Hyper-personalized headless checkout drawer for Shopify Plus',
    problem: 'Standard Shopify cart slide-outs have sub-optimal upsell conversion and load bloated legacy scripts.',
    solution: 'Zero-dependency 4KB checkout drawer that predicts the exact 2 bundle recommendations with +18% AOV lift.',
    stage: 'Live',
    industry: 'E-Commerce & MarTech',
    techStack: ['Preact', 'TypeScript', 'Shopify Storefront API', 'Cloudflare Workers'],
    rolesNeeded: [
      { role: 'Shopify Storefront Specialist', commitment: '10 hrs/wk', skills: ['Shopify Liquid', 'Preact', 'Tailwind'], spots: 1 }
    ],
    weeklyHours: '10 hrs/wk',
    location: 'Remote · Flexible',
    matchScore: 81,
    matchReasons: ['Performance obsession', 'Direct revenue impact'],
    founder: {
      name: 'Chloe Martin',
      handle: '@chloe_ecom',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'E-com Founder'
    },
    demoUrl: 'https://cartmatrix.io',
    upvotesCount: 88,
    createdAt: '2 weeks ago'
  }
];

export const SEED_BUILDERS: SeedBuilder[] = [
  {
    id: 'builder-kushagr',
    name: 'Kushagr Rana',
    handle: '@kushagr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Full-Stack Engineer & Systems Builder',
    bio: 'Obsessed with high-craft web software, autonomous agent loops, and peer-to-peer building. Shipped 4 production apps in 2025.',
    location: 'New Delhi, India',
    timezone: 'GMT+5:30',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '15 hrs/wk',
    skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'FastAPI'],
    lookingFor: ['Product Designers', 'AI Researchers', 'Growth Marketers'],
    matchScore: 98,
    verifiedWorkplaces: ['ShipWith ✔', 'OpenSource ✔', 'Linear Styleguide ✔'],
    stats: {
      ships: 4,
      trialsCompleted: 6,
      repeatTeammates: 4,
      wouldBuildAgainRate: '4/4 (100%)'
    },
    shipHistory: [
      { title: 'PulseAI Workflow Engine', role: 'Full-Stack Architect', year: '2026', link: 'https://pulseai.dev' },
      { title: 'ShipWith Network', role: 'Lead Frontend', year: '2025', link: 'https://shipwith.app' },
      { title: 'DevRadar CLI', role: 'Open Source Creator', year: '2025' }
    ],
    heatmapDays: generateHeatmap(1.2)
  },
  {
    id: 'builder-maya',
    name: 'Maya Lin',
    handle: '@maya_ux',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Principal Product Designer',
    bio: 'Bridging design systems and real code. I build in Figma and push matching Tailwind PRs. 10+ years designing developer tools.',
    location: 'Singapore',
    timezone: 'GMT+8:00',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '10 hrs/wk',
    skills: ['Figma', 'Design Systems', 'Tailwind CSS', 'Micro-interactions', 'Prototyping', 'User Research'],
    lookingFor: ['Technical Co-founders', 'Rust Engineers'],
    matchScore: 95,
    verifiedWorkplaces: ['Linear ✔', 'Vercel Contributor ✔'],
    stats: {
      ships: 5,
      trialsCompleted: 5,
      repeatTeammates: 3,
      wouldBuildAgainRate: '5/5 (100%)'
    },
    shipHistory: [
      { title: 'LayerMint UI System', role: 'Lead Designer', year: '2026' },
      { title: 'Fluid Tokens UI Kit', role: 'Solo Creator', year: '2025' }
    ],
    heatmapDays: generateHeatmap(2.4)
  },
  {
    id: 'builder-arjun',
    name: 'Arjun Verma',
    handle: '@arjun_v',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Distributed Systems & Go Engineer',
    bio: 'Ex-Razorpay backend lead. Deep expertise in high-concurrency Redis pipelines, microservices, and Postgres query performance.',
    location: 'Bengaluru, India',
    timezone: 'GMT+5:30',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '15–20 hrs/wk',
    skills: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'gRPC', 'AWS'],
    lookingFor: ['Frontend Wizards', 'Product Managers'],
    matchScore: 92,
    verifiedWorkplaces: ['Razorpay ✔', 'Fintech Seed ✔'],
    stats: {
      ships: 3,
      trialsCompleted: 4,
      repeatTeammates: 2,
      wouldBuildAgainRate: '4/4 (100%)'
    },
    shipHistory: [
      { title: 'OmniCache Edge', role: 'Core Systems', year: '2026' },
      { title: 'Rupay Settlement Engine', role: 'Staff Backend', year: '2024' }
    ],
    heatmapDays: generateHeatmap(3.1)
  },
  {
    id: 'builder-elena',
    name: 'Elena Rostova',
    handle: '@elena_r',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'AI / ML Research Engineer',
    bio: 'Fine-tuning small language models and building eval benchmarks. Fast prototyping with LangGraph, vLLM, and HuggingFace.',
    location: 'Berlin, Germany',
    timezone: 'GMT+1:00',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '10 hrs/wk',
    skills: ['Python', 'PyTorch', 'vLLM', 'Transformers', 'LangGraph', 'Eval Engineering'],
    lookingFor: ['Full-stack Developers', 'UI Designers'],
    matchScore: 89,
    verifiedWorkplaces: ['Max Planck Institute ✔', 'HuggingFace Contributor ✔'],
    stats: {
      ships: 3,
      trialsCompleted: 3,
      repeatTeammates: 2,
      wouldBuildAgainRate: '3/3 (100%)'
    },
    shipHistory: [
      { title: 'PaperForge ML', role: 'AI Architect', year: '2026' },
      { title: 'PromptDiff Benchmark', role: 'Lead Author', year: '2025' }
    ],
    heatmapDays: generateHeatmap(4.5)
  },
  {
    id: 'builder-aditya',
    name: 'Aditya Rao',
    handle: '@aditya_g',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Growth Lead & Technical Marketer',
    bio: 'Turning zero-traffic repos into 10k GitHub stars and 500 active weekly users. Cold outreach, organic X narratives, and SEO engineering.',
    location: 'Mumbai, India',
    timezone: 'GMT+5:30',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '12 hrs/wk',
    skills: ['Growth Engineering', 'Content Strategy', 'SEO', 'Developer Communities', 'PostHog', 'Conversion Rate Opt'],
    lookingFor: ['Technical Builders', 'Open Source Maintainers'],
    matchScore: 88,
    verifiedWorkplaces: ['Product Hunt Top Maker ✔', 'DevRel Guild ✔'],
    stats: {
      ships: 6,
      trialsCompleted: 7,
      repeatTeammates: 5,
      wouldBuildAgainRate: '6/6 (100%)'
    },
    shipHistory: [
      { title: 'SaaS Launch Playbook', role: 'Author & Growth', year: '2025' },
      { title: 'DevStash Weekly', role: 'Publisher', year: '2025' }
    ],
    heatmapDays: generateHeatmap(5.2)
  },
  {
    id: 'builder-sofia',
    name: 'Sofia Chen',
    handle: '@sofiac',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Product Lead & Founder',
    bio: 'Ex-Stripe PM. Focused on high-velocity MVP scoping, customer discovery interviews, and zero-bullshit product-market fit tests.',
    location: 'San Francisco, USA',
    timezone: 'GMT-7:00',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '10 hrs/wk',
    skills: ['Product Management', 'Customer Discovery', 'User Onboarding', 'Pricing Models', 'Roadmapping'],
    lookingFor: ['Technical Co-founders', 'Fullstack Engineers'],
    matchScore: 86,
    verifiedWorkplaces: ['Stripe ✔', 'Y Combinator W22 ✔'],
    stats: {
      ships: 4,
      trialsCompleted: 4,
      repeatTeammates: 3,
      wouldBuildAgainRate: '4/4 (100%)'
    },
    shipHistory: [
      { title: 'CandidFlow', role: 'Founder & PM', year: '2025' },
      { title: 'Stripe Radar Rules', role: 'Product Manager', year: '2023' }
    ],
    heatmapDays: generateHeatmap(6.0)
  },
  {
    id: 'builder-liam',
    name: 'Liam O’Connor',
    handle: '@liam_oc',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Rust & Core Infrastructure Engineer',
    bio: 'Low-level systems programming, peer-to-peer gossip protocols, and memory-safe high-throughput daemons. Rust enthusiast since 2018.',
    location: 'Dublin, Ireland',
    timezone: 'GMT+0:00',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '15 hrs/wk',
    skills: ['Rust', 'libp2p', 'Tokio', 'Linux Systems', 'C/C++', 'WebAssembly'],
    lookingFor: ['AI Developers', 'Fullstack Engineers'],
    matchScore: 84,
    verifiedWorkplaces: ['Mozilla Contributor ✔', 'Cloud Infrastructure ✔'],
    stats: {
      ships: 3,
      trialsCompleted: 3,
      repeatTeammates: 2,
      wouldBuildAgainRate: '3/3 (100%)'
    },
    shipHistory: [
      { title: 'FleetGrid P2P', role: 'Protocol Lead', year: '2026' },
      { title: 'ZeroRing Tokio Buffer', role: 'Author', year: '2024' }
    ],
    heatmapDays: generateHeatmap(7.3)
  },
  {
    id: 'builder-chloe',
    name: 'Chloe Martin',
    handle: '@chloe_ecom',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'E-Commerce Engineer & Conversion Hacker',
    bio: 'Obsessed with sub-second page loads, headless Shopify storefronts, and conversion-optimized payment rails. $4M+ GMV optimized.',
    location: 'London, UK',
    timezone: 'GMT+0:00',
    availability: 'Available for 5-Day Trial',
    weeklyHours: '10 hrs/wk',
    skills: ['Shopify Liquid', 'Preact', 'Next.js', 'Tailwind', 'Stripe API', 'Conversion Optimization'],
    lookingFor: ['Growth Marketers', 'Product Designers'],
    matchScore: 82,
    verifiedWorkplaces: ['Gymshark Agency ✔', 'Shopify Plus Partner ✔'],
    stats: {
      ships: 5,
      trialsCompleted: 6,
      repeatTeammates: 4,
      wouldBuildAgainRate: '5/5 (100%)'
    },
    shipHistory: [
      { title: 'CartMatrix Drawer', role: 'Solo Creator', year: '2026' },
      { title: 'FastCheck Shopify Theme', role: 'Lead Architect', year: '2024' }
    ],
    heatmapDays: generateHeatmap(8.1)
  }
];

export const SEED_SHIPPAD_ITEMS: SeedShipPadItem[] = [
  {
    id: 'ship-pulseai',
    rank: 1,
    week: 42,
    year: 2026,
    title: 'PulseAI Workflow Engine',
    tagline: 'Autonomous background workflow agents for GitHub pull requests and regressions',
    description: 'Born out of a 4-day trial sprint on ShipWith! Coordinates multi-agent background workers that run dry test runs on your code and generate smart review notes before humans ever look.',
    category: 'Developer Tools',
    demoUrl: 'https://pulseai.dev',
    repoUrl: 'https://github.com/Rana-Kushagr/ShipWith',
    contributors: [
      { name: 'Kushagr Rana', role: 'Full-Stack Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', handle: '@kushagr' },
      { name: 'Maya Lin', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', handle: '@maya_ux' },
      { name: 'Arjun Verma', role: 'Backend Systems', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', handle: '@arjun_v' }
    ],
    triedCount: 84,
    wouldPayCount: 31,
    bugCount: 3,
    feedbackCount: 14,
    collaborateCount: 9,
    userVoted: { tried: false, wouldPay: false, bug: false, feedback: false, collaborate: false },
    comments: [
      { id: 'c1', author: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', text: 'The PR triage step saved our team 2 hours on day 1. Beautiful UI too.', time: '3h ago' },
      { id: 'c2', author: 'Aditya Rao', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', text: 'Upvoted! Would love to feature this in the next DevStash issue.', time: '5h ago' }
    ]
  },
  {
    id: 'ship-layermint',
    rank: 2,
    week: 42,
    year: 2026,
    title: 'LayerMint Micro-Bounties',
    tagline: 'Instant micro-bounties for open-source component polish and bug triage',
    description: 'Maintainers attach simple tags like #bounty-25 to GitHub issues. Contributors submit PRs and get paid automatically to their Stripe Connect or USDC wallet upon merge.',
    category: 'Fintech & OSS',
    demoUrl: 'https://layermint.io',
    repoUrl: 'https://github.com/layermint/core',
    contributors: [
      { name: 'Maya Lin', role: 'Product Lead', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', handle: '@maya_ux' },
      { name: 'Kushagr Rana', role: 'Smart Contracts & Web', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', handle: '@kushagr' }
    ],
    triedCount: 67,
    wouldPayCount: 22,
    bugCount: 1,
    feedbackCount: 9,
    collaborateCount: 5,
    userVoted: { tried: false, wouldPay: false, bug: false, feedback: false, collaborate: false },
    comments: [
      { id: 'c3', author: 'Devon Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', text: 'Already claimed $50 on an audio parser bug. Smooth payout!', time: '1d ago' }
    ]
  },
  {
    id: 'ship-candidflow',
    rank: 3,
    week: 42,
    year: 2026,
    title: 'CandidFlow Standups',
    tagline: '60-second video check-ins with automatic AI Linear task extraction',
    description: 'Replaces synchronous morning standup slogs across remote timezones. Record your update asynchronously and let AI map your blockers into your team sprint board.',
    category: 'Productivity',
    demoUrl: 'https://candidflow.app',
    contributors: [
      { name: 'Sofia Chen', role: 'Product Founder', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', handle: '@sofiac' },
      { name: 'Arjun Verma', role: 'Video Pipeline', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', handle: '@arjun_v' }
    ],
    triedCount: 52,
    wouldPayCount: 18,
    bugCount: 4,
    feedbackCount: 11,
    collaborateCount: 3,
    userVoted: { tried: false, wouldPay: false, bug: false, feedback: false, collaborate: false },
    comments: [
      { id: 'c4', author: 'Liam O’Connor', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', text: 'The Whisper transcription accuracy on heavy accents is surprisingly solid.', time: '2d ago' }
    ]
  },
  {
    id: 'ship-paperforge',
    rank: 4,
    week: 42,
    year: 2026,
    title: 'PaperForge Interactive Reader',
    tagline: 'Turn technical arXiv PDFs into dynamic executable notebooks',
    description: 'No more staring blankly at greek tensor notation. Click any formula to view a Python widget or test matrix multiplication live in your browser tab.',
    category: 'AI & Research',
    demoUrl: 'https://paperforge.ai',
    contributors: [
      { name: 'Elena Rostova', role: 'ML Researcher', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', handle: '@elena_r' },
      { name: 'Kushagr Rana', role: 'Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', handle: '@kushagr' }
    ],
    triedCount: 46,
    wouldPayCount: 14,
    bugCount: 2,
    feedbackCount: 8,
    collaborateCount: 4,
    userVoted: { tried: false, wouldPay: false, bug: false, feedback: false, collaborate: false },
    comments: []
  },
  {
    id: 'ship-cartmatrix',
    rank: 5,
    week: 42,
    year: 2026,
    title: 'CartMatrix Preact Drawer',
    tagline: '4KB headless checkout drawer for Shopify Plus with +18% AOV',
    description: 'Blazing fast, zero-dependency slide-out drawer that loads in 24ms and intelligently matches cross-sell bundles based on live cart items.',
    category: 'E-Commerce',
    demoUrl: 'https://cartmatrix.io',
    contributors: [
      { name: 'Chloe Martin', role: 'Shopify Architect', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', handle: '@chloe_ecom' },
      { name: 'Aditya Rao', role: 'Conversion Strategy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', handle: '@aditya_g' }
    ],
    triedCount: 39,
    wouldPayCount: 24,
    bugCount: 0,
    feedbackCount: 6,
    collaborateCount: 2,
    userVoted: { tried: false, wouldPay: false, bug: false, feedback: false, collaborate: false },
    comments: []
  },
  {
    id: 'ship-fleetgrid',
    rank: 6,
    week: 42,
    year: 2026,
    title: 'FleetGrid P2P Daemon',
    tagline: 'Decentralized local GPU pooling for budget-friendly LoRA fine-tuning',
    description: 'Lightweight Rust daemon that coordinates idle MacBook M-series and gaming GPUs into a distributed compute mesh with encrypted sharding.',
    category: 'Infrastructure',
    demoUrl: 'https://fleetgrid.network',
    contributors: [
      { name: 'Liam O’Connor', role: 'Protocol Architect', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', handle: '@liam_oc' }
    ],
    triedCount: 31,
    wouldPayCount: 11,
    bugCount: 5,
    feedbackCount: 7,
    collaborateCount: 6,
    userVoted: { tried: false, wouldPay: false, bug: false, feedback: false, collaborate: false },
    comments: []
  }
];

export const SEED_FEED_POSTS: SeedFeedPost[] = [
  {
    id: 'post-1',
    type: 'Shipped',
    author: {
      name: 'Kushagr Rana',
      handle: '@kushagr',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Full-Stack Engineer'
    },
    title: 'Shipped PulseAI v1.0 to ShipPad! 🎉 Tested in a 4-day sprint on ShipWith',
    content: 'Huge milestone for our team. We met right here on ShipWith, kicked off a scoped 4-day trial sprint to test working chemistry, and just published our autonomous PR review engine to Week 42 ShipPad! Try it out and let us know what bugs you find.',
    tags: ['AI Tools', 'Next.js 15', 'Shipped', 'Trial Sprint Success'],
    startupName: 'PulseAI',
    metrics: { tried: 84, wouldPay: 31, feedback: 14, replies: 6 },
    createdAt: '3 hours ago'
  },
  {
    id: 'post-2',
    type: 'Need Teammate',
    author: {
      name: 'Maya Lin',
      handle: '@maya_ux',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      role: 'Product Lead'
    },
    title: 'Looking for a UI/UX Designer to co-design LayerMint micro-bounties (10h/wk)',
    content: 'We have our GitHub bot and Stripe escrow running in beta. Looking for a designer with high taste in developer tools to polish our browser extension and dashboard. Scope: 5-Day Trial Build to redesign our GitHub PR embed pill.',
    tags: ['Design', 'Figma', 'Micro-interactions', '10h/wk'],
    startupName: 'LayerMint',
    rolesNeeded: ['UI/UX Product Designer'],
    weeklyHours: '10 hrs/wk',
    metrics: { tried: 12, wouldPay: 4, feedback: 7, replies: 9 },
    createdAt: '6 hours ago'
  },
  {
    id: 'post-3',
    type: 'Building',
    author: {
      name: 'Devon Vance',
      handle: '@devon_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Audio Systems'
    },
    title: 'Day 2 of 5-Day Trial Sprint @ SyncLabs: WebAudio latency down to 24ms',
    content: 'We were struggling with buffer underruns in Chrome. Swapped our DSP loop into a WebAssembly audio worklet. Latency dropped from 140ms to 24ms. Here is a video comparison of 2 remote mics playing in sync without drift.',
    tags: ['Audio', 'WebAssembly', 'Rust', 'Building'],
    startupName: 'SyncLabs',
    metrics: { tried: 26, wouldPay: 8, feedback: 12, replies: 4 },
    createdAt: '12 hours ago'
  },
  {
    id: 'post-4',
    type: 'Need Users',
    author: {
      name: 'Sofia Chen',
      handle: '@sofiac',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Founder'
    },
    title: 'Looking for 10 remote teams to test async standups on CandidFlow',
    content: 'If your team spends 40+ minutes every morning doing live round-robin calls across multiple timezones, give our 60-second video flow a test. Free forever for the first 10 pilot teams from ShipWith.',
    tags: ['Productivity', 'Async Work', 'Need Users'],
    startupName: 'CandidFlow',
    metrics: { tried: 52, wouldPay: 18, feedback: 11, replies: 8 },
    createdAt: '1 day ago'
  },
  {
    id: 'post-5',
    type: 'Need Feedback',
    author: {
      name: 'Elena Rostova',
      handle: '@elena_r',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'AI Researcher'
    },
    title: 'Does this interactive equation parser feel intuitive or distracting?',
    content: 'Testing a new feature on PaperForge where hovering over any mathematical variable highlights its definition across the paper and shows its tensor shape. Looking for 3 ML researchers to review the live sandbox.',
    tags: ['AI Research', 'UX Feedback', 'EdTech'],
    startupName: 'PaperForge',
    metrics: { tried: 46, wouldPay: 14, feedback: 19, replies: 11 },
    createdAt: '2 days ago'
  },
  {
    id: 'post-6',
    type: 'Need Help',
    author: {
      name: 'Liam O’Connor',
      handle: '@liam_oc',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      role: 'Rust Infrastructure'
    },
    title: 'Help debugging NAT traversal over WebRTC in our P2P mesh',
    content: 'Running into symmetric NAT packet drops when connecting home fiber connections in EU with mobile hotspots in Asia. Any libp2p or ICE wizard open to a 2-hour pairing sprint on ShipWith?',
    tags: ['Rust', 'Networking', 'WebRTC', 'Need Help'],
    startupName: 'FleetGrid',
    metrics: { tried: 14, wouldPay: 2, feedback: 6, replies: 7 },
    createdAt: '3 days ago'
  }
];

export const SEED_WORKSPACES: SeedWorkspace[] = [
  {
    id: 'workspace-pulseai',
    title: 'PulseAI Workflow Engine',
    tagline: 'Autonomous background workflow agents for dev teams',
    isTrial: true,
    trialDaysLeft: 1,
    trialTotalDays: 5,
    objective: 'Ship v1.0 PR triage agent with GitHub Webhook integration and test dashboard',
    team: [
      { id: 'usr-1', name: 'Kushagr Rana', role: 'Lead Full-Stack', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', handle: '@kushagr', confirmed: true },
      { id: 'usr-2', name: 'Maya Lin', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', handle: '@maya_ux', confirmed: true },
      { id: 'usr-3', name: 'Arjun Verma', role: 'Systems Backend', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', handle: '@arjun_v', confirmed: true }
    ],
    tasks: [
      { id: 't1', title: 'Connect GitHub Webhook endpoint for PR opened events', assignee: 'Arjun Verma', status: 'done', priority: 'high' },
      { id: 't2', title: 'Design high-contrast review status badge in Figma', assignee: 'Maya Lin', status: 'done', priority: 'medium' },
      { id: 't3', title: 'Build live test report panel in Next.js 15 dashboard', assignee: 'Kushagr Rana', status: 'done', priority: 'high' },
      { id: 't4', title: 'Verify regression dry-run test suite passes in under 45s', assignee: 'Arjun Verma', status: 'in_progress', priority: 'high' },
      { id: 't5', title: 'Ship to Week 42 ShipPad leaderboard and collect feedback', assignee: 'Kushagr Rana', status: 'todo', priority: 'medium' }
    ],
    shipLogs: [
      {
        id: 'l1',
        author: 'Kushagr Rana',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Shipped the Next.js 15 dashboard overview tab with live SSE streaming updates! 🚀',
        time: 'Today at 4:30 PM',
        links: ['https://pulseai.dev/preview/pr-42']
      },
      {
        id: 'l2',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        content: 'Completed the review status badge tokens and exported SVG assets.',
        time: 'Yesterday at 7:15 PM'
      },
      {
        id: 'l3',
        author: 'Arjun Verma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: 'Merged webhook handler PR with HMAC signature verification.',
        time: '2 days ago'
      }
    ],
    chatMessages: [
      { id: 'm1', sender: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', text: 'Hey team! Just pushed the latest Figma component specs for the PR badge.', time: '11:20 AM' },
      { id: 'm2', sender: 'Kushagr Rana', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', text: 'Awesome, reviewing now! The spacing and contrast on the teal chip looks super clean.', time: '11:24 AM' },
      { id: 'm3', sender: 'Arjun Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', text: 'Backend endpoints are live in staging. Ready for end-to-end test run.', time: '1:45 PM' }
    ],
    connectedLinks: [
      { label: 'GitHub Repository', url: 'https://github.com/Rana-Kushagr/ShipWith', type: 'github' },
      { label: 'Figma Design System', url: 'https://figma.com/@pulseai', type: 'figma' },
      { label: 'Live Preview', url: 'https://pulseai.dev', type: 'demo' },
      { label: 'Trial Sprint Specs', url: 'https://docs.pulseai.dev', type: 'docs' }
    ],
    demoEmbedUrl: 'https://pulseai.dev'
  },
  {
    id: 'workspace-shipmatrix',
    title: 'ShipMatrix Collaboration Hub',
    tagline: 'Real-time project tracker and milestone verification engine',
    isTrial: false,
    objective: 'Scale multi-workspace team permissions and integrated invoice rails',
    team: [
      { id: 'usr-1', name: 'Kushagr Rana', role: 'Full-Stack Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', handle: '@kushagr', confirmed: true },
      { id: 'usr-4', name: 'Elena Rostova', role: 'ML Advisor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', handle: '@elena_r', confirmed: true }
    ],
    tasks: [
      { id: 'st1', title: 'Implement Stripe customer portal session redirect', assignee: 'Kushagr Rana', status: 'done', priority: 'high' },
      { id: 'st2', title: 'Add role-based team invite tokens', assignee: 'Kushagr Rana', status: 'in_progress', priority: 'medium' },
      { id: 'st3', title: 'Test workspace data export in JSON & CSV format', assignee: 'Elena Rostova', status: 'todo', priority: 'low' }
    ],
    shipLogs: [
      {
        id: 'sl1',
        author: 'Kushagr Rana',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Stripe Customer Portal integration completed with automatic tier upgrades.',
        time: '3 days ago'
      }
    ],
    chatMessages: [
      { id: 'sm1', sender: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', text: 'Checked the token generation logic. Looks solid for multi-tenant isolation.', time: 'Yesterday' }
    ],
    connectedLinks: [
      { label: 'Production URL', url: 'https://shipmatrix.io', type: 'demo' },
      { label: 'Source Repository', url: 'https://github.com/shipmatrix/core', type: 'github' }
    ],
    demoEmbedUrl: 'https://shipmatrix.io'
  }
];

export const SEED_MESSAGES = [
  {
    id: 'thread-1',
    participant: {
      name: 'Maya Lin',
      handle: '@maya_ux',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      role: 'Product Designer',
      verified: true
    },
    contextStartup: 'LayerMint',
    contextStage: '5-Day Trial Sprint',
    lastMessage: 'Sounds great! I can jump on the micro-bounty drawer design tomorrow.',
    time: '20m ago',
    unread: true,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey! Saw your profile on ShipWith with the React 19 stack match. Are you open to a 5-day trial sprint on LayerMint?', time: 'Yesterday 2:30 PM' },
      { id: 'm2', sender: 'me', text: 'Hey Maya! Yes, absolutely. I love the concept of micro-bounties for GitHub PRs. What is the main deliverable for the sprint?', time: 'Yesterday 3:15 PM' },
      { id: 'm3', sender: 'them', text: 'We need the slide-out drawer that shows the bounty amount and escrow verification status directly on GitHub PRs.', time: 'Yesterday 3:45 PM' },
      { id: 'm4', sender: 'them', text: 'Sounds great! I can jump on the micro-bounty drawer design tomorrow.', time: '20m ago' }
    ]
  },
  {
    id: 'thread-2',
    participant: {
      name: 'Arjun Verma',
      handle: '@arjun_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Backend Systems',
      verified: true
    },
    contextStartup: 'PulseAI',
    contextStage: 'Day 4 of 5 Trial',
    lastMessage: 'Webhook tests passed in 38ms! Ready to ship.',
    time: '1h ago',
    unread: false,
    messages: [
      { id: 'a1', sender: 'them', text: 'Just pushed the Redis cache layer for the PR regression checks.', time: 'Yesterday 6:00 PM' },
      { id: 'a2', sender: 'me', text: 'Tested locally, response time dropped significantly.', time: 'Yesterday 7:30 PM' },
      { id: 'a3', sender: 'them', text: 'Webhook tests passed in 38ms! Ready to ship.', time: '1h ago' }
    ]
  },
  {
    id: 'thread-3',
    participant: {
      name: 'Sofia Chen',
      handle: '@sofiac',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Founder & CEO',
      verified: true
    },
    contextStartup: 'CandidFlow',
    contextStage: 'Startup Radar Match (96%)',
    lastMessage: 'Would love to explore having you advise our video pipeline.',
    time: '4h ago',
    unread: false,
    messages: [
      { id: 's1', sender: 'them', text: 'Hi Kushagr! Came across your work on async communication. Would love to explore having you advise our video pipeline.', time: '4h ago' }
    ]
  }
];

export const SEED_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Trial Sprint Invitation',
    message: 'Maya Lin invited you to a 5-Day Trial Sprint on LayerMint (10 hrs/wk)',
    type: 'invite',
    time: '25m ago',
    read: false,
    linkTarget: 'workspace'
  },
  {
    id: 'notif-2',
    title: 'New High Synergy Match',
    message: 'SyncLabs (96% Match) posted an open role matching your React & Audio toolkit',
    type: 'match',
    time: '2h ago',
    read: false,
    linkTarget: 'startups'
  },
  {
    id: 'notif-3',
    title: 'ShipPad Upvote Alert',
    message: 'PulseAI Workflow Engine hit #1 on Week 42 ShipPad with 84 "Tried It" signals!',
    type: 'ship',
    time: '4h ago',
    read: true,
    linkTarget: 'feed'
  },
  {
    id: 'notif-4',
    title: 'Build Passport Endorsement',
    message: 'Arjun Verma left verified feedback: "Fast execution and clear async communication. 5/5 ✔"',
    type: 'passport',
    time: '1d ago',
    read: true,
    linkTarget: 'profile'
  },
  {
    id: 'notif-5',
    title: 'Task Assigned',
    message: 'You were assigned to "Ship to Week 42 ShipPad leaderboard" on PulseAI',
    type: 'task',
    time: '1d ago',
    read: true,
    linkTarget: 'workspace'
  },
  {
    id: 'notif-6',
    title: 'New Collaboration Request',
    message: 'Elena Rostova requested to collaborate on PaperForge ML interactive viewer',
    type: 'collab',
    time: '2d ago',
    read: true,
    linkTarget: 'messages'
  }
];
