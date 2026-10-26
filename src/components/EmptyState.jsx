import React from 'react';
import { ClipboardList, Plus, SearchX, CheckCircle2 } from 'lucide-react';

/**
 * EmptyState Component
 * Provides clean, reassuring empty states with clear calls to action.
 * HCI Principle: Visibility of System Status & Recognition rather than recall.
 */
export default function EmptyState({
  type = 'no-tasks',
  title,
  description,
  actionLabel,
  onAction,
}) {
  let defaultIcon = ClipboardList;
  let defaultTitle = 'No tasks found';
  let defaultDesc = 'There are no tasks to display right now.';

  if (type === 'no-tasks') {
    defaultIcon = ClipboardList;
    defaultTitle = 'Your planner is empty';
    defaultDesc = 'Start organizing your semester by adding your first assignment, project, or exam.';
  } else if (type === 'no-search-results') {
    defaultIcon = SearchX;
    defaultTitle = 'No matching tasks';
    defaultDesc = 'Try adjusting your search keywords or resetting your active filters.';
  } else if (type === 'all-completed') {
    defaultIcon = CheckCircle2;
    defaultTitle = 'All caught up!';
    defaultDesc = 'You have completed every scheduled task in this category. Enjoy your break!';
  }

  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDesc;
  const Icon = defaultIcon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {finalTitle}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {finalDesc}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm shadow-sm shadow-indigo-200 dark:shadow-none transition-colors"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
