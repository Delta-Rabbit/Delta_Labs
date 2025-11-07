/**
 * Course Module - Enrolled Course Detail Layout
 * Layout for enrolled course detail pages with bottom navigation
 * 
 * This will host the 9 enrolled course features:
 * - Course Intro
 * - Q&A
 * - Exercise & Test
 * - Fast Summary
 * - Score
 * - Supplement
 * - Resources
 * - Roadmap
 * - Community
 */

import React from 'react';
import { useCourseNavigation } from '../../routing';

const EnrolledCourseDetailLayout: React.FC = () => {
  const { currentRoute } = useCourseNavigation();
  const courseId = currentRoute?.params?.courseId as string;

  return (
    <div className="space-y-6 font-primary">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-text-primary mb-4 font-primary">
          Enrolled Course Detail - {courseId}
        </h1>
        <p className="text-text-secondary font-primary">
          This is where the enrolled course detail system will be implemented.
        </p>
        <p className="text-text-tertiary text-sm mt-2 font-primary">
          Bottom navigation with 9 features (Course Intro, Q&A, Exercises, etc.) will be added here.
        </p>
      </div>
    </div>
  );
};

export default EnrolledCourseDetailLayout;
