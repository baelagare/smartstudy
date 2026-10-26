import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Moon,
  Sun,
  Database,
  Trash2,
  RefreshCw,
  HardDrive,
  Shield,
  Save,
  Check,
} from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

/**
 * Settings Page
 * Manages user preferences, theme, data resets, and local storage information.
 * HCI Principle: User Control and Freedom & Error Prevention
 */
export default function Settings({
  userName = 'Alex',
  onUpdateUserName,
  theme = 'light',
  onToggleTheme,
  onClearAllTasks,
  onResetDemoData,
  totalTasks = 0,
}) {
  const [nameInput, setNameInput] = useState(userName);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateUserName(nameInput.trim());
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2500);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Application Preferences</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile, visual appearance, and local browser storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Profile Section */}
        <section
          className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          aria-labelledby="profile-heading"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 id="profile-heading" className="text-base font-bold text-slate-900 dark:text-white">
              Student Profile
            </h3>
          </div>

          <form onSubmit={handleSaveName} className="space-y-4 max-w-md">
            <div>
              <label
                htmlFor="display-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Preferred Display Name
              </label>
              <input
                id="display-name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Alex"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                Used in greetings, reminders, and personalized recommendations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Name</span>
              </button>

              {showSavedFeedback && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-fade-in">
                  <Check className="w-4 h-4" /> Saved!
                </span>
              )}
            </div>
          </form>
        </section>

        {/* 2. Appearance Section */}
        <section
          className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          aria-labelledby="appearance-heading"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 id="appearance-heading" className="text-base font-bold text-slate-900 dark:text-white">
              Visual Theme
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Switch between light and high-contrast dark theme.
              </p>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold transition"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Switch to Dark</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* 3. Data Persistence & Storage Information */}
        <section
          className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          aria-labelledby="storage-heading"
        >
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 id="storage-heading" className="text-base font-bold text-slate-900 dark:text-white">
              Data Persistence & Privacy
            </h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <HardDrive className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Client-Side Local Storage
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  All your academic tasks, preferences, and progress calculations are securely persisted in your web browser's <code>localStorage</code>. No external database or server is required for this prototype.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Privacy-by-Design
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Your academic records and task deadlines never leave this device. Clearing your browser cache or pressing the button below will remove all stored data.
                </p>
              </div>
            </div>
          </div>

          {/* Data Management Actions */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs sm:text-sm font-semibold transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Sample Demo Tasks</span>
            </button>

            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 hover:bg-rose-100 text-xs sm:text-sm font-semibold transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Local Tasks ({totalTasks})</span>
            </button>
          </div>
        </section>
      </div>

      {/* Confirmation Dialog for Clearing Data */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear All Local Tasks?"
        message="This will delete every task from your browser localStorage. You will start with an empty workspace. This action cannot be reversed."
        confirmLabel="Yes, Clear Everything"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={() => {
          onClearAllTasks();
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />

      {/* Confirmation Dialog for Resetting to Demo */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset to Sample Demo Tasks?"
        message="This will replace your current task list with the initial set of academic demo tasks (covering assignments, exams, projects, and readings)."
        confirmLabel="Reset to Demo"
        cancelLabel="Cancel"
        isDanger={false}
        onConfirm={() => {
          onResetDemoData();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
}
