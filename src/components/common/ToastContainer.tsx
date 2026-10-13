import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      aria-live="polite" 
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[var(--color-warning)] shrink-0" />,
          info: <Info className="w-4 h-4 text-[var(--color-brand-accent)] shrink-0" />
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-overlay)] text-xs text-[var(--color-text-primary)] animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type || 'info']}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
