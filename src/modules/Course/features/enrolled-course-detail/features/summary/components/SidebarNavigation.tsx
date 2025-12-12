/**
 * Delta Labs Fast Summary - Sidebar Navigation
 * Left sidebar with icon-based navigation (matching QA pattern)
 */

import React from 'react';
import type { SidebarView } from '../types';

interface SidebarNavigationProps {
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ activeView, onViewChange }) => {
  const navItems: { id: SidebarView; icon: JSX.Element; label: string }[] = [
    {
      id: 'list',
      label: 'View Summaries',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'exercise',
      label: 'Fast Exercise',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pl-4 bg-surface-primary z-30">
      {navItems.map((item) => {
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`p-3 rounded-lg transition-colors group relative ${
              isActive
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label={item.label}
          >
            <div className={`${
              isActive
                ? 'text-white'
                : 'text-text-secondary group-hover:text-primary-600'
            }`}>
              {item.icon}
            </div>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              {item.label}
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>
        );
      })}
    </aside>
  );
};

export default SidebarNavigation;