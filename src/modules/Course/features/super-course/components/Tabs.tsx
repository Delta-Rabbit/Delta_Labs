/**
 * Delta Labs Super Course Tabs Component
 * Reusable tab navigation using theme tokens
 */

import React from 'react';

export type SuperCourseTab = 'create' | 'personal' | 'community' | 'temporary';

export interface Tab {
  id: SuperCourseTab;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: SuperCourseTab;
  onTabChange: (tab: SuperCourseTab) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex items-center space-x-1 border-b border-border-primary font-primary" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-3 text-sm font-medium transition-all transition-normal ease-ease rounded-t-md font-primary
              ${isActive 
                ? 'text-text-primary bg-surface-secondary border-b-2 border-primary-600' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }
            `}
            aria-label={tab.label}
            aria-selected={isActive ? 'true' : 'false'}
            role="tab"
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

