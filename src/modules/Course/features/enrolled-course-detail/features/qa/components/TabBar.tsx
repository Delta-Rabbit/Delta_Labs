/**
 * TabBar Molecule Component
 * Displays tab navigation
 */

import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps<T extends string> {
  tabs: Tab[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}

export function TabBar<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabBarProps<T>) {
  return (
    <div className={`flex items-center gap-6 border-b border-border-primary ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as T)}
            className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
              isActive
                ? 'text-primary-600'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            role="tab"
            aria-selected={isActive ? 'true' : 'false'}
            aria-controls={'tabpanel-' + tab.id}
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
}

