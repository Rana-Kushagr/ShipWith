import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Sun, Moon, ArrowRight } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const { setCurrentView, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] flex items-center justify-center font-display font-extrabold text-sm tracking-tight shadow-sm">
            SW
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-[var(--color-text-primary)]">
            ShipWith
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--color-text-secondary)] font-medium">
          <button 
            onClick={() => {
              const el = document.getElementById('walkthrough-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button 
            onClick={() => setCurrentView('startups')}
            className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            Explore Startups
          </button>
          <button 
            onClick={() => setCurrentView('people')}
            className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            Find Builders
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('plans-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            Plans
          </button>
        </nav>

        {/* Right CTA cluster */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] border border-transparent hover:border-[var(--color-border)] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--color-warning)]" /> : <Moon className="w-4 h-4 text-[var(--color-brand-accent)]" />}
          </button>

          {/* Log in */}
          <button
            onClick={() => setCurrentView('home')}
            className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-2 py-1.5 transition-colors cursor-pointer"
          >
            Log in
          </button>

          {/* Primary CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentView('onboarding')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Try ShipWith free
          </Button>
        </div>
      </div>
    </header>
  );
};
