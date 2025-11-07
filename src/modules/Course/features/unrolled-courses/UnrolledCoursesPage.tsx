/**
 * Delta Labs Unrolled Courses Page
 * Display and manage unrolled courses using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { DeltaButton } from '../../../../components/theme';
import { Breadcrumbs, ViewToggle } from '../../components/common';
import { CourseCard } from '../../components/common';
import UnrolledCourseListItem from './components/UnrolledCourseListItem';

const UnrolledCoursesPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample unrolled courses data
  const unrolledCourses = [
    {
      id: 'unrolled-1',
      title: 'Learning JavaScript With Imagination',
      provider: 'AAU',
      rating: 4.8,
      lessons: 64,
    },
    {
      id: 'unrolled-2',
      title: 'Advanced React Patterns',
      provider: 'Addis Ababa University',
      rating: 4.5,
      lessons: 42,
    },
    {
      id: 'unrolled-3',
      title: 'Data Structures and Algorithms',
      provider: 'Hawassa University',
      rating: 4.7,
      lessons: 52,
    },
    {
      id: 'unrolled-4',
      title: 'Machine Learning Fundamentals',
      provider: 'Bahir Dar University',
      rating: 4.9,
      lessons: 38,
    },
  ];

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Unrolled Courses',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-6 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-2xl">
          <SearchBar maxWidth="full" />
        </div>
        <DeltaButton
          variant="outline"
          size="md"
          className="p-3"
          aria-label="Filter courses"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </DeltaButton>
        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Conditional Render based on view mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unrolledCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={{
                id: course.id,
                title: course.title,
                description: `Course by ${course.provider}`,
                thumbnail: '',
                price: 0,
                rating: course.rating,
                level: 'intermediate',
                category: 'unrolled',
                studentsEnrolled: 0,
                lessons: course.lessons,
                duration: 0,
                instructor: {
                  firstName: course.provider,
                  lastName: '',
                  avatar: '',
                  bio: '',
                },
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }}
              onUnroll={() => console.log('Unroll:', course.id)}
              onGoToCourse={() => console.log('Enroll again:', course.id)}
              onShare={() => console.log('Share:', course.id)}
              isUnrolled={true}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {unrolledCourses.map((course) => (
            <UnrolledCourseListItem
              key={course.id}
              course={course}
              onEnroll={() => console.log('Enroll:', course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnrolledCoursesPage;
