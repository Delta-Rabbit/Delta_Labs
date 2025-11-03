/**
 * Delta Labs Course Page
 * Professional course management interface
 */

import React, { useEffect, useCallback } from 'react';
import { CourseProvider } from '../context/CourseContext';
import CourseLayout from './CourseLayout';
import FeatureCardGrid from './FeatureCardGrid';
import { CourseErrorBoundary } from './ErrorBoundary';
import { useTab } from '../../../contexts/TabContext';
import { CourseViewProvider, useCourseView } from '../context/CourseViewContext';
import EnrolledCoursesPage from './EnrolledCoursesPage';
import WishlistPage from './WishlistPage';
import CartPage from './CartPage';
import SponsorPage from './SponsorPage';
import ApplySponsorPage from './ApplySponsorPage';
import FinancialAidPage from './FinancialAidPage';
import FinancialAidFormPage from './FinancialAidFormPage';
import OfflineCoursesPage from './OfflineCoursesPage';
import UnrolledCoursesPage from './UnrolledCoursesPage';
import RecentActivityPage from './RecentActivityPage';
import SuperCoursePage from './SuperCoursePage';

// ============================================================================
// COURSE PAGE CONTENT
// ============================================================================

interface CoursePageContentProps {
  onSwitchToDemo?: () => void;
}

const CoursePageContent: React.FC<CoursePageContentProps> = ({ onSwitchToDemo }) => {
  const { openTab, getActiveTab } = useTab();

  // Open Course tab on mount if it doesn't exist
  useEffect(() => {
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

  return <CoursePageWithNavigation onSwitchToDemo={onSwitchToDemo} />;
};

const CoursePageWithNavigation: React.FC<{ onSwitchToDemo?: () => void }> = ({ onSwitchToDemo }) => {
  return (
    <CourseViewProvider>
      <CourseLayoutWithNavigation onSwitchToDemo={onSwitchToDemo} />
    </CourseViewProvider>
  );
};

const CourseLayoutWithNavigation: React.FC<{ onSwitchToDemo?: () => void }> = ({ onSwitchToDemo }) => {
  const { currentView, setCurrentView } = useCourseView();

  const handleNavigateToOfflineCourses = () => {
    setCurrentView('offlineCourses');
  };

  const handleNavigateToUnrolledCourses = () => {
    setCurrentView('unrolledCourses');
  };

  const handleNavigateToRecentActivity = () => {
    setCurrentView('recentActivity');
  };

  const handleNavigateToSuperCourse = () => {
    setCurrentView('superCourse');
  };

  return (
    <CourseLayout 
      onSwitchToDemo={onSwitchToDemo}
      onNavigateToOfflineCourses={handleNavigateToOfflineCourses}
      onNavigateToUnrolledCourses={handleNavigateToUnrolledCourses}
      onNavigateToRecentActivity={handleNavigateToRecentActivity}
      onNavigateToSuperCourse={handleNavigateToSuperCourse}
    >
      {currentView === 'main' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Course</h1>
          </div>
          <FeatureCardGrid />
        </>
      )}
      {currentView === 'enrolled' && <EnrolledCoursesPage />}
      {currentView === 'wishlist' && <WishlistPage />}
      {currentView === 'cart' && <CartPage />}
      {currentView === 'sponsor' && <SponsorPage />}
      {currentView === 'applySponsor' && <ApplySponsorPage />}
      {currentView === 'financialAid' && <FinancialAidPage />}
      {currentView === 'financialAidForm' && <FinancialAidFormPage />}
      {currentView === 'offlineCourses' && <OfflineCoursesPage />}
      {currentView === 'unrolledCourses' && <UnrolledCoursesPage />}
      {currentView === 'recentActivity' && <RecentActivityPage />}
      {/* Debug Super Course */}
      {console.log('Checking superCourse:', currentView, currentView === 'superCourse', typeof currentView)}
      {String(currentView) === 'superCourse' && (
        <div>
          <div className="bg-blue-500 text-white p-2 mb-2">Rendering SuperCoursePage</div>
          <SuperCoursePage />
        </div>
      )}
      {currentView === 'planner' && (
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Planner</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      )}
      {currentView === 'continue' && (
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Continue with Plan</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      )}
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
