/**
 * Delta Labs Course Selection Modal Component
 * Modal for selecting courses to combine into a super course
 */

import React, { useState } from 'react';
import { DeltaModal } from '../../../../../components/theme';
import SearchBar from '../../../../../components/SearchBar';
import CourseCategorySidebar from './CourseCategorySidebar';
import type { CourseCategory } from './CourseCategorySidebar';
import CourseSelectionCard from './CourseSelectionCard';

export interface Course {
  id: string;
  title: string;
  university: string;
  rating: number;
  duration: string;
  chapters: number;
  enrolled: string;
  isPaid?: boolean;
}

export interface CourseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses?: Course[];
  onSelectCourse: (course: Course) => void;
}

const CourseSelectionModal: React.FC<CourseSelectionModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<CourseCategory>('recommended');

  // Filter courses based on search and category
  const filteredCourses = (courses || []).filter((course) => {
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.university.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filtering would go here if needed
    // For now, we'll just use search
    return matchesSearch;
  });

  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={true}
    >
      {/* Modal Content Structure */}
      <div className="flex flex-col" style={{ height: 'calc(75vh - 120px)' }}>
        {/* Search Bar - Fixed at top */}
        <div className="flex-shrink-0 mb-4">
          <SearchBar
            maxWidth="full"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses..."
          />
        </div>

        {/* Content Area - Sidebar Fixed, Course Grid Scrollable */}
        <div className="flex gap-6 flex-1 min-h-0">
          {/* Left Sidebar - Categories */}
          <CourseCategorySidebar
            category={category}
            onCategoryChange={setCategory}
          />

          {/* Right Section - Course Grid - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseSelectionCard
                  key={course.id}
                  course={course}
                  onSelect={(courseId) => {
                    const selectedCourse = (courses || []).find(c => c.id === courseId);
                    if (selectedCourse) {
                      onSelectCourse(selectedCourse);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeltaModal>
  );
};

export default CourseSelectionModal;

