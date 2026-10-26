import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  Edit3,
  Trash2,
  CheckCircle2,
  Circle,
  Play,
  MoreVertical,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getDueStatus, formatMinutes } from '../utils/dateUtils';
import { getPriorityBadge, getTypeBadge, getStatusBadge } from '../utils/taskPriority';

/**
 * TaskCard Component
 * Implements accessible interactive task display
 * HCI Principles: Visibility of System Status, Recognition rather than Recall, Error Prevention
 */
export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onStatusChange,
  onStartStudy,
}) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const isCompleted = task.status === 'Completed';

  const dueStatus = getDueStatus(task.dueDate, task.status);
  const priorityInfo = getPriorityBadge(task.priority);
  const typeInfo = getTypeBadge(task.type);
  const statusInfo = getStatusBadge(task.status);

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
          : dueStatus.isOverdue
          ? 'bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-900/60 shadow-sm shadow-rose-100 dark:shadow-none'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Quick Complete Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            aria-label={isCompleted ? `Mark "${task.title}" as pending` : `Mark "${task.title}" as completed`}
            className={`mt-0.5 shrink-0 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 p-0.5 ${
              isCompleted
                ? 'text-emerald-500 hover:text-emerald-600'
                : 'text-slate-300 dark:text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 fill-emerald-100 dark:fill-emerald-950/60" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header: Course / Subject & Badges */}
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
                {task.subject}
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Priority Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityInfo.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dotClass}`} />
                  {task.priority}
                </span>

                {/* Type Badge */}
                <span
                  className={`hidden xs:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${typeInfo.badgeClass}`}
                >
                  {task.type}
                </span>

                {/* Demo marker */}
                {task.isDemo && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Demo
                  </span>
                )}
              </div>
            </div>

            {/* Task Title */}
            <h3
              className={`text-base sm:text-lg font-semibold leading-snug transition-colors ${
                isCompleted
                  ? 'text-slate-500 dark:text-slate-400 line-through'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>

            {/* Description */}
            {task.description && (
              <div className="mt-1.5">
                <p
                  className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${
                    !showFullDesc && task.description.length > 120 ? 'line-clamp-2' : ''
                  }`}
                >
                  {task.description}
                </p>
                {task.description.length > 120 && (
                  <button
                    type="button"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-1 inline-flex items-center gap-0.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {showFullDesc ? (
                      <>
                        Show less <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Metadata Footer: Due Date, Duration, Status Dropdown, Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left pills: Due date & Duration */}
              <div className="flex items-center gap-3 text-xs flex-wrap">
                {/* Due date pill */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium ${
                    dueStatus.isOverdue
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                      : dueStatus.urgency === 'today'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : dueStatus.urgency === 'urgent'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {dueStatus.isOverdue ? (
                    <AlertCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Calendar className="w-3.5 h-3.5" />
                  )}
                  <span>{dueStatus.label}</span>
                </div>

                {/* Duration */}
                <div className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatMinutes(task.estimatedMinutes)}</span>
                </div>

                {/* Status Selector */}
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange && onStatusChange(task.id, e.target.value)}
                  className={`text-xs font-medium rounded-lg px-2 py-1 border transition-colors focus:ring-2 focus:ring-indigo-500 ${
                    task.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                      : task.status === 'In Progress'
                      ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
                      : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                  aria-label={`Change status of ${task.title}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Right Action buttons */}
              <div className="flex items-center gap-1 sm:self-center">
                {/* Focus Study Button */}
                {!isCompleted && onStartStudy && (
                  <button
                    type="button"
                    onClick={() => onStartStudy(task)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 dark:text-indigo-300 text-xs font-semibold transition"
                    title="Start study focus session"
                    aria-label={`Start study session for ${task.title}`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Study</span>
                  </button>
                )}

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Edit task"
                  aria-label={`Edit ${task.title}`}
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                  title="Delete task"
                  aria-label={`Delete ${task.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
