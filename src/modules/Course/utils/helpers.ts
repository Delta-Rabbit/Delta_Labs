/**
 * Delta Labs Course Module Helper Functions
 * Utility functions for the Course module
 */

import type { Course, Enrollment, WishlistItem } from '../types';

/**
 * Format course duration
 */
export const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''}`;
};

/**
 * Format enrollment count
 */
export const formatEnrollmentCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return `${(count / 1000000).toFixed(1)}M`;
};

/**
 * Check if course is enrolled
 */
export const isCourseEnrolled = (courseId: string, enrollments: Enrollment[]): boolean => {
  return enrollments.some(enrollment => enrollment.courseId === courseId);
};

/**
 * Check if course is in wishlist
 */
export const isCourseInWishlist = (courseId: string, wishlist: WishlistItem[]): boolean => {
  return wishlist.some(item => item.courseId === courseId);
};

/**
 * Calculate course progress percentage
 */
export const calculateProgress = (progress: number): number => {
  return Math.min(100, Math.max(0, progress));
};

/**
 * Get enrollment status color
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Active':
      return 'text-success-600 bg-success-50';
    case 'Completed':
      return 'text-primary-600 bg-primary-50';
    case 'Dropped':
      return 'text-gray-600 bg-gray-50';
    case 'Expired':
      return 'text-error-600 bg-error-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

/**
 * Sort courses by various criteria
 */
export const sortCourses = (
  courses: Course[], 
  sortBy: 'title' | 'rating' | 'students' | 'price' | 'date',
  order: 'asc' | 'desc' = 'desc'
): Course[] => {
  const sorted = [...courses].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'students':
        comparison = a.studentsEnrolled - b.studentsEnrolled;
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

/**
 * Filter courses by search query
 */
export const filterCoursesByQuery = (courses: Course[], query: string): Course[] => {
  if (!query.trim()) return courses;

  const lowercaseQuery = query.toLowerCase();
  return courses.filter(course =>
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Get course difficulty badge color
 */
export const getDifficultyColor = (level: string): string => {
  switch (level) {
    case 'Beginner':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'Intermediate':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Advanced':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default {
  formatDuration,
  formatEnrollmentCount,
  isCourseEnrolled,
  isCourseInWishlist,
  calculateProgress,
  getStatusColor,
  sortCourses,
  filterCoursesByQuery,
  getDifficultyColor,
};

