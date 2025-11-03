/**
 * Delta Labs Recent Activity Page
 * Display recent course-related activities
 */

import React from 'react';
import { useCourseView } from '../context/CourseViewContext';

interface ActivityItem {
  id: string;
  type: 'enrollment' | 'completion' | 'progress' | 'unrollment' | 'wishlist' | 'review';
  title: string;
  course: string;
  timestamp: string;
  description?: string;
}

const RecentActivityPage: React.FC = () => {
  const { setCurrentView } = useCourseView();

  // Sample activity data
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'enrollment',
      title: 'Enrolled in course',
      course: 'Learning JavaScript With Imagination',
      timestamp: '2 hours ago',
      description: 'You have successfully enrolled in this course',
    },
    {
      id: '2',
      type: 'progress',
      title: 'Progress update',
      course: 'Advanced React Patterns',
      timestamp: '5 hours ago',
      description: 'Completed 3 new lessons',
    },
    {
      id: '3',
      type: 'completion',
      title: 'Course completed',
      course: 'Data Structures and Algorithms',
      timestamp: '1 day ago',
      description: 'Congratulations! You have completed this course',
    },
    {
      id: '4',
      type: 'wishlist',
      title: 'Added to wishlist',
      course: 'Machine Learning Fundamentals',
      timestamp: '2 days ago',
    },
    {
      id: '5',
      type: 'review',
      title: 'Review submitted',
      course: 'Web Development Basics',
      timestamp: '3 days ago',
      description: 'You rated this course 5 stars',
    },
    {
      id: '6',
      type: 'unrollment',
      title: 'Unrolled from course',
      course: 'Introduction to Python',
      timestamp: '4 days ago',
    },
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'enrollment':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'completion':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'progress':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'unrollment':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'wishlist':
        return (
          <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'review':
        return (
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'enrollment':
        return 'bg-green-50 border-green-200';
      case 'completion':
        return 'bg-blue-50 border-blue-200';
      case 'progress':
        return 'bg-yellow-50 border-yellow-200';
      case 'unrollment':
        return 'bg-red-50 border-red-200';
      case 'wishlist':
        return 'bg-pink-50 border-pink-200';
      case 'review':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => setCurrentView('main')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Recent Activity</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Recent Activity</h1>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`bg-white rounded-lg border ${getActivityColor(activity.type)} p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-current flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      {activity.course}
                    </p>
                    {activity.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State - if no activities */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your course activities will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityPage;

