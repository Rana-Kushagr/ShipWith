import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight, MessageSquare, Check, Rocket, Users, Compass, Globe } from 'lucide-react';
import type { CommitmentOption } from '../../types';

export const OnboardingWizard: React.FC = () => {
  const { 
    onboardingState, 
    updateOnboarding, 
    completeOnboarding, 
    setCurrentView,
    setIsFeedbackOpen
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Question 1: How do you want to start?
  const objectives = [
    { id: 'Join a startup', label: 'Join a startup', desc: 'Find active teams and contribute your skills.' },
    { id: 'Find people for mine', label: 'Find people for mine', desc: 'Recruit co-founders and builders for your project.' },
    { id: 'Start together', label: 'Start together', desc: 'Brainstorm ideas and team up from day zero.' }
  ];

  // Question 2: What are you most into?
  const interests = [
    'Entrepreneurship', 'Tech', 'AI', 'Marketing', 
    'E-commerce', 'Trading & Investing', 'Content', 'Still exploring'
  ];

  // Question 3: What can you help with? (Up to 3)
  const strengthsList = [
    'Tech', 'Design', 'Marketing & Growth', 'Sales', 
    'Content', 'E-commerce', 'Strategy', 'Operations'
  ];

  // Question 4: Where are you right now?
  const stages = [
    { id: 'Just starting', label: 'Just starting', desc: 'Looking for direction and first teammates.' },
    { id: 'Learning', label: 'Learning', desc: 'Building skills and eager for real experience.' },
    { id: 'Building something', label: 'Building something', desc: 'Have an MVP or active prototype in progress.' },
    { id: 'Already running something', label: 'Already running something', desc: 'Live project with users or revenue.' },
    { id: 'Experienced', label: 'Experienced', desc: 'Seasoned founder or senior specialist.' }
  ];

  // Question 6: Who do you want to meet? (Up to 3)
  const collaboratorsList = [
    'Co-founder', 'Teammates', 'Startup founders', 'Developer', 
    'Designer', 'Marketer', 'Business partner', 'Just exploring'
  ];

  // Question 7: How much time can you give?
  const timeCommitments: CommitmentOption[] = [
    '< 5 hrs/week', '5–10 hrs/week', '10–20 hrs/week', '20+ hrs/week', 'Full-time'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(curr => curr + 1);
    } else {
      setCurrentStep(8); // Completion screen
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
    }
  };

  // Toggle helpers for multi-select (max 3)
  const toggleStrength = (item: string) => {
    const current = onboardingState.strengths;
    if (current.includes(item)) {
      updateOnboarding({ strengths: current.filter(x => x !== item) });
    } else if (current.length < 3) {
      updateOnboarding({ strengths: [...current, item] });
    }
  };

  const toggleCollaborator = (item: string) => {
    const current = onboardingState.desiredCollaborators;
    if (current.includes(item)) {
      updateOnboarding({ desiredCollaborators: current.filter(x => x !== item) });
    } else if (current.length < 3) {
      updateOnboarding({ desiredCollaborators: [...current, item] });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Header */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] flex items-center justify-center font-display font-extrabold text-xs">
            SW
          </div>
          <span className="font-display font-bold text-base text-[var(--color-text-primary)]">
            ShipWith
          </span>
        </div>

        {/* Step indicator */}
        {currentStep <= totalSteps && (
          <div className="text-xs font-mono text-[var(--color-text-muted)]">
            {currentStep} of {totalSteps}
          </div>
        )}

        {/* Save & Exit */}
        <button
          onClick={() => setCurrentView('landing')}
          className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
        >
          Save & exit
        </button>
      </header>

      {/* Progress Bar */}
      {currentStep <= totalSteps && (
        <div className="max-w-2xl w-full mx-auto my-3 h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-brand-primary)] transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      )}

      {/* Main Question Container */}
      <main className="max-w-xl w-full mx-auto my-auto py-8">
        
        {/* Step 1: How do you want to start? */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                How do you want to start?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Choose what fits you best right now.
              </p>
            </div>

            <div className="space-y-2.5">
              {objectives.map(obj => {
                const isSelected = onboardingState.objective === obj.id;
                return (
                  <button
                    key={obj.id}
                    onClick={() => updateOnboarding({ objective: obj.id })}
                    className={`w-full p-4 rounded-[var(--radius-lg)] border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface)] shadow-sm ring-1 ring-[var(--color-brand-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-text-primary)]">{obj.label}</div>
                      <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{obj.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-[var(--color-brand-on-primary)] rounded-full" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: What are you most into? */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                What are you most into?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Pick the spaces that interest you most.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {interests.map(item => {
                const isSelected = onboardingState.interests.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => {
                      const current = onboardingState.interests;
                      updateOnboarding({
                        interests: isSelected ? current.filter(x => x !== item) : [...current, item]
                      });
                    }}
                    className={`p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface)] ring-1 ring-[var(--color-brand-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">{item}</span>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 text-[var(--color-brand-on-primary)]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: What can you help with? (Up to 3) */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                What can you help with?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Choose up to 3 strengths. <span className="font-mono font-medium">({onboardingState.strengths.length} of 3 selected)</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {strengthsList.map(item => {
                const isSelected = onboardingState.strengths.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleStrength(item)}
                    className={`p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface)] ring-1 ring-[var(--color-brand-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">{item}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-[var(--color-brand-on-primary)]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Where are you right now? */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Where are you right now?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                This helps us show the right people and startups.
              </p>
            </div>

            <div className="space-y-2">
              {stages.map(stg => {
                const isSelected = onboardingState.stage === stg.id;
                return (
                  <button
                    key={stg.id}
                    onClick={() => updateOnboarding({ stage: stg.id })}
                    className={`w-full p-3.5 rounded-[var(--radius-lg)] border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface)] ring-1 ring-[var(--color-brand-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[var(--color-text-primary)]">{stg.label}</div>
                      <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{stg.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-[var(--color-brand-on-primary)] rounded-full" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Where are you based? */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Where are you based?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                This helps us match people across regions and working hours.
              </p>
            </div>

            <div className="p-5 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                  Country / Region
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={onboardingState.country}
                    onChange={e => updateOnboarding({ country: e.target.value })}
                    placeholder="Enter country (e.g. India, United States)"
                    className="w-full text-xs p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] focus:border-[var(--color-brand-accent)] focus:outline-none"
                  />
                  <Globe className="w-4 h-4 text-[var(--color-text-muted)] absolute right-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                  Timezone (Auto-detected)
                </label>
                <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-primary)]">
                  <span>{onboardingState.timezone}</span>
                  <span className="text-[11px] text-[var(--color-brand-accent)]">Editable in profile</span>
                </div>
              </div>

              <p className="text-[11px] text-[var(--color-text-muted)] pt-1">
                You can optionally add your city later in your profile. We never require precise physical location.
              </p>
            </div>
          </div>
        )}

        {/* Step 6: Who do you want to meet? (Up to 3) */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Who do you want to meet?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Choose up to 3 roles. <span className="font-mono font-medium">({onboardingState.desiredCollaborators.length} of 3 selected)</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {collaboratorsList.map(item => {
                const isSelected = onboardingState.desiredCollaborators.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleCollaborator(item)}
                    className={`p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface)] ring-1 ring-[var(--color-brand-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">{item}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-[var(--color-brand-on-primary)]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 7: How much time can you give? */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                How much time can you give?
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Choose what feels realistic to avoid burning out.
              </p>
            </div>

            <div className="space-y-2">
              {timeCommitments.map(opt => {
                const isSelected = onboardingState.weeklyHours === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => updateOnboarding({ weeklyHours: opt })}
                    className={`w-full p-4 rounded-[var(--radius-lg)] border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface)] ring-1 ring-[var(--color-brand-primary)]'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">{opt}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-[var(--color-brand-on-primary)] rounded-full" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 8: Completion Screen (PRD ONB-04) */}
        {currentStep === 8 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-success-subtle)] border border-[var(--color-success)]/20 text-[var(--color-success)] flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                You’re in.
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
                We'll personalize ShipWith based on your answers:
              </p>
            </div>

            {/* 3 Personalized Preview Buckets */}
            <div className="space-y-2 text-left">
              <div className="p-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Rocket className="w-4 h-4 text-[var(--color-brand-accent)]" />
                  <div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)]">Startups for you</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">Teams and startups matching your interests</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              </div>

              <div className="p-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[var(--color-success)]" />
                  <div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)]">People to meet</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">Builders seeking your superpowers</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              </div>

              <div className="p-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[var(--color-warning)]" />
                  <div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)]">Builds to explore</div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">Active projects looking for contributors</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={completeOnboarding}
              >
                Explore ShipWith →
              </Button>
              <button
                onClick={completeOnboarding}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                Complete profile later
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Navigation Control Bar */}
      <footer className="max-w-xl w-full mx-auto flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        <div>
          {currentStep > 1 && currentStep <= totalSteps && (
            <button
              onClick={handleBack}
              aria-label="Previous question"
              className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] border border-[var(--color-border)] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Feedback Trigger */}
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-2.5 py-1.5 rounded-[var(--radius-md)] border border-transparent hover:border-[var(--color-border)] transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Feedback</span>
          </button>

          {/* Continue button */}
          {currentStep <= totalSteps && (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {currentStep === totalSteps ? 'Finish setup' : 'Continue'}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};
