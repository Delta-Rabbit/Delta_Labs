/**
 * Delta Labs Super Course Card Component
 * Displays a super course in a card format using atomic components
 */

import React from 'react';
import { DeltaCard } from '../../../../../components/theme';
import type { SuperCourse } from '../../../types/superCourse';
import SuperCourseStatusBadge from './SuperCourseStatusBadge';
import SuperCourseVisibilityBadge from './SuperCourseVisibilityBadge';
import SuperCourseThumbnail from './SuperCourseThumbnail';
import SuperCourseStats from './SuperCourseStats';
import SuperCourseTags from './SuperCourseTags';
import SuperCourseActions from './SuperCourseActions';
import SuperCourseAuthor from './SuperCourseAuthor';

export interface SuperCourseCardProps {
  superCourse: SuperCourse;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SuperCourseCard: React.FC<SuperCourseCardProps> = ({
  superCourse,
  onClick,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DeltaCard
      variant="default"
      padding="lg"
      shadow="sm"
      hover={true}
      className="cursor-pointer group relative font-primary"
      onClick={onClick}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <SuperCourseStatusBadge status={superCourse.status} />
      </div>

      {/* Visibility Badge */}
      <div className="absolute top-4 left-4 z-10">
        <SuperCourseVisibilityBadge visibility={superCourse.visibility} />
      </div>

      {/* Thumbnail */}
      <SuperCourseThumbnail thumbnail={superCourse.thumbnail} title={superCourse.title} />

      {/* Title */}
      <h3 className="text-xl font-bold text-text-primary mb-2 pr-16 line-clamp-2 font-primary">
        {superCourse.title}
      </h3>

      {/* Description */}
      {superCourse.description && (
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 font-primary">
          {superCourse.description}
        </p>
      )}

      {/* Author (for community super courses) */}
      {superCourse.author && (
        <SuperCourseAuthor author={superCourse.author} />
      )}

      {/* Stats */}
      <SuperCourseStats
        courseCount={superCourse.courseCount}
        sectionCount={superCourse.sectionCount}
        contentCount={superCourse.contentCount}
      />

      {/* Tags */}
      <SuperCourseTags tags={superCourse.tags || []} />

      {/* Footer - Date and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border-primary">
        <span className="text-xs text-text-tertiary font-primary">
          Updated {formatDate(superCourse.updatedAt)}
        </span>
        <SuperCourseActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </DeltaCard>
  );
};

export default SuperCourseCard;
