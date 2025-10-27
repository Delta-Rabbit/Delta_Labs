/**
 * Delta Labs Theme Toggle Component
 * Simple theme toggle button
 */

import * as React from 'react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const handleToggle = () => {
    // Simple theme toggle - you can integrate with your theme context later
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg delta-transition hover:bg-surface-secondary ${className}`}
      title="Toggle theme"
    >
      <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </button>
  );
};

