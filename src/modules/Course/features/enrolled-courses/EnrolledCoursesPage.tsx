/**
 * Delta Labs Enrolled Courses Page
 * Display and manage all enrolled courses using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { CourseCard, Breadcrumbs, ViewToggle } from '../../components/common';
import EnrolledCoursesListView from './components/EnrolledCoursesListView';

const EnrolledCoursesPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Enrolled Course',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-6 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Search and Filter Bar */}
      <div className="space-y-4">
        {/* Search Input - Professional Design */}
        <SearchBar maxWidth="2xl" />

        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Conditional Render based on view mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Course Cards using the new CourseCard component */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <CourseCard
              key={item}
              course={{
                id: `course-${item}`,
                title: 'Learning JavaScript With Imagination',
                description: 'Learn JavaScript with a creative approach',
                thumbnail: '',
                price: 99.99,
                rating: 4.8,
                level: 'intermediate',
                category: 'programming',
                studentsEnrolled: 1000,
                lessons: 64,
                duration: 40,
                instructor: { firstName: 'AAU', lastName: 'Instructor', avatar: '', bio: '' },
                tags: ['javascript', 'web development'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }}
            />
          ))}
        </div>
      ) : (
        <EnrolledCoursesListView />
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
