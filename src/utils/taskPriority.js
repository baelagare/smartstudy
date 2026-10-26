/**
 * Priority and Sorting utilities for Acuity
 */

export const PRIORITY_WEIGHTS = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export const TASK_TYPES = [
  'Assignment',
  'Exam',
  'Project',
  'Reading',
  'Other',
];

export const TASK_STATUSES = [
  'Pending',
  'In Progress',
  'Completed',
];

/**
 * Calculates a priority score (higher score = more urgent & important)
 * Takes into account:
 * 1. Overdue status (+100)
 * 2. Days until deadline (closer = higher)
 * 3. Priority flag (High = +30, Med = +20, Low = +10)
 * 4. Task type (Exam/Project = extra weight)
 */
export function calculateUrgencyScore(task) {
  if (task.status === 'Completed') return -100;

  let score = 0;
  const priorityWeight = PRIORITY_WEIGHTS[task.priority] || 1;
  score += priorityWeight * 15; // 15 to 45 points

  if (task.type === 'Exam') score += 20;
  else if (task.type === 'Project') score += 15;
  else if (task.type === 'Assignment') score += 10;

  if (task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate + 'T00:00:00');
    const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      // Overdue
      score += 100 + Math.min(Math.abs(diffDays) * 5, 30);
    } else if (diffDays === 0) {
      score += 80; // Due today
    } else if (diffDays === 1) {
      score += 65; // Due tomorrow
    } else if (diffDays <= 3) {
      score += 50; // Due within 3 days
    } else if (diffDays <= 7) {
      score += 30; // Due this week
    } else {
      score += Math.max(0, 20 - diffDays);
    }
  }

  // In-progress tasks have momentum
  if (task.status === 'In Progress') {
    score += 8;
  }

  return score;
}

/**
 * Sorts an array of tasks according to a given criteria
 */
export function sortTasks(tasks, sortBy = 'smart') {
  return [...tasks].sort((a, b) => {
    // If completed, push to end unless sorting by something specific
    if (a.status === 'Completed' && b.status !== 'Completed') return 1;
    if (b.status === 'Completed' && a.status !== 'Completed') return -1;

    switch (sortBy) {
      case 'smart': {
        // HCI Smart Priority Score
        return calculateUrgencyScore(b) - calculateUrgencyScore(a);
      }
      case 'deadline-asc': {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      case 'deadline-desc': {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return b.dueDate.localeCompare(a.dueDate);
      }
      case 'priority-desc': {
        const weightDiff = (PRIORITY_WEIGHTS[b.priority] || 0) - (PRIORITY_WEIGHTS[a.priority] || 0);
        if (weightDiff !== 0) return weightDiff;
        return (a.dueDate || '9999').localeCompare(b.dueDate || '9999');
      }
      case 'created-desc': {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      case 'created-asc': {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      default:
        return 0;
    }
  });
}

/**
 * Helper to get badge style classes for priorities
 */
export function getPriorityBadge(priority) {
  switch (priority) {
    case 'High':
      return {
        label: 'High Priority',
        badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
        dotClass: 'bg-rose-500',
      };
    case 'Medium':
      return {
        label: 'Medium Priority',
        badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
        dotClass: 'bg-amber-500',
      };
    case 'Low':
    default:
      return {
        label: 'Low Priority',
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
        dotClass: 'bg-slate-400',
      };
  }
}

/**
 * Helper to get badge style classes for task types
 */
export function getTypeBadge(type) {
  switch (type) {
    case 'Exam':
      return {
        label: 'Exam',
        badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
      };
    case 'Project':
      return {
        label: 'Project',
        badgeClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800',
      };
    case 'Assignment':
      return {
        label: 'Assignment',
        badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
      };
    case 'Reading':
      return {
        label: 'Reading',
        badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
      };
    default:
      return {
        label: type || 'Task',
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
      };
  }
}

/**
 * Helper to get badge style classes for statuses
 */
export function getStatusBadge(status) {
  switch (status) {
    case 'Completed':
      return {
        label: 'Completed',
        badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
        dotClass: 'bg-emerald-500',
      };
    case 'In Progress':
      return {
        label: 'In Progress',
        badgeClass: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
        dotClass: 'bg-sky-500',
      };
    case 'Pending':
    default:
      return {
        label: 'Pending',
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
        dotClass: 'bg-slate-400',
      };
  }
}
