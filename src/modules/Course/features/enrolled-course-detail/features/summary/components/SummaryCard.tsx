/**
 * Delta Labs Fast Summary - Summary Card
 * Card component displaying summary information
 */

import React from 'react';
import type { Summary } from '../types';

interface SummaryCardProps {
  summary: Summary;
  onClick: (id: string) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary, onClick }) => {
  return (
    <div
      onClick={() => onClick(summary.id)}
      className="bg-surface-primary border border-border-primary rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer mb-4"
    >
      <div className="flex items-start gap-4">
        {/* University Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
            <span className="text-primary-700 font-bold text-sm">
              {summary.university.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* University Name */}
          <p className="text-xs text-text-secondary font-medium mb-1 font-primary">
            {summary.university.name}
          </p>

          {/* Title */}
          <h3 className="text-base font-bold text-text-primary mb-2 font-primary">
            {summary.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2 font-primary">
            {summary.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-xs rounded-full font-primary">
              {summary.courseType}
            </span>
            {summary.visibility === 'public' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-primary">
                Public
              </span>
            )}
            <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-xs rounded-full font-primary">
              {summary.courseType}
            </span>
            <span className="text-xs text-text-tertiary font-primary">
              {summary.readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
