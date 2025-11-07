/**
 * Delta Labs Progress Card Component
 * Card showing progress information using theme tokens
 */

import React from 'react';
import { DeltaCard } from '../../../../../components/theme';

interface ProgressCardProps {
  title: string;
  progress: number;
  icon?: React.ReactNode;
  progressColor?: 'primary' | 'success' | 'error';
  description?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  icon,
  progressColor = 'primary',
  description = 'Progress According to plan',
}) => {
  const progressColorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    error: 'bg-error-600',
  };

  return (
    <DeltaCard
      variant="default"
      padding="md"
      shadow="sm"
      className="font-primary"
    >
      {icon && (
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-sm font-semibold text-text-primary font-primary">
            {title}
          </h3>
        </div>
      )}
      {!icon && (
        <h3 className="text-sm font-semibold text-text-primary mb-4 font-primary">
          {title}
        </h3>
      )}
      
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1 bg-surface-secondary rounded-full h-2.5">
          <div
            className={`${progressColorClasses[progressColor]} h-2.5 rounded-full transition-all transition-normal ease-ease`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-bold text-text-primary font-primary">
          {progress}%
        </span>
      </div>
      
      {description && (
        <p className="text-xs text-text-secondary font-primary">
          {description}
        </p>
      )}
    </DeltaCard>
  );
};

export default ProgressCard;

