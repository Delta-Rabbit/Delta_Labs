import React from 'react';

type OrderTab = 'purchase' | 'rent' | 'financial_aid' | 'rejected';

interface OrderTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

export const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: OrderTab; label: string }[] = [
    { id: 'purchase', label: 'My Order (Purchase)' },
    { id: 'rent', label: 'My Order (Rent)' },
    { id: 'financial_aid', label: 'Financial Aid' },
    { id: 'rejected', label: 'Rejected Orders' }
  ];

  return (
    <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-gray-900'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174A5F]" />
          )}
        </button>
      ))}
    </div>
  );
};

export type { OrderTab };
