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
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Planner from './pages/Planner';
import Recommendations from './pages/Recommendations';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

// Helpers & Profile Utilities
import { getDaysRemaining } from './utils/dateUtils';
import { DEFAULT_USER, PRESET_PROFILES } from './utils/userProfiles';

export default function App() {
  // Navigation & Page State
  const [loginMode, setLoginMode] = useState('signin');
  const [activePage, setActivePage] = useState(() => {
    try {
      const saved = window.localStorage.getItem('acuity_active_page');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return 'landing'; // Starts on the new landing page by default
  });

  // Persist active page
  useEffect(() => {
    try {
      window.localStorage.setItem('acuity_active_page', JSON.stringify(activePage));
    } catch (e) {}
  }, [activePage]);

  // Extended Student Profile State
  const [currentUser, setCurrentUser] = useLocalStorage('acuity_user_profile', () => {
    try {
      const saved = window.localStorage.getItem('acuity_user_profile');
      if (saved) return JSON.parse(saved);

      const legacyName =
        window.localStorage.getItem('acuity_username') ||
        window.localStorage.getItem('smartstudy_username');
      if (legacyName) {
        const parsedName = legacyName.startsWith('"') ? JSON.parse(legacyName) : legacyName;
        return {
          ...DEFAULT_USER,
          name: parsedName || DEFAULT_USER.name,
          isLoggedIn: true,
        };
      }
    } catch (e) {}
    return {
      ...DEFAULT_USER,
      isLoggedIn: true,
    };
  });

  const [userName, setUserName] = useLocalStorage('acuity_username', () => {
    return currentUser?.name || 'Alex Rivera';
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

  // Navigation router helper supporting options (e.g. login mode)
  const handleNavigate = (page, options = {}) => {
    if (options.mode) {
      setLoginMode(options.mode);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authentication Handlers
  const handleLoginSuccess = (profile) => {
    const updated = { ...profile, isLoggedIn: true };
    setCurrentUser(updated);
    setUserName(updated.name);
    showToast(`Welcome back, ${updated.name.split(' ')[0]}! 🎓`, 'success');
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...(prev || DEFAULT_USER), isLoggedIn: false }));
    showToast('Signed out of Acuity', 'info');
    setActivePage('landing');
  };

  const handleSwitchProfile = (profile) => {
    const updated = { ...profile, isLoggedIn: true };
    setCurrentUser(updated);
    setUserName(updated.name);
    showToast(`Active persona: ${profile.name} (${profile.major})`, 'success');
  };

  const handleUpdateUserProfile = (updatedProfile) => {
    setCurrentUser(updatedProfile);
    setUserName(updatedProfile.name);
    showToast('Academic profile updated successfully', 'success');
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
        return 'Settings & Personalization';
      default:
        return 'Acuity';
    }
  };

  // 1. Render Landing Page
  if (activePage === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Landing
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={handleNavigate}
          onQuickDemoLogin={handleLoginSuccess}
          currentUser={currentUser?.isLoggedIn ? currentUser : null}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  // 2. Render Login & Personalization Page
  if (activePage === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Login
          initialMode={loginMode}
          theme={theme}
          onToggleTheme={toggleTheme}
          onLoginSuccess={handleLoginSuccess}
          onNavigate={handleNavigate}
        />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  // 3. Render Main Study Planner Workspace
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        pendingCount={pendingCount}
        urgentRecCount={urgentRecCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Responsive Header */}
        <Header
          userName={currentUser?.name || userName}
          currentUser={currentUser}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenAddTask={handleOpenAddTask}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
          onNavigate={handleNavigate}
          activePageTitle={getPageTitle()}
        />

        {/* Active Workspace View */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {activePage === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              userName={currentUser?.name || userName}
              currentUser={currentUser}
              onNavigate={handleNavigate}
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
              userName={currentUser?.name || userName}
              onNavigate={handleNavigate}
              onOpenAddTask={handleOpenAddTask}
              onStartStudy={handleStartStudy}
            />
          )}

          {activePage === 'progress' && (
            <Progress
              tasks={tasks}
              isDark={theme === 'dark'}
              onNavigate={handleNavigate}
              onOpenAddTask={handleOpenAddTask}
            />
          )}

          {activePage === 'settings' && (
            <Settings
              userName={currentUser?.name || userName}
              currentUser={currentUser}
              onUpdateUserName={setUserName}
              onUpdateUserProfile={handleUpdateUserProfile}
              onLogout={handleLogout}
              onSwitchProfile={handleSwitchProfile}
              theme={theme}
              onToggleTheme={toggleTheme}
              onClearAllTasks={handleClearAll}
              onResetDemoData={handleResetDemo}
              totalTasks={tasks.length}
            />
          )}
        </main>
      </div>

      {/* Mobile Navigation (Bottom bar & Slide-out Drawer) */}
      <MobileNavigation
        activePage={activePage}
        onNavigate={handleNavigate}
        isDrawerOpen={isMobileDrawerOpen}
        onCloseDrawer={() => setIsMobileDrawerOpen(false)}
        pendingCount={pendingCount}
        urgentRecCount={urgentRecCount}
        currentUser={currentUser}
        onLogout={handleLogout}
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
