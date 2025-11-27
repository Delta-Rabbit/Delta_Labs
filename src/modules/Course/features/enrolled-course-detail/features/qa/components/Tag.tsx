/**
 * Tag Molecule Component
 * Displays a tag badge
 */

import React from 'react';

interface TagProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, onClick, className = '' }) => {
  const baseClasses = 'px-2 py-0.5 text-xs font-medium bg-surface-secondary text-text-secondary rounded-full';
  
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} hover:bg-surface-tertiary transition-colors ${className}`}
        aria-label={`Filter by ${label}`}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={`${baseClasses} ${className}`}>
      {label}
    </span>
  );
};


