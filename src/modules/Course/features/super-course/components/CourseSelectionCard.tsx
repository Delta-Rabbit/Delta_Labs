/**
 * Delta Labs Course Selection Card Component
 * Card for selecting a course in the course selection modal
 */

import React from 'react';
import { DeltaCard, DeltaButton } from '../../../../../components/theme';

export interface CourseSelectionCardProps {
  course: {
    id: string;
    title: string;
    university: string;
    rating: number;
    duration: string;
    chapters: number;
    enrolled: string;
    isPaid?: boolean;
  };
  onSelect: (courseId: string) => void;
}

const CourseSelectionCard: React.FC<CourseSelectionCardProps> = ({ course, onSelect }) => {
  return (
    <DeltaCard
      variant="default"
      padding="md"
      shadow="sm"
      hover={true}
      className="relative group cursor-pointer font-primary"
    >
      {/* Hover Overlay with "Use Course" Button */}
      <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transition-normal ease-ease z-10">
        <DeltaButton
          variant="primary"
          size="md"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(course.id);
          }}
        >
          Use Course
        </DeltaButton>
      </div>

      {/* Certification Badge */}
      <div className="absolute top-4 right-4 z-20">
        <svg className="w-6 h-6 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      {/* Paid Label (if applicable) */}
      {course.isPaid && (
        <div className="absolute top-4 left-4 bg-surface-secondary text-text-secondary text-xs px-2 py-1 rounded z-20 font-primary">
          Paid
        </div>
      )}

      {/* Course Title */}
      <h3 className="text-lg font-bold text-text-primary mb-2 pr-8 font-primary">
        {course.title}
      </h3>

      {/* University */}
      <p className="text-sm text-text-secondary mb-3 font-primary">
        {course.university}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < course.rating ? 'text-warning-400 fill-current' : 'text-text-tertiary'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Course Details */}
      <div className="space-y-2 text-sm text-text-secondary font-primary">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Duration {course.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{course.chapters} Chapters</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>{course.enrolled} Enrolled</span>
        </div>
      </div>
    </DeltaCard>
  );
};

export default CourseSelectionCard;

