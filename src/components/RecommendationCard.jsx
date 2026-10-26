import React from 'react';
import { Sparkles, Clock, AlertCircle, CheckCircle, ChevronRight, Play } from 'lucide-react';

/**
 * RecommendationCard Component
 * Renders rule-based study suggestions with transparent rationale tags.
 * HCI Principle: Recognition rather than Recall & Visibility of System Status
 */
export default function RecommendationCard({
  recommendation,
  onAction,
}) {
  const { title, description, reason, type, priority, actionLabel } = recommendation;

  const styleMap = {
    danger: {
      border: 'border-rose-200 dark:border-rose-900/60',
      bg: 'bg-rose-50/50 dark:bg-rose-950/20',
      badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
      icon: AlertCircle,
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
    warning: {
      border: 'border-amber-200 dark:border-amber-900/60',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      icon: Clock,
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    accent: {
      border: 'border-purple-200 dark:border-purple-900/60',
      bg: 'bg-purple-50/50 dark:bg-purple-950/20',
      badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
      icon: Sparkles,
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    success: {
      border: 'border-emerald-200 dark:border-emerald-900/60',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      icon: CheckCircle,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    info: {
      border: 'border-indigo-200 dark:border-indigo-900/60',
      bg: 'bg-indigo-50/50 dark:bg-indigo-950/20',
      badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
      icon: Sparkles,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
  };

  const currentStyle = styleMap[type] || styleMap.info;
  const Icon = currentStyle.icon;

  return (
    <div
      className={`p-5 rounded-2xl border ${currentStyle.border} ${currentStyle.bg} backdrop-blur-sm transition-all hover:shadow-md flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${currentStyle.iconColor}`} />
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${currentStyle.badge}`}
            >
              {reason}
            </span>
          </div>
          {priority && (
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {priority}
            </span>
          )}
        </div>

        <h4 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
          {title}
        </h4>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && (
        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-end">
          <button
            type="button"
            onClick={() => onAction && onAction(recommendation)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition group"
          >
            <span>{actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
