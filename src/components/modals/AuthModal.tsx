import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setCurrentView, addToast, claimHandleText } = useApp();
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'warning');
      return;
    }
    
    setIsAuthModalOpen(false);
    if (isSignUp) {
      addToast(`Account created! Let's set up your builder profile.`, 'success');
      setCurrentView('onboarding');
    } else {
      addToast('Welcome back to ShipWith!', 'success');
      setCurrentView('home');
    }
  };

  const handleGoogleAuth = () => {
    setIsAuthModalOpen(false);
    if (isSignUp) {
      addToast('Signed up with Google! Personalizing your feed...', 'success');
      setCurrentView('onboarding');
    } else {
      addToast('Welcome back with Google!', 'success');
      setCurrentView('home');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#0C0C0E] rounded-2xl border border-[var(--border-crisp)] shadow-[var(--shadow-float)] max-w-md w-full p-6 sm:p-8 relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-white text-[#050506] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg">S</span>
          </div>
          <h3 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            {isSignUp ? 'Join ShipWith' : 'Welcome back'}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isSignUp 
              ? 'Find your people, start a trial sprint, and ship together.' 
              : 'Sign in to access your build rooms and notifications.'}
          </p>

          {/* Claimed handle pill banner if present */}
          {isSignUp && claimHandleText && (
            <div className="mt-3 py-1.5 px-3 bg-[#141418] border border-[var(--border-crisp)] rounded-lg text-xs font-mono text-[#00D659] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Reserved handle: <strong>@{claimHandleText}</strong></span>
            </div>
          )}
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="mt-6 w-full flex items-center justify-center gap-3 bg-[#141418] hover:bg-[#1A1A22] border border-[var(--border-crisp)] hover:border-white/30 text-white py-2.5 px-4 rounded-xl text-xs font-mono font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-crisp)]" />
          </div>
          <div className="relative flex justify-center text-[10px] font-mono text-[var(--text-muted)] uppercase">
            <span className="bg-[#0C0C0E] px-3">or continue with email</span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-mono font-medium text-[var(--text-secondary)] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-medium text-[var(--text-secondary)] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#141418] border border-[var(--border-crisp)] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[var(--text-muted)] focus:outline-hidden focus:border-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-white hover:bg-zinc-200 text-[#050506] py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <span>{isSignUp ? 'Create Builder Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-5 text-center text-xs font-mono text-[var(--text-secondary)]">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-white font-bold hover:underline cursor-pointer"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-white font-bold hover:underline cursor-pointer"
              >
                Sign up free
              </button>
            </>
          )}
        </div>

        {/* Small terms */}
        <p className="mt-4 text-[10px] font-mono text-center text-[var(--text-muted)]">
          By continuing, you agree to ShipWith's Code of Conduct and Zero-Equity Trial Collaboration terms.
        </p>
      </div>
    </div>
  );
};
