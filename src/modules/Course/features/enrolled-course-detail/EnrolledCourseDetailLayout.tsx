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
    <div className="space-y-6">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Enrolled Course Detail - {courseId}
        </h1>
        <p className="text-gray-600">
          This is where the enrolled course detail system will be implemented.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Bottom navigation with 9 features (Course Intro, Q&A, Exercises, etc.) will be added here.
        </p>
      </div>
    </div>
  );
};

export default EnrolledCourseDetailLayout;

