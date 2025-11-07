/**
 * Delta Labs Timeline Component
 * Vertical timeline visualization for course roadmap
 */

import React from 'react';

export interface TimelineProps {
  isExpanded: boolean;
  isFirst?: boolean;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ isExpanded, isFirst, className = '' }) => {
  return (
    <>
      {/* Grey segment at very top */}
      {isFirst && (
        <div className={`absolute left-6 top-0 h-1.5 w-1 bg-text-tertiary ${className}`}></div>
      )}
      {/* Green timeline continues down - only show if expanded */}
      {isExpanded && (
        <div className={`absolute left-6 top-1.5 bottom-0 w-1 bg-success-600 z-0 ${className}`}></div>
      )}
    </>
  );
};

export default Timeline;

