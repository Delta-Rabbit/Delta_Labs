/**
 * Delta Labs Navigation Types
 * Centralized type definitions for navigation system
 */

export interface Tab {
  id: string;
  label: string;
  module: TabModule;
  isActive: boolean;
  data?: any; // Module-specific data
}

export type TabModule = 'course';

export interface NavigationConfig {
  maxTabs?: number;
  enablePersistence?: boolean;
  enableAnimations?: boolean;
}

export interface TabNavigationProps {
  tabs: Tab[];
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabAdd?: (module: TabModule) => void;
  config?: NavigationConfig;
}

// Export for backward compatibility
export type { Tab as TabType };

