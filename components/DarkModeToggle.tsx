'use client';

import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDashboardStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-lg bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border transition-smooth hover:bg-gray-200 dark:hover:bg-dark-border"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
