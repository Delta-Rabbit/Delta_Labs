/**
 * Course Module Components - Central Export
 * Professional course management UI components
 * 
 * NOTE: Most components have been moved to feature-based folders.
 * See feature folders in src/modules/Course/features/ for page components.
 */

// Active components (still in use)
export { default as CoursePage } from './CoursePage';
export { default as CourseLayout } from './CourseLayout';

// Common components (moved to components/common/)
export { CourseCard, LoadingSpinner, CourseErrorBoundary } from './common';

// ⚠️ DEPRECATED EXPORTS - Use feature folders directly instead
// export { default as FeatureCardGrid } from './FeatureCardGrid'; // → features/dashboard/
// export { default as FeatureCard } from './FeatureCard'; // → features/dashboard/
// export { default as EnrolledCoursesPage } from './EnrolledCoursesPage'; // → features/enrolled-courses/
// export { default as WishlistPage } from './WishlistPage'; // → features/wishlist/
// export { default as CartPage } from './CartPage'; // → features/cart/
// export { default as SponsorPage } from './SponsorPage'; // → features/sponsor/
// export { default as ApplySponsorPage } from './ApplySponsorPage'; // → features/sponsor/
// export { default as FinancialAidPage } from './FinancialAidPage'; // → features/financial-aid/
// export { default as FinancialAidFormPage } from './FinancialAidFormPage'; // → features/financial-aid/
// export { default as OfflineCoursesPage } from './OfflineCoursesPage'; // → features/offline-courses/
// export { default as UnrolledCoursesPage } from './UnrolledCoursesPage'; // → features/unrolled-courses/
// export { default as RecentActivityPage } from './RecentActivityPage'; // → features/recent-activity/
// export { default as CourseCard } from './CourseCard'; // → components/common/
// export { default as WishlistCourseCard } from './WishlistCourseCard'; // → features/wishlist/
// export { default as CartCourseCard } from './CartCourseCard'; // → features/cart/
// export { default as SponsorCard } from './SponsorCard'; // → features/sponsor/
// export { CourseErrorBoundary } from './ErrorBoundary'; // → components/common/
// export { LoadingSpinner } from './LoadingSpinner'; // → components/common/

