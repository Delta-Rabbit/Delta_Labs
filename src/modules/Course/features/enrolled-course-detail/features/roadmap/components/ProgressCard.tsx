/**
 * Delta Labs Progress Card Component
 * Displays course progress with icon and percentage
 */

import React from 'react';

interface ProgressCardProps {
  progress: number;
  progressText: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress, progressText }) => {
  return (
    <div className="bg-surface-primary border border-border-primary rounded-lg p-4 shadow-sm font-primary">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>

        {/* Progress Info */}
        <div className="flex-1">
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-text-primary font-primary">{progress}%</span>
            </div>
            <div className="w-full bg-surface-tertiary rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Progress Text */}
          <p className="text-xs text-text-secondary font-primary">
            {progressText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
