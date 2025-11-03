/**
 * Delta Labs Feature Card
 * Reusable feature card component for course module
 */

import React from 'react';
import type { FeatureCardProps } from '../types';

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
      className="
        bg-surface-primary 
        rounded-lg 
        p-8 
        cursor-pointer 
        border 
        border-border-primary 
        hover:border-primary-500 
        hover:shadow-lg 
        transition-all 
        duration-200
        group
      "
    >
      {/* Icon */}
      <div className="mb-4 text-primary-500 group-hover:text-primary-600 transition-colors">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {description}
      </p>

      {/* Count Badge (optional) */}
      {count !== undefined && (
        <div className="flex items-center justify-between">
          <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Loading...</span>
              </span>
            ) : (
              `${count} ${count === 1 ? 'course' : 'courses'}`
            )}
          </div>

          {/* Arrow */}
          <svg className="w-5 h-5 text-text-tertiary group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}

      {/* Show arrow if no count */}
      {count === undefined && (
        <div className="flex justify-end">
          <svg className="w-5 h-5 text-text-tertiary group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;

