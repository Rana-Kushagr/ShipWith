import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { BorderGlow } from '../common/BorderGlow';

export const CookieBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('shipwith_cookie_dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('shipwith_cookie_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-[1200px] mx-auto pointer-events-none">
      <BorderGlow
        borderRadius={16}
        edgeSensitivity={30}
        glowRadius={20}
        glowIntensity={0.65}
        glowColor="0 0 100"
        backgroundColor="#121215"
        colors={['#ffffff', '#cbd5e1', '#38bdf8']}
        className="pointer-events-auto border border-zinc-800 shadow-2xl"
      >
        <div className="py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left message */}
          <div className="flex items-center gap-2.5 text-xs text-zinc-300">
            <Shield className="w-4 h-4 text-white shrink-0" />
            <span>
              We use essential cookies to keep ShipWith working and optional cookies to improve your experience.
            </span>
          </div>

          {/* Right action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDismiss}
              className="text-xs font-medium text-zinc-400 hover:text-white underline underline-offset-2 px-2 py-1 transition-colors cursor-pointer"
            >
              Cookie settings
            </button>
            <button
              onClick={handleDismiss}
              className="text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Essential only
            </button>
            <button
              onClick={handleDismiss}
              className="text-xs font-medium text-black bg-white hover:bg-zinc-200 px-4 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Accept all
            </button>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
};
