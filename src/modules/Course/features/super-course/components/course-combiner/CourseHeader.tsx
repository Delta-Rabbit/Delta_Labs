/**
 * Delta Labs Course Header Component
 * Header for course in sidebar with title and change button
 */

import React from 'react';
import { DeltaButton } from '../../../../../../components/theme';

export interface CourseHeaderProps {
  title: string;
  onChange: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, onChange }) => {
  return (
    <div className="flex items-center justify-between mb-6 font-primary">
      <h2 className="text-xl font-bold text-text-primary flex-1 text-center font-primary">
        {title}
      </h2>
      <DeltaButton
        variant="ghost"
        size="sm"
        onClick={onChange}
        className="ml-2"
        title="Change course"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="ml-1.5">Change</span>
      </DeltaButton>
    </div>
  );
};

export default CourseHeader;

