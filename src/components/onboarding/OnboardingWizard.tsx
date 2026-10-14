import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { 
  ArrowLeft, 
  Check, 
  Rocket, 
  Users, 
  Lightbulb, 
  Terminal, 
  Cpu, 
  Palette, 
  TrendingUp, 
  Briefcase, 
  Zap, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  Globe2,
  DollarSign,
  MessageSquare,
  Link as LinkIcon
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { 
    onboardingState, 
    updateOnboarding, 
    completeOnboarding, 
    setCurrentView 
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInStep, setSelectedInStep] = useState<string | null>(null);
  const totalSteps = 12;

  // Single-select auto-advance helper with smooth micro-delay
  const handleAutoSelect = (updater: () => void, valueKey: string) => {
    setSelectedInStep(valueKey);
    updater();

    setTimeout(() => {
      setSelectedInStep(null);
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentStep(13); // Passport Review
      }
    }, 220);
  };

  // Guaranteed safe multi-select array accessors
  const currentStrengths = Array.isArray(onboardingState.strengths) ? onboardingState.strengths : [];
  const currentTechStacks = Array.isArray(onboardingState.techStacks) ? onboardingState.techStacks : [];
  const currentIndustries = Array.isArray(onboardingState.industries) ? onboardingState.industries : [];
  const currentCollaborators = Array.isArray(onboardingState.desiredCollaborators) ? onboardingState.desiredCollaborators : [];

  // Multi-select toggle helper
  const handleToggleMulti = (
    field: 'strengths' | 'techStacks' | 'industries' | 'desiredCollaborators',
    item: string
  ) => {
    const list = Array.isArray(onboardingState[field]) ? onboardingState[field] : [];
    if (list.includes(item)) {
      updateOnboarding({ [field]: list.filter((x: string) => x !== item) });
    } else {
      updateOnboarding({ [field]: [...list, item] });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setSelectedInStep(null);
    } else {
      setCurrentStep(13);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setSelectedInStep(null);
    } else {
      setCurrentView('landing');
    }
  };

  // 1. Objectives (Single)
  const objectives = [
    {
      id: 'Recruit for startup',
      title: 'Recruit co-founders & builders for my startup',
      desc: 'I have an active idea or prototype and need dedicated creators.',
      icon: Rocket,
    },
    {
      id: 'Join active team',
      title: 'Join an active team or startup as a builder',
      desc: 'I want to contribute my craft to high-potential builds.',
      icon: Users,
    },
    {
      id: 'Find co-founder',
      title: 'Find a co-founder to brainstorm & build from day zero',
      desc: 'Let’s explore ideas, validate customer pain, and build an MVP together.',
      icon: Lightbulb,
    },
    {
      id: 'Trial-to-hire',
      title: 'Trial-to-hire & contract collaboration',
      desc: 'Explore mutual working chemistry with scoped 4-day milestones.',
      icon: Zap,
    },
  ];

  // 2. Core Crafts & Superpowers (Multi-select)
  const crafts = [
    { id: 'Full-Stack Engineer', label: 'Full-Stack Engineer', desc: 'React, Node, TypeScript, Python, REST & GraphQL APIs', icon: Terminal },
    { id: 'AI & LLM Engineer', label: 'AI / ML & LLM Engineer', desc: 'RAG pipelines, agents, fine-tuning, embeddings, PyTorch', icon: Cpu },
    { id: 'Frontend Specialist', label: 'Frontend & UI Engineer', desc: 'Vite, Next.js, Tailwind, micro-interactions, accessibility', icon: Code2 },
    { id: 'Backend Architect', label: 'Backend & Systems Architect', desc: 'Go, Rust, PostgreSQL, scalable microservices, Docker', icon: Layers },
    { id: 'Mobile Developer', label: 'Mobile App Developer', desc: 'Flutter, React Native, Swift iOS, Kotlin Android', icon: Globe2 },
    { id: 'UI/UX Product Designer', label: 'UI/UX & Product Designer', desc: 'Figma, design systems, rapid prototyping, wireframes', icon: Palette },
    { id: 'Growth & Distribution Lead', label: 'Growth, Marketing & Distribution', desc: 'Cold outreach, SEO, viral acquisition, social funnels', icon: TrendingUp },
    { id: 'Technical Product Co-Founder', label: 'Product Manager & Operator', desc: 'Scoping MVPs, customer discovery, metrics, strategy', icon: Briefcase },
  ];

  // 3. Tech Stacks & Toolkits (Multi-select)
  const techToolkits = [
    'React 19 / Next.js',
    'TypeScript',
    'Python / FastAPI',
    'LLMs / OpenAI / Anthropic',
    'Node.js / Express',
    'PostgreSQL / Supabase',
    'Go (Golang)',
    'Rust',
    'Flutter',
    'React Native',
    'Tailwind CSS',
    'Docker / Cloudflare / AWS',
    'Figma / Design Systems',
    'Redis / Kafka',
    'Prisma / Drizzle ORM',
    'Stripe / Payments'
  ];

  // 4. Experience Years (Single)
  const experienceOptions = [
    { id: 'Early Maker (<1 yr)', title: 'Early Maker (< 1 year)', desc: 'Building first portfolio projects and eager to ship real apps.' },
    { id: '1–2 years shipping', title: '1–2 years shipping', desc: 'Shipped functional side projects, open-source code, or client apps.' },
    { id: '3–5 years professional', title: '3–5 years experienced builder', desc: 'Strong track record building and scaling production software.' },
    { id: '5+ years veteran', title: '5+ years senior engineer / repeat founder', desc: 'Deep technical leadership and architectural expertise.' },
  ];

  // 5. Industries & Domains (Multi-select)
  const industryList = [
    'AI & LLM Tools',
    'Developer Productivity',
    'B2B SaaS',
    'FinTech & Trading',
    'Consumer Social',
    'EdTech & Learning',
    'HealthTech & BioTech',
    'E-Commerce & Marketplaces',
    'Hardware & IoT',
    'Media & Creator Tools'
  ];

  // 6. Project Maturity (Single)
  const stages = [
    { id: 'Idea Stage', title: 'Idea & Validation Stage', desc: 'Exploring problem space and finding a day-zero co-founder.' },
    { id: 'Building MVP', title: 'Building Prototype / MVP', desc: 'Active sprint to reach our first functional public release.' },
    { id: 'Live in Production', title: 'Live in Production', desc: 'Have active users or revenue and scaling core team.' },
    { id: 'Open-Ended Explorer', title: 'Open-ended (No current project)', desc: 'Ready to join or brainstorm whichever build has highest potential.' },
  ];

  // 7. Weekly Commitment (Single)
  const commitments = [
    { id: '5–10 hrs/week', title: '5–10 hours / week', desc: 'Evenings & weekends side project.' },
    { id: '10–20 hrs/week', title: '10–20 hours / week', desc: 'Serious dedication with consistent daily commits.' },
    { id: '20+ hrs/week', title: '20–35 hours / week', desc: 'Heavy technical commitment and fast iteration velocity.' },
    { id: 'Full-time', title: '40+ hours / week (Full-time)', desc: 'All-in co-founder mode seeking venture scale.' },
  ];

  // 8. Working & Communication Style (Single)
  const workingStyles = [
    { id: 'Mostly Async', title: 'Mostly Async (GitHub PRs, Loom, Slack / Discord)', desc: 'Independent deep work with written updates and clean PR reviews.' },
    { id: 'Hybrid Collaboration', title: 'Hybrid (Daily async updates + 1–2 weekly sync jams)', desc: 'Combines independent focus with structured weekly milestone alignments.' },
    { id: 'Live Pair Programming', title: 'Live Pair Programming (Live audio/video rooms)', desc: 'Co-coding in real time for maximum speed and instant feedback.' },
  ];

  // 9. Teammates Looking For (Multi-select)
  const collaboratorRoles = [
    { id: 'Full-Stack Engineer', label: 'Full-Stack / Frontend / Backend Engineer' },
    { id: 'AI & LLM Engineer', label: 'AI / ML & LLM Specialist' },
    { id: 'UI/UX Designer', label: 'UI/UX & Product Designer' },
    { id: 'Growth Lead', label: 'Growth, Marketing & Distribution Lead' },
    { id: 'Technical Founder', label: 'Technical Co-Founder' },
    { id: 'Domain Visionary', label: 'Business / Domain Expert Co-Founder' },
  ];

  // 10. Equity & Compensation Philosophy (Single)
  const equityOptions = [
    { id: 'Equal Split', title: 'Equal / Fair Equity Split', desc: 'Co-founders taking equal risk and sharing long-term upside.' },
    { id: 'Equity + Rev-Share', title: 'Equity + Early Revenue Share', desc: 'Performance-based distribution as the product earns revenue.' },
    { id: 'Scoped Bounties', title: 'Hourly / Milestone Bounties', desc: 'Clear deliverables compensated per sprint or feature.' },
    { id: 'Pure Collaboration', title: 'Pure Collaboration / Portfolio Building', desc: 'Building for fun, open-source prestige, and real experience.' },
  ];

  // 11. The 4-Day Trial Sprint Protocol (Single)
  const sprintProtocols = [
    { 
      id: 'Agreed 4-Day Trial', 
      title: 'Yes, 100%! Ready to build a 4-day scoped test MVP', 
      desc: 'Verify real work habits, code quality, and mutual communication before equity discussions.' 
    },
    { 
      id: 'Flexible Async Trial', 
      title: 'Yes, with flexible asynchronous milestones', 
      desc: 'Collaborate asynchronously with scoped PR deliverables and milestone check-ins.' 
    },
  ];

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-colors duration-200">
      
      {/* Top Header */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer px-2 py-1 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-subtle)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{currentStep === 1 ? 'Exit to Home' : 'Back'}</span>
        </button>

        {/* Brand */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-6 h-6 rounded-[var(--radius-sm)] bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] flex items-center justify-center font-display font-bold text-xs">
            SW
          </div>
          <span className="font-display font-bold text-sm tracking-tight text-[var(--color-text-primary)]">
            ShipWith
          </span>
        </div>

        {/* Step Counter Indicator */}
        <div className="text-xs font-mono text-[var(--color-text-muted)]">
          {currentStep <= totalSteps ? (
            <span>Question {currentStep} of {totalSteps}</span>
          ) : (
            <span className="text-[var(--color-success)] font-semibold">Passport Ready</span>
          )}
        </div>
      </header>

      {/* Progress Line */}
      {currentStep <= totalSteps && (
        <div className="max-w-2xl w-full mx-auto mt-2">
          <div className="w-full h-1 bg-[var(--color-surface-strong)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-brand-accent)] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content Stage */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        
        {/* QUESTION 1: Objective (Single - Auto-advances ⚡) */}
        {currentStep === 1 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 1 of 12 • Primary Goal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What is your primary objective on ShipWith?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Select your focus. We'll tune your radar to match suitable creators immediately.
              </p>
            </div>

            <div className="space-y-3">
              {objectives.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedInStep === item.id || onboardingState.objective === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ objective: item.id }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className={`p-2.5 rounded-[var(--radius-md)] border shrink-0 ${
                      isSelected 
                        ? 'bg-[var(--color-brand-accent)] text-white border-transparent' 
                        : 'bg-[var(--color-surface-subtle)] border-[var(--color-border)] text-[var(--color-brand-accent)]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 2: Core Crafts & Superpowers (Multi-select 🔲) */}
        {currentStep === 2 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                  Question 2 of 12 • Core Crafts
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-mono font-semibold">
                  Multi-Select Allowed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What are your superpowers & abilities?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Choose all abilities you bring to a team. Builders frequently wear multiple hats!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crafts.map((item) => {
                const Icon = item.icon;
                const isSelected = currentStrengths.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleMulti('strengths', item.id)}
                    className={`p-3.5 rounded-[var(--radius-xl)] border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-1 ring-[var(--color-brand-accent)] shadow-xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className={`p-2 rounded-[var(--radius-md)] border shrink-0 ${
                      isSelected 
                        ? 'bg-[var(--color-brand-accent)] text-white border-transparent' 
                        : 'bg-[var(--color-surface-subtle)] border-[var(--color-border)] text-[var(--color-text-primary)]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">
                        {item.desc}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-[var(--color-brand-accent)] border-[var(--color-brand-accent)] text-white' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                {currentStrengths.length === 0 ? 'Select at least 1 craft' : `${currentStrengths.length} craft(s) selected`}
              </span>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentStrengths.length === 0}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {currentStrengths.length === 0 ? 'Select a craft to continue' : `Continue (${currentStrengths.length})`}
              </Button>
            </div>
          </div>
        )}

        {/* QUESTION 3: Primary Tech Stacks & Toolkits (Multi-select 🔲) */}
        {currentStep === 3 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                  Question 3 of 12 • Tech Stack & Tools
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-mono font-semibold">
                  Multi-Select Allowed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Which tools & tech stacks do you build with?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Select your favorite frameworks, databases, and libraries.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {techToolkits.map((tool) => {
                const isSelected = currentTechStacks.includes(tool);
                return (
                  <button
                    key={tool}
                    onClick={() => handleToggleMulti('techStacks', tool)}
                    className={`px-3 py-2 rounded-[var(--radius-md)] border text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-bold shadow-2xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <span>{tool}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-brand-accent)] stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)]">
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                {currentTechStacks.length === 0 ? 'Select at least 1 tool' : `${currentTechStacks.length} tool(s) selected`}
              </span>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentTechStacks.length === 0}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {currentTechStacks.length === 0 ? 'Select a tool to continue' : `Continue (${currentTechStacks.length})`}
              </Button>
            </div>
          </div>
        )}

        {/* QUESTION 4: Years of Building Experience (Single - Auto-advances ⚡) */}
        {currentStep === 4 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 4 of 12 • Experience Level
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                How long have you been shipping software?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Helps match you with collaborators with complementary experience.
              </p>
            </div>

            <div className="space-y-3">
              {experienceOptions.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.experienceYears === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ experienceYears: item.id }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 5: Industry / Domain Interests (Multi-select 🔲) */}
        {currentStep === 5 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                  Question 5 of 12 • Domain Interests
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-mono font-semibold">
                  Multi-Select Allowed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Which industries or domains excite you?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Pick all areas where you want to build or launch products.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {industryList.map((ind) => {
                const isSelected = currentIndustries.includes(ind);
                return (
                  <button
                    key={ind}
                    onClick={() => handleToggleMulti('industries', ind)}
                    className={`p-3 rounded-[var(--radius-lg)] border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-bold shadow-2xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <span>{ind}</span>
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[var(--color-brand-accent)] border-[var(--color-brand-accent)] text-white' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)]">
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                {currentIndustries.length === 0 ? 'Select at least 1 domain' : `${currentIndustries.length} domain(s) selected`}
              </span>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentIndustries.length === 0}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {currentIndustries.length === 0 ? 'Select a domain to continue' : `Continue (${currentIndustries.length})`}
              </Button>
            </div>
          </div>
        )}

        {/* QUESTION 6: Project Maturity Stage (Single - Auto-advances ⚡) */}
        {currentStep === 6 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 6 of 12 • Product Maturity
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Where is your current project stage?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Match with teams at the exact phase where you thrive.
              </p>
            </div>

            <div className="space-y-3">
              {stages.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.stage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ stage: item.id }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 7: Weekly Commitment (Single - Auto-advances ⚡) */}
        {currentStep === 7 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 7 of 12 • Availability
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                How much weekly time can you commit?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Clear expectations prevent burnout and ghosting.
              </p>
            </div>

            <div className="space-y-3">
              {commitments.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.weeklyHours === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ weeklyHours: item.id as any }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--color-text-primary)]">
                          {item.title}
                        </div>
                        <div className="text-xs text-[var(--color-text-secondary)]">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 8: Working & Communication Style (Single - Auto-advances ⚡) */}
        {currentStep === 8 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 8 of 12 • Working Style
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What is your preferred collaboration style?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Matching work rhythms makes collaborations effortless.
              </p>
            </div>

            <div className="space-y-3">
              {workingStyles.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.workingStyle === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ workingStyle: item.id }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-[var(--color-text-primary)] shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 9: Teammates Looking For (Multi-select 🔲) */}
        {currentStep === 9 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                  Question 9 of 12 • Ideal Collaborators
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-mono font-semibold">
                  Multi-Select Allowed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Which roles do you need on your team?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Select all teammate archetypes you want to recruit or collaborate with.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {collaboratorRoles.map((item) => {
                const isSelected = currentCollaborators.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleMulti('desiredCollaborators', item.id)}
                    className={`w-full p-3.5 rounded-[var(--radius-lg)] border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] font-semibold shadow-2xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0" />
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[var(--color-brand-accent)] border-[var(--color-brand-accent)] text-white' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)]">
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                {currentCollaborators.length === 0 ? 'Select at least 1 role' : `${currentCollaborators.length} role(s) selected`}
              </span>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={currentCollaborators.length === 0}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {currentCollaborators.length === 0 ? 'Select a role to continue' : `Continue (${currentCollaborators.length})`}
              </Button>
            </div>
          </div>
        )}

        {/* QUESTION 10: Equity & Terms Philosophy (Single - Auto-advances ⚡) */}
        {currentStep === 10 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 10 of 12 • Alignment
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What is your equity & compensation philosophy?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                Ensures expectations on equity, bounties, and upside match up front.
              </p>
            </div>

            <div className="space-y-3">
              {equityOptions.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.compensationPhilosophy === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ compensationPhilosophy: item.id }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-[var(--color-brand-accent)] shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 11: 4-Day Trial Sprint Protocol (Single - Auto-advances ⚡) */}
        {currentStep === 11 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-warning)]">
                Question 11 of 12 • The ShipWith Protocol
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Are you ready for the 4-Day Trial Sprint?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                The core innovation of ShipWith: test real teamwork on a scoped micro-objective before committing to equity or months of work.
              </p>
            </div>

            <div className="space-y-3">
              {sprintProtocols.map((item) => {
                const isSelected = selectedInStep === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ trialAgreement: true }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-success)] bg-[var(--color-success-subtle)] ring-2 ring-[var(--color-success)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]/20 shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 12: Proof of Work & 1-Sentence Bio */}
        {currentStep === 12 && (
          <div className="space-y-6 step-enter">
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Question 12 of 12 • Proof of Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Add your proof of work & bio
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                GitHub, live demo link, or 1-sentence bio. Builders care about what you've actually shipped.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
                  GitHub username or Portfolio URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. github.com/yourhandle or portfolio.dev"
                  defaultValue={onboardingState.githubUsername || ''}
                  onChange={(e) => updateOnboarding({ githubUsername: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--color-text-primary)]">
                  1-Sentence Builder Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Full-stack builder passionate about autonomous agents and fast MVPs."
                  defaultValue={onboardingState.headline || ''}
                  onChange={(e) => updateOnboarding({ headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                rightIcon={<Sparkles className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md"
              >
                Generate Builder Passport
              </Button>
            </div>
          </div>
        )}

        {/* STEP 13: Instant Profile Passport Review */}
        {currentStep >= 13 && (
          <div className="space-y-6 text-center step-enter">
            <div className="w-14 h-14 rounded-full bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]/30 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Your Builder Passport is Minted
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                All 12 profile dimensions analyzed. Your compatibility radar is active across the network.
              </p>
            </div>

            {/* Live Profile Passport Card */}
            <div className="p-5 sm:p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md text-left space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] flex items-center justify-center font-bold font-mono border border-[var(--color-brand-accent)]/30">
                    YOU
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-primary)]">
                      {currentStrengths.slice(0, 2).join(' & ') || 'Full-Stack Maker'}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {onboardingState.weeklyHours} • {onboardingState.experienceYears}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]/30 rounded-full text-[11px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASSPORT ACTIVE
                </span>
              </div>

              {/* Preferences Summary Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Crafts</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5 truncate">
                    {currentStrengths.join(', ') || 'Engineering'}
                  </div>
                </div>
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Stacks</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5 truncate">
                    {currentTechStacks.slice(0, 3).join(', ') || 'Next.js, TypeScript'}
                  </div>
                </div>
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Work Style</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5 truncate">
                    {onboardingState.workingStyle}
                  </div>
                </div>
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Trial Sprint</div>
                  <div className="font-semibold text-[var(--color-success)] mt-0.5">
                    Ready (4 Days) ⚡
                  </div>
                </div>
              </div>

              {/* Match Output Banner */}
              <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-brand-accent-subtle)] border border-[var(--color-brand-accent)]/20 flex items-center gap-2.5 text-xs text-[var(--color-text-primary)]">
                <Sparkles className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0" />
                <span>
                  Your Builder Passport and execution parameters are calibrated and ready for co-founder matchmaking.
                </span>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  completeOnboarding();
                  setCurrentView('home');
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md hover:shadow-lg"
              >
                Enter ShipWith Feed
              </Button>
            </div>
          </div>
        )}

      </main>

      {/* Footer hint */}
      <footer className="max-w-2xl w-full mx-auto pt-4 border-t border-[var(--color-border-subtle)] text-center text-xs text-[var(--color-text-muted)] flex items-center justify-between">
        <span>Single-select auto-advances; multi-select lets you choose all that apply.</span>
        <span>ShipWith Verified Network</span>
      </footer>

    </div>
  );
};
