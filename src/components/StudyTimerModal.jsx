import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, X, Sparkles, BookOpen } from 'lucide-react';

/**
 * StudyTimerModal Component
 * Implements interactive focus timer for "Start Studying" action.
 * HCI Principle: Visibility of System Status & Feedback
 */
export default function StudyTimerModal({
  isOpen,
  task,
  onClose,
  onCompleteTask,
}) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(25);

  useEffect(() => {
    if (task) {
      // Default to 25 minutes (Pomodoro) or task's duration if under 45 mins
      const duration = task.estimatedMinutes && task.estimatedMinutes <= 45 ? task.estimatedMinutes : 25;
      setInitialMinutes(duration);
      setSecondsLeft(duration * 60);
      setIsRunning(false);
    }
  }, [task, isOpen]);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  if (!isOpen || !task) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = Math.round(((initialMinutes * 60 - secondsLeft) / (initialMinutes * 60)) * 100);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(initialMinutes * 60);
  };

  const setTimerDuration = (mins) => {
    setIsRunning(false);
    setInitialMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-modal-title"
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Focus Study Session
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close timer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Details */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {task.subject}
          </span>
          <h3
            id="timer-modal-title"
            className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-2"
          >
            {task.title}
          </h3>
        </div>

        {/* Circular Countdown Progress */}
        <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-100 dark:text-slate-800 stroke-current"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-500"
              strokeWidth="6"
              strokeDasharray={276.4}
              strokeDashoffset={276.4 - (276.4 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Time digits */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {isRunning ? 'Stay focused' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Interval Preset Chips */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[15, 25, 45, 60].map((preset) => (
            <button
              key={preset}
              onClick={() => setTimerDuration(preset)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                initialMinutes === preset
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {preset}m
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Reset timer"
            aria-label="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform active:scale-95"
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Focus</span>
              </>
            )}
          </button>
        </div>

        {/* Complete Task Early Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Finished this task early?</span>
          <button
            onClick={() => {
              onCompleteTask(task.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Completed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
