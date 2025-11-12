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
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('profile');

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
      {/* Left Sidebar Navigation - Fixed/Sticky */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pl-4 bg-surface-primary z-30">
          {/* Profile Icon */}
          <button
            onClick={() => setActiveSidebarItem('profile')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'profile'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Profile"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'profile'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Profile
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>

          {/* Bookmark Icon */}
          <button
            onClick={() => setActiveSidebarItem('bookmark')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'bookmark'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Bookmarks"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'bookmark'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Bookmarks
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>

          {/* Notification Bell Icon with Red Dot */}
          <button
            onClick={() => setActiveSidebarItem('notification')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'notification'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Notifications"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'notification'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Red notification dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full z-10" />
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Notifications
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>

          {/* Brain/Mind Map Icon */}
          <button
            onClick={() => setActiveSidebarItem('mindmap')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'mindmap'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Mind Map"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'mindmap'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Mind Map
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>

          {/* Connection/Network Icon */}
          <button
            onClick={() => setActiveSidebarItem('connection')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'connection'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Connections"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'connection'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Connections
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>

          {/* Links/Chain Icon */}
          <button
            onClick={() => setActiveSidebarItem('links')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'links'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Links"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'links'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Links
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>

          {/* Dollar Sign Icon */}
          <button
            onClick={() => setActiveSidebarItem('financial')}
            className={`p-3 rounded-lg transition-colors group relative ${
              activeSidebarItem === 'financial'
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label="Financial"
          >
            <svg
              className={`w-6 h-6 ${
                activeSidebarItem === 'financial'
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              Financial
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>
      </aside>

      {/* Main Content Area - with padding for bottom navigation and sidebar */}
      <main className="pb-24 ml-16">
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
