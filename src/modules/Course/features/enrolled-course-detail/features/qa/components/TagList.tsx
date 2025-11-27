/**
 * TagList Molecule Component
 * Displays a list of tags
 */

import React from 'react';
import { Tag } from './Tag';

interface TagListProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

export const TagList: React.FC<TagListProps> = ({ 
  tags, 
  onTagClick,
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        />
      ))}
    </div>
  );
};


