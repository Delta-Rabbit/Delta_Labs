/**
 * Course Module - Route Definitions
 * Centralized route configuration for Course module
 */

import React from 'react';
import type { CourseRoute } from '../types/routeTypes';

// Lazy load pages for better performance
const DashboardPage = React.lazy(() => import('../../features/dashboard/DashboardPage'));
const EnrolledCoursesPage = React.lazy(() => import('../../features/enrolled-courses/EnrolledCoursesPage'));
const EnrolledCourseDetailLayout = React.lazy(() => import('../../features/enrolled-course-detail/EnrolledCourseDetailLayout'));
const WishlistPage = React.lazy(() => import('../../features/wishlist/WishlistPage'));
const CartPage = React.lazy(() => import('../../features/cart/CartPage'));
const SponsorPage = React.lazy(() => import('../../features/sponsor/SponsorPage'));
const ApplySponsorPage = React.lazy(() => import('../../features/sponsor/ApplySponsorPage'));
const FinancialAidPage = React.lazy(() => import('../../features/financial-aid/FinancialAidPage'));
const FinancialAidFormPage = React.lazy(() => import('../../features/financial-aid/FinancialAidFormPage'));
const OfflineCoursesPage = React.lazy(() => import('../../features/offline-courses/OfflineCoursesPage'));
const UnrolledCoursesPage = React.lazy(() => import('../../features/unrolled-courses/UnrolledCoursesPage'));
const RecentActivityPage = React.lazy(() => import('../../features/recent-activity/RecentActivityPage'));
const SuperCoursePage = React.lazy(() => import('../../features/super-course/SuperCoursePage'));

// ============================================================================
// ROUTE DEFINITIONS
// ============================================================================

export const courseRoutes: CourseRoute[] = [
  {
    path: '/dashboard',
    component: DashboardPage,
    exact: true,
    meta: {
      title: 'Course Dashboard',
    },
  },
  {
    path: '/enrolled',
    component: EnrolledCoursesPage,
    meta: {
      title: 'Enrolled Courses',
    },
  },

  {
    path: '/enrolled/:courseId',
    component: EnrolledCourseDetailLayout,
    guards: [
      {
        name: 'requireEnrollment',
        check: () => {
          // TODO: Check if user is enrolled in course
          return true;
        },
      },
    ],
    meta: {
      title: 'Course Details',
      requiresEnrollment: true,
    },
    // Nested routes will be defined in EnrolledCourseDetailLayout
  },
  {
    path: '/wishlist',
    component: WishlistPage,
    meta: {
      title: 'Wishlist',
    },
  },
  {
    path: '/cart',
    component: CartPage,
    meta: {
      title: 'Shopping Cart',
    },
  },
  {
    path: '/sponsor',
    component: SponsorPage,
    meta: {
      title: 'Sponsorship',
    },
  },
  {
    path: '/sponsor/apply',
    component: ApplySponsorPage,
    meta: {
      title: 'Apply for Sponsorship',
    },
  },
  {
    path: '/financial-aid',
    component: FinancialAidPage,
    meta: {
      title: 'Financial Aid',
    },
  },
  {
    path: '/financial-aid/apply',
    component: FinancialAidFormPage,
    meta: {
      title: 'Apply for Financial Aid',
    },
  },
  {
    path: '/offline',
    component: OfflineCoursesPage,
    meta: {
      title: 'Offline Courses',
    },
  },
  {
    path: '/unrolled',
    component: UnrolledCoursesPage,
    meta: {
      title: 'Available Courses',
    },
  },
  {
    path: '/activity',
    component: RecentActivityPage,
    meta: {
      title: 'Recent Activity',
    },
  },
  {
    path: '/super-course',
    component: SuperCoursePage,
    meta: {
      title: 'Super Course',
    },
  },
  {
    path: '/message',
    component: React.lazy(() => Promise.resolve({
      default: () => (
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Message</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      ),
    })),
    meta: {
      title: 'Messages',
    },
  },
  {
    path: '/planner',
    component: React.lazy(() => Promise.resolve({
      default: () => (
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Planner</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      ),
    })),
    meta: {
      title: 'Planner',
    },
  },
  {
    path: '/continue',
    component: React.lazy(() => Promise.resolve({
      default: () => (
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Continue with Plan</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      ),
    })),
    meta: {
      title: 'Continue with Plan',
    },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get route by path
 */
export const getRouteByPath = (path: string): CourseRoute | undefined => {
  const findRoute = (routes: CourseRoute[]): CourseRoute | undefined => {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        const found = findRoute(route.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  return findRoute(courseRoutes);
};

/**
 * Build route path with parameters
 */
export const buildRoutePath = (route: string, params?: Record<string, string>): string => {
  let path = route;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  return path;
};

