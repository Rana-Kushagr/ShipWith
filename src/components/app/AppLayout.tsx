import React, { useState } from 'react';
import { useApp, type AppView } from '../../context/AppContext';
import { 
  Home, 
  Rocket, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  User, 
  Bookmark, 
  Search, 
  LogOut,
  Trophy,
  Megaphone,
  CreditCard,
  Menu,
  X,
  PlusCircle,
  Plus
} from 'lucide-react';
import { ShipWithLogoMark } from '../landing/LandingNavbar';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    setIsPostBuildOpen, 
    setIsCommandPaletteOpen,
    bookmarks
  } = useApp();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const primaryNavItems: { id: AppView; label: string; icon: React.ComponentType<any>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'startups', label: 'Startups', icon: Rocket },
    { id: 'people', label: 'Builders', icon: Users },
    { id: 'feed', label: 'Feed & ShipPad', icon: Trophy },
    { id: 'workspace', label: 'Workspace', icon: FolderKanban },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const secondaryNavItems: { id: AppView; label: string; icon: React.ComponentType<any>; badge?: number }[] = [
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, badge: bookmarks.length },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'advertise', label: 'Promote Build', icon: Megaphone },
    { id: 'premium', label: 'Pro Membership', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] flex text-[var(--text-primary)]">
      {/* 1. LEFT SIDEBAR (Desktop hidden md:flex) */}
      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-[var(--border-crisp)] bg-white p-4 shrink-0 fixed top-0 bottom-0 z-30 font-mono">
        <div className="space-y-5">
          {/* Brand Wordmark */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2.5 px-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1A5052] text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-[#12393B] transition-colors">
              <ShipWithLogoMark className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-base tracking-tight text-[var(--text-primary)]">
                ShipWith
              </span>
              <span className="text-[9px] font-mono text-[#0D9488] -mt-1 font-semibold">
                peer collaboration
              </span>
            </div>
          </div>

          {/* Ctrl+K Global Search Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full bg-[var(--bg-canvas)] hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-crisp)] px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search / Jump...</span>
            </span>
            <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] border border-[var(--border-crisp)]">⌘K</kbd>
          </button>

          {/* Primary Nav Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 block mb-1">
              Menu
            </span>
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--simplify-teal-soft)] text-[#1A5052] font-bold border border-[#BCE5DC]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0D9488]' : 'text-[var(--text-muted)]'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-[#0D9488] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Secondary Nav Links */}
          <nav className="space-y-1 pt-3 border-t border-[var(--border-crisp)]">
            <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 block mb-1">
              Workspace & Network
            </span>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--simplify-teal-soft)] text-[#1A5052] font-bold border border-[#BCE5DC]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-[10px] px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* + Post a Build Button */}
          <button
            onClick={() => setIsPostBuildOpen(true)}
            className="w-full bg-[#D94E1F] hover:bg-[#C2410C] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Post a Build</span>
          </button>
        </div>

        {/* User Profile Footer */}
        <div className="pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between">
          <div 
            onClick={() => setCurrentView('profile')}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
          >
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[var(--border-crisp)]"
            />
            <div className="truncate">
              <span className="font-bold text-xs text-[var(--text-primary)] truncate block">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] truncate block">
                {currentUser.handle}
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('landing')}
            title="Sign out to landing"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. TOP MOBILE HEADER (< 768px) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[var(--border-crisp)] px-4 flex items-center justify-between z-30">
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#1A5052] text-white flex items-center justify-center font-bold text-xs">
            <ShipWithLogoMark className="w-3.5 h-3.5" />
          </div>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[var(--text-primary)]">
            ShipWith
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-4 space-y-4 overflow-y-auto">
          <nav className="space-y-1 font-mono text-sm">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileDrawerOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
              >
                <item.icon className="w-5 h-5 text-[#1A5052]" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--border-crisp)]">
            <button
              onClick={() => {
                setIsPostBuildOpen(true);
                setMobileDrawerOpen(false);
              }}
              className="w-full bg-[#D94E1F] text-white py-3 rounded-xl font-mono font-bold"
            >
              + Post a Build
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 md:pl-64 min-h-screen pt-16 md:pt-0 pb-20 md:pb-8">
        {children}
      </main>

      {/* 4. FIXED 5-TAB MOBILE BOTTOM NAVIGATION BAR (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[var(--border-crisp)] px-2 flex items-center justify-around z-30">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'home' ? 'text-[#1A5052]' : 'text-[var(--text-muted)]'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-mono">Home</span>
        </button>

        <button
          onClick={() => setCurrentView('startups')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'startups' ? 'text-[#1A5052]' : 'text-[var(--text-muted)]'}`}
        >
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] font-mono">Startups</span>
        </button>

        {/* Centered + Build Accent Button */}
        <button
          onClick={() => setIsPostBuildOpen(true)}
          className="w-11 h-11 -mt-4 rounded-full bg-[#D94E1F] text-white flex items-center justify-center shadow-md"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setCurrentView('workspace')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'workspace' ? 'text-[#1A5052]' : 'text-[var(--text-muted)]'}`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[10px] font-mono">Builds</span>
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'profile' ? 'text-[#1A5052]' : 'text-[var(--text-muted)]'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-mono">Profile</span>
        </button>
      </div>
    </div>
  );
};
