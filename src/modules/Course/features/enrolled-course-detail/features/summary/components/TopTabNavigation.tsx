/**
 * Delta Labs Fast Summary - Top Tab Navigation
 * Horizontal tab navigation for different summary views
 */

import React from 'react';
import type { SummaryTab } from '../types';

interface TopTabNavigationProps {
  activeTab: SummaryTab;
  onTabChange: (tab: SummaryTab) => void;
}

const TopTabNavigation: React.FC<TopTabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: SummaryTab; label: string }[] = [
    { id: 'my-summaries', label: 'My Summaries' },
    { id: 'school', label: 'School' },
    { id: 'community', label: 'Community' },
    { id: 'saved', label: 'Saved' },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-border-primary mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-all font-primary relative ${
              isActive
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TopTabNavigation;
