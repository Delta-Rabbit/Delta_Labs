/**
 * Delta Labs Unrolled Course List Item Component
 * List view item for unrolled courses using theme tokens
 */

import React from 'react';
import { DeltaCard, DeltaButton } from '../../../../../components/theme';

interface UnrolledCourseListItemProps {
  course: {
    id: string;
    title: string;
    provider: string;
    rating: number;
    lessons: number;
  };
  onEnroll?: (courseId: string) => void;
}

const UnrolledCourseListItem: React.FC<UnrolledCourseListItemProps> = ({
  course,
  onEnroll,
}) => {
  return (
    <DeltaCard
      variant="default"
      padding="md"
      shadow="sm"
      hover={true}
      className="font-primary"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-text-primary mb-1 font-primary">
              {course.title}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary font-primary">
                {course.provider}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-warning-400">★</span>
                <span className="text-sm text-text-secondary font-primary">
                  ({course.rating})
                </span>
              </div>
              <span className="text-sm text-text-tertiary font-primary">•</span>
              <span className="text-sm text-text-secondary font-primary">
                {course.lessons} Lessons
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DeltaButton
            variant="primary"
            size="md"
            onClick={() => onEnroll?.(course.id)}
            className="font-primary"
          >
            Enroll again
          </DeltaButton>
        </div>
      </div>
    </DeltaCard>
  );
};

export default UnrolledCourseListItem;

