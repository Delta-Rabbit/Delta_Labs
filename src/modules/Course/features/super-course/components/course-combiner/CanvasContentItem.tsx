/**
 * Delta Labs Canvas Content Item Component
 * Content item in the canvas roadmap with full drag-and-drop support
 */

import React from 'react';
import { DeltaButton } from '../../../../../../components/theme';
import ContentIcon from './ContentIcon';
import type { CourseContentItem } from './RoadmapContentItem';

export interface CanvasContentItemProps {
  content: CourseContentItem;
  isLeft: boolean;
  isDragging: boolean;
  isHovered: boolean;
  timelineCenterOffset: string;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onRemove?: () => void;
  onPreview?: () => void;
}

const CanvasContentItem: React.FC<CanvasContentItemProps> = ({
  content,
  isLeft,
  isDragging,
  isHovered,
  timelineCenterOffset,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onRemove,
  onPreview,
}) => {
  return (
    <div className="relative">
      {/* Green Circle Node - Positioned exactly on timeline */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-success-600 rounded-full border-2 border-white shadow-sm z-10"
        style={{ left: timelineCenterOffset }}
      />

      {/* Horizontal Connection Line */}
      {isLeft ? (
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-success-600 z-0"
          style={{ 
            left: timelineCenterOffset,
            right: '100%',
          }}
        />
      ) : (
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 h-0.5 bg-success-600 z-0"
          style={{ 
            left: timelineCenterOffset,
            width: '2rem',
          }}
        />
      )}

      {/* Content Card */}
      <div
        className={`relative w-48 p-3 bg-success-50 border border-success-200 rounded-lg hover:shadow-md transition-all transition-normal ease-ease ${isLeft ? 'mr-auto' : ''} ${
          isDragging ? 'opacity-50 scale-95' : isHovered ? 'scale-105' : 'opacity-100'
        } group cursor-move font-primary`}
        draggable={true}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Remove Button */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 w-6 h-6 text-text-tertiary hover:text-text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
            title="Remove content"
            aria-label="Remove content"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
        )}

        {/* Icon and Title - Matching left sidebar exactly */}
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 text-success-700">
            <ContentIcon type={content.type} className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-text-primary mb-1 line-clamp-1 font-primary">
              {content.title}
            </h4>
            <p className="text-xs text-text-secondary line-clamp-2 mb-2 font-primary">
              {content.description}
            </p>
            {onPreview && (
              <DeltaButton
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview();
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onDragStart={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                className="text-xs p-1"
                draggable={false}
              >
                Preview
              </DeltaButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasContentItem;

