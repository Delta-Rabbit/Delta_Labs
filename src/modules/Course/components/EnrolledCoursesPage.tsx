/**
 * Delta Labs Enrolled Courses Page
 * Display and manage all enrolled courses
 */

import React, { useState } from 'react';
import { useCourseView } from '../context/CourseViewContext';
import SearchBar from '../../../components/SearchBar';
import CourseCard from './CourseCard';
import EnrolledCoursesListView from './EnrolledCoursesListView';

const EnrolledCoursesPage: React.FC = () => {
  const { setCurrentView } = useCourseView();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <button
          onClick={() => setCurrentView('main')}
          className="hover:text-gray-900 transition-colors"
        >
          Course
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Enrolled Course</span>
      </div>

      {/* Search and Filter Bar */}
      <div className="space-y-4">
        {/* Search Input - Professional Design */}
        <SearchBar maxWidth="2xl" />

        {/* View Toggle */}
        <div className="flex items-center justify-end space-x-2">
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