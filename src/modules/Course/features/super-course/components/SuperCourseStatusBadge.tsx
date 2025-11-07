/**
 * Delta Labs Super Course Status Badge Component
 * Badge displaying the status of a super course
 */

import React from 'react';
import { DeltaBadge } from '../../../../../components/theme';

export type SuperCourseStatus = 'draft' | 'completed' | 'published';

export interface SuperCourseStatusBadgeProps {
  status: SuperCourseStatus;
}

const SuperCourseStatusBadge: React.FC<SuperCourseStatusBadgeProps> = ({ status }) => {
  const getVariant = (status: SuperCourseStatus): 'warning' | 'success' | 'info' => {
    switch (status) {
      case 'draft':
        return 'warning';
      case 'completed':
        return 'success';
      case 'published':
        return 'info';
      default:
        return 'warning';
    }
  };

  const getLabel = (status: SuperCourseStatus): string => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'completed':
        return 'Completed';
      case 'published':
        return 'Published';
      default:
        return status;
    }
  };

  return (
    <DeltaBadge variant={getVariant(status)} size="sm" className="font-primary">
      {getLabel(status)}
    </DeltaBadge>
  );
};

export default SuperCourseStatusBadge;

