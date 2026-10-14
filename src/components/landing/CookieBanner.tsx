import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-6 shadow-xl transition-all">
      <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left message */}
        <div className="flex items-center gap-2.5 text-xs text-slate-700">
          <Shield className="w-4 h-4 text-slate-700 shrink-0" />
          <span>
            We use essential cookies to keep ShipWith working and optional cookies to improve your experience.
          </span>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDismiss}
            className="text-xs font-medium text-slate-700 hover:text-black underline underline-offset-2 px-2 py-1 transition-colors cursor-pointer"
          >
            Cookie settings
          </button>
          <button
            onClick={handleDismiss}
            className="text-xs font-medium text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Essential only
          </button>
          <button
            onClick={handleDismiss}
            className="text-xs font-medium text-white bg-black hover:bg-neutral-800 px-4 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};
