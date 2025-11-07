/**
 * Delta Labs Collapse Expand Button Component
 * Reusable button for collapsing/expanding sections
 */

import React from 'react';

export interface CollapseExpandButtonProps {
  isExpanded: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({
  isExpanded,
  onClick,
  className = '',
  style,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center z-10 hover:bg-primary-700 transition-colors transition-normal ease-ease cursor-pointer shadow-md ${className}`}
      style={style}
      aria-label={ariaLabel || (isExpanded ? 'Collapse section' : 'Expand section')}
    >
      {isExpanded ? (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  );
};

export default CollapseExpandButton;

