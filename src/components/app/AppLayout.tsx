import { useApp, type AppView } from '../../context/AppContext';
import { 
  Home, 
  Rocket, 
  Users, 
  Rss, 
  FolderKanban, 
  MessageSquare, 
  User, 
  Bookmark, 
  Bell, 
  Sparkles, 
  Plus, 
  Search, 
  Sun, 
  Moon, 
  LogOut 
} from 'lucide-react';
import { Button } from '../common/Button';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    theme, 
    toggleTheme, 
    setIsPostBuildOpen, 
    setIsCommandPaletteOpen,
    notifications,
    bookmarks
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const primaryNavItems: { id: AppView; label: string; icon: React.ComponentType<any>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'startups', label: 'Startups', icon: Rocket },
    { id: 'people', label: 'People', icon: Users },
    { id: 'feed', label: 'Feed', icon: Rss },
    { id: 'workspace', label: 'Workspace', icon: FolderKanban },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] flex">
      {/* 1. Left Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4 shrink-0 fixed top-0 bottom-0 z-30">
        <div className="space-y-6">
          {/* Brand Wordmark */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2.5 px-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] flex items-center justify-center font-display font-extrabold text-sm tracking-tight shadow-sm">
              SW
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-[var(--color-text-primary)]">
              ShipWith
            </span>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-1">
            {primaryNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)] font-bold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-brand-primary)] text-[var(--color-brand-on-primary)] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* More Group */}
          <div className="pt-4 border-t border-[var(--color-border)] space-y-1">
            <div className="text-[11px] font-semibold text-[var(--color-text-muted)] px-3 mb-1 uppercase tracking-wider">
              More
            </div>
            <button
              onClick={() => setCurrentView('startups')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span>Bookmarks</span>
              </div>
              {bookmarks.length > 0 && (
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  {bookmarks.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('messages')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span>Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-danger-subtle)] text-[var(--color-danger)] rounded-full font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('plans-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-warning)]" />
              <span>Premium</span>
            </button>
          </div>
        </div>

        {/* Bottom Post a Build CTA */}
        <div className="pt-4 border-t border-[var(--color-border)] space-y-3">
          <Button
            variant="primary"
            size="md"
            className="w-full shadow-sm"
            onClick={() => setIsPostBuildOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Post a Build
          </Button>

          {/* User mini profile row */}
          <div className="flex items-center justify-between pt-2">
            <button 
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-full object-cover border border-[var(--color-border)]"
              />
              <div>
                <div className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:underline">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)] font-mono">
                  @{currentUser.username}
                </div>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('landing')}
              title="Sign out to landing"
              className="p-1.5 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Work Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-14 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Global Search Bar (Ctrl+K) */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex-1 max-w-md flex items-center justify-between px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search startups, builders, or keywords...</span>
            </div>
            <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
              Ctrl K
            </kbd>
          </button>

          {/* Right quick actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--color-warning)]" /> : <Moon className="w-4 h-4 text-[var(--color-brand-accent)]" />}
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setCurrentView('messages')}
              aria-label="View notifications"
              className="relative p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-danger)]" />
              )}
            </button>

            {/* User Avatar dropdown link */}
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-2 pl-2 border-l border-[var(--color-border)] cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-[var(--color-border)]"
              />
              <span className="hidden sm:inline-block text-xs font-semibold text-[var(--color-text-primary)]">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 pb-16 lg:pb-8">
          {children}
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation (Constitution §16.8) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-2 py-1 flex items-center justify-around">
        {primaryNavItems.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-medium transition-colors cursor-pointer ${
                isActive ? 'text-[var(--color-brand-primary)] font-bold' : 'text-[var(--color-text-muted)]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsPostBuildOpen(true)}
          className="flex flex-col items-center py-1 px-2 text-[10px] font-medium text-[var(--color-brand-accent)] cursor-pointer"
        >
          <Plus className="w-4 h-4 mb-0.5" />
          <span>Post</span>
        </button>
      </nav>
    </div>
  );
};
