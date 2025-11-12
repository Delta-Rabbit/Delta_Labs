/**
 * Delta Labs Related Courses Tab
 * Display related courses with search, filter, and sort functionality
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { CourseCard } from '../../../../../components/common';
import type { Course } from '../../../../../types';

// Helper to create a valid Course object
const createCourse = (overrides: Partial<Course>): Course => ({
  id: '',
  title: '',
  description: '',
  thumbnail: '',
  price: 0,
  currency: 'USD',
  isFree: true,
  rating: 0,
  reviewsCount: 0,
  level: 'Beginner',
  category: 'Chemistry',
  studentsEnrolled: 0,
  lessons: 0,
  duration: 0,
  status: 'Published',
  publishedAt: new Date().toISOString(),
  instructor: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    avatar: '',
    bio: '',
    rating: 0,
    studentsCount: 0,
    coursesCount: 0,
  },
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

const RelatedCoursesTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample related courses data
  const relatedCourses: Course[] = [
    createCourse({
      id: 'related-1',
      title: 'Chemistry',
      description: 'Comprehensive chemistry course covering organic and inorganic chemistry',
      rating: 4.0,
      reviewsCount: 100,
      level: 'Beginner',
      category: 'Chemistry',
      studentsEnrolled: 5000,
      lessons: 45,
      duration: 30,
      instructor: {
        id: 'inst-1',
        firstName: 'Haramaya',
        lastName: 'University',
        username: 'haramaya',
        avatar: '',
        bio: '',
        rating: 4.5,
        studentsCount: 10000,
        coursesCount: 50,
      },
      tags: ['chemistry', 'science'],
      currency: 'USD',
      isFree: true,
      status: 'Published',
      publishedAt: new Date().toISOString(),
    }),
    createCourse({
      id: 'related-2',
      title: 'Chemistry',
      description: 'Advanced chemistry concepts and laboratory techniques',
      rating: 4.0,
      level: 'Intermediate',
      category: 'Chemistry',
      studentsEnrolled: 3200,
      lessons: 52,
      duration: 35,
      instructor: {
        id: 'inst-2',
        firstName: 'Haramaya',
        lastName: 'University',
        username: 'haramaya',
        avatar: '',
        bio: '',
        rating: 4.5,
        studentsCount: 10000,
        coursesCount: 50,
      },
      tags: ['chemistry', 'science'],
      currency: 'USD',
      isFree: true,
      status: 'Published',
      publishedAt: new Date().toISOString(),
    }),
    createCourse({
      id: 'related-3',
      title: 'Chemistry',
      description: 'Introduction to chemical reactions and equations',
      rating: 4.0,
      reviewsCount: 100,
      level: 'Beginner',
      category: 'Chemistry',
      studentsEnrolled: 2800,
      lessons: 38,
      duration: 25,
      instructor: {
        id: 'inst-3',
        firstName: 'Haramaya',
        lastName: 'University',
        username: 'haramaya',
        avatar: '',
        bio: '',
        rating: 4.5,
        studentsCount: 10000,
        coursesCount: 50,
      },
      tags: ['chemistry', 'science'],
      currency: 'USD',
      isFree: true,
      status: 'Published',
      publishedAt: new Date().toISOString(),
    }),
    createCourse({
      id: 'related-4',
      title: 'Chemistry',
      description: 'Physical chemistry and thermodynamics fundamentals',
      rating: 4.0,
      level: 'Advanced',
      category: 'Chemistry',
      studentsEnrolled: 2100,
      lessons: 48,
      duration: 32,
      instructor: {
        id: 'inst-4',
        firstName: 'Haramaya',
        lastName: 'University',
        username: 'haramaya',
        avatar: '',
        bio: '',
        rating: 4.5,
        studentsCount: 10000,
        coursesCount: 50,
      },
      tags: ['chemistry', 'science'],
      currency: 'USD',
      isFree: true,
      status: 'Published',
      publishedAt: new Date().toISOString(),
    }),
    createCourse({
      id: 'related-5',
      title: 'Chemistry',
      description: 'Biochemistry and molecular biology applications',
      rating: 4.0,
      level: 'Intermediate',
      category: 'Chemistry',
      studentsEnrolled: 1900,
      lessons: 42,
      duration: 28,
      instructor: {
        id: 'inst-5',
        firstName: 'Haramaya',
        lastName: 'University',
        username: 'haramaya',
        avatar: '',
        bio: '',
        rating: 4.5,
        studentsCount: 10000,
        coursesCount: 50,
      },
      tags: ['chemistry', 'science'],
      currency: 'USD',
      isFree: true,
      status: 'Published',
      publishedAt: new Date().toISOString(),
    }),
    createCourse({
      id: 'related-6',
      title: 'Chemistry',
      description: 'Analytical chemistry and instrumentation',
      rating: 4.0,
      level: 'Advanced',
      category: 'Chemistry',
      studentsEnrolled: 1600,
      lessons: 40,
      duration: 30,
      instructor: {
        id: 'inst-6',
        firstName: 'Haramaya',
        lastName: 'University',
        username: 'haramaya',
        avatar: '',
        bio: '',
        rating: 4.5,
        studentsCount: 10000,
        coursesCount: 50,
      },
      tags: ['chemistry', 'science'],
      currency: 'USD',
      isFree: true,
      status: 'Published',
      publishedAt: new Date().toISOString(),
    }),
  ];

  // Course status types
  const courseStatuses: Record<string, 'supplement' | 'complement'> = {
    'related-1': 'supplement',
    'related-2': 'complement',
    'related-3': 'supplement',
    'related-4': 'complement',
    'related-5': 'supplement',
    'related-6': 'supplement',
  };

  const handleEnroll = (courseId: string) => {
    console.log('Enroll in course:', courseId);
    // Handle enrollment logic
  };

  const handleShare = (courseId: string) => {
    console.log('Share course:', courseId);
    // Handle share logic
  };

  // Filter courses based on search query
  const filteredCourses = relatedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full font-primary">
      {/* Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-6 font-primary">Related Course</h1>

      {/* Search Bar with Filter and Sort */}
      <div className="mb-6">
        <div className="relative">
          <SearchBar 
            maxWidth="full" 
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
          />
          {/* Filter and Sort Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {/* Filter Icon */}
            <button
              className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
              aria-label="Filter courses"
              title="Filter"
            >
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            {/* Sort Icon */}
            <button
              className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
              aria-label="Sort courses"
              title="Sort"
            >
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const status = courseStatuses[course.id];
          return (
            <div key={course.id} className="relative group">
              <div className="[&>div>div>div>div:first-child]:hidden">
                <CourseCard
                  course={course}
                  onShare={handleShare}
                />
              </div>
              {/* Status Badge - Overlay on top of card */}
              <div className="absolute top-6 left-6 z-10">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium font-primary ${
                    status === 'supplement'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {status === 'supplement' ? 'Supplement' : 'Complement'}
                </span>
              </div>
              {/* Enroll Button - Replace the default button in CourseCard */}
              <div className="absolute bottom-6 right-6 z-10">
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium font-primary shadow-md"
                >
                  Enroll
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedCoursesTab;

