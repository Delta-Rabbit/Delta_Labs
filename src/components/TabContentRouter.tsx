/**
 * Delta Labs Tab Content Router
 * Course Module Only - Simplified for Course-specific navigation
 */

import React, { useEffect } from 'react';
import { useTab } from '../contexts/TabContext';
import { CourseProvider } from '../modules/Course';
import CoursePage from '../modules/Course/components/CoursePage';

// ============================================================================
// COURSE MODULE CONTENT
// ============================================================================

const CourseModuleContent = () => {
  const { openTab } = useTab();

  useEffect(() => {
    openTab({
      id: 'course',
      label: 'Course',
      module: 'course',
    });
  }, [openTab]);

  return <CoursePage />;
};

// ============================================================================
// TAB CONTENT ROUTER
// ============================================================================

export function TabContentRouter() {
  const { tabs, getActiveTab } = useTab();
  const activeTab = getActiveTab();

  // Always show Course module when no active tab
  if (!activeTab || activeTab.module !== 'course') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="text-center">
          <p className="text-gray-500">Loading Course module...</p>
        </div>
      </div>
    );
  }

  // Render Course module
  return (
    <CourseProvider>
      <CourseModuleContent />
    </CourseProvider>
  );
}

export default TabContentRouter;
