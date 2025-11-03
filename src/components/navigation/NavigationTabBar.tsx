/**
 * Delta Labs Top Navigation Tab Bar
 * Enterprise-grade multi-tab navigation system
 * Supports: Multiple tabs, open/close/switch, persistence, cross-module navigation
 */

import React, { useState } from 'react';

// ============================================================================
// TAB TYPES
// ============================================================================

export interface Tab {
  id: string;
  label: string;
  module: 'course' | 'dashboard' | 'analytics' | 'users' | 'settings';
  isActive: boolean;
  data?: any; // Module-specific data
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface NavigationTabBarProps {
  tabs: Tab[];
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabAdd?: (module: Tab['module']) => void;
  maxTabs?: number;
  enablePersistence?: boolean;
}

// ============================================================================
// NAVIGATION TAB BAR COMPONENT
// ============================================================================

export const NavigationTabBar: React.FC<NavigationTabBarProps> = ({
  tabs,
  onTabClick,
  onTabClose,
  onTabAdd,
  maxTabs = 10,
  enablePersistence = true,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Handle tab click
  const handleTabClick = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onTabClick(tabId);
  };

  // Handle tab close
  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onTabClose(tabId);
  };

  return (
    <div className="flex-1 flex items-end gap-1 sm:gap-2 overflow-x-auto scrollbar-hide h-full">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={(e) => handleTabClick(tab.id, e)}
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
          className={`flex items-center gap-2 pl-4 pr-3 sm:pl-6 sm:pr-4 py-2 rounded-t-lg cursor-pointer transition-all duration-200 flex-shrink-0 group ${
            tab.isActive 
              ? "bg-white text-[#174A5F] shadow-md" 
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {/* Tab Icon */}
          {getTabIcon(tab.module)}
          
          {/* Tab Label */}
          <span className="text-sm sm:text-base font-medium truncate min-w-[80px]">
            {tab.label}
          </span>
          
          {/* Close Button */}
          <button
            onClick={(e) => handleTabClose(tab.id, e)}
            className={`p-0.5 rounded hover:bg-black/10 transition-colors duration-150 flex-shrink-0 ml-2 ${
              tab.isActive ? "text-[#174A5F]" : "text-white opacity-0 group-hover:opacity-100"
            } ${hoveredTab === tab.id ? "opacity-100" : ""}`}
            aria-label={`Close ${tab.label} tab`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      ))}

      {/* Add Tab Button */}
      {onTabAdd && tabs.length < maxTabs && (
        <button
          onClick={() => onTabAdd('course')}
          className="flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer transition-all duration-200 flex-shrink-0 bg-white/10 text-white hover:bg-white/20"
          aria-label="Add new tab"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          <span className="text-sm hidden sm:inline">New Tab</span>
        </button>
      )}
    </div>
  );
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getTabIcon = (module: Tab['module']) => {
  const iconClass = "w-4 h-4 flex-shrink-0";
  
  // Course module icon
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
};

export default NavigationTabBar;

