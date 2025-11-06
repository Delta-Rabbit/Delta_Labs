/**
 * Course Module - Navigation Context
 * Manages navigation state for Course module
 */

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { NavigationParams, NavigationOptions, RouteContext } from './types/routeTypes';
import { buildRoutePath } from './routes/courseRoutes';

interface CourseNavigationContextType {
  currentRoute: RouteContext | null;
  navigate: (route: string, params?: NavigationParams, options?: NavigationOptions) => void;
  goBack: () => void;
  history: string[];
}

export const CourseNavigationContext = createContext<CourseNavigationContextType | undefined>(undefined);

interface CourseNavigationProviderProps {
  children: ReactNode;
  initialRoute?: string;
}

export const CourseNavigationProvider: React.FC<CourseNavigationProviderProps> = ({
  children,
  initialRoute = '/dashboard',
}) => {
  const [history, setHistory] = useState<string[]>([initialRoute]);
  const [currentRoute, setCurrentRoute] = useState<RouteContext | null>(() => {
    // Parse initial route
    const [path, queryString] = initialRoute.split('?');
    const params: NavigationParams = {};
    const query: NavigationParams = {};

    // Extract path parameters (simplified - would need route matching in real implementation)
    const pathParts = path.split('/');
    pathParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        // This is a parameter placeholder
        const paramName = part.slice(1);
        // In real implementation, would extract from matched route
      }
    });

    // Extract query parameters
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key) query[key] = decodeURIComponent(value || '');
      });
    }

    return {
      params,
      query,
      path,
      fullPath: initialRoute,
    };
  });

  const navigate = useCallback((
    route: string,
    params?: NavigationParams,
    options?: NavigationOptions
  ) => {
    // Build full path with parameters
    const fullPath = buildRoutePath(route, params as Record<string, string> | undefined);
    
    // Parse route to extract params and query
    const [path, queryString] = fullPath.split('?');
    const routeParams: NavigationParams = { ...params };
    const query: NavigationParams = {};

    // Extract query parameters
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key) query[key] = decodeURIComponent(value || '');
      });
    }

    const newRoute: RouteContext = {
      params: routeParams,
      query,
      path,
      fullPath,
    };

    setCurrentRoute(newRoute);

    // Update history
    if (options?.replace) {
      setHistory(prev => [...prev.slice(0, -1), fullPath]);
    } else {
      setHistory(prev => [...prev, fullPath]);
    }

    // Update document title if route has meta
    // This would be handled by the router component
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const previousPath = newHistory[newHistory.length - 1];
      
      setHistory(newHistory);
      
      // Parse previous route
      const [path, queryString] = previousPath.split('?');
      const query: NavigationParams = {};
      
      if (queryString) {
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=');
          if (key) query[key] = decodeURIComponent(value || '');
        });
      }

      setCurrentRoute({
        params: {},
        query,
        path,
        fullPath: previousPath,
      });
    }
  }, [history]);

  const value: CourseNavigationContextType = {
    currentRoute,
    navigate,
    goBack,
    history,
  };

  return (
    <CourseNavigationContext.Provider value={value}>
      {children}
    </CourseNavigationContext.Provider>
  );
};

