/**
 * Course Module - Routing System
 * Central export for routing functionality
 */

export { default as CourseRouter } from './CourseRouter';
export { CourseNavigationProvider } from './CourseNavigationContext';
export { useCourseNavigation } from './hooks/useCourseNavigation';
export { courseRoutes, getRouteByPath, buildRoutePath } from './routes/courseRoutes';
export type {
  CourseRoute,
  RouteGuard,
  NavigationParams,
  NavigationOptions,
  RouteContext,
  UseCourseNavigationReturn,
} from './types/routeTypes';

