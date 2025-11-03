/**
 * Delta Labs Course View Context
 * Provides context for course view navigation
 */

import React, { createContext, useContext, useState } from 'react';
import type { CourseView } from '../hooks/useCourseNavigation';

interface CourseViewContextType {
  currentView: CourseView;
  setCurrentView: (view: CourseView) => void;
}

const CourseViewContext = createContext<CourseViewContextType | undefined>(undefined);

export const useCourseView = () => {
  const context = useContext(CourseViewContext);
  if (!context) {
    throw new Error('useCourseView must be used within CourseViewProvider');
  }
  return context;
};

interface CourseViewProviderProps {
  children: React.ReactNode;
}

export const CourseViewProvider: React.FC<CourseViewProviderProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState<CourseView>('main');

  // Debug: Log view changes
  React.useEffect(() => {
    console.log('🎯 CourseViewProvider - currentView changed to:', currentView);
  }, [currentView]);

  const value = { currentView, setCurrentView };

  return (
    <CourseViewContext.Provider value={value}>
      {children}
    </CourseViewContext.Provider>
  );
};

export default CourseViewContext;

