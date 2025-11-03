/**
 * Delta Labs Course View Navigator
 * Handles navigation between different Course module views
 */

import React from 'react';
import { CourseViewProvider, useCourseView } from '../context/CourseViewContext';
import EnrolledCoursesPage from './EnrolledCoursesPage';
import WishlistPage from './WishlistPage';
import CartPage from './CartPage';
import SponsorPage from './SponsorPage';
import ApplySponsorPage from './ApplySponsorPage';
import FinancialAidPage from './FinancialAidPage';
import FinancialAidFormPage from './FinancialAidFormPage';
import OfflineCoursesPage from './OfflineCoursesPage';

interface CourseViewNavigatorProps {
  children: React.ReactNode;
}

/**
 * Internal component that uses the context to render views
 */
interface CourseViewContentProps {
  children: React.ReactNode;
  layoutComponent?: React.ReactNode;
}

const CourseViewContent: React.FC<CourseViewContentProps> = ({ children, layoutComponent }) => {
  const { currentView } = useCourseView();

  const renderContent = () => {
    switch (currentView) {
      case 'main':
        return children;
      case 'enrolled':
        return <EnrolledCoursesPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'sponsor':
        return <SponsorPage />;
      case 'applySponsor':
        return <ApplySponsorPage />;
      case 'financialAid':
        return <FinancialAidPage />;
      case 'financialAidForm':
        return <FinancialAidFormPage />;
      case 'offlineCourses':
        return <OfflineCoursesPage />;
      case 'planner':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Planner</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case 'continue':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Continue with Plan</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      default:
        return children;
    }
  };

  // If layoutComponent is provided, wrap the content with it
  if (layoutComponent) {
    return <>{layoutComponent}</>;
  }

  return <>{renderContent()}</>;
};

/**
 * Navigates between different views within the Course module
 * - main: Main course page with feature cards
 * - enrolled: Enrolled courses list
 * - wishlist: Wishlist page
 * - planner: Planner page
 * - continue: Continue with plan page
 */
export const CourseViewNavigator: React.FC<CourseViewNavigatorProps> = ({ children }) => {
  return (
    <CourseViewProvider>
      <CourseViewContent>{children}</CourseViewContent>
    </CourseViewProvider>
  );
};

export default CourseViewNavigator;

