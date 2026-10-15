import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  Rocket, 
  MessageSquare, 
  Users, 
  PlusCircle, 
  ArrowRight
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    setIsPostBuildOpen, 
    setCurrentView 
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationRead(n.id);
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trial':
        return <Clock className="w-4 h-4 text-[#2DD4BF]" />;
      case 'invite':
      case 'application':
        return <Users className="w-4 h-4 text-[#00D659]" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-[#38BDF8]" />;
      default:
        return <Rocket className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-crisp)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-white">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="bg-white text-[#050506] font-mono font-bold text-xs px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs font-mono text-[var(--text-secondary)] mt-1">
            Real-time updates on your builds, trial sprints, and peer collaborations
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-white bg-[#141418] hover:bg-[#1A1A22] border border-[var(--border-crisp)] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#00D659]" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List or Empty State */}
      {notifications.length === 0 ? (
        <div className="glow-card-perimeter p-8 sm:p-12 text-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-[#141418] border border-[var(--border-crisp)] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Bell className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white">
            All caught up
          </h2>
          <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mx-auto mt-2 leading-relaxed">
            You don't have any notifications right now. When founders or builders invite you to a 5-day trial sprint, apply to your build, or leave feedback, you'll see them here.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsPostBuildOpen(true)}
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-[#050506] font-mono font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post a Build</span>
            </button>
            <button
              onClick={() => setCurrentView('startups')}
              className="w-full sm:w-auto bg-[#141418] hover:bg-[#1A1A22] text-white border border-[var(--border-crisp)] font-mono font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Startups</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !item.read
                  ? 'bg-[#0C0C0E] border-white/20 shadow-sm'
                  : 'bg-[#0C0C0E]/50 border-[var(--border-crisp)] opacity-75 hover:opacity-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#141418] border border-[var(--border-crisp)] flex items-center justify-center shrink-0 mt-0.5">
                {getNotificationIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {item.message}
                </p>
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-[#00D659] shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
