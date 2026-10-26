/**
 * Progress and Insights calculations for Acuity
 * Computes live statistics, subject metrics, completion rates,
 * and encouraging behavioral feedback.
 */

import { getDaysRemaining } from './dateUtils';

export function calculateProgressStats(tasks = []) {
  const total = tasks.length;
  if (total === 0) {
    return {
      total: 0,
      completed: 0,
      pending: 0,
      inProgress: 0,
      overdue: 0,
      completionRate: 0,
      totalEstimatedHours: 0,
      completedEstimatedHours: 0,
      subjects: [],
      typeDistribution: [],
      encouragingMessage: {
        title: 'Ready to begin your study journey?',
        body: 'Add your coursework tasks to start tracking your completion rates and study progress.',
        icon: 'Sparkles',
        color: 'text-indigo-600 dark:text-indigo-400',
      },
    };
  }

  let completed = 0;
  let inProgress = 0;
  let pending = 0;
  let overdue = 0;
  let totalMinutes = 0;
  let completedMinutes = 0;

  const subjectMap = {};
  const typeMap = {};

  tasks.forEach((task) => {
    const minutes = Number(task.estimatedMinutes) || 0;
    totalMinutes += minutes;

    // Status counts
    if (task.status === 'Completed') {
      completed++;
      completedMinutes += minutes;
    } else {
      if (task.status === 'In Progress') {
        inProgress++;
      } else {
        pending++;
      }

      // Check if overdue
      if (task.dueDate) {
        const days = getDaysRemaining(task.dueDate);
        if (days !== null && days < 0) {
          overdue++;
        }
      }
    }

    // Subject breakdown
    const subject = task.subject?.trim() || 'General';
    if (!subjectMap[subject]) {
      subjectMap[subject] = {
        name: subject,
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        minutes: 0,
      };
    }
    subjectMap[subject].total++;
    subjectMap[subject].minutes += minutes;
    if (task.status === 'Completed') {
      subjectMap[subject].completed++;
    } else if (task.status === 'In Progress') {
      subjectMap[subject].inProgress++;
    } else {
      subjectMap[subject].pending++;
    }

    // Type distribution
    const type = task.type || 'Other';
    typeMap[type] = (typeMap[type] || 0) + 1;
  });

  const completionRate = Math.round((completed / total) * 100);

  // Format subjects array with completion rates
  const subjects = Object.values(subjectMap).map((sub) => ({
    ...sub,
    percentage: Math.round((sub.completed / sub.total) * 100),
  }));

  // Format types for charts
  const typeDistribution = Object.entries(typeMap).map(([name, value]) => ({
    name,
    value,
  }));

  // Generate supportive, non-judgmental feedback
  let encouragingMessage;
  if (completionRate === 100) {
    encouragingMessage = {
      title: 'Flawless execution! 🌟',
      body: 'Every single task is completed. You have achieved total mastery of your current planner.',
      icon: 'CheckCircle2',
      color: 'text-emerald-600 dark:text-emerald-400',
    };
  } else if (completionRate >= 75) {
    encouragingMessage = {
      title: 'Superb momentum! 🚀',
      body: `You are in the final stretch with ${completionRate}% completed. Keep this positive focus going!`,
      icon: 'TrendingUp',
      color: 'text-indigo-600 dark:text-indigo-400',
    };
  } else if (completionRate >= 50) {
    encouragingMessage = {
      title: 'Halfway milestone reached! 🎯',
      body: 'You have cleared more than half your coursework. Steady pacing prevents burnout.',
      icon: 'Target',
      color: 'text-blue-600 dark:text-blue-400',
    };
  } else if (completed > 0) {
    encouragingMessage = {
      title: 'Good initial progress! 🌱',
      body: `You've already crossed off ${completed} task${completed > 1 ? 's' : ''}. Small consistent habits lead to big semester wins.`,
      icon: 'Zap',
      color: 'text-amber-600 dark:text-amber-400',
    };
  } else if (overdue > 0) {
    encouragingMessage = {
      title: 'One step at a time 💡',
      body: 'Do not worry about overdue items. Focus on just one small task today to regain your rhythm.',
      icon: 'HeartHandshake',
      color: 'text-violet-600 dark:text-violet-400',
    };
  } else {
    encouragingMessage = {
      title: 'Your study plan is prepared 📚',
      body: `You have ${total} task${total > 1 ? 's' : ''} organized. Pick the highest priority task to start with confidence!`,
      icon: 'Compass',
      color: 'text-indigo-600 dark:text-indigo-400',
    };
  }

  return {
    total,
    completed,
    pending,
    inProgress,
    activeTotal: pending + inProgress,
    overdue,
    completionRate,
    totalEstimatedHours: (totalMinutes / 60).toFixed(1),
    completedEstimatedHours: (completedMinutes / 60).toFixed(1),
    subjects,
    typeDistribution,
    encouragingMessage,
  };
}
