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
  ArrowRight
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
  const totalSteps = 7;

  // Auto-advance helper with visual feedback delay
  const handleAutoSelect = (updater: () => void, valueKey: string) => {
    setSelectedInStep(valueKey);
    updater();

    // 220ms smooth micro-delay for user feedback before sliding to next question
    setTimeout(() => {
      setSelectedInStep(null);
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentStep(8); // Passport Review Screen
      }
    }, 220);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setSelectedInStep(null);
    } else {
      setCurrentView('landing');
    }
  };

  // 1. Objectives
  const objectives = [
    {
      id: 'Recruit for startup',
      title: 'Recruit builders & co-founders for my startup',
      desc: 'I have an active idea or prototype and need dedicated creators.',
      icon: Rocket,
    },
    {
      id: 'Join active team',
      title: 'Join an active team or startup as a builder',
      desc: 'I want to contribute my craft to high-potential products.',
      icon: Users,
    },
    {
      id: 'Find co-founder',
      title: 'Find a co-founder to brainstorm & build from day zero',
      desc: 'Let’s explore ideas, validate problems, and build an MVP together.',
      icon: Lightbulb,
    },
  ];

  // 2. Primary Superpower & Role
  const roles = [
    {
      id: 'Full-Stack Engineer',
      title: 'Full-Stack / Frontend / Backend Engineer',
      desc: 'Architecting scalable web applications, APIs, and modern frontends.',
      icon: Terminal,
    },
    {
      id: 'AI & LLM Engineer',
      title: 'AI / ML & LLM Application Engineer',
      desc: 'Prompt engineering, agent workflows, RAG pipelines, and model fine-tuning.',
      icon: Cpu,
    },
    {
      id: 'UI/UX Product Designer',
      title: 'UI/UX & Product Designer',
      desc: 'Design systems, high-fidelity prototypes, user flows, and aesthetic polish.',
      icon: Palette,
    },
    {
      id: 'Growth & Distribution Lead',
      title: 'Growth, Marketing & Distribution Lead',
      desc: 'GTM execution, cold outreach, community building, and viral acquisition.',
      icon: TrendingUp,
    },
    {
      id: 'Technical Product Co-Founder',
      title: 'Product Manager & Technical Co-Founder',
      desc: 'Roadmaps, customer discovery, scoping MVPs, and business operations.',
      icon: Briefcase,
    },
  ];

  // 3. Primary Tech Stack / Toolkit
  const stacks = [
    { id: 'Next.js / React / TypeScript', title: 'React 19 / Next.js / TypeScript', desc: 'Modern reactive web apps and server components.' },
    { id: 'Python / FastAPI / AI', title: 'Python / FastAPI / PyTorch / LLMs', desc: 'AI backends, vector embeddings, and data pipelines.' },
    { id: 'Mobile / Flutter / React Native', title: 'Mobile (Flutter / React Native / Swift)', desc: 'Cross-platform or native iOS/Android applications.' },
    { id: 'Node.js / Go / PostgreSQL', title: 'Node.js / Go / Rust / PostgreSQL', desc: 'High-performance microservices and database backends.' },
    { id: 'Figma / Tailwind CSS', title: 'Figma / Tailwind CSS / Design Systems', desc: 'World-class visual craft and component libraries.' },
    { id: 'Full-Stack Generalist', title: 'Full-Stack Generalist (Fast Adaptability)', desc: 'Picks up whatever tool is best for shipping the product.' },
  ];

  // 4. Project Stage
  const stages = [
    { id: 'Idea Stage', title: 'Idea Stage', desc: 'Validating concepts and looking for a day-zero partner.' },
    { id: 'Building MVP', title: 'Building Prototype / MVP', desc: 'Active coding sprint to reach our first public release.' },
    { id: 'Live in Production', title: 'Live in Production', desc: 'Have active users or revenue and scaling team capacity.' },
    { id: 'Open-Ended Explorer', title: 'Open to any exciting high-potential build', desc: 'Ready to jump into the most promising problem space.' },
  ];

  // 5. Weekly Time Commitment
  const commitments = [
    { id: '5–10 hrs/week', title: '5–10 hours / week', desc: 'Evenings & weekends side sprint.' },
    { id: '10–20 hrs/week', title: '10–20 hours / week', desc: 'Serious dedication with consistent daily progress.' },
    { id: '20+ hrs/week', title: '20–35 hours / week', desc: 'Heavy technical commitment and fast iterations.' },
    { id: 'Full-time', title: '40+ hours / week (Full-time)', desc: 'All-in co-founder mode seeking venture scale.' },
  ];

  // 6. 4-Day Trial Sprint Protocol
  const sprintProtocols = [
    { 
      id: 'Agreed 4-Day Trial', 
      title: 'Yes, 100%! Ready to build a 4-day scoped test MVP', 
      desc: 'Verify real work habits, code quality, and mutual communication before equity discussions.' 
    },
    { 
      id: 'Flexible Async Trial', 
      title: 'Yes, but with flexible asynchronous milestones', 
      desc: 'Collaborate asynchronously with scoped PR deliverables and milestone check-ins.' 
    },
  ];

  // 7. Ideal Teammate
  const teammates = [
    { id: 'Technical Engineer', title: 'A sharp technical engineer who writes clean code', desc: 'Builds reliable systems and moves fast.' },
    { id: 'Product Designer', title: 'A product designer who creates world-class UI/UX', desc: 'Transforms rough ideas into intuitive user delight.' },
    { id: 'Growth Lead', title: 'A growth & distribution leader who gets users', desc: 'Knows how to acquire initial customers and validate demand.' },
    { id: 'Domain Visionary', title: 'A visionary co-founder with deep domain expertise', desc: 'Understands the problem space and customer pain intimately.' },
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
            <span className="text-[var(--color-success)] font-semibold">Ready</span>
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

      {/* Main Content Area */}
      <main className="max-w-2xl w-full mx-auto my-auto py-8">
        
        {/* STEP 1: Objective */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Step 1 of 7 • Getting Started
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What is your primary goal on ShipWith?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
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

        {/* STEP 2: Superpower & Craft */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Step 2 of 7 • Your Core Craft
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What is your primary superpower?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                What do teammates count on you to deliver?
              </p>
            </div>

            <div className="space-y-3">
              {roles.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedInStep === item.id || onboardingState.strengths.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ strengths: [item.id] }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className={`p-2.5 rounded-[var(--radius-md)] border shrink-0 ${
                      isSelected 
                        ? 'bg-[var(--color-brand-accent)] text-white border-transparent' 
                        : 'bg-[var(--color-surface-subtle)] border-[var(--color-border)] text-[var(--color-text-primary)]'
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

        {/* STEP 3: Tech Stack / Toolkit */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Step 3 of 7 • Tools & Technology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What is your primary tech stack or toolkit?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Helps startups find you when filtering by technology match.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stacks.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.primaryStack === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ primaryStack: item.id }), item.id)}
                    className={`p-4 rounded-[var(--radius-xl)] border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)]">
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Project Stage */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Step 4 of 7 • Product Maturity
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                What stage of project do you prefer?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Match with teams that are at the exact phase where you thrive.
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

        {/* STEP 5: Weekly Commitment */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Step 5 of 7 • Availability
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                How much weekly time can you commit?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Unrealistic expectations ruin teams. Honesty ensures sustainable shipping.
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

        {/* STEP 6: 4-Day Trial Sprint Protocol */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-warning)]">
                Step 6 of 7 • The ShipWith Protocol
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Are you ready for the 4-Day Trial Sprint?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Before discussing equity or long-term partnerships, builders complete a 4-day scoped test sprint to prove mutual work synergy.
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

        {/* STEP 7: Ideal Teammate */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[var(--color-brand-accent)]">
                Step 7 of 7 • Match Preferences
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Who are you looking to meet?
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                We'll prioritize recommendations matching your ideal collaborator archetype.
              </p>
            </div>

            <div className="space-y-3">
              {teammates.map((item) => {
                const isSelected = selectedInStep === item.id || onboardingState.desiredCollaborators.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAutoSelect(() => updateOnboarding({ desiredCollaborators: [item.id] }), item.id)}
                    className={`w-full p-4 rounded-[var(--radius-xl)] border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-brand-accent)] bg-[var(--color-brand-accent-subtle)] ring-2 ring-[var(--color-brand-accent)]/20 shadow-sm'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-subtle)]'
                    }`}
                  >
                    <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-[var(--color-brand-accent)] shrink-0">
                      <Users className="w-5 h-5" />
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

        {/* STEP 8: Profile Passport Ready (Synthesis) */}
        {currentStep === 8 && (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]/30 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                Your Builder Passport is Ready
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
                We’ve configured your profile radar. You are ready to explore live startups, trial sprints, and potential co-founders.
              </p>
            </div>

            {/* Live Profile Passport Card */}
            <div className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md text-left space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[var(--color-brand-accent-subtle)] text-[var(--color-brand-accent)] flex items-center justify-center font-bold font-mono border border-[var(--color-brand-accent)]/30">
                    YOU
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--color-text-primary)]">
                      {onboardingState.strengths[0] || 'Full-Stack Builder'}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {onboardingState.weeklyHours} • {onboardingState.country || 'India (GMT+5:30)'}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-[var(--color-success)]/30 rounded-full text-xs font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PASSPORT ACTIVE
                </span>
              </div>

              {/* Preferences Summary Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Objective</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5 truncate">
                    {onboardingState.objective}
                  </div>
                </div>
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Stack</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5 truncate">
                    {onboardingState.primaryStack || 'Next.js / TypeScript'}
                  </div>
                </div>
                <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">Stage</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5 truncate">
                    {onboardingState.stage || 'Building MVP'}
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
                  <strong>18 Startups</strong> and <strong>34 Builders</strong> currently match your exact profile & timezone.
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
        <span>Click an option to automatically advance to the next question.</span>
        <span>No credit card required</span>
      </footer>

    </div>
  );
};
