import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Check, GitCommit, Users, Trophy, Sparkles } from 'lucide-react';
import { ProductWalkthroughPlayer } from './ProductWalkthroughPlayer';

export const LandingSections: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="w-full">
      
      {/* =========================================================================
          BLOCK 1: WHY SHIPWITH (Simplify-style Distinct Cool Grey Shaded Band)
          Full-width architectural block creating rhythm & contrast with the hero
          ========================================================================= */}
      <section className="w-full bg-slate-100/90 dark:bg-zinc-900/70 border-y border-slate-200/90 dark:border-zinc-800 py-20 lg:py-24 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          
          {/* Split Header matching the reference screenshot with 100% theme contrast */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-on-scroll">
            <div className="space-y-2">
              <div className="text-xs uppercase font-sans tracking-wider text-[var(--color-text-muted)] font-semibold">
                WHY SHIPWITH
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[var(--color-text-primary)] font-display tracking-tight leading-tight">
                Networking is only the beginning.
              </h2>
            </div>
            <div className="max-w-md text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed md:text-left">
              Meet the right people, prove you can build together in a 4-day trial, and turn what you ship into reputation.
            </div>
          </div>

          {/* 3 Elevated High-Contrast White Surface Cards on Grey Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Pillar 1 */}
            <div className="p-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 space-y-4 reveal-on-scroll delay-75">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                Proof Over Resumes
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                No generic self-written bios or follower counts. Filter potential teammates by verified GitHub repos, live demos, and real contributions.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 space-y-4 reveal-on-scroll delay-150">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-2xs">
                <GitCommit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                The 4-Day Trial Build
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Test working compatibility before committing to equity or months of work. Complete a scoped micro-objective and mutually decide if you want to continue.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 space-y-4 reveal-on-scroll delay-225">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-2xs">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                The Build Passport
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Every shipped product and verified teammate collaboration stays on your permanent passport. Peer-reviewed credibility you carry anywhere.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: INTERACTIVE WALKTHROUGH TOUR (Airy Canvas Transition Band)
          Alternating back to clean canvas so sections feel distinct and lively
          ========================================================================= */}
      <section className="w-full bg-[var(--color-canvas)] py-20 lg:py-24 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 reveal-on-scroll">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-primary)]">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>THE SHIPWITH ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] font-display tracking-tight">
              From mutual discovery to shipped software.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              Experience how ShipWith replaces unverified CVs and guesswork with hands-on collaboration sprints.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ProductWalkthroughPlayer />
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 3: MEMBERSHIP & PLANS (Simplify-style Second Grey Shaded Band)
          Distinct block appearance providing visual variety upon scrolling
          ========================================================================= */}
      <section id="plans-section" className="w-full bg-slate-100/90 dark:bg-zinc-900/70 border-y border-slate-200/90 dark:border-zinc-800 py-20 lg:py-28 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3 reveal-on-scroll">
            <div className="text-xs uppercase font-mono tracking-wider text-[var(--color-text-muted)] font-semibold">
              MEMBERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[var(--color-text-primary)] font-display tracking-tight">
              Simple, honest plans for ambitious builders.
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              ShipWith is free for everyone to discover, collaborate, and ship. Paid tiers unlock advanced recruiting capacity—never unearned reputation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            
            {/* Free Tier */}
            <div className="p-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex flex-col justify-between space-y-6 reveal-on-scroll delay-75 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div>
                  <div className="text-base font-bold text-[var(--color-text-primary)]">Builder Free</div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-1">Full core loop for independent makers.</div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                  $0 <span className="text-xs font-normal text-[var(--color-text-muted)] font-sans">/ forever</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Browse startups & builders</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Post up to 2 active Builds</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Trial Builds</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Mint verified Build Passport</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full font-medium" onClick={() => setCurrentView('onboarding')}>
                Get started free
              </Button>
            </div>

            {/* Builder Pro (Elevated Spotlight Card) */}
            <div className="p-7 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-brand-primary)] shadow-xl flex flex-col justify-between space-y-6 relative reveal-on-scroll delay-150 transform md:-translate-y-2">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] text-[10px] font-mono font-semibold uppercase shadow-xs">
                Popular
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-base font-bold text-[var(--color-text-primary)]">Builder Pro</div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-1">For active hackers seeking high momentum.</div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                  $12 <span className="text-xs font-normal text-[var(--color-text-muted)] font-sans">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Everything in Free</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Advanced tech-stack filters</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited active Builds</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Priority match recommendations</li>
                </ul>
              </div>
              <Button variant="primary" className="w-full font-medium shadow-sm" onClick={() => setCurrentView('onboarding')}>
                Start Builder Pro
              </Button>
            </div>

            {/* Startup Pro */}
            <div className="p-7 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex flex-col justify-between space-y-6 reveal-on-scroll delay-225 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div>
                  <div className="text-base font-bold text-[var(--color-text-primary)]">Startup Pro</div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-1">For funded teams recruiting core talent.</div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)]">
                  $39 <span className="text-xs font-normal text-[var(--color-text-muted)] font-sans">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[var(--color-text-secondary)] pt-3 border-t border-[var(--color-border)]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Everything in Builder Pro</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited open roles & applicants</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Candidate pipeline organization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Multi-workspace team seats</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full font-medium" onClick={() => setCurrentView('onboarding')}>
                Contact sales
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 4: FOOTER
          ========================================================================= */}
      <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-14 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-base text-[var(--color-text-primary)]">ShipWith</span>
            <span>•</span>
            <span>A build-first collaboration network</span>
          </div>
          <div className="flex items-center gap-8 font-medium">
            <button onClick={() => setCurrentView('startups')} className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">
              Startups
            </button>
            <button onClick={() => setCurrentView('people')} className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">
              Builders
            </button>
            <button onClick={() => setCurrentView('onboarding')} className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">
              Join Free
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
