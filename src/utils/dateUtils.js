/**
 * Date utility helpers for Acuity
 * Provides consistent date parsing, formatting, relative time calculation,
 * and grouping functions without heavy external dependencies.
 */

/**
 * Parses date string (YYYY-MM-DD or ISO) into local date at midnight for comparison
 */
export function parseLocalDate(dateString) {
  if (!dateString) return null;
  const parts = dateString.split('T')[0].split('-');
  if (parts.length !== 3) {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? null : d;
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

/**
 * Returns today's date at 00:00:00
 */
export function getTodayDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Formats a date string into "Mon, Oct 24, 2026"
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return 'No due date';
  const date = parseLocalDate(dateString);
  if (!date) return 'Invalid date';

  const defaultOptions = {
    weekday: options.showWeekday ? 'short' : undefined,
    month: 'short',
    day: 'numeric',
    year: options.showYear !== false ? 'numeric' : undefined,
  };

  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Calculates days remaining until the due date.
 * Negative number = overdue. 0 = today. Positive = future.
 */
export function getDaysRemaining(dueDateString) {
  if (!dueDateString) return null;
  const targetDate = parseLocalDate(dueDateString);
  if (!targetDate) return null;

  const today = getTodayDate();
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Returns human-readable relative label and urgency status
 */
export function getDueStatus(dueDateString, status) {
  if (status === 'Completed') {
    return {
      label: 'Completed',
      urgency: 'completed',
      daysRemaining: null,
      isOverdue: false,
    };
  }

  if (!dueDateString) {
    return {
      label: 'No deadline',
      urgency: 'none',
      daysRemaining: null,
      isOverdue: false,
    };
  }

  const days = getDaysRemaining(dueDateString);
  if (days === null) {
    return { label: 'Invalid date', urgency: 'none', daysRemaining: null, isOverdue: false };
  }

  if (days < 0) {
    const overdueDays = Math.abs(days);
    return {
      label: overdueDays === 1 ? 'Overdue by 1 day' : `Overdue by ${overdueDays} days`,
      urgency: 'overdue',
      daysRemaining: days,
      isOverdue: true,
    };
  } else if (days === 0) {
    return {
      label: 'Due today',
      urgency: 'today',
      daysRemaining: 0,
      isOverdue: false,
    };
  } else if (days === 1) {
    return {
      label: 'Due tomorrow',
      urgency: 'urgent',
      daysRemaining: 1,
      isOverdue: false,
    };
  } else if (days <= 3) {
    return {
      label: `Due in ${days} days`,
      urgency: 'soon',
      daysRemaining: days,
      isOverdue: false,
    };
  } else if (days <= 7) {
    return {
      label: `Due in ${days} days`,
      urgency: 'upcoming',
      daysRemaining: days,
      isOverdue: false,
    };
  } else {
    return {
      label: formatDate(dueDateString),
      urgency: 'later',
      daysRemaining: days,
      isOverdue: false,
    };
  }
}

/**
 * Format minutes into readable string: e.g. 45m, 1h 30m, 2h
 */
export function formatMinutes(minutes) {
  if (!minutes || minutes <= 0) return '0m';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
}

/**
 * Returns formatted ISO YYYY-MM-DD for date inputs
 */
export function getTodayInputDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Add days to a given YYYY-MM-DD string
 */
export function addDaysToDate(dateString, days) {
  const d = parseLocalDate(dateString) || new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Groups tasks for the Planner page:
 * - Overdue
 * - Today
 * - Tomorrow
 * - This Week
 * - Next Week & Later
 * - Completed
 */
export function groupTasksBySchedule(tasks) {
  const groups = {
    overdue: { title: 'Overdue Attention Required', tasks: [], alert: true },
    today: { title: 'Today', tasks: [], highlight: true },
    tomorrow: { title: 'Tomorrow', tasks: [] },
    thisWeek: { title: 'Later This Week', tasks: [] },
    future: { title: 'Next Week & Beyond', tasks: [] },
    noDate: { title: 'No Deadline Specified', tasks: [] },
    completed: { title: 'Completed Recently', tasks: [] },
  };

  tasks.forEach((task) => {
    if (task.status === 'Completed') {
      groups.completed.tasks.push(task);
      return;
    }

    if (!task.dueDate) {
      groups.noDate.tasks.push(task);
      return;
    }

    const days = getDaysRemaining(task.dueDate);
    if (days === null) {
      groups.noDate.tasks.push(task);
    } else if (days < 0) {
      groups.overdue.tasks.push(task);
    } else if (days === 0) {
      groups.today.tasks.push(task);
    } else if (days === 1) {
      groups.tomorrow.tasks.push(task);
    } else if (days <= 7) {
      groups.thisWeek.tasks.push(task);
    } else {
      groups.future.tasks.push(task);
    }
  });

  return groups;
}
