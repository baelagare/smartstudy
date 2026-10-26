import React from 'react';
import {
  Plus,
  Sun,
  Moon,
  Menu,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

/**
 * Header Component
 * Displays greeting, today's date, theme toggle, and primary "Add Task" action.
 * HCI Principle: Visibility of System Status & Consistency
 */
export default function Header({
  userName = 'Alex',
  currentUser = null,
  theme = 'light',
  onToggleTheme,
  onOpenAddTask,
  onOpenMobileMenu,
  onNavigate,
  activePageTitle = 'Dashboard',
}) {
  // Compute contextual greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = currentUser?.name || userName;
  const displayAvatar = currentUser?.avatarEmoji || '🎓';

  const todayFormatted = formatDate(new Date().toISOString(), {
    showWeekday: true,
    showYear: true,
  });

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger & Greeting / Page Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl shrink-0 hidden xs:inline">{displayAvatar}</span>
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                {getGreeting()}, {displayName.split(' ')[0]}!
              </h1>
              <span className="hidden sm:inline-block text-lg">👋</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              {todayFormatted} •{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                {activePageTitle}
              </span>
              {currentUser?.major && (
                <span className="hidden md:inline text-slate-400 dark:text-slate-500">
                  {' '}
                  • {currentUser.major}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Actions (Theme Toggle & Add Task Button) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Add Task Primary CTA */}
          <button
            type="button"
            onClick={onOpenAddTask}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-indigo-200 dark:shadow-none transition-all transform active:scale-95 whitespace-nowrap shrink-0"
            title="Add Task"
            aria-label="Add Task"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] shrink-0" />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Task</span>
          </button>
        </div>
      </div>
    </header >
  );
}
