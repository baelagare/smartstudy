import React, { useState } from 'react';
import {
  GraduationCap,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Sun,
  Moon,
  Clock,
  Flame,
  Brain,
  Shield,
  User,
  School,
  BookOpen,
  Target,
  Lock,
  Mail,
  Zap,
} from 'lucide-react';
import {
  PRESET_PROFILES,
  STUDY_STYLES,
  UNIVERSITIES,
  MAJORS,
} from '../utils/userProfiles';

/**
 * Login & Personalization Page
 * Implements accessible sign-in and personalized student onboarding.
 * Complies with modern web form standards: autocomplete, enterkeyhint, show/hide password, and semantic HTML.
 */
export default function Login({
  initialMode = 'signin', // 'signin' or 'signup'
  theme = 'light',
  onToggleTheme,
  onLoginSuccess,
  onNavigate,
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sign-in form state
  const [signInEmail, setSignInEmail] = useState('alex.rivera@berkeley.edu');
  const [signInPassword, setSignInPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign-up / Personalization form state
  const [signupStep, setSignupStep] = useState(1); // 1: Credentials, 2: Academic Profile, 3: Study Habits
  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    password: '',
    university: UNIVERSITIES[0],
    customUniversity: '',
    major: MAJORS[0],
    customMajor: '',
    year: 'Junior (3rd Year)',
    dailyStudyGoalHours: 3.5,
    preferredStudyStyle: 'pomodoro',
    avatarEmoji: '🎓',
  });

  // Handle Quick Demo Login
  const handleQuickDemoSelect = (profile) => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess({
        ...profile,
        isLoggedIn: true,
      });
      setIsLoading(false);
    }, 400);
  };

  // Handle Regular Sign-In
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signInEmail.trim() || !signInPassword.trim()) {
      setErrorMessage('Please enter both your student email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate login and check if matches preset or create dynamic profile
    setTimeout(() => {
      const matched = PRESET_PROFILES.find(
        (p) => p.email.toLowerCase() === signInEmail.trim().toLowerCase()
      );

      if (matched) {
        onLoginSuccess({
          ...matched,
          isLoggedIn: true,
        });
      } else {
        // Derive name from email username
        const autoName =
          signInEmail.split('@')[0].replace(/[._-]/g, ' ') || 'Student';
        const formattedName = autoName
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        onLoginSuccess({
          id: `user_${Date.now()}`,
          name: formattedName,
          email: signInEmail.trim(),
          university: 'University Scholar',
          major: 'General Studies',
          year: 'Undergraduate',
          dailyStudyGoalHours: 3.0,
          preferredStudyStyle: 'pomodoro',
          studyStyleLabel: 'Pomodoro (25/5 min)',
          avatarEmoji: '🎓',
          isLoggedIn: true,
        });
      }

      setIsLoading(false);
    }, 450);
  };

  // Handle Personalization / Sign-Up
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (signupStep === 1) {
      if (!personalData.name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!personalData.email.trim()) {
        setErrorMessage('Please provide a valid email address.');
        return;
      }
      if (!personalData.password || personalData.password.length < 4) {
        setErrorMessage('Password must be at least 4 characters long.');
        return;
      }
      setSignupStep(2);
      return;
    }

    if (signupStep === 2) {
      setSignupStep(3);
      return;
    }

    // Final Step 3 Completion
    setIsLoading(true);
    setTimeout(() => {
      const chosenUniversity =
        personalData.university === 'Other Institution' &&
        personalData.customUniversity.trim()
          ? personalData.customUniversity.trim()
          : personalData.university;

      const chosenMajor =
        personalData.major === 'Other Major' && personalData.customMajor.trim()
          ? personalData.customMajor.trim()
          : personalData.major;

      const chosenStyle = STUDY_STYLES.find(
        (s) => s.id === personalData.preferredStudyStyle
      );

      const newProfile = {
        id: `user_${Date.now()}`,
        name: personalData.name.trim(),
        email: personalData.email.trim(),
        university: chosenUniversity,
        major: chosenMajor,
        year: personalData.year,
        dailyStudyGoalHours: parseFloat(personalData.dailyStudyGoalHours) || 3.0,
        preferredStudyStyle: personalData.preferredStudyStyle,
        studyStyleLabel: `${chosenStyle?.name || 'Pomodoro'} (${chosenStyle?.workMinutes || 25}/${chosenStyle?.breakMinutes || 5}m)`,
        avatarEmoji: personalData.avatarEmoji || '🎓',
        isLoggedIn: true,
      };

      onLoginSuccess(newProfile);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </header>

      {/* Main Authentication & Personalization Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden animate-fade-in">
          {/* Header Brand Banner */}
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 text-center relative overflow-hidden bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/20 to-transparent">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-500/20 mb-3">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {mode === 'signin'
                ? 'Welcome Back to Acuity'
                : 'Personalize Your Study Workspace'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {mode === 'signin'
                ? 'Sign in to access your prioritized tasks, time-blocked planner, and focus timers.'
                : 'Tailor your daily study schedule, focus techniques, and academic goals.'}
            </p>

            {/* Mode Toggle Switcher */}
            <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Create Account & Personalize
              </button>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8">
            {errorMessage && (
              <div
                role="alert"
                className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300 animate-fade-in"
              >
                {errorMessage}
              </div>
            )}

            {/* A. SIGN-IN MODE */}
            {mode === 'signin' && (
              <div className="space-y-6">
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  {/* Student Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      Student Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="username"
                        required
                        enterKeyHint="next"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="alex.rivera@berkeley.edu"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 transition"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="current-password"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          alert('For this offline prototype, you can log in with any password or use the 1-Click Demo Profiles below!')
                        }
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="current-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        enterKeyHint="done"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title={showPassword ? 'Hide password' : 'Show password'}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Remember this browser session</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="inline-block animate-spin mr-1">⌛</span>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    <span>{isLoading ? 'Verifying Session...' : 'Sign In to Workspace'}</span>
                  </button>
                </form>

                {/* 1-Click Preset Personas Divider */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      ⚡ 1-Click Evaluator & Demo Logins:
                    </span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      Instant Access
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {PRESET_PROFILES.map((profile) => (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => handleQuickDemoSelect(profile)}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/30 text-left transition flex items-center gap-2.5 group"
                      >
                        <span className="text-xl shrink-0">{profile.avatarEmoji}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {profile.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {profile.major.split('&')[0]}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* B. SIGN-UP / PERSONALIZATION MODE */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="space-y-5">
                {/* Step Indicator Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Step {signupStep} of 3:{' '}
                    {signupStep === 1
                      ? 'Account Details'
                      : signupStep === 2
                      ? 'Academic Discipline'
                      : 'Study Habits & Goals'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        signupStep >= 1 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        signupStep >= 2 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        signupStep >= 3 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  </div>
                </div>

                {/* STEP 1: Basic Student Account */}
                {signupStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="signup-name"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Student Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="signup-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={personalData.name}
                          onChange={(e) =>
                            setPersonalData({ ...personalData, name: e.target.value })
                          }
                          placeholder="e.g. Maya Chen"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="signup-email"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        University Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="signup-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="username"
                          value={personalData.email}
                          onChange={(e) =>
                            setPersonalData({ ...personalData, email: e.target.value })
                          }
                          placeholder="student@university.edu"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="signup-password"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Create Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          id="signup-password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={personalData.password}
                          onChange={(e) =>
                            setPersonalData({ ...personalData, password: e.target.value })
                          }
                          placeholder="At least 4 characters"
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <span>Continue to Academic Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: Academic Profile Personalization */}
                {signupStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    {/* University / College */}
                    <div>
                      <label
                        htmlFor="signup-university"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        University / Institution
                      </label>
                      <select
                        id="signup-university"
                        value={personalData.university}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, university: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                      >
                        {UNIVERSITIES.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>

                      {personalData.university === 'Other Institution' && (
                        <input
                          type="text"
                          value={personalData.customUniversity}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              customUniversity: e.target.value,
                            })
                          }
                          placeholder="Enter your university name"
                          className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                        />
                      )}
                    </div>

                    {/* Major / Field of Study */}
                    <div>
                      <label
                        htmlFor="signup-major"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Major / Field of Study
                      </label>
                      <select
                        id="signup-major"
                        value={personalData.major}
                        onChange={(e) =>
                          setPersonalData({ ...personalData, major: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                      >
                        {MAJORS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>

                      {personalData.major === 'Other Major' && (
                        <input
                          type="text"
                          value={personalData.customMajor}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              customMajor: e.target.value,
                            })
                          }
                          placeholder="Enter your field of study"
                          className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                        />
                      )}
                    </div>

                    {/* Academic Year */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Current Academic Standing
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            onClick={() =>
                              setPersonalData({ ...personalData, year: `${yr}` })
                            }
                            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                              personalData.year.startsWith(yr)
                                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {yr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(1)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                      >
                        <span>Continue to Study Habits</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Study Habits, Daily Target & Focus Style */}
                {signupStep === 3 && (
                  <div className="space-y-5 animate-fade-in">
                    {/* Daily Target Slider / Pills */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          Target Daily Study Hours
                        </label>
                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                          {personalData.dailyStudyGoalHours} Hours / day
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.5"
                        value={personalData.dailyStudyGoalHours}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            dailyStudyGoalHours: parseFloat(e.target.value),
                          })
                        }
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>1.0h (Light)</span>
                        <span>3.5h (Recommended)</span>
                        <span>8.0h (Intense)</span>
                      </div>
                    </div>

                    {/* Preferred Focus Methodology */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Preferred Focus Technique
                      </label>
                      <div className="space-y-2">
                        {STUDY_STYLES.map((style) => (
                          <div
                            key={style.id}
                            onClick={() =>
                              setPersonalData({
                                ...personalData,
                                preferredStudyStyle: style.id,
                              })
                            }
                            className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                              personalData.preferredStudyStyle === style.id
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <div
                              className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                personalData.preferredStudyStyle === style.id
                                  ? 'border-indigo-600 bg-indigo-600 text-white'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {personalData.preferredStudyStyle === style.id && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{style.name}</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                  {style.workMinutes}m work / {style.breakMinutes}m rest
                                </span>
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {style.tagline}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Avatar Emoji Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Choose Your Workspace Avatar
                      </label>
                      <div className="flex items-center gap-2">
                        {['🎓', '💻', '🧬', '📈', '🔬', '📚', '⚡', '💡'].map(
                          (emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() =>
                                setPersonalData({
                                  ...personalData,
                                  avatarEmoji: emoji,
                                })
                              }
                              className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition ${
                                personalData.avatarEmoji === emoji
                                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 shadow-sm scale-110'
                                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {emoji}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(2)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {isLoading
                            ? 'Creating Personalized Workspace...'
                            : 'Launch My Acuity Workspace 🚀'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Privacy Note Footer */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                100% Client-Side Privacy: Your student profile and coursework remain local on your device.
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-400">
        Acuity • Personalized Human-Centered Academic Study Planner
      </footer>
    </div>
  );
}
