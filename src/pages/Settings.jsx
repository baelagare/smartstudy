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
  GraduationCap,
  Sparkles,
  LogOut,
  Target,
  Flame,
} from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  PRESET_PROFILES,
  STUDY_STYLES,
  UNIVERSITIES,
  MAJORS,
} from '../utils/userProfiles';

/**
 * Settings Page
 * Manages personalized student profile, focus techniques, theme, and data management.
 * HCI Principle: User Control and Freedom & Error Prevention
 */
export default function Settings({
  userName = 'Alex',
  onUpdateUserName,
  currentUser = null,
  onUpdateUserProfile,
  onLogout,
  onSwitchProfile,
  theme = 'light',
  onToggleTheme,
  onClearAllTasks,
  onResetDemoData,
  totalTasks = 0,
}) {
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || userName,
    university: currentUser?.university || 'UC Berkeley',
    major: currentUser?.major || 'Computer Science & HCI',
    year: currentUser?.year || 'Junior (3rd Year)',
    dailyStudyGoalHours: currentUser?.dailyStudyGoalHours || 3.5,
    preferredStudyStyle: currentUser?.preferredStudyStyle || 'pomodoro',
    avatarEmoji: currentUser?.avatarEmoji || '🎓',
  });

  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (profileForm.name.trim()) {
      const chosenStyle = STUDY_STYLES.find(
        (s) => s.id === profileForm.preferredStudyStyle
      );

      const updated = {
        ...(currentUser || {}),
        name: profileForm.name.trim(),
        university: profileForm.university,
        major: profileForm.major,
        year: profileForm.year,
        dailyStudyGoalHours: parseFloat(profileForm.dailyStudyGoalHours) || 3.5,
        preferredStudyStyle: profileForm.preferredStudyStyle,
        studyStyleLabel: `${chosenStyle?.name || 'Pomodoro'} (${chosenStyle?.workMinutes || 25}/${chosenStyle?.breakMinutes || 5}m)`,
        avatarEmoji: profileForm.avatarEmoji || '🎓',
      };

      if (onUpdateUserProfile) {
        onUpdateUserProfile(updated);
      }
      if (onUpdateUserName) {
        onUpdateUserName(profileForm.name.trim());
      }

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
          <span>Personalization & Settings</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your student academic profile, daily study targets, visual appearance, and local storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Comprehensive Student Profile & Personalization Section */}
        <section
          className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          aria-labelledby="profile-heading"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{profileForm.avatarEmoji}</span>
              <h3 id="profile-heading" className="text-base font-bold text-slate-900 dark:text-white">
                Personalized Academic Profile
              </h3>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950">
              Active Profile
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Display Name */}
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
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Institution / College */}
              <div>
                <label
                  htmlFor="profile-university"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  University / College
                </label>
                <select
                  id="profile-university"
                  value={profileForm.university}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, university: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  {UNIVERSITIES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Major / Discipline */}
              <div>
                <label
                  htmlFor="profile-major"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Major / Field of Study
                </label>
                <select
                  id="profile-major"
                  value={profileForm.major}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, major: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  {MAJORS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Academic Year */}
              <div>
                <label
                  htmlFor="profile-year"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Academic Standing
                </label>
                <input
                  id="profile-year"
                  type="text"
                  value={profileForm.year}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, year: e.target.value })
                  }
                  placeholder="e.g. Junior (3rd Year)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Daily Target & Focus Technique */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Daily Study Target
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {profileForm.dailyStudyGoalHours} Hours / day
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={profileForm.dailyStudyGoalHours}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      dailyStudyGoalHours: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Focus Interval
                </label>
                <select
                  value={profileForm.preferredStudyStyle}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      preferredStudyStyle: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                >
                  {STUDY_STYLES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.workMinutes}/{s.breakMinutes} min)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Avatar Emoji */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Workspace Avatar
              </label>
              <div className="flex items-center gap-2">
                {['🎓', '💻', '🧬', '📈', '🔬', '📚', '⚡', '💡'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setProfileForm({ ...profileForm, avatarEmoji: emoji })
                    }
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition ${
                      profileForm.avatarEmoji === emoji
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 scale-110 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>

              {showSavedFeedback && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-fade-in">
                  <Check className="w-4 h-4" /> Changes successfully saved!
                </span>
              )}
            </div>
          </form>
        </section>

        {/* 2. Quick Demo Profile Switcher */}
        <section
          className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          aria-labelledby="personas-heading"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 id="personas-heading" className="text-base font-bold text-slate-900 dark:text-white">
                Preset Student Personas
              </h3>
            </div>
            <span className="text-xs text-slate-400">1-Click Fast Switch</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Switch between different academic disciplines to test how Acuity adapts to Computer Science, Pre-Med Biology, and Business Finance workflows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_PROFILES.map((p) => {
              const isCurrent = currentUser?.email === p.email;
              return (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-xl border transition flex flex-col justify-between ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl">{p.avatarEmoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium truncate">
                        {p.major}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isCurrent}
                    onClick={() => {
                      if (onSwitchProfile) onSwitchProfile(p);
                    }}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold transition mt-2 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white cursor-default'
                        : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isCurrent ? 'Active Persona' : 'Switch to ' + p.name.split(' ')[0]}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sign Out Option */}
          {onLogout && (
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <p className="text-xs text-slate-500">
                Want to test the Landing page or sign in with another account?
              </p>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out to Landing</span>
              </button>
            </div>
          )}
        </section>

        {/* 3. Appearance Section */}
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

        {/* 4. Data Persistence & Storage Information */}
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
                  All your academic tasks, personalized preferences, and progress calculations are securely persisted in your web browser's <code>localStorage</code>.
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
                  Your academic records, student credentials, and deadlines never leave this device.
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
