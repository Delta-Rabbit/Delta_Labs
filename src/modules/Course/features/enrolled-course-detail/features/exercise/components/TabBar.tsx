/**
 * Delta Labs Exercise Tab Bar Component
 * Tab navigation for exercise views
 */

import React from 'react';
import type { ExerciseTab } from '../types';

interface TabBarProps {
  tabs: { id: ExerciseTab; label: string }[];
  activeTab: ExerciseTab;
  onTabChange: (tab: ExerciseTab) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex items-center gap-6 border-b border-border-primary mb-6" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
              isActive
                ? 'text-primary-600'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${String(tab.id)}`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        );
      })}
    </div>
  );
};

