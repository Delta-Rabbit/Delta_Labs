/**
 * Delta Labs Cart Course Card Component
 * Single unified course card for cart
 */

import React from 'react';
import type { Course } from '../../../types';

interface CartCourseCardProps {
  course: Course;
  provider: string;
  aidStatus?: 'approved' | 'rejected' | 'waiting' | null;
  isSelected?: boolean;
  onSelect?: (courseId: string) => void;
  onRemove?: (courseId: string) => void;
  onTryCourse?: (courseId: string) => void;
  onViewResources?: (courseId: string) => void;
  onSourceSponsor?: (courseId: string) => void;
  onEnroll?: (courseId: string) => void;
  onAskForAid?: (courseId: string) => void;
  onNavigateToSponsor?: () => void;
}

export const CartCourseCard: React.FC<CartCourseCardProps> = ({
  course,
  provider,
  aidStatus,
  isSelected = false,
  onSelect,
  onRemove,
  onTryCourse,
  onViewResources,
  onSourceSponsor,
  onEnroll,
  onAskForAid,
  onNavigateToSponsor,
}) => {
  const isFree = course.price === 0;

  const getAidStatusBadge = () => {
    if (!aidStatus) return null;
    
    const styles = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      waiting: 'bg-yellow-100 text-yellow-800',
    };

    const labels = {
      approved: 'Approved',
      rejected: 'Rejected',
      waiting: 'Waiting',
    };

    return (
      <span className={`px-3 py-1 text-xs font-bold rounded-full ${styles[aidStatus]}`}>
        {labels[aidStatus]}
      </span>
    );
  };

  return (
    <div className="relative w-full bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Checkbox - Top Left */}
      <div className="absolute left-4 top-4 z-10">
        <input
          type="checkbox"
          id={`cart-checkbox-${course.id}`}
          checked={isSelected}
          onChange={() => onSelect?.(course.id)}
          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer bg-white shadow-sm"
          aria-label={`Select ${course.title}`}
        />
      </div>

      {/* Course Image/Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 px-6 pt-6 pb-4">
        {/* Remove Button - Top Right */}
        <button
          onClick={() => onRemove?.(course.id)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-md hover:shadow-lg transition-all hover:bg-red-50 group"
          aria-label="Remove from cart"
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Image Container */}
        <div className="flex items-end justify-between gap-4 mt-2">
          {/* Featured Image */}
          <div className="flex-1">
            <div className="rounded-lg bg-white p-3 shadow-md">
              <div className="aspect-video bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xs font-bold mb-1">CHEMISTRY</div>
                  <div className="text-white text-xs">COURSE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Element */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-20 bg-gradient-to-b from-green-400 to-green-600 rounded-t-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-16 bg-gradient-to-b from-green-300 to-green-500 rounded-full opacity-80" />
              </div>
            </div>
            <div className="w-20 h-3 bg-gray-400 rounded-b-lg shadow-md" />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => onTryCourse?.(course.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-primary-50"
            aria-label="Try course"
          >
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            onClick={() => onViewResources?.(course.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-blue-50"
            aria-label="Required resources"
          >
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            onClick={() => onSourceSponsor?.(course.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-purple-50"
            aria-label="Source sponsor"
          >
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {course.title}
        </h3>

        {/* Provider and Rating */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-lg">
            🎓
          </div>
          <span className="text-sm font-semibold text-gray-700">{provider}</span>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">({course.rating} Reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>

        {/* Price and Aid Status */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl font-bold text-gray-900">
              {isFree ? 'Free' : `${course.price} birr`}
            </span>
            {!isFree && !aidStatus && (
              <button
                onClick={() => {
                  onAskForAid?.(course.id);
                  // Navigation to financial aid will be handled by parent
                }}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                Ask for aid
              </button>
            )}
            {getAidStatusBadge()}
          </div>
        </div>

        {/* Source Sponsor Link */}
        <div className="mb-4">
          <button
            onClick={() => {
              onSourceSponsor?.(course.id);
              onNavigateToSponsor?.();
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Source Sponsor
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onEnroll?.(course.id)}
          className="w-full px-4 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default CartCourseCard;

