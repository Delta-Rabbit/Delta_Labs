/**
 * Course Module - Navigation Hook
 * Provides type-safe navigation for Course module
 */

import { useCallback, useContext, useState, useEffect } from 'react';
import { CourseNavigationContext } from '../CourseNavigationContext';
import type { NavigationParams, NavigationOptions, UseCourseNavigationReturn, RouteContext } from '../types/routeTypes';

export const useCourseNavigation = (): UseCourseNavigationReturn => {
  const context = useContext(CourseNavigationContext);
  
  if (!context) {
    throw new Error('useCourseNavigation must be used within CourseNavigationProvider');
  }

  const { currentRoute, navigate: contextNavigate, goBack: contextGoBack } = context;

  const navigate = useCallback((
    route: string,
    params?: NavigationParams,
    options?: NavigationOptions
  ) => {
    contextNavigate(route, params, options);
  }, [contextNavigate]);

  const goBack = useCallback(() => {
    contextGoBack();
  }, [contextGoBack]);

  const isActive = useCallback((route: string): boolean => {
    if (!currentRoute) return false;
    return currentRoute.path === route || currentRoute.fullPath === route;
  }, [currentRoute]);

  return {
    navigate,
    goBack,
    currentRoute,
    isActive,
  };
};

