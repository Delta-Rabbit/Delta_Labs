/**
 * Delta Labs View Toggle Component
 * Grid/List view toggle for Course module using theme tokens
 */

import React from 'react';

export interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {/* Grid View Button */}
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all transition-normal ease-ease font-primary ${
          viewMode === 'grid'
            ? 'bg-primary-600 text-white shadow-md'
            : 'text-text-secondary hover:bg-surface-secondary'
        }`}
        aria-label="Grid view"
        title="Grid view"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
        </svg>
      </button>

      {/* List View Button */}
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-all transition-normal ease-ease font-primary ${
          viewMode === 'list'
            ? 'bg-primary-600 text-white shadow-md'
            : 'text-text-secondary hover:bg-surface-secondary'
        }`}
        aria-label="List view"
        title="List view"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default ViewToggle;

