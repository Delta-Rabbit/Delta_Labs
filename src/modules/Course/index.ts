/**
 * Delta Labs Course Module - Main Index
 * Enterprise-grade course management exports
 */

// ============================================================================
// CONTEXT EXPORTS
// ============================================================================

export { CourseProvider, useCourse } from './context/CourseContext';

// ============================================================================
// COMPONENT EXPORTS
// ============================================================================

export { default as CoursePage } from './components/CoursePage';
export { default as CourseLayout } from './components/CourseLayout';
// Feature-based exports - use feature folders directly
// export { default as FeatureCardGrid } from './features/dashboard/components/FeatureCardGrid';
// export { default as FeatureCard } from './features/dashboard/components/FeatureCard';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  Course,
  CourseCategory,
  CourseLevel,
  CourseStatus,
  Instructor,
  Enrollment,
  EnrollmentStatus,
  WishlistItem,
  CourseState,
  CourseTabType,
  CourseActivity,
  CourseContextValue,
  FeatureCardProps,
  CourseListResponse,
  EnrollmentResponse,
} from './types';

// ============================================================================
// UTILS EXPORTS
// ============================================================================

export * from './utils';
// Hooks moved to routing/hooks/useCourseNavigation

