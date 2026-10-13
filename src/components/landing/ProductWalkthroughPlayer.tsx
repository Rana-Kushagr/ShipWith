import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, GitFork, Trophy } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProductWalkthroughPlayer: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const chapters = [
    {
      title: '1. Match & Discover',
      subtitle: 'Filter by stack, stage & hours',
      duration: 6000,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
            <span>DISCOVERY RADAR</span>
            <span className="text-[var(--color-success)] font-semibold">● 3 OPEN ROLES FOUND</span>
          </div>
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-[var(--color-text-primary)]">Campus AI Tutor</div>
                <div className="text-xs text-[var(--color-text-secondary)]">AI-native flashcards and STEM problem solver for students.</div>
              </div>
              <Badge variant="success" size="sm">Building MVP</Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] rounded">React</span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] rounded">Next.js</span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] rounded">FastAPI</span>
            </div>
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Seeking: <strong className="text-[var(--color-text-primary)]">Frontend Lead</strong> (6h/wk)</span>
              <span className="text-[var(--color-brand-accent)] font-mono font-semibold">94% Compatibility</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. 1-Click Pitch & Proof',
      subtitle: 'No resumes, just shipped code',
      duration: 6000,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
            <span>PITCH DRAWER</span>
            <span className="text-[var(--color-brand-accent)] font-semibold">DIRECT APPLICATION</span>
          </div>
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-2.5">
            <div className="text-xs text-[var(--color-text-muted)]">Applying for: <strong className="text-[var(--color-text-primary)]">Frontend Engineer</strong></div>
            <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)]">
              "Hey Arjun, loved your demo. I've built 2 Next.js apps with Supabase. Here is my recent vector search tool repo."
            </div>
            <div className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-strong)] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <GitFork className="w-3.5 h-3.5 text-[var(--color-brand-accent)]" />
                <span>github.com/lakshit/vector-ui</span>
              </div>
              <span className="text-[var(--color-success)] text-[11px]">840 ★ Verified</span>
            </div>
            <button className="w-full py-2 bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] rounded-[var(--radius-md)] text-xs font-semibold cursor-pointer">
              Send Pitch with Proof →
            </button>
          </div>
        </div>
      )
    },
    {
      title: '3. The 5-Day Trial Build',
      subtitle: 'Test working compatibility',
      duration: 6000,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
            <span>TRIAL CONTAINER</span>
            <span className="text-[var(--color-warning)] font-semibold">DAY 4 OF 5</span>
          </div>
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">Trial Objective: Flashcard MVP</span>
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">Oct 14 – Oct 19</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                <span className="line-through">Setup repository & Tailwind tokens</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                <span className="line-through">Integrate streaming doubt solver</span>
              </div>
              <div className="flex items-center gap-2 font-medium text-[var(--color-text-primary)]">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--color-brand-accent)]" />
                <span>Verify student latency on Vercel preview</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[var(--color-border)] flex gap-2">
              <button className="flex-1 py-1.5 text-[11px] font-semibold bg-[var(--color-success)] text-white rounded-[var(--radius-md)] cursor-pointer">
                Continue Together ✓
              </button>
              <button className="py-1.5 px-3 text-[11px] bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] rounded-[var(--radius-md)] border border-[var(--color-border)] cursor-pointer">
                End Trial
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '4. Shipped & Build Passport',
      subtitle: 'Turn execution into permanent trust',
      duration: 6000,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
            <span>PERMANENT REPUTATION</span>
            <span className="text-[var(--color-success)] font-semibold">VERIFIED RECORD</span>
          </div>
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[var(--color-warning)]" />
                <span className="text-xs font-bold text-[var(--color-text-primary)]">Build Passport Credentials</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--color-brand-accent)]">Top 10% Builder</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                <div className="text-base font-bold text-[var(--color-text-primary)] font-mono">3</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Ships</div>
              </div>
              <div className="p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                <div className="text-base font-bold text-[var(--color-text-primary)] font-mono">4</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Verified Collabs</div>
              </div>
              <div className="p-2 rounded bg-[var(--color-surface-subtle)] border border-[var(--color-border)]">
                <div className="text-base font-bold text-[var(--color-text-primary)] font-mono">100%</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">Would Build Again</div>
              </div>
            </div>
            <div className="text-[11px] text-[var(--color-text-secondary)] bg-[var(--color-surface-subtle)] p-2 rounded">
              Verified Contributor: <strong className="text-[var(--color-text-primary)]">Frontend Lead</strong> on <em>Campus AI Tutor</em> (1.2k users).
            </div>
          </div>
        </div>
      )
    }
  ];

  // Automatic playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setActiveChapter(curr => (curr + 1) % chapters.length);
            return 0;
          }
          return prev + 2.5; // ~4s total per chapter
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, chapters.length]);

  const selectChapter = (index: number) => {
    setActiveChapter(index);
    setProgress(0);
  };

  return (
    <div id="walkthrough-section" className="w-full max-w-4xl mx-auto my-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-overlay)] overflow-hidden">
      {/* Player Header bar */}
      <div className="px-5 py-3.5 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-xs font-mono font-medium text-[var(--color-text-secondary)]">
            ShipWith Interactive Product Tour
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
            className="p-1.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              setActiveChapter(0);
              setProgress(0);
            }}
            aria-label="Restart walkthrough"
            className="p-1.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Simulation Frame */}
      <div className="p-6 md:p-8 bg-[var(--color-canvas)] min-h-[300px] flex items-center justify-center">
        <div className="w-full max-w-xl transition-all duration-300">
          {chapters[activeChapter].renderPreview()}
        </div>
      </div>

      {/* Chapter Pills Scrubber */}
      <div className="p-4 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {chapters.map((chap, idx) => {
            const isCurrent = activeChapter === idx;
            return (
              <button
                key={idx}
                onClick={() => selectChapter(idx)}
                className={`relative text-left p-2.5 rounded-[var(--radius-md)] border transition-all cursor-pointer overflow-hidden ${
                  isCurrent 
                    ? 'border-[var(--color-brand-primary)] bg-[var(--color-surface-subtle)]' 
                    : 'border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {/* Progress bar inside active pill */}
                {isCurrent && isPlaying && (
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-brand-accent)] transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
                <div className={`text-xs font-semibold ${isCurrent ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                  {chap.title}
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)] truncate mt-0.5">
                  {chap.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
