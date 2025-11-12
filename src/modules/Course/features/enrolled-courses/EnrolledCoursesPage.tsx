/**
 * Delta Labs Enrolled Courses Page
 * Display and manage all enrolled courses using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { useTab } from '../../../../contexts/TabContext';
import SearchBar from '../../../../components/SearchBar';
import { CourseCard, Breadcrumbs, ViewToggle } from '../../components/common';
import EnrolledCoursesListView from './components/EnrolledCoursesListView';

const EnrolledCoursesPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const { openTab, switchTab, hasTab } = useTab();
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

  const handleGoToCourse = (courseId: string, courseTitle?: string) => {
    // Use course title or fallback to courseId
    const tabLabel = courseTitle || `Course ${courseId}`;
    const tabId = `course-${courseId}`;
    
    // Check if tab already exists
    if (hasTab(tabId)) {
      // Switch to existing tab
      switchTab(tabId);
    } else {
      // Open new tab for the course
      openTab({
        id: tabId,
        label: tabLabel,
        module: 'course',
        data: {
          courseId,
          courseTitle: tabLabel,
          route: `/enrolled/${courseId}`,
        },
      });
    }
    
    // Navigate to course detail page
    navigate(`/enrolled/${courseId}`);
  };

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
          {[1, 2, 3, 4, 5, 6].map((item) => {
            const courseTitle = item === 1 ? 'Physics' : `Learning JavaScript With Imagination ${item}`;
            return (
              <CourseCard
                key={item}
                course={{
                  id: `course-${item}`,
                  title: courseTitle,
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
                onGoToCourse={(courseId) => handleGoToCourse(courseId, courseTitle)}
              />
            );
          })}
        </div>
      ) : (
        <EnrolledCoursesListView onGoToCourse={handleGoToCourse} />
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
