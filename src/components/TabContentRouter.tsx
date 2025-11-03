/**
 * Delta Labs Tab Content Router
 * Course Module Only - Simplified for Course-specific navigation
 */

import React, { useEffect } from 'react';
import { useTab } from '../contexts/TabContext';
import { CourseLayout, FeatureCardGrid } from '../modules/Course/components';
import { CourseProvider } from '../modules/Course';
import { CourseViewProvider, useCourseView } from '../modules/Course/context/CourseViewContext';
import EnrolledCoursesPage from '../modules/Course/components/EnrolledCoursesPage';
import WishlistPage from '../modules/Course/components/WishlistPage';
import CartPage from '../modules/Course/components/CartPage';
import SponsorPage from '../modules/Course/components/SponsorPage';
import ApplySponsorPage from '../modules/Course/components/ApplySponsorPage';
import FinancialAidPage from '../modules/Course/components/FinancialAidPage';
import FinancialAidFormPage from '../modules/Course/components/FinancialAidFormPage';
import OfflineCoursesPage from '../modules/Course/components/OfflineCoursesPage';
import UnrolledCoursesPage from '../modules/Course/components/UnrolledCoursesPage';
import RecentActivityPage from '../modules/Course/components/RecentActivityPage';
import SuperCoursePage from '../modules/Course/components/SuperCoursePage';

// ============================================================================
// COURSE MODULE CONTENT
// ============================================================================

const CourseModuleContentWithNavigation = () => {
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
      {currentView === 'superCourse' && <SuperCoursePage />}
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

const CourseModuleContent = () => {
  const { openTab } = useTab();

  useEffect(() => {
    openTab({
      id: 'course',
      label: 'Course',
      module: 'course',
    });
  }, [openTab]);

  return (
    <CourseViewProvider>
      <CourseModuleContentWithNavigation />
    </CourseViewProvider>
  );
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
