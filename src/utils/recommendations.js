/**
 * Rule-Based Study Recommendations Engine for Acuity
 * Demonstrates transparent, explainable AI-inspired personalization heuristics.
 * Evaluates real-time student task data to generate actionable, contextual study advice.
 */

import { getDaysRemaining, formatMinutes } from './dateUtils';

/**
 * Generates an array of tailored study recommendations based on active tasks.
 * @param {Array} tasks - List of task objects
 * @param {string} studentName - Current user's display name
 * @returns {Array} List of recommendation objects with title, description, reason, type, priority, and action
 */
export function generateRecommendations(tasks, studentName = 'Student') {
  if (!tasks || tasks.length === 0) {
    return [
      {
        id: 'rec_empty',
        title: 'Welcome to Acuity!',
        description: `Get started by adding your upcoming assignments, exams, or readings. We will automatically generate personalized study tips based on your deadlines.`,
        reason: 'Getting Started',
        type: 'info',
        priority: 'Normal',
        actionLabel: 'Add Your First Task',
        actionType: 'create_task',
      },
    ];
  }

  const recommendations = [];
  const activeTasks = tasks.filter((t) => t.status !== 'Completed');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  // Condition 0: All tasks are completed!
  if (activeTasks.length === 0 && completedTasks.length > 0) {
    return [
      {
        id: 'rec_all_done',
        title: 'Outstanding Work! You Are All Caught Up',
        description: `You have completed all ${completedTasks.length} task${completedTasks.length > 1 ? 's' : ''}. Take time to rest, review past lecture notes, or plan ahead for next week's syllabus topics.`,
        reason: 'Clean Slate & Mastery',
        type: 'success',
        priority: 'Low',
        actionLabel: 'Plan Ahead',
        actionType: 'view_planner',
      },
    ];
  }

  // 1. Identify Overdue Tasks
  const overdueTasks = activeTasks.filter((task) => {
    if (!task.dueDate) return false;
    const days = getDaysRemaining(task.dueDate);
    return days !== null && days < 0;
  });

  if (overdueTasks.length > 0) {
    const mostOverdue = overdueTasks.reduce((prev, curr) => {
      const prevDays = getDaysRemaining(prev.dueDate);
      const currDays = getDaysRemaining(curr.dueDate);
      return currDays < prevDays ? curr : prev;
    }, overdueTasks[0]);

    const daysLate = Math.abs(getDaysRemaining(mostOverdue.dueDate));

    recommendations.push({
      id: `rec_overdue_${mostOverdue.id}`,
      taskId: mostOverdue.id,
      title: `Urgent: Resolve Overdue ${mostOverdue.type}`,
      description: `"${mostOverdue.title}" in ${mostOverdue.subject} was due ${daysLate === 1 ? 'yesterday' : `${daysLate} days ago`}. Submitting even partial work or communicating with your professor can preserve valuable marks.`,
      reason: 'Overdue Attention',
      type: 'danger',
      priority: 'Urgent',
      actionLabel: 'Focus on This Task',
      actionType: 'start_study',
    });
  }

  // 2. Identify High-Priority Tasks due soon (within 3 days)
  const urgentHighPriority = activeTasks.filter((task) => {
    if (task.priority !== 'High') return false;
    if (!task.dueDate) return false;
    const days = getDaysRemaining(task.dueDate);
    return days !== null && days >= 0 && days <= 3;
  });

  if (urgentHighPriority.length > 0) {
    const topTask = urgentHighPriority[0];
    const days = getDaysRemaining(topTask.dueDate);
    const timeText = days === 0 ? 'due today' : days === 1 ? 'due tomorrow' : `due in ${days} days`;

    recommendations.push({
      id: `rec_urgent_high_${topTask.id}`,
      taskId: topTask.id,
      title: `High Priority: ${topTask.title}`,
      description: `Your ${topTask.subject} ${topTask.type.toLowerCase()} is ${timeText}. Because it is marked High Priority, allocate your highest-energy study hours today to finish it.`,
      reason: 'Approaching High-Priority Deadline',
      type: 'warning',
      priority: 'High',
      actionLabel: 'Start Study Session',
      actionType: 'start_study',
    });
  }

  // 3. Upcoming Exams within 7 days
  const upcomingExams = activeTasks.filter((task) => {
    if (task.type !== 'Exam') return false;
    if (!task.dueDate) return false;
    const days = getDaysRemaining(task.dueDate);
    return days !== null && days >= 0 && days <= 7;
  });

  if (upcomingExams.length > 0) {
    const exam = upcomingExams[0];
    const days = getDaysRemaining(exam.dueDate);
    recommendations.push({
      id: `rec_exam_${exam.id}`,
      taskId: exam.id,
      title: `Exam Preparation: ${exam.subject}`,
      description: `Upcoming ${exam.title} in ${days === 0 ? 'today' : days === 1 ? 'tomorrow' : `${days} days`}. Practice active recall and spaced repetition rather than passive reading to improve retention.`,
      reason: 'Exam Readiness',
      type: 'accent',
      priority: 'High',
      actionLabel: 'Begin Revision',
      actionType: 'start_study',
    });
  }

  // 4. Large Task Chunking (>90 mins or Project with multiple days)
  const largeTasks = activeTasks.filter(
    (t) => (t.estimatedMinutes >= 90 || t.type === 'Project') && t.status !== 'Completed'
  );

  if (largeTasks.length > 0) {
    const large = largeTasks[0];
    const est = formatMinutes(large.estimatedMinutes || 90);
    recommendations.push({
      id: `rec_chunk_${large.id}`,
      taskId: large.id,
      title: `Break Down "${large.title}" into Sprints`,
      description: `Estimated at ${est}, tackling this ${large.type.toLowerCase()} all at once may cause cognitive fatigue. Split it into two 30-minute focused blocks with a 5-minute break in between.`,
      reason: 'Cognitive Load Reduction',
      type: 'info',
      priority: 'Medium',
      actionLabel: 'Launch 25m Timer',
      actionType: 'start_timer',
    });
  }

  // 5. Workload balancing: Check if multiple tasks are due on the same date
  const dateCounts = {};
  activeTasks.forEach((t) => {
    if (t.dueDate) {
      dateCounts[t.dueDate] = (dateCounts[t.dueDate] || 0) + 1;
    }
  });

  const heavyDate = Object.entries(dateCounts).find(([_, count]) => count >= 3);
  if (heavyDate) {
    const [date, count] = heavyDate;
    const days = getDaysRemaining(date);
    if (days !== null && days >= 0 && days <= 5) {
      recommendations.push({
        id: `rec_heavy_${date}`,
        title: `Heavy Deadline Clashing Alert`,
        description: `You have ${count} active assignments due on ${date} (${days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`}). Work ahead on the simplest one today to avoid last-minute bottlenecking.`,
        reason: 'Workload Balance',
        type: 'warning',
        priority: 'Medium',
        actionLabel: 'View Schedule',
        actionType: 'view_planner',
      });
    }
  }

  // 6. Low Pending Workload / Consolidation encouragement
  if (activeTasks.length <= 2 && activeTasks.length > 0) {
    recommendations.push({
      id: 'rec_low_workload',
      title: 'Light Workload Window Available',
      description: `You only have ${activeTasks.length} pending task${activeTasks.length > 1 ? 's' : ''}! Once done, you'll have uninterrupted time to relax or read ahead for upcoming milestones.`,
      reason: 'Momentum Builder',
      type: 'success',
      priority: 'Low',
      actionLabel: 'Review Tasks',
      actionType: 'view_tasks',
    });
  }

  // Fallback: If no specific triggers fired (e.g. only normal future tasks), recommend highest priority
  if (recommendations.length === 0 && activeTasks.length > 0) {
    const firstTask = activeTasks[0];
    recommendations.push({
      id: `rec_general_${firstTask.id}`,
      taskId: firstTask.id,
      title: `Maintain Momentum on ${firstTask.title}`,
      description: `Next up on your schedule: ${firstTask.subject}. Set aside a 30-minute block today to review instructions and outline your approach.`,
      reason: 'Continuous Progress',
      type: 'info',
      priority: 'Medium',
      actionLabel: 'Start Studying',
      actionType: 'start_study',
    });
  }

  return recommendations;
}
