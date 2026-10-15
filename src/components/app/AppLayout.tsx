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
  Plus,
  Bell
} from 'lucide-react';
import { ShipWithLogoMark } from '../landing/LandingNavbar';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    setIsPostBuildOpen, 
    setIsCommandPaletteOpen,
    bookmarks,
    notifications
  } = useApp();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const primaryNavItems: { id: AppView; label: string; icon: React.ComponentType<any>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'startups', label: 'Startups', icon: Rocket },
    { id: 'people', label: 'Builders', icon: Users },
    { id: 'feed', label: 'Feed & ShipPad', icon: Trophy },
    { id: 'workspace', label: 'Workspace', icon: FolderKanban },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const secondaryNavItems: { id: AppView; label: string; icon: React.ComponentType<any>; badge?: number }[] = [
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, badge: bookmarks.length },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'advertise', label: 'Promote Build', icon: Megaphone },
    { id: 'premium', label: 'Pro Membership', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-[#050506] flex text-[var(--text-primary)]">
      {/* 1. LEFT SIDEBAR (Desktop hidden md:flex) */}
      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-[var(--border-crisp)] bg-[#0C0C0E] p-4 shrink-0 fixed top-0 bottom-0 z-30 font-mono">
        <div className="space-y-5">
          {/* Brand Wordmark */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2.5 px-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-white text-[#050506] flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-zinc-200 transition-colors">
              <ShipWithLogoMark className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-base tracking-tight text-white">
                ShipWith
              </span>
              <span className="text-[9px] font-mono text-[#2DD4BF] -mt-1 font-semibold">
                peer collaboration
              </span>
            </div>
          </div>

          {/* Ctrl+K Global Search Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full bg-[#141418] hover:bg-[#1A1A22] text-[var(--text-muted)] hover:text-white border border-[var(--border-crisp)] px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search / Jump...</span>
            </span>
            <kbd className="bg-[#0C0C0E] text-[var(--text-secondary)] px-1.5 py-0.5 rounded text-[10px] border border-[var(--border-crisp)]">⌘K</kbd>
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
                      ? 'bg-white text-[#050506] font-bold shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#050506]' : 'text-[var(--text-muted)]'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#050506] text-white' : 'bg-white text-[#050506]'
                    }`}>
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
                      ? 'bg-[#141418] text-white font-bold border border-white/20'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-[#141418] text-zinc-300 border border-[var(--border-crisp)] text-[10px] px-1.5 py-0.2 rounded">
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
            className="w-full bg-white hover:bg-zinc-200 text-[#050506] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Post a Build</span>
          </button>
        </div>

        {/* User Profile Footer */}
        <div className="pt-3 border-t border-[var(--border-crisp)] flex items-center justify-between">
          <div 
            onClick={() => setCurrentView('profile')}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0 group"
          >
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[var(--border-crisp)] group-hover:border-white transition-colors"
            />
            <div className="truncate">
              <span className="font-bold text-xs text-white truncate block">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] truncate block">
                {currentUser.handle || `@${currentUser.username}`}
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('landing')}
            title="Sign out to landing"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[#141418] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. TOP MOBILE HEADER (< 768px) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0C0C0E] border-b border-[var(--border-crisp)] px-4 flex items-center justify-between z-30">
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-white text-[#050506] flex items-center justify-center font-bold text-xs">
            <ShipWithLogoMark className="w-3.5 h-3.5" />
          </div>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-white">
            ShipWith
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('notifications')}
            className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D659]" />
            )}
          </button>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[#141418]"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#0C0C0E] z-40 p-4 space-y-4 overflow-y-auto">
          <nav className="space-y-1 font-mono text-sm">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl ${
                  currentView === item.id 
                    ? 'bg-white text-[#050506] font-bold' 
                    : 'text-[var(--text-secondary)] hover:bg-[#141418] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-white text-[#050506] text-xs px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--border-crisp)]">
            <button
              onClick={() => {
                setIsPostBuildOpen(true);
                setMobileDrawerOpen(false);
              }}
              className="w-full bg-white text-[#050506] py-3 rounded-xl font-mono font-bold"
            >
              + Post a Build
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 md:pl-64 min-h-screen pt-16 md:pt-0 pb-20 md:pb-8 bg-[#050506]">
        {children}
      </main>

      {/* 4. FIXED 5-TAB MOBILE BOTTOM NAVIGATION BAR (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0C0C0E] border-t border-[var(--border-crisp)] px-2 flex items-center justify-around z-30">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'home' ? 'text-white font-bold' : 'text-[var(--text-muted)]'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-mono">Home</span>
        </button>

        <button
          onClick={() => setCurrentView('startups')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'startups' ? 'text-white font-bold' : 'text-[var(--text-muted)]'}`}
        >
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] font-mono">Startups</span>
        </button>

        {/* Centered + Build Accent Button */}
        <button
          onClick={() => setIsPostBuildOpen(true)}
          className="w-11 h-11 -mt-4 rounded-full bg-white text-[#050506] flex items-center justify-center shadow-lg cursor-pointer"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          onClick={() => setCurrentView('workspace')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'workspace' ? 'text-white font-bold' : 'text-[var(--text-muted)]'}`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[10px] font-mono">Builds</span>
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center gap-0.5 p-1 ${currentView === 'profile' ? 'text-white font-bold' : 'text-[var(--text-muted)]'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-mono">Profile</span>
        </button>
      </div>
    </div>
  );
};
