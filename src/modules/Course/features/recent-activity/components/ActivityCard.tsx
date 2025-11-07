/**
 * Delta Labs Activity Card Component
 * Card displaying a single activity item using theme tokens
 */

import React from 'react';
import { DeltaCard } from '../../../../../components/theme';

interface ActivityItem {
  id: string;
  type: 'enrollment' | 'completion' | 'progress' | 'unrollment' | 'wishlist' | 'review';
  title: string;
  course: string;
  timestamp: string;
  description?: string;
}

interface ActivityCardProps {
  activity: ActivityItem;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    const iconClasses = {
      enrollment: 'text-success-600',
      completion: 'text-info-600',
      progress: 'text-warning-600',
      unrollment: 'text-error-600',
      wishlist: 'text-pink-600',
      review: 'text-warning-600',
    };

    const icons = {
      enrollment: (
        <svg className={`w-5 h-5 ${iconClasses[type]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      completion: (
        <svg className={`w-5 h-5 ${iconClasses[type]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      progress: (
        <svg className={`w-5 h-5 ${iconClasses[type]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      unrollment: (
        <svg className={`w-5 h-5 ${iconClasses[type]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      wishlist: (
        <svg className={`w-5 h-5 ${iconClasses[type]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      review: (
        <svg className={`w-5 h-5 ${iconClasses[type]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    const colors = {
      enrollment: 'bg-success-50 border-success-200',
      completion: 'bg-info-50 border-info-200',
      progress: 'bg-warning-50 border-warning-200',
      unrollment: 'bg-error-50 border-error-200',
      wishlist: 'bg-pink-50 border-pink-200',
      review: 'bg-warning-50 border-warning-200',
    };
    return colors[type] || 'bg-surface-secondary border-border-primary';
  };

  return (
    <DeltaCard
      variant="default"
      padding="md"
      shadow="sm"
      hover={true}
      className={`font-primary ${getActivityColor(activity.type)}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-full bg-surface-primary border-2 border-current flex items-center justify-center">
            {getActivityIcon(activity.type)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary mb-1 font-primary">
                {activity.title}
              </h3>
              <p className="text-base font-medium text-text-primary mb-1 font-primary">
                {activity.course}
              </p>
              {activity.description && (
                <p className="text-sm text-text-secondary mt-1 font-primary">
                  {activity.description}
                </p>
              )}
            </div>
            <span className="text-xs text-text-tertiary whitespace-nowrap flex-shrink-0 font-primary">
              {activity.timestamp}
            </span>
          </div>
        </div>
      </div>
    </DeltaCard>
  );
};

export default ActivityCard;

