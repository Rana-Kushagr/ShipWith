import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const ShipWithLogoMark: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M11 9.5C11 7.01472 13.0147 5 15.5 5H20.5C22.433 5 24 6.567 24 8.5C24 10.433 22.433 12 20.5 12H14.5C12.0147 12 10 14.0147 10 16.5C10 18.9853 12.0147 21 14.5 21H20C22.2091 21 24 22.7909 24 25C24 27.2091 22.2091 29 20 29H13.5C11.0147 29 9 26.9853 9 24.5" 
      stroke="currentColor" 
      strokeWidth="3.4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const LandingNavbar: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen } = useApp();
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border-crisp)] transition-colors">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1A5052] text-white flex items-center justify-center shadow-xs group-hover:bg-[#12393B] transition-colors">
            <ShipWithLogoMark className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
              ShipWith
            </span>
            <span className="text-[10px] font-mono text-[#0D9488] -mt-1 font-semibold">
              match · build · ship
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] text-[var(--text-secondary)] font-medium font-sans">
          <div className="relative">
            <button 
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <span>Product</span>
              <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
            {productDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-white border border-[var(--border-crisp)] rounded-xl shadow-[var(--shadow-float)] p-2 z-50 text-xs font-mono"
                onMouseLeave={() => setProductDropdownOpen(false)}
              >
                <button 
                  onClick={() => {
                    const el = document.getElementById('sticky-showcase-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  Interactive Showcase
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('startups');
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  Startups Directory
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('people');
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  Builder Passports
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('feed');
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium cursor-pointer"
                >
                  Weekly ShipPad
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById('sticky-showcase-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            How it works
          </button>
          
          <button 
            onClick={() => setCurrentView('startups')}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Explore Startups
          </button>
          
          <button 
            onClick={() => setCurrentView('people')}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Find Builders
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('comparison-matrix-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Why ShipWith
          </button>
        </nav>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-3">
          {/* Log in Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-[14px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] px-3.5 py-2 rounded-lg border border-[var(--border-crisp)] bg-white transition-all cursor-pointer shadow-2xs font-mono"
          >
            Log in
          </button>

          {/* Try ShipWith free Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-[14px] font-semibold text-white bg-[#1A5052] hover:bg-[#12393B] px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-sm font-mono"
          >
            <span>Try ShipWith free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
