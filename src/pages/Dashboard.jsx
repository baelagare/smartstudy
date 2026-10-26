import React from 'react';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Sparkles,
  Calendar,
  Flame,
  Award,
} from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import TaskCard from '../components/TaskCard';
import RecommendationCard from '../components/RecommendationCard';
import EmptyState from '../components/EmptyState';
import { sortTasks } from '../utils/taskPriority';
import { calculateProgressStats } from '../utils/progressCalculations';
import { generateRecommendations } from '../utils/recommendations';

/**
 * Dashboard Page
 * Answers three questions immediately:
 * 1. What do I need to do?
 * 2. Which task should I prioritize?
 * 3. How much progress have I made?
 */
export default function Dashboard({
  tasks = [],
  userName = 'Alex',
  currentUser = null,
  onNavigate,
  onOpenAddTask,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onStartStudy,
}) {
  const effectiveName = currentUser?.name || userName;
  const stats = calculateProgressStats(tasks);
  const prioritizedTasks = sortTasks(tasks, 'smart');
  const topActiveTasks = prioritizedTasks.filter((t) => t.status !== 'Completed').slice(0, 4);
  const recommendations = generateRecommendations(tasks, effectiveName).slice(0, 3);

  const handleRecommendationAction = (rec) => {
    if (rec.actionType === 'create_task') {
      onOpenAddTask();
    } else if (rec.actionType === 'view_planner') {
      onNavigate('planner');
    } else if (rec.actionType === 'view_tasks') {
      onNavigate('tasks');
    } else if (rec.actionType === 'start_study' || rec.actionType === 'start_timer') {
      if (rec.taskId) {
        const found = tasks.find((t) => t.id === rec.taskId);
        if (found) {
          onStartStudy(found);
          return;
        }
      }
      onNavigate('planner');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Summary Cards Row: Total, Pending, Completed, Overdue */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Academic Workload Summary
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <SummaryCard
            title="Total Tasks"
            value={stats.total}
            subtitle={`${stats.totalEstimatedHours}h estimated study time`}
            icon={ListTodo}
            variant="default"
            onClick={() => onNavigate('tasks')}
          />
          <SummaryCard
            title="Pending"
            value={stats.pending + stats.inProgress}
            subtitle={stats.inProgress > 0 ? `${stats.inProgress} in progress` : 'Awaiting start'}
            icon={Clock}
            variant="primary"
            onClick={() => onNavigate('tasks')}
          />
          <SummaryCard
            title="Completed"
            value={stats.completed}
            subtitle={`${stats.completionRate}% completion rate`}
            icon={CheckCircle2}
            variant="success"
            onClick={() => onNavigate('progress')}
          />
          <SummaryCard
            title="Overdue"
            value={stats.overdue}
            subtitle={stats.overdue > 0 ? 'Requires immediate action' : 'All deadlines on track'}
            icon={AlertTriangle}
            variant={stats.overdue > 0 ? 'danger' : 'amber'}
            onClick={() => onNavigate('tasks')}
          />
        </div>
      </section>

      {/* 2. Visual Progress Indicator Card */}
      <section
        className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white shadow-md relative overflow-hidden"
        aria-label="Study Progress"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200">
                Study Progress Tracker
              </span>
              <span className="text-xs text-indigo-300">
                {stats.completed} of {stats.total} tasks completed
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {stats.encouragingMessage.title}
            </h3>
            <p className="mt-1 text-sm text-indigo-200 leading-relaxed">
              {stats.encouragingMessage.body}
            </p>

            {currentUser && (
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-indigo-200">
                <span className="px-2 py-0.5 rounded-md bg-white/10 font-medium">
                  🎯 Goal: {currentUser.dailyStudyGoalHours || 3.5}h / day
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 font-medium">
                  ⏱️ {currentUser.studyStyleLabel || 'Pomodoro 25/5'}
                </span>
                {currentUser.major && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/10 font-medium">
                    📚 {currentUser.major}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Progress Ring / Percentage Display */}
          <div className="flex items-center gap-4 shrink-0 bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
            <div className="text-right">
              <div className="text-3xl font-extrabold tracking-tight">
                {stats.completionRate}%
              </div>
              <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold">
                Overall Completed
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-400/30 border-t-indigo-300 flex items-center justify-center">
              <Award className="w-6 h-6 text-indigo-200" />
            </div>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="mt-6 w-full h-2.5 bg-indigo-950/60 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(stats.completionRate, 2)}%` }}
          />
        </div>
      </section>

      {/* 3. Main Split View: Prioritized Task List (Left) & Recommended for You (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column (2 cols on desktop): Prioritized Task List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Prioritized Task List</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Top Priority
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tasks arranged by smart urgency (deadlines, course weight, priority)
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group transition"
            >
              <span>View all ({tasks.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {topActiveTasks.length === 0 ? (
            <EmptyState
              type={tasks.length === 0 ? 'no-tasks' : 'all-completed'}
              onAction={tasks.length === 0 ? onOpenAddTask : undefined}
              actionLabel={tasks.length === 0 ? 'Add Your First Task' : undefined}
            />
          ) : (
            <div className="space-y-3">
              {topActiveTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onStatusChange={onStatusChange}
                  onStartStudy={onStartStudy}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column (1 col on desktop): Recommended for You */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Recommended for You</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rule-based suggestions from your actual tasks
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('recommendations')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group transition"
            >
              <span>More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onAction={handleRecommendationAction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
