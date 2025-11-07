/**
 * Delta Labs Roadmap Content Item Component
 * Content item in the sidebar roadmap
 */

import React from 'react';
import { DeltaButton } from '../../../../../../components/theme';
import ContentIcon from './ContentIcon';

export interface CourseContentItem {
  id: string;
  type: 'document' | 'video' | 'audio';
  title: string;
  description: string;
  tags: string[];
}

export interface RoadmapContentItemProps {
  content: CourseContentItem;
  isUsed: boolean;
  isLeft?: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onPreview?: () => void;
}

const RoadmapContentItem: React.FC<RoadmapContentItemProps> = ({
  content,
  isUsed,
  isLeft = false,
  onDragStart,
  onDragEnd,
  onPreview,
}) => {
  const timelineCenterOffset = '-2rem';

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
          isUsed
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-move'
        } font-primary`}
        draggable={!isUsed}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
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

export default RoadmapContentItem;

