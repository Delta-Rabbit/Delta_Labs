/**
 * Delta Labs Super Course Author Component
 * Display author information for community super courses
 */

import React from 'react';

export interface Author {
  id: string;
  name: string;
  avatar?: string;
}

export interface SuperCourseAuthorProps {
  author: Author;
}

const SuperCourseAuthor: React.FC<SuperCourseAuthorProps> = ({ author }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {author.avatar ? (
        <img
          src={author.avatar}
          alt={author.name}
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-surface-secondary flex items-center justify-center">
          <span className="text-xs text-text-secondary font-medium font-primary">
            {author.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <span className="text-sm text-text-secondary font-primary">{author.name}</span>
    </div>
  );
};

export default SuperCourseAuthor;

