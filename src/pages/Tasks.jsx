import React, { useState, useMemo } from 'react';
import { Plus, ListFilter, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import SearchAndFilters from '../components/SearchAndFilters';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { sortTasks } from '../utils/taskPriority';

/**
 * My Tasks Page
 * Provides full task management: filtering, searching, sorting,
 * creation, editing, status changes, and deletion with safety dialogs.
 * HCI Principle: Visibility of System Status, User Control and Freedom, Error Prevention
 */
export default function Tasks({
  tasks = [],
  onOpenAddTask,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onStartStudy,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('smart');

  // Delete Confirmation State
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter & Sort Logic
  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      // Search query (title, subject, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title?.toLowerCase().includes(query);
        const matchesSubject = task.subject?.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubject && !matchesDesc) {
          return false;
        }
      }

      // Status Filter
      if (statusFilter !== 'All' && task.status !== statusFilter) {
        return false;
      }

      // Priority Filter
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
        return false;
      }

      // Type Filter
      if (typeFilter !== 'All' && task.type !== typeFilter) {
        return false;
      }

      return true;
    });

    return sortTasks(result, sortBy);
  }, [tasks, searchQuery, statusFilter, priorityFilter, typeFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setTypeFilter('All');
    setSortBy('smart');
  };

  const handleRequestDelete = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            My Academic Tasks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize assignments, exams, readings, and projects across your courses.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddTask}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm shadow-indigo-200 dark:shadow-none transition"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onResetFilters={handleResetFilters}
        totalTasksCount={tasks.length}
        filteredTasksCount={filteredAndSortedTasks.length}
      />

      {/* Tasks List / Empty States */}
      {filteredAndSortedTasks.length === 0 ? (
        <EmptyState
          type={tasks.length === 0 ? 'no-tasks' : 'no-search-results'}
          onAction={tasks.length === 0 ? onOpenAddTask : handleResetFilters}
          actionLabel={tasks.length === 0 ? 'Create First Task' : 'Reset All Filters'}
        />
      ) : (
        <div className="space-y-3">
          {filteredAndSortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={handleRequestDelete}
              onStatusChange={onStatusChange}
              onStartStudy={onStartStudy}
            />
          ))}
        </div>
      )}

      {/* Confirmation Dialog for Deletion */}
      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        title="Delete Academic Task?"
        message={`Are you sure you want to permanently delete "${taskToDelete?.title}" from ${taskToDelete?.subject}? This action cannot be undone.`}
        confirmLabel="Delete Task"
        cancelLabel="Keep Task"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}
