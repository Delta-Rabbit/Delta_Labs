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
import { CourseNavigationProvider, CourseRouter, useCourseNavigation } from '../routing';
import { courseRoutes } from '../routing/routes/courseRoutes';

// ============================================================================
// COURSE PAGE CONTENT
// ============================================================================

interface CoursePageContentProps {
  onSwitchToDemo?: () => void;
}

const CoursePageContent: React.FC<CoursePageContentProps> = ({ onSwitchToDemo }) => {
  const { openTab, getActiveTab, tabs, hasTab } = useTab();

  const activeTab = getActiveTab();

  // Only render if Course tab is active
  if (!activeTab || activeTab.module !== 'course') {
    return null;
  }

  // Open Course tab on mount only if it doesn't exist AND we're in CoursePageContent
  // This should only happen when navigating to course module, not when tab is closed
  React.useEffect(() => {
    // Only auto-open if we're actively in the course module and tab doesn't exist
    // Don't auto-open if user explicitly closed the tab
    if (!hasTab('course') && activeTab?.module === 'course') {
      openTab({
        id: 'course',
        label: 'Course',
        module: 'course',
        data: {
          route: '/dashboard',
        },
      });
    }
  }, [openTab, hasTab, activeTab]);

  // Determine initial route based on active tab
  const getInitialRoute = () => {
    if (activeTab.id === 'course') {
      return '/dashboard';
    }
    // For course detail tabs, use the route from tab data
    return activeTab.data?.route || '/dashboard';
  };

  return (
    <CourseNavigationProvider initialRoute={getInitialRoute()}>
      <CoursePageWithRouting onSwitchToDemo={onSwitchToDemo} activeTab={activeTab} />
    </CourseNavigationProvider>
  );
};

// ============================================================================
// COURSE PAGE WITH ROUTING
// ============================================================================

interface CoursePageWithRoutingProps {
  onSwitchToDemo?: () => void;
  activeTab?: any;
}

// Helper function to check if a route matches any valid course route
const isValidCourseRoute = (path: string): boolean => {
  if (!path) return false;
  
  // Remove query string
  const [routePath] = path.split('?');
  
  // Check if path matches any route pattern
  const matchRoute = (routePath: string, currentPath: string): boolean => {
    const routeParts = routePath.split('/').filter(Boolean);
    const pathParts = currentPath.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) {
      return false;
    }

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith(':')) {
        // This is a parameter - matches any value
        continue;
      } else if (routePart !== pathPart) {
        return false;
      }
    }

    return true;
  };

  // Check all routes
  const checkRoutes = (routes: typeof courseRoutes): boolean => {
    for (const route of routes) {
      if (matchRoute(route.path, routePath)) {
        return true;
      }
      if (route.children && checkRoutes(route.children)) {
        return true;
      }
    }
    return false;
  };

  return checkRoutes(courseRoutes);
};

const CoursePageWithRouting: React.FC<CoursePageWithRoutingProps> = ({ onSwitchToDemo, activeTab }) => {
  const { currentRoute, navigate } = useCourseNavigation();
  const { getActiveTab, tabs, hasTab } = useTab();
  
  // Check if current route is enrolled course detail - bypass CourseLayout for it
  // Enrolled course detail pages have their own full layout and don't need CourseLayout's secondary nav
  const isEnrolledCourseDetail = currentRoute?.path?.startsWith('/enrolled/') && currentRoute.path !== '/enrolled';
  
  // Extract courseId from route if it's an enrolled course detail page
  const courseIdMatch = isEnrolledCourseDetail ? currentRoute.path.match(/\/enrolled\/([^/]+)/) : null;
  const courseId = courseIdMatch ? courseIdMatch[1] : null;
  const courseDetailTabId = courseId ? `course-${courseId}` : null;
  
  // Check if course detail tab exists when on enrolled course detail page
  const courseDetailTabExists = courseDetailTabId ? hasTab(courseDetailTabId) : true;
  const currentActiveTab = getActiveTab();
  const isCourseDetailTabActive = courseDetailTabId && currentActiveTab?.id === courseDetailTabId;
  
  // If we're on an enrolled course detail page but the tab doesn't exist or isn't active, navigate away
  React.useEffect(() => {
    if (isEnrolledCourseDetail && courseDetailTabId) {
      if (!courseDetailTabExists || !isCourseDetailTabActive) {
        // Tab was closed or is not active - navigate to enrolled courses list
        navigate('/enrolled', {}, { replace: true });
      }
    }
  }, [isEnrolledCourseDetail, courseDetailTabId, courseDetailTabExists, isCourseDetailTabActive, navigate]);
  
  // Sync navigation with active tab changes
  React.useEffect(() => {
    const currentActiveTab = getActiveTab();
    if (currentActiveTab) {
      // Small delay to ensure tab state is updated after close/switch operations
      const timeoutId = setTimeout(() => {
        if (currentActiveTab.id === 'course') {
          // Main Course tab - only redirect if current route is invalid
          // Allow all valid course routes to work
          if (currentRoute?.path && !isValidCourseRoute(currentRoute.path)) {
            navigate('/dashboard', {}, { replace: true });
          }
        } else if (currentActiveTab.data?.route) {
          // Course detail tab - navigate to the course route
          if (currentRoute?.path !== currentActiveTab.data.route) {
            navigate(currentActiveTab.data.route, {}, { replace: true });
          }
        } else {
          // Fallback: if tab has no route data, go to dashboard
          if (currentRoute?.path !== '/dashboard') {
            navigate('/dashboard', {}, { replace: true });
          }
        }
      }, 10);
      
      return () => clearTimeout(timeoutId);
    } else {
      // No active tab - navigate to dashboard as fallback
      if (currentRoute?.path !== '/dashboard') {
        navigate('/dashboard', {}, { replace: true });
      }
    }
  }, [tabs, getActiveTab, navigate, currentRoute]);
  
  // If we're on an enrolled course detail page, check if tab exists and is active
  if (isEnrolledCourseDetail) {
    // Don't render if tab doesn't exist or isn't active
    if (!courseDetailTabExists || !isCourseDetailTabActive) {
      return null;
    }
    
    return <CourseRouter />;
  }
  
  // All other pages use CourseLayout with secondary navigation
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
