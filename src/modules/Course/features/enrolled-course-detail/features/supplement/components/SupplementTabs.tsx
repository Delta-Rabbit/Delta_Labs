
import React from 'react';
import type { SupplementType } from '../types';

interface SupplementTabsProps {
  activeTab: SupplementType;
  onTabChange: (tab: SupplementType) => void;
}

export const SupplementTabs: React.FC<SupplementTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: SupplementType; label: string }[] = [
    { id: 'books', label: 'Books' },
    { id: 'documentations', label: 'Documentations' },
    { id: 'slides', label: 'Slides' },
    { id: 'youtube', label: 'Youtube Videos' },
    { id: 'generated', label: 'Generated' },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-gray-100 font-primary">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              isActive
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174A5F]" />
            )}
          </button>
        );
      })}
    </div>
  );
};
