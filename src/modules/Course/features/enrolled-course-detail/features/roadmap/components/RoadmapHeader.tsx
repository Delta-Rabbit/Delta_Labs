/**
 * Delta Labs Roadmap Header Component
 * Header with course title and action buttons
 */

import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface RoadmapHeaderProps {
  courseTitle: string;
  onMaster?: () => void;
  onConvertToSuper?: () => void;
  onAdjustRoadmap?: () => void;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  courseTitle,
  onMaster,
  onConvertToSuper,
  onAdjustRoadmap,
}) => {
  return (
    <div className="flex items-center justify-between mb-8 font-primary">
      <h1 className="text-3xl font-bold text-primary-700 font-primary">
        {courseTitle}
      </h1>
      
      <div className="flex items-center gap-4">
        {/* Master Button */}
        <button
          onClick={onMaster}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Master</span>
        </button>

        {/* Convert to Super Button */}
        <button
          onClick={onConvertToSuper}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Convert to Super</span>
        </button>

        {/* Adjust Roadmap Button */}
        <DeltaButton
          variant="primary"
          size="md"
          onClick={onAdjustRoadmap}
          className="font-primary"
        >
          Adjust Roadmap
        </DeltaButton>
      </div>
    </div>
  );
};

export default RoadmapHeader;
