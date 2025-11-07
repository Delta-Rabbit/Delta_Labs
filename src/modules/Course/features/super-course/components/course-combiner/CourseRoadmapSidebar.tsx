/**
 * Delta Labs Course Roadmap Sidebar Component
 * Left sidebar showing course roadmap structure
 */

import React from 'react';
import CourseHeader from './CourseHeader';
import RoadmapSectionCard from './RoadmapSectionCard';
import RoadmapContentItem, { type CourseContentItem } from './RoadmapContentItem';
import type { CourseSection } from './RoadmapSectionCard';

export interface CourseData {
  id: string;
  title: string;
  sections: CourseSection[];
}

export interface CourseRoadmapSidebarProps {
  course: CourseData | null;
  courseTitle: string;
  collapsedSections: Record<string, boolean>;
  usedItems: Set<string>;
  onToggleSection: (sectionId: string) => void;
  onSectionDragStart: (e: React.DragEvent, section: CourseSection) => void;
  onContentDragStart: (e: React.DragEvent, content: CourseContentItem) => void;
  onDragEnd: () => void;
  onChangeCourse: () => void;
  onPreviewContent?: (content: CourseContentItem) => void;
}

const CourseRoadmapSidebar: React.FC<CourseRoadmapSidebarProps> = ({
  course,
  courseTitle,
  collapsedSections,
  usedItems,
  onToggleSection,
  onSectionDragStart,
  onContentDragStart,
  onDragEnd,
  onChangeCourse,
  onPreviewContent,
}) => {
  const isSectionExpanded = (sectionId: string) => {
    return collapsedSections[sectionId] !== true;
  };

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center font-primary">
        <svg
          className="w-24 h-24 text-text-tertiary mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <p className="text-text-secondary text-sm font-medium mb-2 font-primary">No course selected</p>
        <p className="text-text-tertiary text-xs font-primary">Click "Add Course" to add another course</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-primary">
      <CourseHeader title={courseTitle} onChange={onChangeCourse} />

      <div className="space-y-6 mt-6">
        {(course.sections || []).map((section, sectionIndex) => {
          const isExpanded = isSectionExpanded(section.id);
          const isFirst = sectionIndex === 0;

          return (
            <div key={section.id} className="relative min-h-[200px]">
              <RoadmapSectionCard
                section={section}
                isExpanded={isExpanded}
                isUsed={usedItems.has(section.id)}
                isFirst={isFirst}
                onToggle={() => onToggleSection(section.id)}
                onDragStart={(e) => onSectionDragStart(e, section)}
                onDragEnd={onDragEnd}
              />

              {/* Content Items - Only show if expanded */}
              {isExpanded && (
                <div className="ml-14 space-y-3">
                  {(section.contents || []).map((content) => {
                    const isLeft = content.type === 'audio';
                    return (
                      <RoadmapContentItem
                        key={content.id}
                        content={content}
                        isUsed={usedItems.has(content.id)}
                        isLeft={isLeft}
                        onDragStart={(e) => onContentDragStart(e, content)}
                        onDragEnd={onDragEnd}
                        onPreview={onPreviewContent ? () => onPreviewContent(content) : undefined}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseRoadmapSidebar;

