/**
 * AnswerStatusBadge Molecule Component
 * Displays answer count and status
 */

import React from 'react';
import { Badge } from '../ui';

interface AnswerStatusBadgeProps {
  answerCount: number;
  views: number;
  className?: string;
}

export const AnswerStatusBadge: React.FC<AnswerStatusBadgeProps> = ({
  answerCount,
  views,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Badge variant="success">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>
            {answerCount} answer{answerCount !== 1 ? 's' : ''}
          </span>
        </div>
      </Badge>
      <span className="text-xs text-text-secondary whitespace-nowrap">
        {views} views
      </span>
    </div>
  );
};


