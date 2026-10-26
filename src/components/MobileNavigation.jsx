import React, { useEffect } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Settings,
  X,
  GraduationCap,
  Home,
  LogOut,
} from 'lucide-react';

/**
 * Mobile Navigation Component
 * Provides bottom bar navigation + slide-out drawer navigation for small screens.
 * Touch targets >= 44x44px.
 * HCI Principle: Responsive Usability & Consistency
 */
export default function MobileNavigation({
  activePage,
  onNavigate,
  isDrawerOpen,
  onCloseDrawer,
  pendingCount = 0,
  urgentRecCount = 0,
  currentUser = null,
  onLogout,
}) {
  const bottomBarItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: ListTodo, badge: pendingCount },
    { id: 'planner', label: 'Planner', icon: CalendarDays },
    { id: 'recommendations', label: 'Tips', icon: Sparkles, badge: urgentRecCount },
    { id: 'progress', label: 'Insights', icon: TrendingUp },
  ];

  const drawerItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: ListTodo, badge: pendingCount },
    { id: 'planner', label: 'Study Planner', icon: CalendarDays },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles, badge: urgentRecCount },
    { id: 'progress', label: 'Progress & Insights', icon: TrendingUp },
    { id: 'settings', label: 'Settings & Profile', icon: Settings },
  ];

  // Close drawer on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isDrawerOpen) {
        onCloseDrawer();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, onCloseDrawer]);

  return (
    <>
      {/* 1. Mobile Bottom Navigation Bar (Screens < 768px) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] transition-colors shadow-lg"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="flex items-center justify-around h-16 px-1">
          {bottomBarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[2]" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight leading-none">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. Slide-out Drawer (When hamburger menu is pressed) */}
      {isDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex bg-slate-900/50 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full p-6 shadow-2xl flex flex-col justify-between border-r border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Acuity</h3>
                    <p className="text-[11px] text-slate-400">Plan Smarter. Study Better.</p>
                  </div>
                </div>
                <button
                  onClick={onCloseDrawer}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="space-y-1.5">
                {drawerItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onCloseDrawer();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Landing Page Link in Drawer */}
                <button
                  onClick={() => {
                    onNavigate('landing');
                    onCloseDrawer();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <Home className="w-5 h-5 text-slate-400" />
                  <span>Landing Page</span>
                </button>
              </nav>
            </div>

            {/* Drawer Footer with Student Profile & Logout */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {currentUser && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{currentUser.avatarEmoji || '🎓'}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                        {currentUser.major}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onCloseDrawer();
                      if (onLogout) onLogout();
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700 transition shrink-0"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400">
                <p className="font-semibold text-slate-600 dark:text-slate-300">Acuity Study Planner</p>
                <p className="mt-0.5">HCI Research-Backed Usability</p>
              </div>
            </div>
          </div>

          <div className="flex-1" onClick={onCloseDrawer} />
        </div>
      )}
    </>
  );
}
