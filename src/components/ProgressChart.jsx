import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

/**
 * ProgressChart Component
 * Visualizes academic progress by subject and completion percentage.
 * HCI Principle: Visibility of System Status & Aesthetic and Minimalist Design
 */
export default function ProgressChart({ subjects = [], isDark = false }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
        <p className="text-sm">No subject data to chart yet. Add tasks with course titles to see your subject breakdown.</p>
      </div>
    );
  }

  // Color palette for subjects
  const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  const chartData = subjects.map((sub, idx) => ({
    name: sub.name.length > 14 ? sub.name.substring(0, 12) + '…' : sub.name,
    fullName: sub.name,
    Completed: sub.completed,
    Pending: sub.pending + sub.inProgress,
    total: sub.total,
    percentage: sub.percentage,
    color: COLORS[idx % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-xs">
          <p className="font-bold text-slate-900 dark:text-white mb-1">{data.fullName}</p>
          <div className="space-y-0.5">
            <p className="text-emerald-600 dark:text-emerald-400">
              Completed: <span className="font-semibold">{data.Completed}</span>
            </p>
            <p className="text-indigo-600 dark:text-indigo-400">
              Pending / In Progress: <span className="font-semibold">{data.Pending}</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700">
              Completion Rate: <span className="font-bold text-slate-700 dark:text-slate-200">{data.percentage}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis
              dataKey="name"
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Completed" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Pending" stackId="a" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          <span>Pending / In Progress</span>
        </div>
      </div>
    </div>
  );
}
