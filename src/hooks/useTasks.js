import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getSampleTasks } from '../utils/sampleData';

const TASKS_STORAGE_KEY = 'acuity_tasks_v1';
const SEEDED_FLAG_KEY = 'acuity_seeded_v1';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage(TASKS_STORAGE_KEY, () => {
    // Check if initial seeding or migration already happened
    try {
      const existingLegacy = window.localStorage.getItem('smartstudy_tasks_v1');
      if (existingLegacy) {
        window.localStorage.setItem(TASKS_STORAGE_KEY, existingLegacy);
        window.localStorage.setItem(SEEDED_FLAG_KEY, 'true');
        return JSON.parse(existingLegacy);
      }
      const alreadySeeded = window.localStorage.getItem(SEEDED_FLAG_KEY);
      if (!alreadySeeded) {
        window.localStorage.setItem(SEEDED_FLAG_KEY, 'true');
        return getSampleTasks();
      }
    } catch (e) {
      // fallback
    }
    return [];
  });

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: taskData.title?.trim() || 'Untitled Task',
      subject: taskData.subject?.trim() || 'General',
      description: taskData.description?.trim() || '',
      type: taskData.type || 'Assignment',
      dueDate: taskData.dueDate || '',
      priority: taskData.priority || 'Medium',
      estimatedMinutes: parseInt(taskData.estimatedMinutes, 10) || 60,
      status: taskData.status || 'Pending',
      isDemo: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...updatedFields,
            title: updatedFields.title !== undefined ? updatedFields.title.trim() : t.title,
            subject: updatedFields.subject !== undefined ? updatedFields.subject.trim() : t.subject,
            estimatedMinutes:
              updatedFields.estimatedMinutes !== undefined
                ? parseInt(updatedFields.estimatedMinutes, 10) || 0
                : t.estimatedMinutes,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }, [setTasks]);

  const toggleComplete = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return {
            ...t,
            status: nextStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  }, [setTasks]);

  const updateStatus = useCallback((id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      })
    );
  }, [setTasks]);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

  const resetToDemo = useCallback(() => {
    const demo = getSampleTasks();
    setTasks(demo);
  }, [setTasks]);

  const clearDemoOnly = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.isDemo));
  }, [setTasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    updateStatus,
    clearAllTasks,
    resetToDemo,
    clearDemoOnly,
  };
}
