import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  MapPin, 
  Search, 
  CheckCircle2, 
  HelpCircle,
  Users,
  Building,
  Rocket
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShipWithLogoMark } from '../landing/LandingNavbar';

export const OnboardingWizard: React.FC = () => {
  const { 
    onboardingState, 
    updateOnboarding, 
    completeOnboarding, 
    setCurrentView,
    setIsFeedbackOpen,
    seedStartups,
    seedBuilders
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 7;

  // Search filter for countries
  const [countrySearch, setCountrySearch] = useState<string>('');

  // Ensure fresh onboarding with no preselected options
  useEffect(() => {
    // If country was defaulted from older cached state without user explicitly picking
    if (onboardingState.step5Location?.country === 'United States' && !onboardingState.step5Location?.timezone) {
      updateOnboarding({ step5Location: { country: '', timezone: '' } });
    }
  }, []);

  const countries = [
    { country: 'United States', timezone: 'GMT-7:00 (San Francisco)' },
    { country: 'India', timezone: 'GMT+5:30 (New Delhi / Bengaluru)' },
    { country: 'United Kingdom', timezone: 'GMT+0:00 (London)' },
    { country: 'Germany', timezone: 'GMT+1:00 (Berlin)' },
    { country: 'Singapore', timezone: 'GMT+8:00 (Singapore)' },
    { country: 'Canada', timezone: 'GMT-4:00 (Toronto)' },
    { country: 'Australia', timezone: 'GMT+10:00 (Sydney)' },
    { country: 'Japan', timezone: 'GMT+9:00 (Tokyo)' },
    { country: 'Netherlands', timezone: 'GMT+1:00 (Amsterdam)' },
    { country: 'Brazil', timezone: 'GMT-3:00 (São Paulo)' },
  ];

  const filteredCountries = countries.filter(c => 
    c.country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Helper for single-select questions with smooth auto-advance
  const handleSingleSelect = (key: string, value: string) => {
    updateOnboarding({ [key]: value });
    setTimeout(() => {
      if (step < totalSteps) {
        setStep(prev => prev + 1);
      } else {
        setStep(8); // Completion Screen
      }
    }, 180);
  };

  // Helper for multi-select questions
  const handleMultiSelect = (key: string, value: string, maxItems?: number) => {
    const current = ((onboardingState as any)[key] as string[]) || [];
    let updated: string[];

    if (current.includes(value)) {
      updated = current.filter((item: string) => item !== value);
    } else {
      if (maxItems && current.length >= maxItems) {
        return; // Don't allow selecting more than max
      }
      updated = [...current, value];
    }
    updateOnboarding({ [key]: updated });
  };

  const handleFinishOnboarding = (view: 'home' | 'profile') => {
    completeOnboarding();
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[var(--text-primary)] flex flex-col justify-between selection:bg-white selection:text-black relative">
      {/* 1. TOP SIMPLIFY HEADER */}
      <header className="w-full max-w-4xl mx-auto px-6 py-6 flex items-center justify-between gap-4 border-b border-[var(--border-crisp)]">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-white text-[#050506] flex items-center justify-center shadow-xs">
            <ShipWithLogoMark className="w-4 h-4" />
          </div>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-white">
            ShipWith
          </span>
        </div>

        {/* Progress Bar (visible during questions 1-7) */}
        {step <= totalSteps && (
          <div className="flex-1 max-w-xs mx-4 hidden sm:block">
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-1">
              <span>Question {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#141418] border border-[var(--border-crisp)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Save & Exit Button */}
        <button
          onClick={() => {
            completeOnboarding();
            setCurrentView('home');
          }}
          className="text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-white bg-[#0C0C0E] hover:bg-[#141418] px-3.5 py-1.5 rounded-lg border border-[var(--border-crisp)] transition-colors shadow-2xs cursor-pointer"
        >
          Save & exit
        </button>
      </header>

      {/* 2. MAIN QUESTION CANVAS */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-8 flex flex-col justify-center">
        {/* QUESTION 1: How do you want to start? */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-1">
                Step 01 / 07
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                How do you want to start?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Choose your primary mode of collaboration on ShipWith.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { 
                  id: 'Join a startup', 
                  title: 'Join a startup', 
                  desc: 'Find an early-stage team with open roles and test fit via a 5-day trial sprint.',
                  icon: Rocket 
                },
                { 
                  id: 'Find people for mine', 
                  title: 'Find people for mine', 
                  desc: 'I am building something and need skilled engineers, designers, or marketers.',
                  icon: Building 
                },
                { 
                  id: 'Start together', 
                  title: 'Start together from scratch', 
                  desc: 'Looking for a co-founder or co-builder to brainstorm, build MVP, and launch.',
                  icon: Users 
                }
              ].map((opt) => {
                const isSelected = onboardingState.step1Goal === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSingleSelect('step1Goal', opt.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer shadow-sm ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/50 text-white'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white text-[#050506]' : 'bg-[#141418] text-[var(--text-secondary)] border border-[var(--border-crisp)]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white font-['Plus_Jakarta_Sans']">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-[#050506]' : 'border-[var(--border-crisp)] bg-[#141418]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION 2: What are you most into? */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-1">
                Step 02 / 07
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                What are you most into?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Pick all fields you enjoy exploring and building products in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                'Entrepreneurship',
                'Tech & Software',
                'AI & Agents',
                'Marketing & Growth',
                'E-commerce',
                'Trading & Investing',
                'Content & Media',
                'Still exploring'
              ].map((interest) => {
                const isSelected = (onboardingState.step2Interests || []).includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => handleMultiSelect('step2Interests', interest)}
                    className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/40 font-bold text-white shadow-xs'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <span>{interest}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-[#050506]' : 'border-[var(--border-crisp)] bg-[#141418]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                onClick={() => setStep(prev => prev + 1)}
                disabled={!onboardingState.step2Interests || onboardingState.step2Interests.length === 0}
                className="bg-white hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed text-[#050506] px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 3: What can you help with? (Max 3) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Step 03 / 07
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Selected: {(onboardingState.step3Skills || []).length}/3 max
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white mt-1">
                What can you help with?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Select up to 3 core strengths where you deliver real execution.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                'Tech & Engineering',
                'Design & UI/UX',
                'Marketing & Growth',
                'Sales & BD',
                'Content Creation',
                'E-commerce Ops',
                'Product Strategy',
                'Operations'
              ].map((skill) => {
                const isSelected = (onboardingState.step3Skills || []).includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => handleMultiSelect('step3Skills', skill, 3)}
                    className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/40 font-bold text-white shadow-xs'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <span>{skill}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-[#050506]' : 'border-[var(--border-crisp)] bg-[#141418]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                onClick={() => setStep(prev => prev + 1)}
                disabled={!onboardingState.step3Skills || onboardingState.step3Skills.length === 0}
                className="bg-white hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed text-[#050506] px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 4: Where are you right now? */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-1">
                Step 04 / 07
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                Where are you right now?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Helps us match you with collaborators at a complementary experience level.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'Just starting', label: 'Just starting out — exploring project ideas' },
                { id: 'Learning', label: 'Learning & upskilling — want hands-on trial projects' },
                { id: 'Building something', label: 'Actively building something — looking for teammates' },
                { id: 'Already running something', label: 'Already running an active project/company' },
                { id: 'Experienced', label: 'Experienced builder — looking for high-craft co-builders' }
              ].map((stage) => {
                const isSelected = onboardingState.step4Stage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleSingleSelect('step4Stage', stage.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/40 font-bold text-white shadow-xs'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-sans">{stage.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-[#050506]' : 'border-[var(--border-crisp)] bg-[#141418]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 5: Where are you based? */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-1">
                Step 05 / 07
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                Where are you based?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                We use your location to calculate real timezone overlap for async builds.
              </p>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3" />
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                placeholder="Search country or region..."
                className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {filteredCountries.map((c) => {
                const isSelected = !!onboardingState.step5Location?.country && onboardingState.step5Location.country === c.country;
                return (
                  <button
                    key={c.country}
                    onClick={() => {
                      updateOnboarding({ step5Location: c });
                    }}
                    className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/40 font-bold text-white shadow-xs'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>{c.country}</span>
                    </div>
                    <span className="text-[11px] text-[var(--text-muted)] bg-[#141418] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                      {c.timezone}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                onClick={() => setStep(prev => prev + 1)}
                disabled={!onboardingState.step5Location?.country}
                className="bg-white hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed text-[#050506] px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 6: Who do you want to meet? (Multi-select) */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-1">
                Step 06 / 07
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                Who do you want to meet?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Select everyone you're interested in connecting and building with.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                'Co-founders',
                'Teammates',
                'Startup founders',
                'Developers & Engineers',
                'UI/UX Designers',
                'Marketers & Growth',
                'Business partners',
                'Just exploring'
              ].map((role) => {
                const isSelected = (onboardingState.step6Meet || []).includes(role);
                return (
                  <button
                    key={role}
                    onClick={() => handleMultiSelect('step6Meet', role)}
                    className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/40 font-bold text-white shadow-xs'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <span>{role}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-[#050506]' : 'border-[var(--border-crisp)] bg-[#141418]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                onClick={() => setStep(prev => prev + 1)}
                disabled={!onboardingState.step6Meet || onboardingState.step6Meet.length === 0}
                className="bg-white hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed text-[#050506] px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* QUESTION 7: How much time can you give? */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-1">
                Step 07 / 07
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                How much time can you give?
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Real commitments only. ShipWith pairs you with builds matching your exact bandwidth.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'A few hrs/week', label: 'A few hrs/week (< 5 hrs)' },
                { id: '5–10 hrs/week', label: '5–10 hrs/week (Evenings / Weekends)' },
                { id: '10–20 hrs/week', label: '10–20 hrs/week (Serious Part-Time)' },
                { id: '20+ hrs/week', label: '20+ hrs/week (Deep Collaboration)' },
                { id: 'Full-time', label: 'Full-time (35+ hrs/week)' }
              ].map((time) => {
                const isSelected = onboardingState.step7Hours === time.id;
                return (
                  <button
                    key={time.id}
                    onClick={() => handleSingleSelect('step7Hours', time.id)}
                    className={`w-full p-4 rounded-xl border text-left font-mono text-xs sm:text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141418] border-white ring-1 ring-white/40 font-bold text-white shadow-xs'
                        : 'bg-[#0C0C0E] hover:bg-[#141418] border-[var(--border-crisp)] hover:border-white/30 text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <span>{time.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-[#050506]' : 'border-[var(--border-crisp)] bg-[#141418]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(prev => prev - 1)}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>
          </div>
        )}

        {/* ONBOARDING COMPLETION SCREEN (Step 8) */}
        {step === 8 && (
          <div className="space-y-8 animate-in fade-in duration-300 py-4 max-w-3xl -mx-6 sm:mx-auto">
            {/* Completion Banner */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#141418] border border-white text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h1 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-white">
                You're in. We personalized ShipWith for you.
              </h1>
              <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
                Based on your answers ({onboardingState.step1Goal || 'Join a startup'} · {onboardingState.step7Hours || '10–20 hrs/wk'}), we calculated your highest telemetry matches.
              </p>
            </div>

            {/* 3 Live Personalized Preview Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Column 1: Startups for you */}
              <div className="glow-card-perimeter-subtle p-4 shadow-[var(--shadow-card)] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                  <span className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
                    Startups for You
                  </span>
                  <span className="text-[10px] font-mono text-[#00D659] font-bold">96% fit</span>
                </div>

                <div className="space-y-2.5">
                  {seedStartups.slice(0, 2).map((s) => (
                    <div key={s.id} className="p-2.5 rounded-lg bg-[#141418] border border-[var(--border-crisp)] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{s.name}</span>
                        <span className="text-[10px] font-mono font-bold text-white bg-[#050506] px-1.5 py-0.5 rounded border border-[var(--border-crisp)]">
                          {s.matchScore}%
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">{s.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: People to meet */}
              <div className="glow-card-perimeter-subtle p-4 shadow-[var(--shadow-card)] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                  <span className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
                    People to Meet
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Verified</span>
                </div>

                <div className="space-y-2.5">
                  {seedBuilders.slice(0, 2).map((b) => (
                    <div key={b.id} className="p-2.5 rounded-lg bg-[#141418] border border-[var(--border-crisp)] flex items-center gap-2">
                      <img src={b.avatar} alt={b.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white truncate">{b.name}</span>
                          <CheckCircle2 className="w-3 h-3 text-[#00D659] shrink-0" />
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] truncate block">{b.role.split('&')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Builds to explore */}
              <div className="glow-card-perimeter-subtle p-4 shadow-[var(--shadow-card)] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-crisp)]">
                  <span className="font-mono font-bold text-white uppercase tracking-wider text-[11px]">
                    Weekly ShipPad
                  </span>
                  <span className="text-[10px] font-mono text-white bg-[#141418] px-1.5 py-0.5 rounded font-bold border border-[var(--border-crisp)]">Week 42</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-[#141418] border border-[var(--border-crisp)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">PulseAI Engine</span>
                      <span className="text-[10px] font-mono text-[#00D659] font-bold">▲ 84</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] block">Autonomous dev worker loop</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#141418] border border-[var(--border-crisp)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">LayerMint Design</span>
                      <span className="text-[10px] font-mono text-[#00D659] font-bold">▲ 72</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] block">Figma to React tokens</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleFinishOnboarding('home')}
                className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-[#050506] px-8 py-3.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Explore ShipWith</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleFinishOnboarding('profile')}
                className="w-full sm:w-auto bg-[#0C0C0E] hover:bg-[#141418] text-white border border-[var(--border-crisp)] px-6 py-3.5 rounded-xl text-xs font-mono font-semibold transition-all shadow-2xs cursor-pointer"
              >
                Complete profile & passport
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. BOTTOM FLOATING FEEDBACK BUTTON */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-4 flex items-center justify-end">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-white bg-[#0C0C0E] hover:bg-[#141418] px-3 py-1.5 rounded-lg border border-[var(--border-crisp)] shadow-2xs transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-white" />
          <span>Feedback</span>
        </button>
      </footer>
    </div>
  );
};
