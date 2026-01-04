/**
 * Delta Labs Course Layout
 * Professional, scalable layout wrapper for all Course module screens
 * Features: Secondary navigation bar specific to Course module
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../routing/hooks/useCourseNavigation';

interface CourseLayoutProps {
  children: React.ReactNode;
  onSwitchToDemo?: () => void;
  onNavigateToOfflineCourses?: () => void;
  onNavigateToUnrolledCourses?: () => void;
  onNavigateToRecentActivity?: () => void;
  onNavigateToSuperCourse?: () => void;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({ children, onSwitchToDemo, onNavigateToOfflineCourses, onNavigateToUnrolledCourses, onNavigateToRecentActivity, onNavigateToSuperCourse }) => {
  const [showSecondaryNav, setShowSecondaryNav] = useState(true); // Visible by default
  const { navigate, isActive: isRouteActive, currentRoute } = useCourseNavigation();

  // Helper function to determine if a nav item is active
  const isActive = (route: string) => {
    if (!currentRoute) return false;
    return isRouteActive(route) || currentRoute.path === route;
  };

  // Helper function to get active button styles - Modern design with underline indicator
  const getActiveStyles = (view: string) => {
    const active = isActive(view);
    return {
      button: active 
        ? 'text-primary-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full' 
        : 'text-gray-600 hover:text-gray-900',
      iconBg: active 
        ? 'bg-primary-100 text-primary-600' 
        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200',
      text: active 
        ? 'font-semibold text-primary-600' 
        : 'font-medium'
    };
  };

  return (
    <>
      {/* Floating Back to Demo Button */}
      {onSwitchToDemo && (
        <button
          onClick={onSwitchToDemo}
          className="fixed bottom-4 left-4 bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-50 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Demo</span>
        </button>
      )}

      {/* Secondary Navigation Bar - Course Module Specific */}
      {/* Secondary Navigation Bar - Course Module Specific */}
      <div className={`bg-white z-30 sticky top-[60px] left-0 right-0 transition-all duration-300 ease-in-out ${
        showSecondaryNav 
          ? 'opacity-100 translate-y-0 max-h-screen pointer-events-auto' 
          : 'opacity-0 translate-y-[-100%] max-h-0 pointer-events-none overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-center overflow-x-auto">
            {/* Navigation Tabs */}
            <div className="flex items-center space-x-6 md:space-x-8 flex-shrink-0">
              {/* Super Course */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/super-course');
                  if (onNavigateToSuperCourse) {
                    onNavigateToSuperCourse();
                  }
                }}
                className={`flex items-center space-x-2 transition-all duration-300 whitespace-nowrap group cursor-pointer px-4 py-3 relative ${getActiveStyles('/super-course').button}`}
                style={{ zIndex: 1000 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${getActiveStyles('/super-course').iconBg}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className={`text-sm hidden sm:inline transition-colors duration-300 ${getActiveStyles('/super-course').text}`}>Super Course</span>
              </button>

              {/* Recent Activity */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/activity');
                  if (onNavigateToRecentActivity) {
                    onNavigateToRecentActivity();
                  }
                }}
                className={`flex items-center space-x-2 transition-all duration-300 whitespace-nowrap group cursor-pointer px-4 py-3 relative ${getActiveStyles('/activity').button}`}
                style={{ zIndex: 1000 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${getActiveStyles('/activity').iconBg}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className={`text-sm hidden sm:inline transition-colors duration-300 ${getActiveStyles('/activity').text}`}>Recent Activity</span>
              </button>

              {/* Offline Courses */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/offline');
                  if (onNavigateToOfflineCourses) {
                    onNavigateToOfflineCourses();
                  }
                }}
                className={`flex items-center space-x-2 transition-all duration-300 whitespace-nowrap group cursor-pointer px-4 py-3 relative ${getActiveStyles('/offline').button}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${getActiveStyles('/offline').iconBg}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className={`text-sm hidden sm:inline transition-colors duration-300 ${getActiveStyles('/offline').text}`}>Offline Courses</span>
              </button>

              {/* Message */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/message'); // TODO: Add message route when implemented
                }}
                className={`flex items-center space-x-2 transition-all duration-300 whitespace-nowrap group cursor-pointer px-4 py-3 relative ${getActiveStyles('/message').button}`}
                style={{ zIndex: 1000 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${getActiveStyles('/message').iconBg}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className={`text-sm hidden sm:inline transition-colors duration-300 ${getActiveStyles('/message').text}`}>Message</span>
              </button>

              {/* Unrolled Courses */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/unrolled');
                  if (onNavigateToUnrolledCourses) {
                    onNavigateToUnrolledCourses();
                  }
                }}
                className={`flex items-center space-x-2 transition-all duration-300 whitespace-nowrap group cursor-pointer px-4 py-3 relative ${getActiveStyles('/unrolled').button}`}
                style={{ zIndex: 1000 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${getActiveStyles('/unrolled').iconBg}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className={`text-sm hidden sm:inline transition-colors duration-300 ${getActiveStyles('/unrolled').text}`}>Unrolled Courses</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-4 bg-white max-w-7xl">
        {children}
      </main>
      
      {/* Floating Toggle Button - Always Visible */}
      <button
        onClick={() => setShowSecondaryNav(!showSecondaryNav)}
        className="fixed top-24 right-6 bg-primary-500 hover:bg-primary-600 text-white rounded-lg p-2 shadow-lg transition-all duration-300 ease-in-out z-40 transform hover:scale-105"
        aria-label="Toggle navigation"
      >
        <svg className={`w-5 h-5 transition-transform duration-300 ${showSecondaryNav ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {showSecondaryNav ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          )}
        </svg>
      </button>
    </>
  );
};

export default CourseLayout;
