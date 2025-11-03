/**
 * Delta Labs Course Card Component
 * Professional course card matching the reference design
 */

import React from 'react';
import type { Course, Enrollment } from '../types';

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
    <div className="w-full max-w-sm overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow rounded-lg">
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        {/* Share Button */}
        <button
          onClick={() => onShare?.(courseData.id)}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md hover:shadow-lg transition-shadow"
          aria-label="Share course"
        >
          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        {/* Main Image Container */}
        <div className="flex items-end justify-between gap-4">
          {/* Featured Image */}
          <div className="flex-1">
            <div className="rounded-lg bg-white p-3 shadow-md">
              <div className="aspect-video bg-gradient-to-br from-purple-900 via-pink-800 to-red-800 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xs font-bold mb-1">ADVENTURE</div>
                  <div className="text-white text-xs">LEARNING</div>
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
            <div className="w-20 h-3 bg-gray-400 rounded-b-lg shadow-md" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="Users"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="Documents"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="View"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Action Buttons Row */}
        <div className="flex gap-3 mb-6">
          {isUnrolled ? (
            <button
              onClick={() => onGoToCourse?.(courseData.id)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
              Enroll again
            </button>
          ) : (
            <>
              <button
                onClick={() => onUnroll?.(courseData.id)}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Unroll
              </button>
              <button
                onClick={() => onGoToCourse?.(courseData.id)}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                Go to course
              </button>
            </>
          )}
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
          {courseData.title}
        </h3>

        {/* Provider Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-lg">
            🎓
          </div>
          <span className="text-sm font-semibold text-gray-700">AAU</span>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">({courseData.rating} Reviews)</span>
          </div>
        </div>

        {/* Course Metadata */}
        <div className="flex items-center gap-8 text-sm text-gray-600 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{courseData.lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Planner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
