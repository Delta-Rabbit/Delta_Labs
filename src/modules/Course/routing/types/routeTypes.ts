/**
 * Course Module - Route Type Definitions
 * Type-safe routing system for Course module
 */

import type { React.ComponentType } from 'react';

// ============================================================================
// ROUTE GUARDS
// ============================================================================

export interface RouteGuard {
  name: string;
  check: () => boolean | Promise<boolean>;
  redirectTo?: string;
}

// ============================================================================
// ROUTE DEFINITION
// ============================================================================

export interface CourseRoute {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  guards?: RouteGuard[];
  children?: CourseRoute[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    requiresEnrollment?: boolean;
  };
}

// ============================================================================
// NAVIGATION PARAMS
// ============================================================================

export interface NavigationParams {
  [key: string]: string | number | boolean | undefined;
}

export interface NavigationOptions {
  replace?: boolean;
  state?: any;
}

// ============================================================================
// ROUTE CONTEXT
// ============================================================================

export interface RouteContext {
  params: NavigationParams;
  query: NavigationParams;
  path: string;
  fullPath: string;
}

// ============================================================================
// NAVIGATION HOOK RETURN
// ============================================================================

export interface UseCourseNavigationReturn {
  navigate: (route: string, params?: NavigationParams, options?: NavigationOptions) => void;
  goBack: () => void;
  currentRoute: RouteContext | null;
  isActive: (route: string) => boolean;
}

