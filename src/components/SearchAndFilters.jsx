import React, { useState } from 'react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import { TASK_TYPES, TASK_STATUSES } from '../utils/taskPriority';

/**
 * SearchAndFilters Component
 * Provides comprehensive searching, multi-criteria filtering, and sorting.
 * HCI Principle: Recognition rather than Recall & Flexibility and Efficiency of Use
 */
export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalTasksCount,
  filteredTasksCount,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All' ||
    typeFilter !== 'All' ||
    sortBy !== 'smart';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Bar: Search Input, Mobile Filter Toggle & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title, description, or subject..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Controls: Filter Toggle (Mobile) & Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`sm:hidden flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition ${
              hasActiveFilters || showMobileFilters
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800'
            }`}
            aria-expanded={showMobileFilters}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Sort:
              </span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => onSortByChange(e.target.value)}
                  className="w-full sm:w-auto pl-8 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                  aria-label="Sort tasks by"
                >
                  <option value="smart">★ Smart Priority (Urgency & Deadline)</option>
                  <option value="deadline-asc">Deadline: Soonest First</option>
                  <option value="deadline-desc">Deadline: Latest First</option>
                  <option value="priority-desc">Priority: High to Low</option>
                  <option value="created-desc">Date Added: Newest First</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Row: Visible on Desktop, Toggleable on Mobile */}
      <div
        className={`pt-3 border-t border-slate-100 dark:border-slate-800/80 ${
          showMobileFilters ? 'block' : 'hidden sm:block'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              {TASK_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority Only</option>
              <option value="Medium">Medium Priority Only</option>
              <option value="Low">Low Priority Only</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Task Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Types</option>
              {TASK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer: Result Counter & Clear Filters Button */}
        <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredTasksCount}</strong> of{' '}
            {totalTasksCount} tasks
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
