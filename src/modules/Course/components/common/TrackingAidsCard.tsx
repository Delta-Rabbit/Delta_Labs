/**
 * Delta Labs Tracking Aids Card Component
 * Reusable card for displaying financial aid tracking information
 * Used across wishlist and cart features
 */

import React from 'react';
import { DeltaCard, DeltaBadge } from '../../../../components/theme';

export interface AidItem {
  courseName: string;
  status: 'approved' | 'waiting' | 'rejected';
}

export interface TrackingAidsCardProps {
  aids: AidItem[];
}

const TrackingAidsCard: React.FC<TrackingAidsCardProps> = ({ aids }) => {
  const getBadgeVariant = (status: AidItem['status']) => {
    switch (status) {
      case 'approved':
        return 'success' as const;
      case 'waiting':
        return 'warning' as const;
      case 'rejected':
        return 'error' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <DeltaCard
      variant="default"
      padding="md"
      shadow="sm"
      className="font-primary"
    >
      <h3 className="text-lg font-bold text-text-primary mb-4 font-primary">
        Tracking Aids
      </h3>
      <div className="space-y-3">
        {aids.length === 0 ? (
          <p className="text-sm text-text-secondary font-primary">
            No aids tracked
          </p>
        ) : (
          aids.map((aid, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
            >
              <span className="text-sm text-text-primary font-medium font-primary">
                {aid.courseName}
              </span>
              <DeltaBadge variant={getBadgeVariant(aid.status)} size="sm">
                {aid.status}
              </DeltaBadge>
            </div>
          ))
        )}
      </div>
    </DeltaCard>
  );
};

export default TrackingAidsCard;

