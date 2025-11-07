/**
 * Delta Labs Course Category Sidebar Component
 * Sidebar for filtering courses by category in the selection modal
 */

import React from 'react';

export type CourseCategory = 'all' | 'recommended' | 'recent';

export interface CourseCategorySidebarProps {
  category: CourseCategory;
  onCategoryChange: (category: CourseCategory) => void;
}

const CourseCategorySidebar: React.FC<CourseCategorySidebarProps> = ({
  category,
  onCategoryChange,
}) => {
  const categories: { id: CourseCategory; label: string }[] = [
    { id: 'all', label: 'All Course' },
    { id: 'recommended', label: 'Recommended' },
    { id: 'recent', label: 'Recently Courses' },
  ];

  return (
    <div className="w-48 flex-shrink-0 font-primary">
      <div className="space-y-1">
        {categories.map((cat) => {
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`
                w-full text-left px-4 py-2.5 rounded-lg transition-colors transition-normal ease-ease font-primary
                ${isActive
                  ? 'bg-surface-secondary text-text-primary font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCategorySidebar;

