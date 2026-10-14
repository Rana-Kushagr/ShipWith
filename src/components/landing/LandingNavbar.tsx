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
  const { setCurrentView } = useApp();
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="text-white group-hover:text-zinc-200 transition-colors">
            <ShipWithLogoMark className="w-7 h-7" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-zinc-200 transition-colors">
            ShipWith
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-zinc-300 font-medium">
          <div className="relative">
            <button 
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Product</span>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>
            {productDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-52 bg-[#121215] border border-zinc-800 rounded-xl shadow-xl p-2 z-50 text-xs"
                onMouseLeave={() => setProductDropdownOpen(false)}
              >
                <button 
                  onClick={() => {
                    const el = document.getElementById('motion-showcase-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800/60 text-zinc-200 font-medium cursor-pointer"
                >
                  Interactive Walkthrough
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('startups');
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800/60 text-zinc-200 font-medium cursor-pointer"
                >
                  Startups Radar
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('people');
                    setProductDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800/60 text-zinc-200 font-medium cursor-pointer"
                >
                  Builder Passport
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById('motion-showcase-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            How it works
          </button>
          
          <button 
            onClick={() => setCurrentView('startups')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Explore
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('plans-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </nav>

        {/* Right CTA Buttons (Colour change toggle removed) */}
        <div className="flex items-center gap-3">
          {/* Log in Button */}
          <button
            onClick={() => setCurrentView('home')}
            className="text-[14px] font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/60 px-4 py-2 rounded-lg border border-zinc-800 bg-[#121215]/80 transition-all cursor-pointer shadow-xs"
          >
            Log in
          </button>

          {/* Try ShipWith free Button */}
          <button
            onClick={() => setCurrentView('onboarding')}
            className="text-[14px] font-semibold text-black bg-white hover:bg-zinc-200 px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Try ShipWith free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
