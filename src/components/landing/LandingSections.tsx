import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Check, GitCommit, Users, Trophy } from 'lucide-react';

export const LandingSections: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="space-y-24 py-12">
      {/* 1. Why ShipWith Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Silver/grey ambient backdrop halo framing the pillars */}
        <div className="absolute inset-0 -z-10 silver-ambient-band opacity-85 rounded-3xl pointer-events-none" />
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-on-scroll">
          <div className="text-xs uppercase font-mono tracking-wider text-[var(--color-brand-accent)] font-semibold">
            WHY SHIPWITH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text-primary)] font-display tracking-tight">
            Networking is{' '}
            <span className="font-serif-italic font-normal text-[var(--color-brand-accent)] text-[1.12em] tracking-normal inline-block pr-1">
              only
            </span>{' '}
            the beginning.
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
            Meet the right people, prove you can build together in a 4-day trial, and turn what you ship into verifiable reputation.
          </p>
        </div>

        {/* 3 Pillars Grid with Scroll Reveal & Silver Sheen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] silver-sheen-card space-y-3 reveal-on-scroll delay-75 hover:border-[var(--color-border-strong)] transition-all">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-brand-accent)]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Proof Over Resumes</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              No generic self-written bios or follower counts. Filter potential teammates by verified GitHub repos, live demos, and real contributions.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] silver-sheen-card space-y-3 reveal-on-scroll delay-150 hover:border-[var(--color-border-strong)] transition-all">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-success)]">
              <GitCommit className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">The 4-Day Trial Build</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Test working compatibility before committing to equity or months of work. Complete a scoped micro-objective and mutually decide if you want to continue.
            </p>
          </div>

          <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] silver-sheen-card space-y-3 reveal-on-scroll delay-225 hover:border-[var(--color-border-strong)] transition-all">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-warning)]">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">The Build Passport</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Every shipped product and verified teammate collaboration stays on your permanent passport. Peer-reviewed credibility you carry anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Transparent Plans Section (PRD §14: Reputation cannot be bought) */}
      <section id="plans-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Silver/grey ambient backdrop halo framing the plans */}
        <div className="absolute inset-0 -z-10 silver-ambient-band opacity-75 rounded-3xl pointer-events-none" />
        
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3 reveal-on-scroll">
          <div className="text-xs uppercase font-mono tracking-wider text-[var(--color-text-muted)] font-semibold">
            MEMBERSHIP
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] font-display tracking-tight">
            Simple, honest plans for{' '}
            <span className="font-serif-italic font-normal text-[var(--color-brand-accent)] text-[1.12em] tracking-normal inline-block pr-1">
              ambitious
            </span>{' '}
            builders.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            ShipWith is free for everyone to discover, collaborate, and ship. Paid tiers unlock advanced recruiting capacity—never unearned reputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] silver-sheen-card flex flex-col justify-between space-y-6 reveal-on-scroll delay-75">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">Builder Free</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">Full core loop for independent makers.</div>
              </div>
              <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                $0 <span className="text-xs font-normal text-[var(--color-text-muted)] font-sans">/ forever</span>
              </div>
              <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] pt-2 border-t border-[var(--color-border)]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Browse startups & builders</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Post up to 2 active Builds</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Unlimited Trial Builds</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Mint verified Build Passport</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setCurrentView('onboarding')}>
              Get started free
            </Button>
          </div>

          {/* Builder Pro */}
          <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] silver-sheen-card ring-2 ring-[var(--color-brand-primary)] shadow-xl flex flex-col justify-between space-y-6 relative reveal-on-scroll delay-150">
            <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-[var(--radius-pill)] silver-badge text-[10px] font-mono font-semibold uppercase shadow-xs">
              Popular
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">Builder Pro</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">For active hackers seeking high momentum.</div>
              </div>
              <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                $12 <span className="text-xs font-normal text-[var(--color-text-muted)] font-sans">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] pt-2 border-t border-[var(--color-border)]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Everything in Free</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Advanced tech-stack filters</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Unlimited active Builds</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Priority match recommendations</li>
              </ul>
            </div>
            <Button variant="primary" className="w-full" onClick={() => setCurrentView('onboarding')}>
              Start Builder Pro
            </Button>
          </div>

          {/* Startup Pro */}
          <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col justify-between space-y-6 reveal-on-scroll delay-225">
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">Startup Pro</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">For funded teams recruiting core talent.</div>
              </div>
              <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                $39 <span className="text-xs font-normal text-[var(--color-text-muted)] font-sans">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] pt-2 border-t border-[var(--color-border)]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Everything in Builder Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Unlimited open roles & applicants</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Candidate pipeline organization</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--color-success)] shrink-0" /> Multi-workspace team seats</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setCurrentView('onboarding')}>
              Contact sales
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-[var(--color-text-primary)]">ShipWith</span>
            <span>•</span>
            <span>A build-first collaboration network</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('startups')} className="hover:text-[var(--color-text-primary)] cursor-pointer">
              Startups
            </button>
            <button onClick={() => setCurrentView('people')} className="hover:text-[var(--color-text-primary)] cursor-pointer">
              Builders
            </button>
            <button onClick={() => setCurrentView('onboarding')} className="hover:text-[var(--color-text-primary)] cursor-pointer">
              Join Free
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
