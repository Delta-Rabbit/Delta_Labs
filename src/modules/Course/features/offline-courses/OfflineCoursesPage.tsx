/**
 * Delta Labs Offline Courses Page
 * Display and manage offline courses using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { DeltaButton } from '../../../../components/theme';
import { Breadcrumbs } from '../../components/common';
import { CourseCard } from '../../components/common';
import ProgressCard from './components/ProgressCard';

interface OfflineCourse {
  id: string;
  title: string;
  university: string;
  rating: number;
  overallProgress: number;
  plannerProgress: number;
  currentLesson: {
    title: string;
    type: string;
    duration: string;
  };
  hasDeadline: boolean;
  deadlineType: 'upcoming' | 'passed';
}

const OfflineCoursesPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample offline courses data
  const offlineCourses: OfflineCourse[] = [
    {
      id: '1',
      title: 'Chemistry',
      university: 'Haramaya University',
      rating: 4,
      overallProgress: 10,
      plannerProgress: 100,
      currentLesson: {
        title: 'Introduction to Quantum Physics',
        type: 'Video',
        duration: '5 min',
      },
      hasDeadline: true,
      deadlineType: 'upcoming',
    },
    {
      id: '2',
      title: 'Chemistry',
      university: 'Haramaya University',
      rating: 4,
      overallProgress: 10,
      plannerProgress: 50,
      currentLesson: {
        title: 'Introduction to Quantum Physics',
        type: 'Video',
        duration: '5 min',
      },
      hasDeadline: true,
      deadlineType: 'upcoming',
    },
  ];

  const planProgress = 5;
  const upcomingDeadlineProgress = 5;
  const passedDeadlineProgress = 5;

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Enrolled Course',
      onClick: () => navigate('/enrolled'),
    },
    {
      label: 'Offline Course',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-8 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Search and Filter */}
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
      </div>

      {/* Progress Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Plan to learn All courses */}
        <ProgressCard
          title="Plan to learn All courses"
          progress={planProgress}
          progressColor="primary"
        />

        {/* Upcoming Deadline */}
        <ProgressCard
          title="Upcoming Deadline"
          progress={upcomingDeadlineProgress}
          progressColor="success"
          icon={
            <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          }
        />

        {/* Passed Deadline */}
        <ProgressCard
          title="Passed Deadline"
          progress={passedDeadlineProgress}
          progressColor="error"
          icon={
            <svg className="w-4 h-4 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          }
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offlineCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={{
              id: course.id,
              title: course.title,
              description: `Course from ${course.university}`,
              thumbnail: '',
              price: 0,
              rating: course.rating,
              level: 'intermediate',
              category: 'offline',
              studentsEnrolled: 0,
              lessons: 0,
              duration: 0,
              instructor: { 
                firstName: course.university, 
                lastName: '', 
                avatar: '', 
                bio: '' 
              },
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }}
            onUnroll={() => console.log('Unroll:', course.id)}
            onGoToCourse={() => console.log('Go to course:', course.id)}
            onShare={() => console.log('Share:', course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default OfflineCoursesPage;
