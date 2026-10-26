import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { TASK_TYPES, TASK_STATUSES } from '../utils/taskPriority';
import { getTodayInputDate } from '../utils/dateUtils';

/**
 * TaskForm Modal Component
 * Used for both creating new tasks and editing existing tasks.
 * HCI Principles: Error Prevention, Consistency and Standards, Accessibility
 */
export default function TaskForm({
  isOpen,
  initialData = null,
  onSave,
  onClose,
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    type: 'Assignment',
    dueDate: getTodayInputDate(),
    priority: 'Medium',
    estimatedMinutes: 60,
    status: 'Pending',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subject: initialData.subject || '',
        description: initialData.description || '',
        type: initialData.type || 'Assignment',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : getTodayInputDate(),
        priority: initialData.priority || 'Medium',
        estimatedMinutes: initialData.estimatedMinutes || 60,
        status: initialData.status || 'Pending',
      });
    } else {
      setFormData({
        title: '',
        subject: '',
        description: '',
        type: 'Assignment',
        dueDate: getTodayInputDate(),
        priority: 'Medium',
        estimatedMinutes: 60,
        status: 'Pending',
      });
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (values) => {
    const errs = {};
    if (!values.title || !values.title.trim()) {
      errs.title = 'Task title is required.';
    } else if (values.title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters.';
    }

    if (!values.subject || !values.subject.trim()) {
      errs.subject = 'Course or subject name is required.';
    }

    if (!values.dueDate) {
      errs.dueDate = 'Please select a due date.';
    }

    const minutes = Number(values.estimatedMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      errs.estimatedMinutes = 'Duration must be greater than 0 minutes.';
    } else if (minutes > 1440) {
      errs.estimatedMinutes = 'Estimated duration cannot exceed 24 hours (1440 mins).';
    }

    return errs;
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      title: true,
      subject: true,
      dueDate: true,
      estimatedMinutes: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2
              id="modal-headline"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              {isEditing ? 'Edit Academic Task' : 'Create New Academic Task'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isEditing
                ? 'Update deadline, priority, or study duration'
                : 'Add a new deadline or activity to your personalized planner'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-120px)] overflow-y-auto">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              required
              autoFocus
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              placeholder="e.g., Database Schema Normalization Homework"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-indigo-500 ${
                touched.title && errors.title
                  ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-950/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
              }`}
            />
            {touched.title && errors.title && (
              <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Subject & Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-subject"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Subject / Course <span className="text-rose-500">*</span>
              </label>
              <input
                id="task-subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                onBlur={() => handleBlur('subject')}
                placeholder="e.g., CS 340, PSYC 101"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-indigo-500 ${
                  touched.subject && errors.subject
                    ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-950/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              />
              {touched.subject && errors.subject && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="task-type"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Task Type
              </label>
              <select
                id="task-type"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {TASK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-desc"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Description & Notes (Optional)
            </label>
            <textarea
              id="task-desc"
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Key deliverables, chapter numbers, specific guidelines..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Due Date & Estimated Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-duedate"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                id="task-duedate"
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                onBlur={() => handleBlur('dueDate')}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-indigo-500 ${
                  touched.dueDate && errors.dueDate
                    ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-950/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              />
              {touched.dueDate && errors.dueDate && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.dueDate}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="task-duration"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Est. Duration (Minutes)
              </label>
              <input
                id="task-duration"
                type="number"
                min="5"
                max="1440"
                step="5"
                value={formData.estimatedMinutes}
                onChange={(e) => handleChange('estimatedMinutes', e.target.value)}
                onBlur={() => handleBlur('estimatedMinutes')}
                placeholder="60"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-indigo-500 ${
                  touched.estimatedMinutes && errors.estimatedMinutes
                    ? 'border-rose-400 dark:border-rose-500 bg-rose-50/30 dark:bg-rose-950/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                }`}
              />
              {touched.estimatedMinutes && errors.estimatedMinutes && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.estimatedMinutes}</span>
                </p>
              )}
            </div>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-priority"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-status"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Status
              </label>
              <select
                id="task-status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm shadow-sm shadow-indigo-200 dark:shadow-none transition"
            >
              {isEditing ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
