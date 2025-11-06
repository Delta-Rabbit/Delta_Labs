/**
 * Course Module - Router Component
 * Main router for Course module with route matching and rendering
 */

import React, { Suspense, useMemo } from 'react';
import { useCourseNavigation } from './hooks/useCourseNavigation';
import { courseRoutes } from './routes/courseRoutes';
import RouteGuard from './guards/RouteGuard';
import type { CourseRoute } from './types/routeTypes';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// ============================================================================
// ROUTE MATCHER
// ============================================================================

type RouteMatchResult = {
  matches: boolean;
  params: Record<string, string>;
};

type MatchedRoute = {
  route: CourseRoute;
  params: Record<string, string>;
};

/**
 * Match route path with current path
 */
const matchRoute = (routePath: string, currentPath: string): RouteMatchResult => {
  const routeParts = routePath.split('/').filter(Boolean);
  const pathParts = currentPath.split('/').filter(Boolean);

  if (routeParts.length !== pathParts.length) {
    return { matches: false, params: {} };
  }

  const params: Record<string, string> = {};
  let matches = true;

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const pathPart = pathParts[i];

    if (routePart.startsWith(':')) {
      // This is a parameter
      const paramName = routePart.slice(1);
      params[paramName] = pathPart;
    } else if (routePart !== pathPart) {
      matches = false;
      break;
    }
  }

  return { matches, params };
};

/**
 * Find matching route
 */
const findMatchingRoute = (
  routes: CourseRoute[],
  currentPath: string
): MatchedRoute | null => {
  // Remove query string from path
  const [path] = currentPath.split('?');

  for (const route of routes) {
    const { matches, params } = matchRoute(route.path, path);
    
    if (matches) {
      // Check if exact match is required
      if (route.exact) {
        const routeParts = route.path.split('/').filter(Boolean);
        const pathParts = path.split('/').filter(Boolean);
        if (routeParts.length === pathParts.length) {
          return { route, params };
        }
      } else {
        return { route, params };
      }
    }

    // Check children
    if (route.children) {
      const childMatch = findMatchingRoute(route.children, path);
      if (childMatch) {
        return childMatch;
      }
    }
  }

  return null;
};

// ============================================================================
// ROUTER COMPONENT
// ============================================================================

interface CourseRouterProps {
  fallback?: React.ReactNode;
}

const CourseRouter: React.FC<CourseRouterProps> = ({ 
  fallback = <LoadingSpinner /> 
}) => {
  const { currentRoute } = useCourseNavigation();

  const matchedRoute = useMemo(() => {
    if (!currentRoute) {
      // Default to dashboard
      return findMatchingRoute(courseRoutes, '/dashboard');
    }
    return findMatchingRoute(courseRoutes, currentRoute.path);
  }, [currentRoute]);

  if (!matchedRoute) {
    // Route not found - could show 404 page
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }

  const { route, params } = matchedRoute;
  const Component = route.component;

  return (
    <Suspense fallback={fallback}>
      <RouteGuard guards={route.guards} routeParams={params}>
        <Component />
      </RouteGuard>
    </Suspense>
  );
};

export default CourseRouter;

