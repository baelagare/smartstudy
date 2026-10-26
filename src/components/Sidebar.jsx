import React from 'react';
import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  Sparkles,
  TrendingUp,
  Settings,
  BookOpen,
  GraduationCap,
  Flame,
} from 'lucide-react';

/**
 * Sidebar Component for Desktop & Tablet
 * HCI Principle: Consistency and Standards & Visibility of System Status
 */
export default function Sidebar({
  activePage,
  onNavigate,
  pendingCount = 0,
  urgentRecCount = 0,
}) {
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
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-16 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none">
            <GraduationCap className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Acuity</span>
              {/* <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                HCI
              </span>  */}
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Plan Smarter. Study Better. Clarity in Focus
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5" aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${isActive
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-900/50'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                    }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mini Productivity Card */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/40">
        <div className="flex items-center gap-2 mb-1.5">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Study Tip
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Tackle high-priority coursework during your peak alertness hours. 25-minute focused blocks optimize memory retention.
        </p>
      </div>
    </aside>
  );
}
