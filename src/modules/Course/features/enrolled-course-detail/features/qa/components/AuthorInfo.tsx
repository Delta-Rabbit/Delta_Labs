/**
 * AuthorInfo Molecule Component
 * Displays author name and date
 */

import React from 'react';
import { Avatar } from '../ui';

interface AuthorInfoProps {
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  prefix?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
  author,
  date,
  prefix = '',
  size = 'sm',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 flex-shrink-0 ${className}`}>
      <Avatar name={author.name} avatar={author.avatar} size={size} />
      <span className="text-sm text-text-secondary">
        {author.name}
      </span>
      {prefix && (
        <>
          <span className="text-sm text-text-secondary">•</span>
          <span className="text-sm text-text-secondary">
            {prefix} {date}
          </span>
        </>
      )}
      {!prefix && date && (
        <>
          <span className="text-sm text-text-secondary">•</span>
          <span className="text-sm text-text-secondary">
            {date}
          </span>
        </>
      )}
    </div>
  );
};


