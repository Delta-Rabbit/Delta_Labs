/**
 * Delta Labs Course Combiner Toolbar Component
 * Toolbar with action buttons for the course combiner canvas
 */

import React from 'react';
import { DeltaButton } from '../../../../../../components/theme';

export interface CourseCombinerToolbarProps {
  onAddSection: () => void;
  onDone: () => void;
}

const CourseCombinerToolbar: React.FC<CourseCombinerToolbarProps> = ({
  onAddSection,
  onDone,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-success-200 bg-success-50/50 rounded-t-lg font-primary">
      <div className="flex items-center gap-4">
        {/* Folder Icon */}
        <button 
          className="p-2 hover:bg-success-100 rounded-lg transition-colors" 
          title="Folder"
          aria-label="Folder"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        {/* Split Icon */}
        <button 
          className="p-2 hover:bg-success-100 rounded-lg transition-colors" 
          title="Split"
          aria-label="Split"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        {/* Merge Icon */}
        <button 
          className="p-2 hover:bg-success-100 rounded-lg transition-colors" 
          title="Merge"
          aria-label="Merge"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4 4m4 4H8m0 0l4-4m-4 4l4 4" />
          </svg>
        </button>

        {/* Add Section Icon - Card with Plus */}
        <button 
          className="p-2 hover:bg-success-100 rounded-lg transition-colors" 
          title="Add Section"
          aria-label="Add Section"
          onClick={onAddSection}
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {/* Card/Rectangle outline */}
            <rect x="4" y="5" width="16" height="14" rx="1" strokeWidth={2} />
            {/* Plus sign in the center */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v6M9 12h6" />
          </svg>
        </button>
      </div>

      {/* Done Button */}
      <DeltaButton
        variant="primary"
        size="sm"
        onClick={onDone}
      >
        Done
      </DeltaButton>
    </div>
  );
};

export default CourseCombinerToolbar;

