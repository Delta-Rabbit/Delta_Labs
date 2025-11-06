/**
 * Delta Labs Feature Card Grid
 * 2x2 grid of course module feature cards
 */

import React from 'react';
import { useCourse } from '../../../context/CourseContext';
import { useCourseNavigation } from '../../../routing/hooks/useCourseNavigation';
import FeatureCard from './FeatureCard';

const FeatureCardGrid: React.FC = () => {
  const {
    enrolledCourses,
    wishlistItems,
    isLoadingCourses,
    isLoadingWishlist,
  } = useCourse();

  const { navigate } = useCourseNavigation();

  const enrolledCount = enrolledCourses.length;
  const wishlistCount = wishlistItems.length;

  const handleNavigateToEnrolled = () => {
    navigate('/enrolled');
  };

  const handleNavigateToWishlist = () => {
    navigate('/wishlist');
  };

  const handleNavigateToPlanner = () => {
    navigate('/planner'); // TODO: Add planner route when implemented
  };

  const handleNavigateToContinue = () => {
    navigate('/continue'); // TODO: Add continue route when implemented
  };

  const featureCards = [
    {
      id: 'enrolled',
      title: 'Enrolled Courses',
      description: 'View and manage your active course enrollments. Track your progress and continue learning.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      count: enrolledCount,
      isLoading: isLoadingCourses,
      onClick: handleNavigateToEnrolled,
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      description: 'Save courses you\'re interested in for later. Build your learning wishlist and enroll when ready.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      count: wishlistCount,
      isLoading: isLoadingWishlist,
      onClick: handleNavigateToWishlist,
    },
    {
      id: 'planner',
      title: 'Planner Page',
      description: 'Organize your learning schedule. Plan your course roadmap and set your educational goals.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      onClick: handleNavigateToPlanner,
    },
    {
      id: 'continue',
      title: 'Continue with plan',
      description: 'Resume your learning journey. Pick up where you left off and complete your enrolled courses.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      onClick: handleNavigateToContinue,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {featureCards.map((card) => (
        <FeatureCard
          key={card.id}
          title={card.title}
          description={card.description}
          icon={card.icon}
          count={card.count}
          onClick={card.onClick}
          isLoading={card.isLoading}
        />
      ))}
    </div>
  );
};

export default FeatureCardGrid;

