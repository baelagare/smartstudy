import React from 'react';
import {
  Sparkles,
  BrainCircuit,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import { generateRecommendations } from '../utils/recommendations';

/**
 * Recommendations Page
 * Rule-based personalized study heuristics.
 * HCI Principle: Visibility of System Status & Recognition rather than Recall
 */
export default function Recommendations({
  tasks = [],
  userName = 'Alex',
  onNavigate,
  onOpenAddTask,
  onStartStudy,
}) {
  const recommendations = generateRecommendations(tasks, userName);

  const handleRecommendationAction = (rec) => {
    if (rec.actionType === 'create_task') {
      onOpenAddTask();
    } else if (rec.actionType === 'view_planner') {
      onNavigate('planner');
    } else if (rec.actionType === 'view_tasks') {
      onNavigate('tasks');
    } else if (rec.actionType === 'start_study' || rec.actionType === 'start_timer') {
      if (rec.taskId) {
        const found = tasks.find((t) => t.id === rec.taskId);
        if (found) {
          onStartStudy(found);
          return;
        }
      }
      onNavigate('planner');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Personalized Study Recommendations
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Actionable, context-aware suggestions calculated from your current task deadlines, course weights, and estimated effort.
        </p>
      </div>

      {/* Transparent System Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong className="font-semibold text-slate-900 dark:text-white">
            How these suggestions work:
          </strong>{' '}
          In this HCI prototype, recommendations are generated through deterministic, rule-based heuristics that continuously monitor deadline proximity, task complexity, and subject priority. No third-party AI APIs or external trackers are invoked. In future production iterations, this architecture is primed for integration with adaptive learning models.
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            onAction={handleRecommendationAction}
          />
        ))}
      </div>

      {/* Academic Best Practice Tips */}
      <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Core Evidence-Based Study Strategies</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Spaced Repetition
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Reviewing concepts in 3 short sessions across the week yields 40% higher exam retention than cramming the night before.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Active Recall
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Close your lecture notes and practice writing down key principles from memory or answering flashcard questions.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Task Chunking
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Break long projects into manageable 30-minute milestones. Celebrate small checkmarks to sustain psychological momentum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
