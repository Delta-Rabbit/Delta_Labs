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
  const { openTab, hasTab } = useTab();

  useEffect(() => {
    // Only open Course tab if it doesn't exist
    // Don't auto-open if user closed it
    if (!hasTab('course')) {
      openTab({
        id: 'course',
        label: 'Course',
        module: 'course',
      });
    }
  }, [openTab, hasTab]);

  return <CoursePage />;
};

// ============================================================================
// TAB CONTENT ROUTER
// ============================================================================

export function TabContentRouter() {
  const { tabs, getActiveTab } = useTab();
  const activeTab = getActiveTab();

  // Check if there's an active course tab
  const hasActiveCourseTab = activeTab && activeTab.module === 'course';
  
  // If no active tab or active tab is not a course tab, show empty state
  if (!hasActiveCourseTab) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="text-center">
          <p className="text-gray-500">No active course tab. Open a course to continue.</p>
        </div>
      </div>
    );
  }

  // Render Course module only if there's an active course tab
  return (
    <CourseProvider>
      <CourseModuleContent />
    </CourseProvider>
  );
}

export default TabContentRouter;
