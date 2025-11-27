/**
 * Delta Labs Course Module - Enrolled Course Detail Layout
 * Main layout for enrolled course detail pages with header, content area, and bottom navigation
 * 
 * This layout hosts 9 enrolled course features:
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

import React, { useState } from 'react';
import CourseDetailBottomNav, { type CourseDetailFeature } from './components/CourseDetailBottomNav';

// Lazy load feature pages
const CourseIntroPage = React.lazy(() => import('./features/course-intro/CourseIntroPage'));
const QAPage = React.lazy(() => import('./features/qa/QAPage'));
const ExerciseTestPage = React.lazy(() => import('./features/exercise/ExerciseTestPage'));
const FastSummaryPage = React.lazy(() => import('./features/summary/FastSummaryPage'));
const ScorePage = React.lazy(() => import('./features/score/ScorePage'));
const SupplementPage = React.lazy(() => import('./features/supplement/SupplementPage'));
const ResourcesPage = React.lazy(() => import('./features/resources/ResourcesPage'));
const RoadmapPage = React.lazy(() => import('./features/roadmap/RoadmapPage'));
const CommunityPage = React.lazy(() => import('./features/community/CommunityPage'));

const EnrolledCourseDetailLayout: React.FC = () => {

  // Get active feature from URL hash or default to 'intro'
  const getActiveFeatureFromHash = (): CourseDetailFeature => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validFeatures: CourseDetailFeature[] = ['intro', 'qa', 'exercise', 'summary', 'score', 'supplement', 'resources', 'roadmap', 'community'];
      if (validFeatures.includes(hash as CourseDetailFeature)) {
        return hash as CourseDetailFeature;
      }
    }
    return 'intro';
  };

  const [activeFeature, setActiveFeature] = useState<CourseDetailFeature>(getActiveFeatureFromHash);

  // Update active feature when hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveFeature(getActiveFeatureFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFeatureChange = (feature: CourseDetailFeature) => {
    setActiveFeature(feature);
    // Update URL hash without triggering navigation
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${feature}`);
    }
  };

  // Map feature to component
  const renderFeaturePage = () => {
    switch (activeFeature) {
      case 'intro':
        return <CourseIntroPage />;
      case 'qa':
        return <QAPage />;
      case 'exercise':
        return <ExerciseTestPage />;
      case 'summary':
        return <FastSummaryPage />;
      case 'score':
        return <ScorePage />;
      case 'supplement':
        return <SupplementPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'community':
        return <CommunityPage />;
      default:
        return <CourseIntroPage />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary font-primary">
      {/* Main Content Area - with padding for bottom navigation */}
      <main className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
                    <p className="text-text-secondary font-primary">Loading...</p>
                  </div>
                </div>
              }
            >
              {renderFeaturePage()}
            </React.Suspense>
        </div>
      </main>

      {/* Bottom Navigation */}
      <CourseDetailBottomNav
        activeFeature={activeFeature}
        onFeatureChange={handleFeatureChange}
      />
    </div>
  );
};

export default EnrolledCourseDetailLayout;
