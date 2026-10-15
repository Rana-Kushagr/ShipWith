import React, { useState } from 'react';
import { Globe, Award, CheckCircle2 } from 'lucide-react';
import { generateHeatmap, type HeatmapDay } from '../data/seedData';

interface ProofHeatmapProps {
  days?: HeatmapDay[];
  totalShips?: number;
  builderName?: string;
  showIntegrations?: boolean;
}

export const ProofHeatmap: React.FC<ProofHeatmapProps> = ({
  days = generateHeatmap(1.5),
  totalShips = 4,
  builderName = 'Kushagr Rana',
  showIntegrations = true
}) => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  // Split the 364 days into 52 weeks of 7 days
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Calculate metrics
  const activeDaysCount = days.filter((d: HeatmapDay) => d.count > 0).length;
  
  // Calculate current streak
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak++;
    else break;
  }

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#153428] border-[#2dd4bf]/30 hover:scale-125';
      case 2:
        return 'bg-[#0e5c3e] border-[#10b981]/60 hover:scale-125';
      case 3:
        return 'bg-[#00AA45] border-[#34d399] hover:scale-125';
      case 4:
        return 'bg-white border-white shadow-xs hover:scale-125';
      default:
        return 'bg-[#141418] border-[rgba(255,255,255,0.06)] hover:border-white/40';
    }
  };

  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  return (
    <div className="bg-[#0C0C0E] rounded-xl border border-[var(--border-crisp)] p-5 shadow-[var(--shadow-card)] transition-all text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-crisp)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D659] animate-pulse" />
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm tracking-tight text-white">
              52-Week Proof of Work & Ship Activity
            </h3>
            <span className="text-xs bg-[#141418] text-[#00D659] font-mono px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-[var(--border-crisp)]">
              <CheckCircle2 className="w-3 h-3" />
              Verified On-Chain & Git
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Real code pushes, trial sprint tasks completed, and shipped builds for {builderName}.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-[var(--text-muted)]">Total Ships: </span>
            <span className="font-bold text-white">{totalShips} live</span>
          </div>
          <div className="hidden sm:block text-[var(--border-crisp)]">|</div>
          <div>
            <span className="text-[var(--text-muted)]">Active Days: </span>
            <span className="font-bold text-white">{activeDaysCount} days</span>
          </div>
          <div className="hidden sm:block text-[var(--border-crisp)]">|</div>
          <div>
            <span className="text-[var(--text-muted)]">Current Streak: </span>
            <span className="font-bold text-[#00D659]">{currentStreak} days 🔥</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="pt-4 overflow-x-auto pb-2 scrollbar-thin">
        <div className="min-w-[680px]">
          {/* Months header */}
          <div className="flex text-[10px] font-mono text-[var(--text-muted)] mb-1.5 pl-6 justify-between pr-2">
            {months.map((m, idx) => (
              <span key={idx}>{m}</span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Weekday indicators */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-[var(--text-muted)] pr-1.5 py-0.5 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3px] flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[11px] h-[11px] rounded-[2.5px] border transition-transform duration-100 cursor-pointer ${getCellColor(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Info & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[var(--border-crisp)] text-xs font-mono">
        <div className="text-[var(--text-secondary)] min-h-[18px]">
          {hoveredDay ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-white">
                {hoveredDay.count === 0 ? 'No ships' : `${hoveredDay.count} ships & commits`}
              </span>{' '}
              on {new Date(hoveredDay.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          ) : (
            <span className="text-[var(--text-muted)]">Hover over any square to inspect daily ship logs</span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] self-end sm:self-auto">
          <span>Less</span>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#141418] border border-[rgba(255,255,255,0.06)]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#153428] border border-[#2dd4bf]/30" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e5c3e] border border-[#10b981]/60" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#00AA45] border border-[#34d399]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-white border-white" />
          <span>More</span>
        </div>
      </div>

      {/* Verified Integrations Row */}
      {showIntegrations && (
        <div className="mt-4 pt-3 border-t border-[var(--border-crisp)] bg-[#141418] -mx-5 -mb-5 px-5 py-3 rounded-b-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
            <Award className="w-3.5 h-3.5 text-white" />
            <span>Verified Toolchain Proof:</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 bg-[#0C0C0E] px-2.5 py-1 rounded-md border border-[var(--border-crisp)] text-white shadow-2xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub ✔</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0C0C0E] px-2.5 py-1 rounded-md border border-[var(--border-crisp)] text-white shadow-2xs">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.5 8.5C5.5 6.567 7.067 5 9 5h3v7H9c-1.933 0-3.5-1.567-3.5-3.5zm0 7C5.5 13.567 7.067 12 9 12h3v7H9c-1.933 0-3.5-1.567-3.5-3.5zM12 5h3c1.933 0 3.5 1.567 3.5 3.5S16.933 12 15 12h-3V5zm0 7h3c1.933 0 3.5 1.567 3.5 3.5S16.933 19 15 19h-3v-7zm-3 7c-1.933 0-3.5-1.567-3.5-3.5S7.067 12 9 12v7z"/>
              </svg>
              <span>Figma ✔</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0C0C0E] px-2.5 py-1 rounded-md border border-[var(--border-crisp)] text-white shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#00D659]" />
              <span>DNS Live ✔</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
