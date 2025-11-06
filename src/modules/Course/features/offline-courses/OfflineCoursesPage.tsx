/**
 * Delta Labs Offline Courses Page
 * Display and manage offline courses
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { CourseCard } from '../../components/common';

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

  return (
    <div className="space-y-8 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <button
          onClick={() => navigate('/enrolled')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Enrolled Course
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Offline Course</span>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-2xl">
          <SearchBar maxWidth="full" />
        </div>
        <button
          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Filter courses"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Progress Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Plan to learn All courses */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Plan to learn All courses</h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${planProgress}%` }}></div>
            </div>
            <span className="text-sm font-bold text-gray-900">{planProgress}%</span>
          </div>
          <p className="text-xs text-gray-600">Progress According to plan</p>
        </div>

        {/* Upcoming Deadline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Deadline</h3>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${upcomingDeadlineProgress}%` }}></div>
            </div>
            <span className="text-sm font-bold text-gray-900">{upcomingDeadlineProgress}%</span>
          </div>
          <p className="text-xs text-gray-600">Progress According to plan</p>
        </div>

        {/* Passed Deadline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <h3 className="text-sm font-semibold text-gray-900">Passed Deadline</h3>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-800 h-2.5 rounded-full" style={{ width: `${passedDeadlineProgress}%` }}></div>
            </div>
            <span className="text-sm font-bold text-gray-900">{passedDeadlineProgress}%</span>
          </div>
          <p className="text-xs text-gray-600">Progress According to plan</p>
        </div>
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
