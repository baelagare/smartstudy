import React from 'react';
import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Settings,
  GraduationCap,
  Flame,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Sidebar Component for Desktop & Tablet
 * Supports collapsible mode for maximizing workspace view.
 * HCI Principle: User Control & Freedom, Flexibility and Efficiency of Use
 */
export default function Sidebar({
  activePage,
  onNavigate,
  pendingCount = 0,
  urgentRecCount = 0,
  currentUser = null,
  onLogout,
}) {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('acuity_sidebar_collapsed', false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'tasks',
      label: 'My Tasks',
      icon: ListTodo,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
    },
    {
      id: 'planner',
      label: 'Study Planner',
      icon: CalendarDays,
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: Sparkles,
      badge: urgentRecCount > 0 ? urgentRecCount : null,
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      id: 'progress',
      label: 'Progress & Insights',
      icon: TrendingUp,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col sticky top-0 h-screen z-30 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 shrink-0 select-none transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64 lg:w-72'
      }`}
      aria-label="Sidebar Navigation"
    >
      {/* Brand Header & Collapse Toggle */}
      <div
        className={`border-b border-slate-100 dark:border-slate-800 shrink-0 transition-all ${
          isCollapsed ? 'p-3 flex flex-col items-center gap-2' : 'p-4 sm:p-5 flex items-center justify-between'
        }`}
      >
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group min-w-0"
          title="Acuity Dashboard"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
          </div>

          {!isCollapsed && (
            <div className="min-w-0 animate-fade-in">
              <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white truncate">
                Acuity
              </h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
                Clarity in Focus
              </p>
            </div>
          )}
        </div>

        {/* Collapse / Expand Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0 ${
            isCollapsed ? 'mt-1' : ''
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <nav className={`flex-1 space-y-1.5 overflow-y-auto ${isCollapsed ? 'p-2' : 'p-3 sm:p-4'}`} aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          if (isCollapsed) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                className={`w-full relative flex items-center justify-center p-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-900/50'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  }`}
                />

                {/* Left Active Bar Indicator */}
                {isActive && (
                  <span className="absolute left-0.5 top-2.5 bottom-2.5 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}

                {/* Badge Dot */}
                {item.badge && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-900/50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Student Personalization Profile Card */}
      {currentUser && (
        isCollapsed ? (
          <div className="p-2 m-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col items-center gap-2 shrink-0">
            <div
              className="text-2xl cursor-pointer hover:scale-110 transition-transform"
              title={`${currentUser.name} (${currentUser.major}) • ${currentUser.university}`}
              onClick={() => onNavigate('settings')}
            >
              {currentUser.avatarEmoji || '🎓'}
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700 transition"
              title="Sign Out / Switch Profile"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-3.5 m-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 animate-fade-in shrink-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl shrink-0">
                  {currentUser.avatarEmoji || '🎓'}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser.name || 'Alex Rivera'}
                  </p>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                    {currentUser.major || 'Computer Science'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700 transition shrink-0"
                title="Sign Out / Switch Profile"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span className="truncate">{currentUser.university || 'UC Berkeley'}</span>
              <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">
                {currentUser.dailyStudyGoalHours || 3.5}h goal
              </span>
            </div>
          </div>
        )
      )}

      {/* Mini Productivity Card / Study Tip */}
      {isCollapsed ? (
        <div
          className="p-2.5 m-2 mb-3 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center cursor-help shrink-0"
          title="Study Tip: 25-minute focused blocks optimize memory retention. Tackle hard tasks early."
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
        </div>
      ) : (
        <div className="p-3 m-3 mb-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/40 animate-fade-in shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              Study Tip
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
            25-minute focused blocks optimize memory retention. Tackle hard tasks early.
          </p>
        </div>
      )}
    </aside>
  );
}
