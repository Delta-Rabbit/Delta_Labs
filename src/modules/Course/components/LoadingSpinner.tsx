/**
 * Delta Labs Course Module Loading Spinner
 * Professional loading states for better UX
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-surface-secondary'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full border-4 border-primary-200 border-t-primary-500 mb-4">
          <div className={sizeClasses[size]}></div>
        </div>
        <p className="text-text-secondary text-sm">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

