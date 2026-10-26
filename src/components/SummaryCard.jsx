import React from 'react';

/**
 * SummaryCard Component
 * Displays high-level academic metrics with clear visual hierarchy
 * HCI Principle: Visibility of System Status
 */
export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  onClick,
}) {
  const variantStyles = {
    default: {
      border: 'border-slate-200/80 dark:border-slate-800',
      bg: 'bg-white dark:bg-slate-900',
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      badge: null,
    },
    primary: {
      border: 'border-indigo-100 dark:border-indigo-950',
      bg: 'bg-white dark:bg-slate-900',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
      badge: 'text-indigo-600 dark:text-indigo-400',
    },
    amber: {
      border: 'border-amber-100 dark:border-amber-950',
      bg: 'bg-white dark:bg-slate-900',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      badge: 'text-amber-600 dark:text-amber-400',
    },
    success: {
      border: 'border-emerald-100 dark:border-emerald-950',
      bg: 'bg-white dark:bg-slate-900',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      badge: 'text-emerald-600 dark:text-emerald-400',
    },
    danger: {
      border: 'border-rose-100 dark:border-rose-950',
      bg: 'bg-white dark:bg-slate-900',
      iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
      badge: 'text-rose-600 dark:text-rose-400',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border ${currentVariant.border} ${currentVariant.bg} shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:translate-y-[-2px]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentVariant.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
      </div>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
