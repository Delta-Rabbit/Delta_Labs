/**
 * Delta Labs Super Course Actions Component
 * Action buttons for editing and deleting super courses
 */

import React from 'react';
import { DeltaButton } from '../../../../../components/theme';

export interface SuperCourseActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const SuperCourseActions: React.FC<SuperCourseActionsProps> = ({ onEdit, onDelete }) => {
  if (!onEdit && !onDelete) return null;

  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transition-normal ease-ease">
      {onEdit && (
        <DeltaButton
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1.5"
          aria-label="Edit"
        >
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </DeltaButton>
      )}
      {onDelete && (
        <DeltaButton
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 hover:bg-error-50"
          aria-label="Delete"
        >
          <svg className="w-4 h-4 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </DeltaButton>
      )}
    </div>
  );
};

export default SuperCourseActions;

