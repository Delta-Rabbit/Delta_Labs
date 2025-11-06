/**
 * Delta Labs Course Page
 * Professional course management interface with feature-based routing
 * Uses modern routing system for scalability and maintainability
 */

import React from 'react';
import { CourseProvider } from '../context/CourseContext';
import CourseLayout from './CourseLayout';
import { CourseErrorBoundary } from './common/ErrorBoundary';
import { useTab } from '../../../contexts/TabContext';
import { CourseNavigationProvider, CourseRouter } from '../routing';

// ============================================================================
// COURSE PAGE CONTENT
// ============================================================================

interface CoursePageContentProps {
  onSwitchToDemo?: () => void;
}

const CoursePageContent: React.FC<CoursePageContentProps> = ({ onSwitchToDemo }) => {
  const { openTab, getActiveTab } = useTab();

  // Open Course tab on mount if it doesn't exist
  React.useEffect(() => {
    const courseTabExists = document.querySelector('[data-tab-id="course"]');
    if (!courseTabExists) {
      openTab({
        id: 'course',
        label: 'Course',
        module: 'course',
      });
    }
  }, [openTab]);

  const activeTab = getActiveTab();

  // Only render if Course tab is active
  if (!activeTab || activeTab.module !== 'course') {
    return null;
  }

  return (
    <CourseNavigationProvider initialRoute="/dashboard">
      <CoursePageWithRouting onSwitchToDemo={onSwitchToDemo} />
    </CourseNavigationProvider>
  );
};

// ============================================================================
// COURSE PAGE WITH ROUTING
// ============================================================================

interface CoursePageWithRoutingProps {
  onSwitchToDemo?: () => void;
}

const CoursePageWithRouting: React.FC<CoursePageWithRoutingProps> = ({ onSwitchToDemo }) => {
  return (
    <CourseLayout onSwitchToDemo={onSwitchToDemo}>
      <CourseRouter />
    </CourseLayout>
  );
};

// ============================================================================
// COURSE PAGE COMPONENT
// ============================================================================

interface CoursePageProps {
  onSwitchToDemo?: () => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ onSwitchToDemo }) => {
  return (
    <CourseErrorBoundary>
      <CourseProvider>
        <CoursePageContent onSwitchToDemo={onSwitchToDemo} />
      </CourseProvider>
    </CourseErrorBoundary>
  );
};

export default CoursePage;
