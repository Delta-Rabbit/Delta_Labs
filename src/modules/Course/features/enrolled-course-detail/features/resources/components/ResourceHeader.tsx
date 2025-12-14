
import React from 'react';

interface ResourceHeaderProps {
  // Add props if needed in future
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = () => {
  return (
    <div className="flex items-start justify-between mb-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 font-primary">
        Resources
      </h1>

    </div>
  );
};
