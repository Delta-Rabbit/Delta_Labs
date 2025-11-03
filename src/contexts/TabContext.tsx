/**
 * Delta Labs Tab Management Context
 * Enterprise-grade tab state management for multi-module navigation
 * Features: Multiple tabs, open/close/switch, persistence, cross-module support
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Tab } from '../types/navigation';

// ============================================================================
// TAB CONTEXT TYPES
// ============================================================================

interface TabContextValue {
  // State
  tabs: Tab[];
  activeTabId: string | null;
  
  // Actions
  openTab: (tab: Omit<Tab, 'isActive'>) => void;
  closeTab: (tabId: string) => void;
  switchTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  getAllTabs: () => Tab[];
  getActiveTab: () => Tab | null;
  hasTab: (tabId: string) => boolean;
  clearAllTabs: () => void;
}

interface TabProviderProps {
  children: ReactNode;
  enablePersistence?: boolean;
  maxTabs?: number;
}

// ============================================================================
// TAB CONTEXT CREATION
// ============================================================================

const TabContext = createContext<TabContextValue | undefined>(undefined);

// ============================================================================
// TAB PROVIDER COMPONENT
// ============================================================================

export function TabProvider({ 
  children, 
  enablePersistence = true,
  maxTabs = 10 
}: TabProviderProps) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  // Load tabs from localStorage on mount
  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      const savedTabs = localStorage.getItem('delta-labs-tabs');
      const savedActiveTab = localStorage.getItem('delta-labs-active-tab');
      
      if (savedTabs) {
        try {
          const parsedTabs = JSON.parse(savedTabs);
          setTabs(parsedTabs);
        } catch (error) {
          console.error('Failed to load tabs from localStorage:', error);
        }
      }
      
      if (savedActiveTab) {
        setActiveTabId(savedActiveTab);
      }
    }
  }, [enablePersistence]);

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      localStorage.setItem('delta-labs-tabs', JSON.stringify(tabs));
    }
  }, [tabs, enablePersistence]);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined' && activeTabId) {
      localStorage.setItem('delta-labs-active-tab', activeTabId);
    }
  }, [activeTabId, enablePersistence]);

  // Open a new tab
  const openTab = useCallback((tab: Omit<Tab, 'isActive'>) => {
    setTabs(prevTabs => {
      // Check if tab already exists
      const existingTab = prevTabs.find(t => t.id === tab.id);
      if (existingTab) {
        // Switch to existing tab instead of creating duplicate
        setActiveTabId(tab.id);
        return prevTabs.map(t => ({
          ...t,
          isActive: t.id === tab.id
        }));
      }

      // Check max tabs limit
      if (prevTabs.length >= maxTabs) {
        console.warn(`Maximum tabs limit (${maxTabs}) reached. Cannot open new tab.`);
        return prevTabs;
      }

      // Add new tab and set it as active
      const newTabs = prevTabs.map(t => ({ ...t, isActive: false }));
      newTabs.push({ ...tab, isActive: true });
      setActiveTabId(tab.id);
      
      return newTabs;
    });
  }, [maxTabs]);

  // Close a tab
  const closeTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      const filteredTabs = prevTabs.filter(t => t.id !== tabId);
      
      // If we closed the active tab, switch to the previous tab
      const wasActive = prevTabs.find(t => t.id === tabId)?.isActive;
      if (wasActive && filteredTabs.length > 0) {
        // Find the index of the closed tab
        const closedIndex = prevTabs.findIndex(t => t.id === tabId);
        
        // Determine which tab to switch to
        let newActiveIndex: number;
        if (closedIndex > 0) {
          // Switch to tab before the closed one
          newActiveIndex = closedIndex - 1;
        } else if (filteredTabs.length > 0) {
          // Switch to first tab
          newActiveIndex = 0;
        } else {
          // No tabs left
          setActiveTabId(null);
          return [];
        }

        const newActiveId = filteredTabs[newActiveIndex].id;
        setActiveTabId(newActiveId);
        return filteredTabs.map((t, index) => ({
          ...t,
          isActive: index === newActiveIndex
        }));
      }
      
      return filteredTabs;
    });
  }, []);

  // Switch to a specific tab
  const switchTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      const tabExists = prevTabs.some(t => t.id === tabId);
      if (!tabExists) {
        console.warn(`Tab ${tabId} does not exist.`);
        return prevTabs;
      }

      setActiveTabId(tabId);
      return prevTabs.map(t => ({
        ...t,
        isActive: t.id === tabId
      }));
    });
  }, []);

  // Set active tab (same as switchTab but with explicit naming)
  const setActiveTab = useCallback((tabId: string) => {
    switchTab(tabId);
  }, [switchTab]);

  // Get all tabs
  const getAllTabs = useCallback(() => tabs, [tabs]);

  // Get active tab
  const getActiveTab = useCallback(() => {
    return tabs.find(t => t.isActive) || null;
  }, [tabs]);

  // Check if tab exists
  const hasTab = useCallback((tabId: string) => {
    return tabs.some(t => t.id === tabId);
  }, [tabs]);

  // Clear all tabs
  const clearAllTabs = useCallback(() => {
    setTabs([]);
    setActiveTabId(null);
    
    if (enablePersistence && typeof window !== 'undefined') {
      localStorage.removeItem('delta-labs-tabs');
      localStorage.removeItem('delta-labs-active-tab');
    }
  }, [enablePersistence]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: TabContextValue = {
    // State
    tabs,
    activeTabId,
    
    // Actions
    openTab,
    closeTab,
    switchTab,
    setActiveTab,
    getAllTabs,
    getActiveTab,
    hasTab,
    clearAllTabs,
  };

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
}

// ============================================================================
// USE TAB HOOK
// ============================================================================

export function useTab() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TabProvider;

