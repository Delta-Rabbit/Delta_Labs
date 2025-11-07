/**
 * Delta Labs Empty State Component
 * Reusable empty state display with icon and message
 */

import React from 'react';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-border-primary rounded-lg font-primary">
      <div className="text-center">
        <div className="text-text-tertiary mb-4 flex justify-center">
          {icon}
        </div>
        <p className="text-text-secondary text-lg font-medium mb-2 font-primary">
          {title}
        </p>
        <p className="text-text-tertiary text-sm font-primary">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;

