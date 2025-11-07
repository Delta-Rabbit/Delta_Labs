/**
 * Delta Labs Super Course Tags Component
 * Display tags for a super course
 */

import React from 'react';
import { DeltaBadge } from '../../../../../components/theme';

export interface SuperCourseTagsProps {
  tags: string[];
  maxVisible?: number;
}

const SuperCourseTags: React.FC<SuperCourseTagsProps> = ({ tags, maxVisible = 3 }) => {
  if (!tags || tags.length === 0) return null;

  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {visibleTags.map((tag, index) => (
        <DeltaBadge key={index} variant="default" size="sm" className="font-primary">
          {tag}
        </DeltaBadge>
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-text-tertiary font-primary">+{remainingCount}</span>
      )}
    </div>
  );
};

export default SuperCourseTags;

