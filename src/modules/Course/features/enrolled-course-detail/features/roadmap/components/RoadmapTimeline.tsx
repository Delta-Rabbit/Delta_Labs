/**
 * Delta Labs Roadmap Timeline Component
 * Vertical timeline with sections and connecting lines
 */

import React from 'react';
import type { RoadmapSection } from '../types';
import RoadmapSectionCard from './RoadmapSectionCard';

interface RoadmapTimelineProps {
  sections: RoadmapSection[];
}

const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ sections }) => {
  const getNodeColor = (status: RoadmapSection['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500';
      case 'current':
        return 'bg-success-500';
      case 'upcoming':
        return 'bg-primary-700';
      default:
        return 'bg-border-secondary';
    }
  };

  const getLineColor = (status: RoadmapSection['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500';
      case 'current':
        return 'bg-success-500';
      case 'upcoming':
        return 'bg-border-secondary';
      default:
        return 'bg-border-secondary';
    }
  };

  return (
    <div className="relative font-primary">
      {/* Vertical Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5">
        {sections.map((section, index) => {
          const isLast = index === sections.length - 1;
          return (
            <div
              key={`line-${section.id}`}
              className={`${getLineColor(section.status)} transition-colors`}
              style={{
                height: isLast ? '50%' : '100%',
                position: index === 0 ? 'relative' : 'absolute',
                top: index === 0 ? 0 : `${(index * 100) / sections.length}%`,
              }}
            />
          );
        })}
      </div>

      {/* Sections */}
      <div className="space-y-24">
        {sections.map((section, index) => {
          const isLeft = section.position === 'left';
          
          return (
            <div key={section.id} className="relative">
              {/* Timeline Node */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${getNodeColor(
                  section.status
                )} border-4 border-white shadow-md z-10`}
              />

              {/* Horizontal Connector Line */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-0.5 ${getLineColor(section.status)} z-0`}
                style={{
                  [isLeft ? 'right' : 'left']: '50%',
                  width: '80px',
                }}
              />

              {/* Section Card */}
              <div
                className={`relative ${
                  isLeft ? 'mr-auto pr-24' : 'ml-auto pl-24'
                } w-1/2`}
              >
                <RoadmapSectionCard section={section} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
