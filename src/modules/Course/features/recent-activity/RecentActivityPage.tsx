/**
 * Delta Labs Recent Activity Page
 * Display recent course-related activities using theme tokens
 */

import React from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { Breadcrumbs } from '../../components/common';
import ActivityCard from './components/ActivityCard';

interface ActivityItem {
  id: string;
  type: 'enrollment' | 'completion' | 'progress' | 'unrollment' | 'wishlist' | 'review';
  title: string;
  course: string;
  timestamp: string;
  description?: string;
}

const RecentActivityPage: React.FC = () => {
  const { navigate } = useCourseNavigation();

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

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Recent Activity',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-6 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-primary">
          Recent Activity
        </h1>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* Empty State - if no activities */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-text-primary font-primary">
            No recent activity
          </h3>
          <p className="mt-1 text-sm text-text-secondary font-primary">
            Your course activities will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityPage;
