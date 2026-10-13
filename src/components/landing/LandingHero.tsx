import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { ArrowRight, Trophy } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--radius-pill)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span>Networking is only the beginning.</span>
            </div>

            {/* Main Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.08]">
              Find your people.<br />
              <span className="text-[var(--color-text-primary)]">Build what’s next.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
              Meet founders, builders, and startups that match what you want to create — then connect, collaborate, and ship together.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setCurrentView('onboarding')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Try ShipWith free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('plans-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View plans
              </Button>
            </div>

            {/* Microcopy & Trust signal */}
            <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-2 pt-1">
              <span>No credit card required</span>
              <span>•</span>
              <span>Already have an account?</span>
              <button 
                onClick={() => setCurrentView('home')} 
                className="underline hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                Log in
              </button>
            </div>
          </div>

          {/* Right Column: Authentic In-App Product Window (Matching Image 1 Reference) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-overlay)] overflow-hidden transition-all">
              
              {/* Window Top Bar */}
              <div className="h-9 px-4 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
                  shipwith.app/home
                </div>
                <div className="w-10" />
              </div>

              {/* Window Content: 3-Column Mini App Layout */}
              <div className="p-4 sm:p-5 grid grid-cols-12 gap-3.5 bg-[var(--color-canvas)] text-left">
                
                {/* Mini Left Nav */}
                <div className="hidden sm:block col-span-3 space-y-2 border-r border-[var(--color-border)] pr-3">
                  <div className="font-display font-bold text-xs tracking-tight text-[var(--color-text-primary)] mb-3">
                    ShipWith
                  </div>
                  {['Home', 'Startups', 'People', 'Messages', 'Workspace'].map((item, idx) => (
                    <div
                      key={item}
                      className={`text-xs px-2 py-1 rounded-[var(--radius-sm)] font-medium ${
                        idx === 0 
                          ? 'bg-[var(--color-surface-strong)] text-[var(--color-text-primary)] font-semibold' 
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Mini Center: Startups Radar */}
                <div className="col-span-12 sm:col-span-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)]">
                    <span>Startups</span>
                    <span className="text-[10px] text-[var(--color-brand-accent)] font-mono">View all →</span>
                  </div>

                  {/* Startup Card 1 */}
                  <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[var(--color-text-primary)]">Campus AI Tutor</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-[var(--color-success-subtle)] text-[var(--color-success)] rounded font-mono">Early stage</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)] line-clamp-2">
                      AI study companion looking for a frontend developer and growth collaborator.
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)]">
                      <span>3 open roles</span>
                      <span className="text-[var(--color-brand-accent)] font-medium">View build →</span>
                    </div>
                  </div>

                  {/* Shipped Project Card */}
                  <div className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[var(--color-text-primary)]">Campus AI Tutor</span>
                      <span className="text-[10px] text-[var(--color-success)] font-medium">● Live</span>
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)] flex items-center justify-between">
                      <span>1.2k active students</span>
                      <span>85 feedbacks</span>
                    </div>
                  </div>
                </div>

                {/* Mini Right: People & Build Reputation */}
                <div className="col-span-12 sm:col-span-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)]">
                    <span>People for you</span>
                    <span className="text-[10px] text-[var(--color-brand-accent)] font-mono">View all →</span>
                  </div>

                  {/* Person 1 */}
                  <div className="p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                        alt="Arjun" 
                        className="w-6 h-6 rounded-full object-cover shrink-0" 
                      />
                      <div className="text-left">
                        <div className="text-[11px] font-semibold text-[var(--color-text-primary)] leading-tight">Arjun Verma</div>
                        <div className="text-[10px] text-[var(--color-text-muted)]">Full-stack dev</div>
                      </div>
                    </div>
                    <button className="px-2 py-0.5 text-[10px] bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] rounded font-medium">
                      Invite
                    </button>
                  </div>

                  {/* Person 2 */}
                  <div className="p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
                        alt="Simran" 
                        className="w-6 h-6 rounded-full object-cover shrink-0" 
                      />
                      <div className="text-left">
                        <div className="text-[11px] font-semibold text-[var(--color-text-primary)] leading-tight">Simran Kaur</div>
                        <div className="text-[10px] text-[var(--color-text-muted)]">Product designer</div>
                      </div>
                    </div>
                    <button className="px-2 py-0.5 text-[10px] bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] rounded font-medium">
                      Invite
                    </button>
                  </div>

                  {/* Reputation Badge Widget */}
                  <div className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-text-primary)]">
                      <span>Reputation</span>
                      <Trophy className="w-3.5 h-3.5 text-[var(--color-warning)]" />
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">
                      Proof from verified shipped work:
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-medium pt-1 border-t border-[var(--color-border)]">
                      <span>3 Ships</span>
                      <span className="text-[var(--color-success)]">Top 10% Rank</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Lifecycle Track (Matching Image 1) */}
              <div className="py-2.5 px-4 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex items-center justify-center gap-4 sm:gap-6 text-[11px] text-[var(--color-text-muted)] font-mono">
                <span className="text-[var(--color-text-primary)] font-semibold">1. Discover</span>
                <span>→</span>
                <span>2. Connect</span>
                <span>→</span>
                <span>3. Build</span>
                <span>→</span>
                <span>4. Ship</span>
                <span>→</span>
                <span className="text-[var(--color-success)] font-semibold">5. Reputation</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
