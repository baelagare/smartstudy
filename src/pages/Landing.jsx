import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  Flame,
  Award,
  Shield,
  Zap,
  Target,
  Brain,
  Sun,
  Moon,
  LogIn,
  Play,
  Check,
  BarChart3,
  BookOpen,
  ChevronRight,
  Star,
  Users,
  Layers,
  Menu,
  X,
  Laptop,
} from 'lucide-react';
import { PRESET_PROFILES, STUDY_STYLES } from '../utils/userProfiles';

/**
 * Landing Page Component
 * High-conversion, visually stunning introduction to Acuity.
 * Highlights personalization, research-backed cognitive heuristics, and offline-first privacy.
 */
export default function Landing({
  theme = 'light',
  onToggleTheme,
  onNavigate,
  onQuickDemoLogin,
  currentUser = null,
}) {
  const [activeFeatureTab, setActiveFeatureTab] = useState('prioritizer');
  const [selectedPersona, setSelectedPersona] = useState(PRESET_PROFILES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive demo states for the landing preview
  const [previewTimerRunning, setPreviewTimerRunning] = useState(false);
  const [previewTimerSeconds, setPreviewTimerSeconds] = useState(25 * 60);
  const [completedPreviewTasks, setCompletedPreviewTasks] = useState([false, false, false]);

  const togglePreviewTask = (idx) => {
    setCompletedPreviewTasks((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Acuity
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Clarity in Focus. Plan Smarter. Study Better.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Features
            </a>
            <a href="#personalization" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Personalization
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              How It Works
            </a>
            <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Testimonials
            </a>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {currentUser ? (
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition transform active:scale-95"
              >
                <span>Dashboard ({currentUser.name?.split(' ')[0] || 'App'})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-xs sm:text-sm transition"
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('login', { mode: 'signup' })}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition transform active:scale-95 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started Free</span>
                </button>
              </>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-5 space-y-3 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 animate-fade-in">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Features
            </a>
            <a
              href="#personalization"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Personalization
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Testimonials
            </a>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('login');
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-semibold text-sm"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('login', { mode: 'signup' });
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-center font-semibold text-sm"
              >
                Create Free Profile
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/15 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm mb-6 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>Human-Centered Academic Workflow • Research-Backed Usability</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15] sm:leading-[1.12]">
            Master Your Coursework with{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              Clarity & Focus.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate deadline paralysis with intelligent cognitive prioritization, personalized study pacing, and science-backed focus timers tuned to your college major.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => onNavigate('login', { mode: 'signup' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Personalize Your Flow</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onQuickDemoLogin) {
                  onQuickDemoLogin(PRESET_PROFILES[0]);
                } else {
                  onNavigate('dashboard');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm sm:text-base shadow-sm transition whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400 shrink-0" />
              <span className="whitespace-nowrap">Explore Live Demo as Alex</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 max-w-5xl mx-auto text-left">
            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                94% On-Time Completion
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-400 shrink-0">
                <Shield className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                100% Client-Side Privacy
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400 shrink-0">
                <Brain className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                Low Cognitive Fatigue
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950/70 dark:text-violet-400 shrink-0">
                <Zap className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                Zero Cloud Tracking
              </span>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE PRODUCT SHOWROOM MOCKUP */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Showroom Header Tab Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Interactive Workspace Preview
                </span>
              </div>

              {/* Showroom Switcher Tabs */}
              <div className="flex items-center gap-1 sm:gap-2 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80">
                {[
                  { id: 'prioritizer', label: 'Prioritized Tasks', icon: Target },
                  { id: 'timer', label: 'Focus Timer', icon: Flame },
                  { id: 'planner', label: 'Study Planner', icon: Calendar },
                  { id: 'insights', label: 'Progress Metrics', icon: BarChart3 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeFeatureTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFeatureTab(tab.id)}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition ${isActive
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab 1 Content: Prioritized Task List Interactive Preview */}
            {activeFeatureTab === 'prioritizer' && (
              <div className="p-5 sm:p-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Smart Urgency Engine</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        Weighted by Exam Impact & Deadline
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Try clicking checkboxes to test the instant completion feedback!
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {completedPreviewTasks.filter(Boolean).length} of 3 done
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: 'Database Systems Final Project Milestone 2',
                      course: 'CS 340 - Database Systems',
                      badge: 'High Priority • Due in 2 Days',
                      badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
                      time: '120 min',
                    },
                    {
                      title: 'HCI Usability Evaluation Report',
                      course: 'CS 465 - Human-Computer Interaction',
                      badge: 'Urgent • Due Today',
                      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
                      time: '75 min',
                    },
                    {
                      title: 'Linear Algebra Midterm Exam Prep',
                      course: 'MATH 220 - Linear Algebra',
                      badge: 'High Impact • Due in 5 Days',
                      badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
                      time: '180 min',
                    },
                  ].map((task, idx) => (
                    <div
                      key={idx}
                      onClick={() => togglePreviewTask(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${completedPreviewTasks[idx]
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 opacity-70'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-300 shadow-sm'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${completedPreviewTasks[idx]
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                            }`}
                        >
                          {completedPreviewTasks[idx] && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-bold truncate ${completedPreviewTasks[idx]
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-white'
                              }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {task.course}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`hidden sm:inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${task.badgeColor}`}
                        >
                          {task.badge}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {task.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2 Content: Focus Timer Preview */}
            {activeFeatureTab === 'timer' && (
              <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-xs font-bold mb-4">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Pomodoro 25/5 Neuro-Interval</span>
                </div>

                <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white my-3">
                  {formatTimer(previewTimerSeconds)}
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                  Studying: <strong className="text-slate-800 dark:text-slate-200">Database Systems Normalization (3NF)</strong>
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewTimerRunning(!previewTimerRunning)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
                  >
                    {previewTimerRunning ? 'Pause Session' : 'Start Focus Sprint'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPreviewTimerRunning(false);
                      setPreviewTimerSeconds(25 * 60);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3 Content: Study Planner Preview */}
            {activeFeatureTab === 'planner' && (
              <div className="p-5 sm:p-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Visual Time-Blocked Schedule</span>
                  </h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Optimal Daily Workload
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      🌅 Morning (9:00 - 11:30 AM)
                    </span>
                    <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                      High-Priority Problem Set
                    </p>
                    <p className="text-xs text-slate-500 mt-1">CS 340 Normalized Schema & ACID tests (75 min)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-violet-50/60 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">
                      ☀️ Afternoon (2:00 - 4:00 PM)
                    </span>
                    <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                      HCI Usability Synthesis
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Nielsen Heuristic user test writeup (60 min)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      🌙 Evening (7:30 - 8:45 PM)
                    </span>
                    <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                      Reading & Active Recall
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Cognitive Psychology Chapter 7 Flashcards (45 min)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4 Content: Progress Metrics Preview */}
            {activeFeatureTab === 'insights' && (
              <div className="p-5 sm:p-8 space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">83%</span>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Completion Velocity</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">14.5h</span>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Focus Time Logged</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black text-amber-500">5 Days</span>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Active Study Streak</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black text-violet-600 dark:text-violet-400">0 Overdue</span>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Current Clean Slate</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. PERSONALIZATION SPOTLIGHT SECTION */}
      <section id="personalization" className="py-16 sm:py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800">
              Discipline-Specific Personalization
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white whitespace-normal sm:whitespace-nowrap">
              Built Around Your Major, Pacing & Study Habit.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              A computer science student debugging algorithms has vastly different cognitive demands than a pre-med student memorizing organic chemistry pathways. Acuity adapts to both.
            </p>
          </div>

          {/* Interactive Persona Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {PRESET_PROFILES.map((profile) => {
              const isSelected = selectedPersona.id === profile.id;
              return (
                <div
                  key={profile.id}
                  onClick={() => setSelectedPersona(profile)}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-lg shadow-indigo-500/10 scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{profile.avatarEmoji}</span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {profile.name}
                      </h3>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        {profile.major}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    "{profile.bio}"
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Institution:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.university}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Daily Target:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.dailyStudyGoalHours} Hours / day</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Focus Style:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.studyStyleLabel}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onQuickDemoLogin) {
                        onQuickDemoLogin(profile);
                      } else {
                        onNavigate('login');
                      }
                    }}
                    className="mt-5 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Launch Workspace as {profile.name.split(' ')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* 3 Study Techniques Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            {STUDY_STYLES.map((style) => (
              <div key={style.id} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {style.name} ({style.workMinutes}/{style.breakMinutes}m)
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE HCI FEATURES GRID */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800">
              Designed for Human Ergonomics
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white whitespace-normal sm:whitespace-nowrap">
              Every Screen Adheres to Nielsen-Norman Usability.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Acuity isn't another bloated corporate task manager. It is purposefully sculpted for academic cognition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Target,
                title: 'Smart Urgency Prioritizer',
                desc: 'Evaluates upcoming deadlines, exam weight, and task complexity so you never freeze asking "what should I do first?".',
                color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50',
              },
              {
                icon: Calendar,
                title: 'Time-Blocked Day Planner',
                desc: 'Visually allocates coursework across morning, afternoon, and evening blocks so your daily targets feel realistic and achievable.',
                color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50',
              },
              {
                icon: Flame,
                title: 'Science-Backed Focus Mode',
                desc: 'Built-in Pomodoro, Deep Work, and Sprint intervals with audio chime alerts to keep you in flow state without phone distractions.',
                color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50',
              },
              {
                icon: Sparkles,
                title: 'Explainable Advice Engine',
                desc: 'Contextual recommendations with clear reasons ("Due in 24 hours", "High course weight"), never black-box opaque automation.',
                color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50',
              },
              {
                icon: BarChart3,
                title: 'Velocity & Coursework Insights',
                desc: 'Dynamic interactive charts showing completion percentage, subject time allocation, and active streak continuity.',
                color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50',
              },
              {
                icon: Shield,
                title: 'Offline-First & 100% Private',
                desc: 'Your study habits, notes, and records are stored exclusively in your browser localStorage. Zero telemetry or data mining.',
                color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800">
              Zero Learning Curve
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              From Chaos to Clarity in Three Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Personalize Your Profile',
                desc: 'Select your university, major, and focus technique (Pomodoro 25/5 or Deep Work 50/10). Acuity tunes its pacing heuristics to your workload.',
              },
              {
                step: '02',
                title: 'Drop In Your Coursework',
                desc: 'Quickly input problem sets, midterm readings, and final projects. Acuity instantly computes urgency scores and flags high-priority bottlenecks.',
              },
              {
                step: '03',
                title: 'Enter Flow State',
                desc: 'Open the study timer, block off distractions, and execute tasks with laser focus. Watch your completion velocity rise every day.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative shadow-sm"
              >
                <div className="text-4xl font-black text-indigo-600/30 dark:text-indigo-400/20 mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STUDENT TESTIMONIALS */}
      <section id="testimonials" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800">
              Student Experiences
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white whitespace-normal sm:whitespace-nowrap">
              Loved by Undergrads & Grad Students Alike
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Elena Rostova',
                role: 'CS & Cognitive Science • UC Berkeley',
                quote:
                  'Acuity changed my midterm season. Instead of staring at 12 tasks on a giant canvas and feeling overwhelmed, the smart urgency prioritizer pointed me to exactly what to do first.',
                stars: 5,
              },
              {
                name: 'Marcus Vance',
                role: 'Biomedical Engineering • Johns Hopkins',
                quote:
                  'The Deep Work (50/10) timer combined with the time-blocked study planner allowed me to finish my lab writeups 2 days ahead of schedule for the first time this semester.',
                stars: 5,
              },
              {
                name: 'Chloe Davenport',
                role: 'Economics & Statistics • NYU Stern',
                quote:
                  'I love that it works 100% offline and respects my privacy. The interface feels snappy, modern, and has zero corporate bloat. It just works.',
                stars: 5,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-600 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight max-w-3xl mx-auto whitespace-normal sm:whitespace-nowrap">
              Ready to Upgrade Your Academic Performance?
            </h2>
            <p className="mt-3 text-indigo-100 text-sm sm:text-base max-w-lg mx-auto">
              Set up your student profile in 60 seconds and experience stress-free, prioritized study planning.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('login', { mode: 'signup' })}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-indigo-700 hover:bg-slate-50 font-bold text-sm sm:text-base shadow-lg transition transform active:scale-95 whitespace-nowrap"
              >
                Create Free Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onQuickDemoLogin) {
                    onQuickDemoLogin(PRESET_PROFILES[0]);
                  } else {
                    onNavigate('dashboard');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-900/60 hover:bg-indigo-900/80 text-white font-semibold text-sm sm:text-base border border-white/20 transition whitespace-nowrap"
              >
                Launch Live Demo as Alex
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              Acuity
            </span>
            <span className="text-slate-400">| Plan Smarter. Study Better. Clarity in Focus.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Workspace
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('login', { mode: 'signup' })}
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Personalize
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
