import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Palette, 
  Rocket, 
  Code2, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { LandingStickyShowcase } from '../LandingStickyShowcase';

export const LandingSections: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen } = useApp();

  const bentoCategories = [
    {
      id: 'ai-agents',
      title: 'AI & Autonomous Agents',
      count: '42 Active Builds',
      roles: '18 Open Roles',
      icon: Cpu,
      color: '#34D399',
      bgGrad: 'from-emerald-950/60 to-[#102223]',
      popularStack: ['Python', 'LangGraph', 'FastAPI', 'pgvector']
    },
    {
      id: 'saas',
      title: 'Full-Stack SaaS',
      count: '64 Active Builds',
      roles: '31 Open Roles',
      icon: Layers,
      color: '#38BDF8',
      bgGrad: 'from-sky-950/60 to-[#102223]',
      popularStack: ['Next.js 15', 'React 19', 'PostgreSQL', 'Tailwind']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design Systems',
      count: '28 Active Builds',
      roles: '14 Open Roles',
      icon: Palette,
      color: '#F472B6',
      bgGrad: 'from-pink-950/60 to-[#102223]',
      popularStack: ['Figma', 'Tokens', 'Design Engineering', 'Micro-interactions']
    },
    {
      id: 'growth',
      title: 'Growth & GTM',
      count: '19 Active Builds',
      roles: '9 Open Roles',
      icon: Rocket,
      color: '#FB923C',
      bgGrad: 'from-amber-950/60 to-[#102223]',
      popularStack: ['Content Engine', 'Product-Led', 'Viral Loops', 'Analytics']
    },
    {
      id: 'devtools',
      title: 'DevTools & Infra',
      count: '37 Active Builds',
      roles: '22 Open Roles',
      icon: Code2,
      color: '#A78BFA',
      bgGrad: 'from-indigo-950/60 to-[#102223]',
      popularStack: ['Go', 'Rust', 'Docker', 'Redis Edge']
    },
    {
      id: 'ecommerce',
      title: 'Modern E-Commerce',
      count: '15 Active Builds',
      roles: '8 Open Roles',
      icon: ShoppingBag,
      color: '#FBBF24',
      bgGrad: 'from-yellow-950/60 to-[#102223]',
      popularStack: ['Shopify Storefront API', 'Headless', 'Stripe', 'Supabase']
    }
  ];

  return (
    <div className="w-full bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* 1. SIMPLIFY-STYLE STICKY 2-COLUMN SCROLL SHOWCASE */}
      <div id="sticky-showcase-section">
        <LandingStickyShowcase />
      </div>

      {/* 2. SIMPLIFY-STYLE DARK BENTO GRID: FRESH BUILDS & OPEN TRIAL ROLES TODAY */}
      <section className="py-24 bg-[#102223] text-white border-b border-teal-900/40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#1A5052]/30 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-[#34D399] px-3.5 py-1 rounded-full text-xs font-mono font-medium mb-3">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span>REAL-TIME RADAR TELEMETRY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tight">
                Fresh Builds & Open Trial Roles{' '}
                <span className="font-['Instrument_Serif'] italic font-normal text-[#34D399]">
                  Added Today
                </span>
                .
              </h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 max-w-md font-sans leading-relaxed">
              Skip traditional resume applications. Browse high-signal builds, review tech stacks, and step directly into a 5-day trial sprint.
            </p>
          </div>

          {/* 6 High-Contrast Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bentoCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => setCurrentView('startups')}
                  className={`bg-gradient-to-b ${cat.bgGrad} border border-teal-800/40 hover:border-teal-400/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer group shadow-lg flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        style={{ color: cat.color }} 
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-white group-hover:text-[#34D399] transition-colors">
                      {cat.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                      <span className="text-[#34D399] font-bold">{cat.count}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-300">{cat.roles}</span>
                    </div>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {cat.popularStack.map((stack, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300 px-2 py-0.5 rounded-md">
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>5-Day Trial Eligible</span>
                    <span className="text-[#34D399] font-semibold">Instant Matching ✔</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. "WHY BUILDERS SWITCH TO SHIPWITH" COMPARISON MATRIX */}
      <section id="comparison-matrix-section" className="py-24 bg-white border-b border-[var(--border-crisp)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border-crisp)] text-[var(--text-secondary)] px-3 py-1 rounded-full text-xs font-mono font-medium mb-3">
              <span>UNFAIR ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[var(--text-primary)] tracking-tight">
              Why serious builders switch to{' '}
              <span className="text-[#1A5052]">ShipWith</span>.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Replacing the fragmented mess of cold Twitter DMs, awkward Zoom chats, and zero-accountability hackathons.
            </p>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-card)] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans min-w-[640px]">
              <thead>
                <tr className="border-b border-[var(--border-crisp)] bg-[var(--bg-canvas)]">
                  <th className="p-4 sm:p-5 font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">Feature & Capability</th>
                  <th className="p-4 sm:p-5 font-bold font-['Plus_Jakarta_Sans'] text-[#1A5052] bg-[var(--simplify-teal-soft)] border-x border-[#BCE5DC]">
                    ShipWith
                  </th>
                  <th className="p-4 sm:p-5 font-medium text-[var(--text-muted)]">LinkedIn</th>
                  <th className="p-4 sm:p-5 font-medium text-[var(--text-muted)]">X / Discord</th>
                  <th className="p-4 sm:p-5 font-medium text-[var(--text-muted)]">Peerlist / Product Hunt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-crisp)] font-mono text-xs">
                <tr>
                  <td className="p-4 font-semibold text-[var(--text-primary)] font-sans">
                    Skill & Commitment Match Telemetry (%)
                  </td>
                  <td className="p-4 bg-[var(--simplify-teal-soft)] border-x border-[#BCE5DC] text-[#00AA45] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                    <span>Algorithmic Fit (96%)</span>
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Keyword search only</td>
                  <td className="p-4 text-[var(--text-muted)]">Zero telemetry</td>
                  <td className="p-4 text-[var(--text-muted)]">Manual browsing</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[var(--text-primary)] font-sans">
                    3–7 Day Scoped Trial Build Framework
                  </td>
                  <td className="p-4 bg-[var(--simplify-teal-soft)] border-x border-[#BCE5DC] text-[#00AA45] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                    <span>Built-in Workspace</span>
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">None</td>
                  <td className="p-4 text-[var(--text-muted)]">None</td>
                  <td className="p-4 text-[var(--text-muted)]">None</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[var(--text-primary)] font-sans">
                    Weekly Product Launch Leaderboard
                  </td>
                  <td className="p-4 bg-[var(--simplify-teal-soft)] border-x border-[#BCE5DC] text-[#00AA45] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                    <span>Weekly ShipPad</span>
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">None</td>
                  <td className="p-4 text-[var(--text-muted)]">None</td>
                  <td className="p-4 text-[#00AA45]">Launch only (no build loop)</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[var(--text-primary)] font-sans">
                    Un-Buyable Build Passport Reputation
                  </td>
                  <td className="p-4 bg-[var(--simplify-teal-soft)] border-x border-[#BCE5DC] text-[#00AA45] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                    <span>Verified Teammate Ledger</span>
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Self-reported text</td>
                  <td className="p-4 text-[var(--text-muted)]">Bio handles</td>
                  <td className="p-4 text-[var(--text-muted)]">Upvotes</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[var(--text-primary)] font-sans">
                    Complete Loop (Find → Build → Ship)
                  </td>
                  <td className="p-4 bg-[var(--simplify-teal-soft)] border-x border-[#BCE5DC] text-[#00AA45] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00AA45]" />
                    <span>100% Unified</span>
                  </td>
                  <td className="p-4 text-[var(--text-muted)]">Fragmented</td>
                  <td className="p-4 text-[var(--text-muted)]">Fragmented</td>
                  <td className="p-4 text-[var(--text-muted)]">Fragmented</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="py-20 bg-[var(--bg-canvas)] border-b border-[var(--border-crisp)] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1A5052] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl">S</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-['Plus_Jakarta_Sans'] font-extrabold text-[var(--text-primary)] tracking-tight">
            Ready to find your co-builder and ship?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Claim your free builder handle, take the 60-second guided onboarding, and explore 90%+ match builds today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto bg-[#1A5052] hover:bg-[#12393B] text-white px-8 py-3.5 rounded-xl text-sm font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('startups')}
              className="w-full sm:w-auto bg-white hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-crisp)] px-6 py-3.5 rounded-xl text-sm font-mono font-semibold transition-all shadow-2xs cursor-pointer"
            >
              Explore Active Startups
            </button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-white py-12 border-t border-[var(--border-crisp)] text-xs font-mono text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[var(--text-primary)]">ShipWith</span>
            <span>·</span>
            <span>Find your people. Build what’s next.</span>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => setCurrentView('startups')} className="hover:text-[var(--text-primary)]">Startups</button>
            <button onClick={() => setCurrentView('people')} className="hover:text-[var(--text-primary)]">Builders</button>
            <button onClick={() => setCurrentView('feed')} className="hover:text-[var(--text-primary)]">ShipPad</button>
            <a href="https://github.com/Rana-Kushagr/ShipWith" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">GitHub</a>
          </div>

          <div className="text-[var(--text-muted)] text-[11px]">
            © {new Date().getFullYear()} ShipWith. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
