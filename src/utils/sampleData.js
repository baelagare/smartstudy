/**
 * Sample Demo Data for first-time Acuity users.
 * Generated dynamically with relative dates so deadlines are always relevant to the current date.
 */

import { addDaysToDate, getTodayInputDate } from './dateUtils';

export function getSampleTasks() {
  const today = getTodayInputDate();

  return [
    {
      id: 'task_demo_1',
      title: 'Database Systems Final Project Milestone 2',
      subject: 'CS 340 - Database Systems',
      description: 'Implement ER-to-relational schema mapping, normalization (3NF/BCNF), and test ACID transaction scripts.',
      type: 'Project',
      dueDate: addDaysToDate(today, 2),
      priority: 'High',
      estimatedMinutes: 120,
      status: 'In Progress',
      isDemo: true,
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'task_demo_2',
      title: 'HCI Usability Evaluation Report',
      subject: 'CS 465 - Human-Computer Interaction',
      description: 'Synthesize findings from 5 user test sessions on the responsive mobile interface. Highlight Nielsen heuristic violations.',
      type: 'Assignment',
      dueDate: today,
      priority: 'High',
      estimatedMinutes: 75,
      status: 'Pending',
      isDemo: true,
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'task_demo_3',
      title: 'Linear Algebra Midterm Exam',
      subject: 'MATH 220 - Linear Algebra',
      description: 'Covers Eigenvalues, Eigenvectors, Diagonalization, and Gram-Schmidt orthogonalization process.',
      type: 'Exam',
      dueDate: addDaysToDate(today, 5),
      priority: 'High',
      estimatedMinutes: 180,
      status: 'Pending',
      isDemo: true,
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      id: 'task_demo_4',
      title: 'Read Cognitive Psychology Chapter 7',
      subject: 'PSYC 101 - Intro to Psychology',
      description: 'Working memory capacity vs. long-term storage mechanisms. Take 2 pages of summary notes.',
      type: 'Reading',
      dueDate: addDaysToDate(today, -1), // Overdue by 1 day
      priority: 'Medium',
      estimatedMinutes: 45,
      status: 'Pending',
      isDemo: true,
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'task_demo_5',
      title: 'Algorithm Analysis Problem Set 4',
      subject: 'CS 320 - Algorithms',
      description: 'Dynamic Programming questions (Knapsack, Matrix Chain Multiplication, and Longest Common Subsequence).',
      type: 'Assignment',
      dueDate: addDaysToDate(today, 8),
      priority: 'Medium',
      estimatedMinutes: 90,
      status: 'Pending',
      isDemo: true,
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'task_demo_6',
      title: 'Interactive Wireframe Prototypes',
      subject: 'CS 465 - Human-Computer Interaction',
      description: 'Build Figma components for responsive navigation drawer, task filter pill bar, and modal dialogues.',
      type: 'Project',
      dueDate: addDaysToDate(today, -3),
      priority: 'Low',
      estimatedMinutes: 60,
      status: 'Completed',
      isDemo: true,
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ];
}
