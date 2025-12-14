
import React from 'react';

interface ResourcesTabsProps {
  activeTab: 'resources' | 'community';
  onTabChange: (tab: 'resources' | 'community') => void;
}

export const ResourcesTabs: React.FC<ResourcesTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: 'resources' | 'community'; label: string }[] = [
      { id: 'resources', label: 'Resources' },
      { id: 'community', label: 'Community Resources' }
  ];

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 font-primary w-fit">
        {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                        isActive
                        ? 'text-[#174A5F]'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    {tab.label}
                    {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174A5F]" />
                    )}
                </button>
            )
        })}
    </div>
  );
};
