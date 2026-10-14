import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Check, GitCommit, Users, Trophy, Sparkles } from 'lucide-react';
import { ProductWalkthroughPlayer } from './ProductWalkthroughPlayer';

export const LandingSections: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="w-full bg-[#09090b] text-white">
      
      {/* =========================================================================
          BLOCK 1: WHY SHIPWITH (Contrasting Cool Grey / White Architectural Band)
          Crisp, high-contrast silver-white palette with pure white cards & hover lift
          ========================================================================= */}
      <section className="w-full bg-[#f4f4f7] border-y border-zinc-200/90 py-20 lg:py-24 text-zinc-900 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          
          {/* Split Header with Artful Font Mixture - High Contrast Dark Typography */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs uppercase font-mono tracking-widest text-zinc-800 font-bold">
                WHY SHIPWITH
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-zinc-950 font-display tracking-tight leading-tight">
                Networking is{' '}
                <span className="font-serif italic font-normal text-zinc-900 text-[1.12em] tracking-normal inline-block pr-1">
                  only
                </span>{' '}
                the beginning.
              </h2>
            </div>
            <div className="max-w-md text-zinc-700 text-sm sm:text-base leading-relaxed md:text-left font-sans font-medium">
              Meet the right people, prove you can build together in a 4-day trial, and turn what you ship into verifiable reputation.
            </div>
          </div>

          {/* 3 High-Contrast White Cards with Interactive Hover Animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Pillar 1 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-zinc-400 group transition-all duration-300 space-y-4 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shadow-xs group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight font-display">
                Proof Over Resumes
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed font-sans font-medium">
                No generic self-written bios or follower counts. Filter potential teammates by verified GitHub repos, live demos, and real contributions.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-zinc-400 group transition-all duration-300 space-y-4 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                <GitCommit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight font-display">
                The 4-Day Trial Build
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed font-sans font-medium">
                Test working compatibility before committing to equity or months of work. Complete a scoped micro-objective and mutually decide if you want to continue.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-zinc-400 group transition-all duration-300 space-y-4 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-xs group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight font-display">
                The Build Passport
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed font-sans font-medium">
                Every shipped product and verified teammate collaboration stays on your permanent passport. Peer-reviewed credibility you carry anywhere.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: INTERACTIVE WALKTHROUGH TOUR (Obsidian Canvas Band)
          Deep canvas transition providing rhythmic visual pacing
          ========================================================================= */}
      <section className="w-full bg-[#09090b] py-20 lg:py-24 border-b border-zinc-800/80 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono font-semibold text-zinc-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>THE SHIPWITH ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white font-display tracking-tight">
              From mutual discovery to{' '}
              <span className="font-serif italic font-normal text-zinc-100 text-[1.12em] tracking-normal inline-block pr-1">
                shipped
              </span>{' '}
              software.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-sans">
              Experience how ShipWith replaces unverified CVs and guesswork with hands-on collaboration sprints.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ProductWalkthroughPlayer />
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 3: MEMBERSHIP & PLANS (Second Contrasting Grey / White Band)
          Elevated pricing tiers with high-contrast obsidian & pure white cards
          ========================================================================= */}
      <section id="plans-section" className="w-full bg-[#f4f4f7] border-y border-zinc-200/90 py-20 lg:py-28 text-zinc-900 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <div className="text-xs uppercase font-mono tracking-widest text-zinc-800 font-bold">
              MEMBERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-zinc-950 font-display tracking-tight">
              Simple, honest plans for{' '}
              <span className="font-serif italic font-normal text-zinc-900 text-[1.12em] tracking-normal inline-block pr-1">
                ambitious
              </span>{' '}
              builders.
            </h2>
            <p className="text-sm text-zinc-700 font-sans font-medium">
              ShipWith is free for everyone to discover, collaborate, and ship. Paid tiers unlock advanced recruiting capacity—never unearned reputation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            
            {/* Free Tier */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-md flex flex-col justify-between space-y-6 hover:border-zinc-400 hover:shadow-2xl hover:-translate-y-2 group transition-all duration-300">
              <div className="space-y-4">
                <div>
                  <div className="text-base font-extrabold text-zinc-950 font-display">Builder Free</div>
                  <div className="text-xs text-zinc-600 mt-1 font-sans font-medium">Full core loop for independent makers.</div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-zinc-950">
                  $0 <span className="text-xs font-semibold text-zinc-600 font-sans">/ forever</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-800 font-medium pt-3 border-t border-zinc-200 font-sans">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Browse startups & builders</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Post up to 2 active Builds</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Unlimited Trial Builds</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Mint verified Build Passport</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full font-bold border-2 border-zinc-900 text-zinc-950 hover:text-white hover:bg-zinc-950 cursor-pointer shadow-xs transition-colors" onClick={() => setCurrentView('onboarding')}>
                Get started free
              </Button>
            </div>

            {/* Builder Pro (Hero Pitch Black Card on Crisp White Background) */}
            <div className="p-7 rounded-2xl bg-zinc-950 text-white border-2 border-zinc-900 shadow-2xl flex flex-col justify-between space-y-6 relative transform md:-translate-y-2 hover:-translate-y-3.5 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] group transition-all duration-300">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-white text-zinc-950 text-[10px] font-mono font-bold uppercase shadow-sm">
                Popular
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-base font-bold text-white font-display">Builder Pro</div>
                  <div className="text-xs text-zinc-400 mt-1 font-sans">For active hackers seeking high momentum.</div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-white">
                  $12 <span className="text-xs font-normal text-zinc-400 font-sans">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300 pt-3 border-t border-zinc-800 font-sans">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Everything in Free</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Advanced tech-stack filters</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited active Builds</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Priority match recommendations</li>
                </ul>
              </div>
              <Button variant="primary" className="w-full font-semibold bg-white text-zinc-950 hover:bg-zinc-200 shadow-md hover:shadow-xl hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('onboarding')}>
                Start Builder Pro
              </Button>
            </div>

            {/* Startup Pro */}
            <div className="p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-md flex flex-col justify-between space-y-6 hover:border-zinc-400 hover:shadow-2xl hover:-translate-y-2 group transition-all duration-300">
              <div className="space-y-4">
                <div>
                  <div className="text-base font-extrabold text-zinc-950 font-display">Startup Pro</div>
                  <div className="text-xs text-zinc-600 mt-1 font-sans font-medium">For funded teams recruiting core talent.</div>
                </div>
                <div className="text-3xl font-extrabold font-mono text-zinc-950">
                  $39 <span className="text-xs font-semibold text-zinc-600 font-sans">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-800 font-medium pt-3 border-t border-zinc-200 font-sans">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Everything in Builder Pro</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Unlimited open roles & applicants</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Candidate pipeline organization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> Multi-workspace team seats</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full font-bold border-2 border-zinc-900 text-zinc-950 hover:text-white hover:bg-zinc-950 cursor-pointer shadow-xs transition-colors" onClick={() => setCurrentView('onboarding')}>
                Contact sales
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 4: FOOTER
          ========================================================================= */}
      <footer className="w-full border-t border-zinc-850 bg-[#050507] py-14 transition-colors">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-base text-white">ShipWith</span>
            <span>•</span>
            <span>A build-first collaboration network</span>
          </div>
          <div className="flex items-center gap-8 font-medium">
            <button onClick={() => setCurrentView('startups')} className="hover:text-white transition-colors cursor-pointer">
              Startups
            </button>
            <button onClick={() => setCurrentView('people')} className="hover:text-white transition-colors cursor-pointer">
              Builders
            </button>
            <button onClick={() => setCurrentView('onboarding')} className="hover:text-white transition-colors cursor-pointer">
              Join Free
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
