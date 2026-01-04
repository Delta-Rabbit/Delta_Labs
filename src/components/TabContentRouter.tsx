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
  // Always render Course module - it will auto-open a tab if needed
  return (
    <CourseProvider>
      <CourseModuleContent />
    </CourseProvider>
  );
}

export default TabContentRouter;
