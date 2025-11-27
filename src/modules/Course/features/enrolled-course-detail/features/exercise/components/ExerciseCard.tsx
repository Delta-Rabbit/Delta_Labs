/**
 * Delta Labs Exercise Card Component
 * Card displaying exercise information
 */

import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface ExerciseCardProps {
  type: 'exercise' | 'test';
  title: string;
  description: string;
  isLive?: boolean;
  onContinue: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  type,
  title,
  description,
  isLive = false,
  onContinue,
}) => {
  const getIcon = () => {
    if (type === 'exercise') {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    }
  };

  return (
    <div className="relative bg-white rounded-lg border border-border-primary p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Live Badge */}
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Live
        </div>
      )}

      {/* Icon */}
      <div className="text-primary-600 mb-4">
        {getIcon()}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-2 font-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-6 font-primary">
        {description}
      </p>

      {/* Continue Button */}
      <DeltaButton
        onClick={onContinue}
        variant="primary"
        size="md"
        className="w-full"
      >
        Continue
      </DeltaButton>
    </div>
  );
};

