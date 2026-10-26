import React from 'react';
import {
  CalendarDays,
  Clock,
  AlertTriangle,
  Play,
  CheckCircle2,
  Calendar,
  Flame,
  Plus,
} from 'lucide-react';
import { groupTasksBySchedule, formatMinutes, formatDate } from '../utils/dateUtils';
import { getPriorityBadge, getTypeBadge } from '../utils/taskPriority';
import EmptyState from '../components/EmptyState';

/**
 * Study Planner Page
 * Weekly agenda view grouped by timeline:
 * - Overdue
 * - Today
 * - Tomorrow
 * - Later This Week
 * - Next Week & Beyond
 * Provides overload warnings for days with multiple deadlines.
 * HCI Principle: Visibility of System Status & Recognition rather than Recall
 */
export default function Planner({
  tasks = [],
  onOpenAddTask,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onStartStudy,
}) {
  const scheduleGroups = groupTasksBySchedule(tasks);

  // Calculate day overload detection
  const dateCounts = {};
  tasks.forEach((t) => {
    if (t.status !== 'Completed' && t.dueDate) {
      dateCounts[t.dueDate] = (dateCounts[t.dueDate] || 0) + 1;
    }
  });

  const activeTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Study Planner & Agenda</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Visual chronological timeline to detect bottlenecks and allocate focus sessions.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddTask}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Schedule Task</span>
        </button>
      </div>

      {/* Overload Warning Banner if multiple deadlines coincide */}
      {Object.entries(dateCounts).some(([_, count]) => count >= 3) && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Heavy Deadline Clashing Detected:</span> You have 3 or more assignments due on the same date. Consider tackling the longest assignment 2 days early to avoid cognitive overload.
          </div>
        </div>
      )}

      {/* Main Schedule Sections */}
      {activeTasksCount === 0 && scheduleGroups.completed.tasks.length === 0 ? (
        <EmptyState
          type="no-tasks"
          title="No scheduled study tasks"
          description="Your study agenda is clean. Add upcoming course obligations to view your timeline."
          actionLabel="Schedule Your First Task"
          onAction={onOpenAddTask}
        />
      ) : (
        <div className="space-y-8">
          {Object.entries(scheduleGroups).map(([groupKey, group]) => {
            if (group.tasks.length === 0) return null;

            const isOverdueGroup = groupKey === 'overdue';
            const isTodayGroup = groupKey === 'today';

            return (
              <section key={groupKey} className="space-y-3" aria-labelledby={`group-${groupKey}`}>
                {/* Group Heading */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isOverdueGroup
                          ? 'bg-rose-500 animate-pulse'
                          : isTodayGroup
                          ? 'bg-amber-500'
                          : 'bg-indigo-500'
                      }`}
                    />
                    <h3
                      id={`group-${groupKey}`}
                      className="text-base font-bold text-slate-900 dark:text-white"
                    >
                      {group.title}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {group.tasks.length}
                    </span>
                  </div>

                  {/* Total duration in this group */}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Est. {formatMinutes(group.tasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0))}
                  </span>
                </div>

                {/* Group Task Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {group.tasks.map((task) => {
                    const priorityBadge = getPriorityBadge(task.priority);
                    const typeBadge = getTypeBadge(task.type);
                    const isCompleted = task.status === 'Completed';

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          isCompleted
                            ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-75'
                            : isOverdueGroup
                            ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                          {/* Top tags */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider truncate">
                              {task.subject}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${priorityBadge.badgeClass}`}
                              >
                                {task.priority}
                              </span>
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${typeBadge.badgeClass}`}
                              >
                                {task.type}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h4
                            className={`text-sm sm:text-base font-semibold leading-snug ${
                              isCompleted
                                ? 'text-slate-400 line-through'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {task.title}
                          </h4>

                          {task.description && (
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Card Footer: Due Date & Start Study Quick Action */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(task.dueDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {formatMinutes(task.estimatedMinutes)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {!isCompleted && (
                              <button
                                type="button"
                                onClick={() => onStartStudy(task)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-300 font-semibold transition"
                                title="Open focus session timer"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Start</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => onToggleComplete(task.id)}
                              className={`p-1.5 rounded-lg transition ${
                                isCompleted
                                  ? 'text-emerald-500 hover:text-emerald-600'
                                  : 'text-slate-400 hover:text-emerald-500'
                              }`}
                              title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
