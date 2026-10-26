import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  PieChart,
  BarChart2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import ProgressChart from '../components/ProgressChart';
import EmptyState from '../components/EmptyState';
import { calculateProgressStats } from '../utils/progressCalculations';
import { formatMinutes } from '../utils/dateUtils';

/**
 * Progress and Insights Page
 * Visualizes dynamic completion rates, subject performance,
 * study duration metrics, and non-judgmental encouragement.
 * HCI Principle: Visibility of System Status & Positive Reinforcement
 */
export default function Progress({
  tasks = [],
  isDark = false,
  onNavigate,
  onOpenAddTask,
}) {
  const stats = calculateProgressStats(tasks);

  if (tasks.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Progress & Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track completion trends and time allocation across all your courses.
          </p>
        </div>
        <EmptyState
          type="no-tasks"
          title="No study progress recorded yet"
          description="Create your course assignments and projects to generate completion charts, time tracking, and subject breakdowns."
          actionLabel="Add Tasks to Begin"
          onAction={onOpenAddTask}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Progress & Study Insights</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Live academic metrics calculated from your stored tasks and completed milestones.
        </p>
      </div>

      {/* Motivational Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-emerald-500/10 border border-indigo-200/60 dark:border-indigo-900/40 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {stats.encouragingMessage.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
            {stats.encouragingMessage.body}
          </p>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <SummaryCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          subtitle={`${stats.completed} of ${stats.total} tasks completed`}
          icon={Award}
          variant="success"
        />
        <SummaryCard
          title="Tasks Completed"
          value={stats.completed}
          subtitle={`${stats.completedEstimatedHours}h estimated focus cleared`}
          icon={CheckCircle2}
          variant="default"
        />
        <SummaryCard
          title="Pending Workload"
          value={stats.activeTotal}
          subtitle={`${stats.inProgress} currently in progress`}
          icon={Clock}
          variant="primary"
        />
        <SummaryCard
          title="Total Workload"
          value={`${stats.totalEstimatedHours}h`}
          subtitle={`Across ${stats.subjects.length} course${stats.subjects.length === 1 ? '' : 's'}`}
          icon={BookOpen}
          variant="default"
        />
      </div>

      {/* Chart Section: Subject Completion Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Interactive Chart */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Course Completion Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparison of finished vs. pending tasks per subject
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {stats.subjects.length} Courses Tracked
            </span>
          </div>

          <ProgressChart subjects={stats.subjects} isDark={isDark} />
        </div>

        {/* Right (1 col): Subject Progress Cards */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Subject Progress
          </h3>

          <div className="space-y-3">
            {stats.subjects.map((sub) => (
              <div
                key={sub.name}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-900 dark:text-white truncate max-w-[160px]">
                    {sub.name}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {sub.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-2">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    {sub.completed} / {sub.total} tasks done
                  </span>
                  <span>{formatMinutes(sub.minutes)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
