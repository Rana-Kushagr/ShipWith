import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunitiesView: React.FC = () => {
  const { setCurrentView, addToast } = useApp();

  const communities = [
    {
      id: 'fullstack-saas',
      name: 'Full-Stack SaaS Builders',
      members: '1,420 members',
      sprints: '38 active trial sprints',
      desc: 'Next.js 15, React 19, Supabase, Tailwind, and serverless edge architectures.',
      tags: ['Next.js', 'React', 'PostgreSQL', 'Tailwind']
    },
    {
      id: 'ai-agents',
      name: 'Autonomous AI & Agents',
      members: '980 members',
      sprints: '24 active trial sprints',
      desc: 'LangGraph, FastAPI, pgvector, and local LLM toolchain creators.',
      tags: ['Python', 'LangGraph', 'FastAPI', 'AI']
    },
    {
      id: 'design-engineers',
      name: 'Design Engineers & UI Systems',
      members: '760 members',
      sprints: '19 active trial sprints',
      desc: 'Bridging Figma, token architecture, and micro-interactions in code.',
      tags: ['Figma', 'Design Systems', 'Micro-interactions']
    },
    {
      id: 'solopreneurs',
      name: 'Indie Hackers & Weekend Shippers',
      members: '1,890 members',
      sprints: '52 active trial sprints',
      desc: 'Building small, profitable software tools in 5-day sprints.',
      tags: ['Indie', 'Bootstrapped', 'SaaS']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1A5052]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A5052]">
              PEER HUBS & CIRCLES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[var(--text-primary)] mt-1">
            Builder Communities
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Join domain-specific circles to discover teammates with identical toolchain standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {communities.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-[var(--border-crisp)] p-6 shadow-[var(--shadow-card)] space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg font-['Plus_Jakarta_Sans'] text-[var(--text-primary)]">
                    {c.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs font-mono text-[var(--text-muted)]">
                    <span className="text-[#1A5052] font-semibold">{c.members}</span>
                    <span>•</span>
                    <span className="text-[#00AA45] font-semibold">{c.sprints}</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00AA45]" />
              </div>

              <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                {c.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {c.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-[var(--bg-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded border border-[var(--border-crisp)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-crisp)] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Daily async check-ins
              </span>
              <button
                onClick={() => {
                  addToast(`Joined ${c.name}!`, 'success');
                  setCurrentView('feed');
                }}
                className="bg-[#1A5052] hover:bg-[#12393B] text-white px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <span>Join Circle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
