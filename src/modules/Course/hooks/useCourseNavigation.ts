/**
 * Delta Labs Course Navigation Hook
 * Manages navigation within the Course module
 */

import { useState, useCallback } from 'react';

export type CourseView = 
  | 'main' 
  | 'enrolled' 
  | 'wishlist' 
  | 'planner' 
  | 'continue'
  | 'cart'
  | 'sponsor'
  | 'applySponsor'
  | 'financialAid'
  | 'financialAidForm'
  | 'offlineCourses'
  | 'unrolledCourses'
  | 'recentActivity'
  | 'superCourse';

interface UseCourseNavigationReturn {
  currentView: CourseView;
  navigateTo: (view: CourseView) => void;
  goBack: () => void;
  history: CourseView[];
}

/**
 * Custom hook for Course module navigation
 * Manages view state and navigation history
 */
export const useCourseNavigation = (): UseCourseNavigationReturn => {
  const [currentView, setCurrentView] = useState<CourseView>('main');
  const [history, setHistory] = useState<CourseView[]>(['main']);

  const navigateTo = useCallback((view: CourseView) => {
    setCurrentView(view);
    setHistory(prev => [...prev, view]);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current view
      const previousView = newHistory[newHistory.length - 1];
      setCurrentView(previousView);
      setHistory(newHistory);
    }
  }, [history]);

  return {
    currentView,
    navigateTo,
    goBack,
    history,
  };
};

export default useCourseNavigation;

