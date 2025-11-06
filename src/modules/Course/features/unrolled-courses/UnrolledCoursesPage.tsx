/**
 * Delta Labs Unrolled Courses Page
 * Display and manage unrolled courses
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { CourseCard } from '../../components/common';

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

  return (
    <div className="space-y-6 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Unrolled Courses</span>
      </div>

      {/* Search and Filter Bar */}
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
        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="List view"
            title="List view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
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
            <div
              key={course.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{course.provider}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">({course.rating})</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{course.lessons} Lessons</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => console.log('Enroll:', course.id)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Enroll again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnrolledCoursesPage;
