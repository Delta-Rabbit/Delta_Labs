/**
 * Delta Labs Roadmap Section Card Component
 * Section card in the sidebar roadmap
 */

import React from 'react';
import { DeltaBadge } from '../../../../../../components/theme';
import CollapseExpandButton from './CollapseExpandButton';
import Timeline from './Timeline';

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  contents: any[];
}

export interface RoadmapSectionCardProps {
  section: CourseSection;
  isExpanded: boolean;
  isUsed: boolean;
  isFirst?: boolean;
  isCollapsed?: boolean;
  onToggle: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onRemove?: () => void;
}

const RoadmapSectionCard: React.FC<RoadmapSectionCardProps> = ({
  section,
  isExpanded,
  isUsed,
  isFirst,
  isCollapsed,
  onToggle,
  onDragStart,
  onDragEnd,
  onRemove,
}) => {
  return (
    <>
      {/* Timeline */}
      <Timeline isExpanded={isExpanded} isFirst={isFirst} />

      {/* Section Header Card */}
      <div
        className={`ml-14 mb-3 mr-4 bg-surface-secondary rounded-lg p-3 border border-border-primary relative group ${
          isUsed 
            ? 'cursor-not-allowed opacity-50' 
            : 'cursor-move'
        } font-primary`}
        draggable={!isUsed}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {/* Remove Button - Only show in canvas (when onRemove is provided) */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 w-6 h-6 text-text-tertiary hover:text-text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
            title="Remove section"
            aria-label="Remove section"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
        )}

        {/* Collapse/Expand Button */}
        <CollapseExpandButton
          isExpanded={isExpanded || !isCollapsed}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          style={{ left: '-2rem' }}
        />

        <h3 className="text-lg font-bold text-primary-700 mb-1.5 font-primary">{section.title}</h3>
        <p className="text-sm text-text-secondary mb-2 leading-relaxed line-clamp-2 font-primary">
          {section.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {section.tags.map((tag, tagIndex) => (
            <DeltaBadge key={tagIndex} variant="default" size="sm" className="font-primary">
              {tag}
            </DeltaBadge>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapSectionCard;

