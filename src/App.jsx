import React, { useState, useEffect, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import MobileNavigation from './components/MobileNavigation';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import StudyTimerModal from './components/StudyTimerModal';
import Toast from './components/Toast';

// Pages
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Planner from './pages/Planner';
import Recommendations from './pages/Recommendations';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

// Helpers
import { getDaysRemaining } from './utils/dateUtils';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [userName, setUserName] = useLocalStorage('acuity_username', () => {
    try {
      const legacy = window.localStorage.getItem('smartstudy_username');
      if (legacy) return JSON.parse(legacy);
    } catch (e) {}
    return 'Alex';
  });
  const [theme, setTheme] = useLocalStorage('acuity_theme', () => {
    try {
      const legacy = window.localStorage.getItem('smartstudy_theme');
      if (legacy) return JSON.parse(legacy);
    } catch (e) {}
    return 'light';
  });

  // Task operations via custom hook
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    updateStatus,
    clearAllTasks,
    resetToDemo,
  } = useTasks();

  // Modals and Drawers
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isStudyTimerOpen, setIsStudyTimerOpen] = useState(false);
  const [studyTask, setStudyTask] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Feedback Notification (Toast)
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync theme with HTML document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Calculate quick badge indicators
  const pendingCount = useMemo(() => {
    return tasks.filter((t) => t.status !== 'Completed').length;
  }, [tasks]);

  const urgentRecCount = useMemo(() => {
    return tasks.filter((t) => {
      if (t.status === 'Completed') return false;
      if (!t.dueDate) return false;
      const days = getDaysRemaining(t.dueDate);
      return days !== null && (days < 0 || (days <= 2 && t.priority === 'High'));
    }).length;
  }, [tasks]);

  // Task handlers with HCI feedback
  const handleOpenAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
      showToast(`Updated "${formData.title}"`, 'success');
    } else {
      addTask(formData);
      showToast(`Added new task "${formData.title}"`, 'success');
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
    showToast('Task deleted successfully', 'info');
  };

  const handleToggleComplete = (id) => {
    const target = tasks.find((t) => t.id === id);
    const willBeCompleted = target?.status !== 'Completed';
    toggleComplete(id);
    if (willBeCompleted) {
      showToast(`Completed "${target?.title}"! Great job! 🎉`, 'success');
    } else {
      showToast(`Marked "${target?.title}" as pending`, 'info');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus);
    showToast(`Status changed to ${newStatus}`, 'info');
  };

  const handleStartStudy = (task) => {
    setStudyTask(task);
    setIsStudyTimerOpen(true);
  };

  const handleClearAll = () => {
    clearAllTasks();
    showToast('All local task data cleared', 'info');
  };

  const handleResetDemo = () => {
    resetToDemo();
    showToast('Restored sample academic tasks', 'success');
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'tasks':
        return 'My Tasks';
      case 'planner':
        return 'Study Planner';
      case 'recommendations':
        return 'Recommendations';
      case 'progress':
        return 'Progress & Insights';
      case 'settings':
        return 'Settings & Preferences';
      default:
        return 'Acuity';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        pendingCount={pendingCount}
        urgentRecCount={urgentRecCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Responsive Header */}
        <Header
          userName={userName}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenAddTask={handleOpenAddTask}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
          activePageTitle={getPageTitle()}
        />

        {/* Active Page View */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {activePage === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              userName={userName}
              onNavigate={setActivePage}
              onOpenAddTask={handleOpenAddTask}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onStartStudy={handleStartStudy}
            />
          )}

          {activePage === 'tasks' && (
            <Tasks
              tasks={tasks}
              onOpenAddTask={handleOpenAddTask}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onStartStudy={handleStartStudy}
            />
          )}

          {activePage === 'planner' && (
            <Planner
              tasks={tasks}
              onOpenAddTask={handleOpenAddTask}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onStartStudy={handleStartStudy}
            />
          )}

          {activePage === 'recommendations' && (
            <Recommendations
              tasks={tasks}
              userName={userName}
              onNavigate={setActivePage}
              onOpenAddTask={handleOpenAddTask}
              onStartStudy={handleStartStudy}
            />
          )}

          {activePage === 'progress' && (
            <Progress
              tasks={tasks}
              isDark={theme === 'dark'}
              onNavigate={setActivePage}
              onOpenAddTask={handleOpenAddTask}
            />
          )}

          {activePage === 'settings' && (
            <Settings
              userName={userName}
              onUpdateUserName={setUserName}
              theme={theme}
              onToggleTheme={toggleTheme}
              onClearAllTasks={handleClearAll}
              onResetDemoData={handleResetDemo}
              totalTasks={tasks.length}
            />
          )}
        </main>
      </div>

      {/* Mobile Navigation (Bottom bar & Drawer) */}
      <MobileNavigation
        activePage={activePage}
        onNavigate={setActivePage}
        isDrawerOpen={isMobileDrawerOpen}
        onCloseDrawer={() => setIsMobileDrawerOpen(false)}
        pendingCount={pendingCount}
        urgentRecCount={urgentRecCount}
      />

      {/* Task Creation & Editing Modal */}
      <TaskForm
        isOpen={isTaskModalOpen}
        initialData={editingTask}
        onSave={handleSaveTask}
        onClose={() => setIsTaskModalOpen(false)}
      />

      {/* Focus Study Timer Modal */}
      <StudyTimerModal
        isOpen={isStudyTimerOpen}
        task={studyTask}
        onClose={() => setIsStudyTimerOpen(false)}
        onCompleteTask={handleToggleComplete}
      />

      {/* Feedback Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
