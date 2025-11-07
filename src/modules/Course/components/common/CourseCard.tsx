/**
 * Delta Labs Course Card Component
 * Professional course card using Delta Labs theme components with variants
 * Proper alignment: buttons align with content edges
 */

import React from 'react';
import { DeltaButton, DeltaCard } from '../../../../components/theme';
import type { Course, Enrollment } from '../../types';

interface CourseCardProps {
  enrollment?: Enrollment;
  course?: Course;
  onUnroll?: (courseId: string) => void;
  onGoToCourse?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
  isUnrolled?: boolean; // Flag to show "Enroll again" button for unrolled courses
}

export const CourseCard: React.FC<CourseCardProps> = ({
  enrollment,
  course,
  onUnroll,
  onGoToCourse,
  onShare,
  isUnrolled = false,
}) => {
  const courseData = enrollment?.course || course;
  if (!courseData) return null;

  return (
    <DeltaCard
      variant="course"
      padding="none"
      shadow="lg"
      hover={true}
      className="font-primary"
    >
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-surface-secondary to-surface-tertiary px-6 pt-6 pb-6">
        {/* Share Button */}
        <button
          onClick={() => onShare?.(courseData.id)}
          className="absolute right-4 top-4 rounded-full bg-surface-primary p-2 shadow-md hover:shadow-lg transition-all transition-normal ease-ease"
          aria-label="Share course"
        >
          <svg className="h-5 w-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        {/* Main Image Container */}
        <div className="flex items-end justify-between gap-4">
          {/* Featured Image */}
          <div className="flex-1">
            <div className="rounded-lg bg-surface-primary p-3 shadow-md">
              <div className="aspect-video bg-gradient-to-br from-purple-900 via-pink-800 to-red-800 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xs font-bold mb-1 font-primary">ADVENTURE</div>
                  <div className="text-white text-xs font-primary">LEARNING</div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Element */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-20 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-t-lg relative">
              {/* Icon inside */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-16 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full opacity-80" />
              </div>
            </div>
            <div className="w-20 h-3 bg-text-tertiary rounded-b-lg shadow-md" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-primary shadow-md hover:shadow-lg transition-all transition-normal ease-ease"
            aria-label="Users"
          >
            <svg className="h-5 w-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-primary shadow-md hover:shadow-lg transition-all transition-normal ease-ease"
            aria-label="Documents"
          >
            <svg className="h-5 w-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-primary shadow-md hover:shadow-lg transition-all transition-normal ease-ease"
            aria-label="View"
          >
            <svg className="h-5 w-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section - Aligned with image section padding */}
      <div className="px-6 pt-6 pb-6">
        {/* Action Buttons Row - Left edge aligns with course title, right edge aligns with reviews */}
        <div className="flex gap-3 mb-6">
          {isUnrolled ? (
            <DeltaButton
              variant="primary"
              size="md"
              onClick={() => onGoToCourse?.(courseData.id)}
              className="flex-1"
            >
              Enroll again
            </DeltaButton>
          ) : (
            <>
              {/* Unroll Button - Left edge aligns with course title below */}
              <DeltaButton
                variant="unroll"
                onClick={() => onUnroll?.(courseData.id)}
                className="flex-shrink-0"
              >
                Unroll
              </DeltaButton>
              {/* Go to course Button - Right edge aligns with reviews text */}
              <DeltaButton
                variant="primary"
                size="md"
                onClick={() => onGoToCourse?.(courseData.id)}
                className="flex-1"
              >
                Go to course
              </DeltaButton>
            </>
          )}
        </div>

        {/* Course Title - Left edge aligns with Unroll button above */}
        <h3 className="text-xl font-bold text-text-primary mb-4 leading-tight font-primary">
          {courseData.title}
        </h3>

        {/* Provider Info - Right edge aligns with Go to course button and reviews */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error-100 text-lg">
            🎓
          </div>
          <span className="text-sm font-semibold text-text-primary font-primary">AAU</span>
          {/* Reviews - Right edge aligns with Go to course button and Planner text */}
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-warning-400">★</span>
            <span className="text-sm text-text-secondary font-primary">
              ({courseData.rating} Reviews)
            </span>
          </div>
        </div>

        {/* Course Metadata - Right edge aligns with reviews above */}
        <div className="flex items-center gap-8 text-sm text-text-secondary pt-2 pb-0 border-t border-border-primary font-primary">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{courseData.lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Progress</span>
          </div>
          {/* Planner - Right edge aligns with reviews and Go to course button */}
          <div className="flex items-center gap-2 ml-auto">
            <svg className="h-4 w-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Planner</span>
          </div>
        </div>
      </div>
    </DeltaCard>
  );
};

export default CourseCard;
