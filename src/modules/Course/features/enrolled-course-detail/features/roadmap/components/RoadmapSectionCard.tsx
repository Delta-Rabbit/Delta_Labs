/**
 * Delta Labs Roadmap Section Card Component
 * Individual section card with title, description, and tags
 */

import React from 'react';
import type { RoadmapSection } from '../types';

interface RoadmapSectionCardProps {
  section: RoadmapSection;
}

const RoadmapSectionCard: React.FC<RoadmapSectionCardProps> = ({ section }) => {
  return (
    <div className="bg-surface-primary border border-border-primary rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow font-primary max-w-md">
      <h3 className="text-lg font-bold text-primary-700 mb-2 font-primary">
        {section.title}
      </h3>
      <p className="text-sm text-text-secondary mb-3 line-clamp-2 font-primary">
        {section.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {section.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-md font-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSectionCard;
