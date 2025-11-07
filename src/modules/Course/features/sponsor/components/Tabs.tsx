/**
 * Delta Labs Tabs Component
 * Reusable tabs using theme tokens
 */

import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-6 font-primary">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-base font-medium transition-colors transition-normal ease-ease pb-2 border-b-2 font-primary ${
            activeTab === tab.id
              ? 'text-text-primary border-primary-600'
              : 'text-text-secondary border-transparent hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

