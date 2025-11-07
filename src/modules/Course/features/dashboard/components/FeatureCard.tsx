/**
 * Delta Labs Feature Card Component
 * Professional, reusable feature card using Delta Labs theme components
 * ALL styling uses theme design tokens
 */

import React from 'react';
import { DeltaCard, DeltaBadge, DeltaSpinner, ArrowRightIcon } from '../../../../../components/theme';
import type { FeatureCardProps } from '../../../types';

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  count,
  onClick,
  isLoading = false,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group font-primary"
    >
      <DeltaCard
        className="border border-border-primary hover:border-primary-500 hover:shadow-lg transition-all transition-normal ease-ease bg-surface-primary h-full"
        padding="lg"
        shadow="base"
        hover={true}
      >
        {/* Icon */}
        <div className="mb-4 text-primary-500 group-hover:text-primary-600 transition-colors transition-normal ease-ease">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-text-primary mb-2 font-primary">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4 font-primary">
          {description}
        </p>

        {/* Count Badge and Arrow */}
        <div className="flex items-center justify-between">
          {count !== undefined ? (
            <>
              <DeltaBadge variant="default" size="sm" className="bg-primary-50 text-primary-700">
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <DeltaSpinner size="sm" color="primary" />
                    <span className="font-primary">Loading...</span>
                  </span>
                ) : (
                  <span className="font-primary">
                    {`${count} ${count === 1 ? 'course' : 'courses'}`}
                  </span>
                )}
              </DeltaBadge>
              <ArrowRightIcon 
                size="base" 
                className="text-text-tertiary group-hover:text-primary-500 group-hover:translate-x-1 transition-all transition-normal ease-ease" 
              />
            </>
          ) : (
            <div className="flex justify-end w-full">
              <ArrowRightIcon 
                size="base" 
                className="text-text-tertiary group-hover:text-primary-500 group-hover:translate-x-1 transition-all transition-normal ease-ease" 
              />
            </div>
          )}
        </div>
      </DeltaCard>
    </div>
  );
};

export default FeatureCard;
