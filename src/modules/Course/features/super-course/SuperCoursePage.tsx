/**
 * Delta Labs Super Course Page
 * Main page for creating and managing Super Courses
 * Super Course: Combine 2+ different course roadmaps, edit them, and create custom learning paths
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { DeltaModal, DeltaInput, DeltaButton, DeltaDropdown } from '../../../../components/theme';
import SearchBar from '../../../../components/SearchBar';
import CourseCombiner from './components/CourseCombiner';
import { SuperCourseCard } from './components/SuperCourseCard';
import type { SuperCourse } from '../../types/superCourse';

// ============================================================================
// SUPER COURSE TAB TYPES
// ============================================================================

type SuperCourseTab = 'create' | 'personal' | 'community' | 'temporary';

// ============================================================================
// SUPER COURSE PAGE COMPONENT
// ============================================================================

const SuperCoursePage: React.FC = () => {
  const { navigate, currentRoute } = useCourseNavigation();
  const [activeTab, setActiveTab] = useState<SuperCourseTab>('create');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isCourseSelectionModalOpen, setIsCourseSelectionModalOpen] = useState(false);
  const [superCourseTitle, setSuperCourseTitle] = useState('physics v1');
  const [visibility, setVisibility] = useState('');
  const [courseCategory, setCourseCategory] = useState<'all' | 'recommended' | 'recent'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCombinerView, setIsCombinerView] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; title: string } | null>(null);
  const [searchQuerySuperCourses, setSearchQuerySuperCourses] = useState('');

  // Reset combiner view when navigating away from superCourse
  useEffect(() => {
    if (!currentRoute || currentRoute.path !== '/super-course') {
      setIsCombinerView(false);
      setSelectedCourse(null);
      setActiveTab('create');
    }
  }, [currentRoute]);

  // Sample data for super courses
  const allSuperCourses: SuperCourse[] = [
    {
      id: 'personal-1',
      title: 'Advanced Physics Mastery',
      description: 'A comprehensive combination of Quantum Physics and Modern Physics courses',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      courseCount: 3,
      sectionCount: 24,
      contentCount: 156,
      status: 'completed',
      visibility: 'private',
      tags: ['#Physics', '#Advanced', '#Quantum'],
    },
    {
      id: 'personal-2',
      title: 'Chemistry Fundamentals',
      description: 'Organic and Inorganic Chemistry combined for complete understanding',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-10',
      courseCount: 2,
      sectionCount: 18,
      contentCount: 98,
      status: 'completed',
      visibility: 'public',
      tags: ['#Chemistry', '#Fundamentals'],
    },
    {
      id: 'community-1',
      title: 'Data Science Bootcamp',
      description: 'Complete data science curriculum combining statistics, programming, and ML',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-25',
      author: {
        id: 'user-1',
        name: 'John Doe',
        avatar: undefined,
      },
      courseCount: 5,
      sectionCount: 45,
      contentCount: 320,
      status: 'published',
      visibility: 'public',
      tags: ['#DataScience', '#MachineLearning', '#Programming'],
    },
    {
      id: 'community-2',
      title: 'Web Development Mastery',
      description: 'Frontend and Backend development combined for full-stack expertise',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-18',
      author: {
        id: 'user-2',
        name: 'Jane Smith',
        avatar: undefined,
      },
      courseCount: 4,
      sectionCount: 32,
      contentCount: 245,
      status: 'published',
      visibility: 'public',
      tags: ['#WebDevelopment', '#FullStack', '#JavaScript'],
    },
    {
      id: 'temporary-1',
      title: 'Biology Advanced Topics',
      description: 'Working on combining molecular biology and genetics courses',
      createdAt: '2024-02-15',
      updatedAt: '2024-02-15',
      courseCount: 2,
      sectionCount: 8,
      contentCount: 32,
      status: 'draft',
      visibility: 'private',
      tags: ['#Biology', '#Genetics'],
    },
  ];

  // Filter super courses based on active tab
  const personalSuperCourses = useMemo(() => {
    let personal = allSuperCourses.filter(sc => 
      (sc.status === 'completed' || sc.status === 'published') && !sc.author
    );

    // Apply search filter
    if (searchQuerySuperCourses) {
      const query = searchQuerySuperCourses.toLowerCase();
      personal = personal.filter(sc => 
        sc.title.toLowerCase().includes(query) ||
        sc.description?.toLowerCase().includes(query) ||
        sc.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by last updated (default)
    personal.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return personal;
  }, [searchQuerySuperCourses]);

  const communitySuperCourses = useMemo(() => {
    const community = allSuperCourses.filter(sc => 
      sc.author && sc.visibility === 'public'
    );
    if (!searchQuerySuperCourses) return community;
    const query = searchQuerySuperCourses.toLowerCase();
    return community.filter(sc => 
      sc.title.toLowerCase().includes(query) ||
      sc.description?.toLowerCase().includes(query) ||
      sc.author?.name.toLowerCase().includes(query)
    );
  }, [searchQuerySuperCourses]);

  const temporarySuperCourses = useMemo(() => {
    const temporary = allSuperCourses.filter(sc => 
      sc.status === 'draft'
    );
    if (!searchQuerySuperCourses) return temporary;
    const query = searchQuerySuperCourses.toLowerCase();
    return temporary.filter(sc => 
      sc.title.toLowerCase().includes(query) ||
      sc.description?.toLowerCase().includes(query)
    );
  }, [searchQuerySuperCourses]);

  // Handle Create Super Course button click
  const handleCreateSuperCourse = () => {
    setIsSetupModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsSetupModalOpen(false);
  };

  // Handle Back button
  const handleBack = () => {
    setIsSetupModalOpen(false);
  };

  // Handle Done button
  const handleDone = () => {
    // Close setup modal and open course selection modal
    setIsSetupModalOpen(false);
    setIsCourseSelectionModalOpen(true);
  };

  // Tab configuration
  const tabs: { id: SuperCourseTab; label: string }[] = [
    { id: 'create', label: 'Create Super Course' },
    { id: 'personal', label: 'Personal Super Course' },
    { id: 'community', label: 'Community Super Course' },
    { id: 'temporary', label: 'Temporary Super Course' },
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
        <span className="text-gray-900 font-medium">Super Course</span>
      </div>

      {/* Secondary Navigation Tabs */}
      <div className="flex items-center space-x-1 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                // Only hide combiner view when switching away from 'create' tab
                // Don't reset selectedCourse - preserve it so we can restore when coming back
                if (tab.id !== 'create') {
                  setIsCombinerView(false);
                } else {
                  // When switching back to 'create' tab, restore combiner if we have a selected course
                  if (selectedCourse) {
                    setIsCombinerView(true);
                  }
                }
              }}
              className={`
                px-4 py-3 text-sm font-medium transition-all duration-200 rounded-t-md
                ${isActive 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="w-full min-h-[600px]" style={{ position: 'relative', zIndex: 1 }}>
        {/* Course Combiner View - Where the magic happens */}
        {/* Keep CourseCombiner mounted if we have selectedCourse, but only show it when on 'create' tab and isCombinerView is true */}
        {selectedCourse && (
          <div style={{ display: isCombinerView && activeTab === 'create' ? 'block' : 'none' }}>
            <CourseCombiner
              courseId={selectedCourse.id}
              courseTitle={selectedCourse.title}
              onBack={() => {
                setIsCombinerView(false);
                setSelectedCourse(null);
                setActiveTab('create');
              }}
            />
          </div>
        )}
        
        {/* Show tab content only when combiner is not active or not on create tab */}
        {(!isCombinerView || activeTab !== 'create' || !selectedCourse) && (
          <>
            {activeTab === 'create' && (
              <div className="w-full py-8">
                {/* Create Super Course Placeholder - Dashed Border Box (Left Aligned) */}
                <div className="flex justify-start">
                  <button
                    onClick={handleCreateSuperCourse}
                    className="
                      w-full max-w-md h-96 border-2 border-dashed border-gray-300 
                      rounded-lg flex items-center justify-center
                      hover:border-primary-500 hover:bg-primary-50/30
                      transition-all duration-300 ease-in-out
                      group cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    "
                    aria-label="Create Super Course"
                  >
                    {/* Dark Teal Circle with White Plus Icon */}
                    <div className="
                      w-20 h-20 rounded-full bg-primary-500 
                      flex items-center justify-center
                      shadow-lg group-hover:shadow-xl
                      group-hover:scale-110
                      transition-all duration-300 ease-in-out
                    ">
                      <svg 
                        className="w-10 h-10 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M12 4v16m8-8H4" 
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Personal Super Course Tab */}
            {activeTab === 'personal' && (
              <div className="w-full py-8">
                {/* Search Bar */}
                <div className="mb-6 max-w-2xl">
                  <SearchBar 
                    maxWidth="2xl"
                    value={searchQuerySuperCourses}
                    onChange={(value) => setSearchQuerySuperCourses(value)}
                    placeholder="Search your super courses by title, description, or tags..."
                  />
                </div>

                {/* Super Courses Grid */}
                {personalSuperCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {personalSuperCourses.map((superCourse) => (
                      <SuperCourseCard
                        key={superCourse.id}
                        superCourse={superCourse}
                        onClick={() => {
                          setSelectedCourse({ id: superCourse.id, title: superCourse.title });
                          setIsCombinerView(true);
                        }}
                        onEdit={() => {
                          setSelectedCourse({ id: superCourse.id, title: superCourse.title });
                          setIsCombinerView(true);
                        }}
                        onDelete={() => {
                          if (window.confirm(`Are you sure you want to delete "${superCourse.title}"?`)) {
                            // TODO: Implement delete functionality
                            console.log('Delete super course:', superCourse.id);
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No super courses found</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {searchQuerySuperCourses
                          ? 'Try adjusting your search'
                          : 'Create your first super course to get started'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Community Super Course Tab */}
            {activeTab === 'community' && (
              <div className="w-full py-8">
                {/* Search Bar */}
                <div className="mb-6 max-w-2xl">
                  <SearchBar 
                    maxWidth="2xl"
                    value={searchQuerySuperCourses}
                    onChange={(value) => setSearchQuerySuperCourses(value)}
                    placeholder="Search community super courses by title, description, tags, or author..."
                  />
                </div>

                {/* Super Courses Grid */}
                {communitySuperCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communitySuperCourses.map((superCourse) => (
                      <SuperCourseCard
                        key={superCourse.id}
                        superCourse={superCourse}
                        onClick={() => {
                          setSelectedCourse({ id: superCourse.id, title: superCourse.title });
                          setIsCombinerView(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No community super courses yet</p>
                      <p className="text-gray-400 text-sm mt-2">Community super courses will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Temporary Super Course Tab */}
            {activeTab === 'temporary' && (
              <div className="w-full py-8">
                {/* Search Bar */}
                <div className="mb-6 max-w-2xl">
                  <SearchBar 
                    maxWidth="2xl"
                    value={searchQuerySuperCourses}
                    onChange={(value) => setSearchQuerySuperCourses(value)}
                    placeholder="Search draft super courses by title, description, or tags..."
                  />
                </div>

                {/* Super Courses Grid */}
                {temporarySuperCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {temporarySuperCourses.map((superCourse) => (
                      <SuperCourseCard
                        key={superCourse.id}
                        superCourse={superCourse}
                        onClick={() => {
                          setSelectedCourse({ id: superCourse.id, title: superCourse.title });
                          setIsCombinerView(true);
                        }}
                        onEdit={() => {
                          setSelectedCourse({ id: superCourse.id, title: superCourse.title });
                          setIsCombinerView(true);
                        }}
                        onDelete={() => {
                          if (window.confirm(`Are you sure you want to delete draft "${superCourse.title}"?`)) {
                            // TODO: Implement delete functionality
                            console.log('Delete draft super course:', superCourse.id);
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No draft super courses</p>
                      <p className="text-gray-400 text-sm mt-2">Your unsaved drafts will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Setup Super Course Modal */}
      <DeltaModal
        isOpen={isSetupModalOpen}
        onClose={handleCloseModal}
        title="Setup your super course"
        size="md"
      >
        <div className="space-y-6 px-3 pt-4 pb-4">
          {/* Super Course Title Input */}
          <div>
            <DeltaInput
              label="Super Course Title"
              type="text"
              value={superCourseTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuperCourseTitle(e.target.value)}
              placeholder="Enter super course title"
            />
          </div>

          {/* Visibility Dropdown */}
          <DeltaDropdown
            label="Visibility"
            value={visibility}
            placeholder="Selected Option"
            options={[
              { value: 'private', label: 'Private' },
              { value: 'public', label: 'Public' },
            ]}
            onChange={(value: string) => setVisibility(value)}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <DeltaButton
              variant="outline"
              size="md"
              onClick={handleBack}
            >
              Back
            </DeltaButton>
            <DeltaButton
              variant="primary"
              size="md"
              onClick={handleDone}
            >
              Done
            </DeltaButton>
          </div>
        </div>
      </DeltaModal>

      {/* Course Selection Modal */}
      <DeltaModal
        isOpen={isCourseSelectionModalOpen}
        onClose={() => setIsCourseSelectionModalOpen(false)}
        size="xl"
        showCloseButton={true}
      >
        {/* Modal Content Structure */}
        <div className="flex flex-col" style={{ height: 'calc(75vh - 120px)' }}>
          {/* Search Bar - Fixed at top */}
          <div className="flex-shrink-0 mb-4">
            <div className="relative flex items-center">
              {/* Search Icon */}
              <div className="absolute left-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-12 pr-16 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              {/* Filter Icon */}
              <div className="absolute right-4 flex items-center">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Filter"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area - Sidebar Fixed, Course Grid Scrollable */}
          <div className="flex gap-6 flex-1 min-h-0">
            {/* Left Sidebar - Categories - Fixed, Non-scrollable */}
            <div className="w-48 flex-shrink-0">
              <div className="space-y-1">
                <button
                  onClick={() => setCourseCategory('all')}
                  className={`
                    w-full text-left px-4 py-2.5 rounded-lg transition-colors
                    ${courseCategory === 'all'
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  All Course
                </button>
                <button
                  onClick={() => setCourseCategory('recommended')}
                  className={`
                    w-full text-left px-4 py-2.5 rounded-lg transition-colors
                    ${courseCategory === 'recommended'
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  Recommended
                </button>
                <button
                  onClick={() => setCourseCategory('recent')}
                  className={`
                    w-full text-left px-4 py-2.5 rounded-lg transition-colors
                    ${courseCategory === 'recent'
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  Recently Courses
                </button>
              </div>
            </div>

            {/* Right Section - Course Grid - Scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Course Cards */}
                {sampleCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer relative group"
                  >
                    {/* Hover Overlay with "Use Course" Button */}
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Close course selection modal and navigate to combiner view
                          setIsCourseSelectionModalOpen(false);
                          setSelectedCourse({ id: course.id, title: course.title });
                          setIsCombinerView(true);
                        }}
                      >
                        Use Course
                      </button>
                    </div>

                    {/* Certification Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>

                    {/* Paid Label (if applicable) */}
                    {course.isPaid && (
                      <div className="absolute top-4 left-4 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded z-20">
                        Paid
                      </div>
                    )}

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 pr-8">
                      {course.title}
                    </h3>

                    {/* University */}
                    <p className="text-sm text-gray-600 mb-3">
                      {course.university}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < course.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Course Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Duration {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{course.chapters} Chapters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{course.enrolled} Enrolled</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DeltaModal>
    </div>
  );
};

// Sample course data for the course selection modal
const sampleCourses: Array<{
  id: string;
  title: string;
  university: string;
  rating: number;
  duration: string;
  chapters: number;
  enrolled: string;
  isPaid?: boolean;
}> = [
  {
    id: '1',
    title: 'Chemistry',
    university: 'Addis Ababa University',
    rating: 4,
    duration: '3 Week',
    chapters: 13,
    enrolled: '1,124',
  },
  {
    id: '2',
    title: 'Chemistry 101',
    university: 'Addis Ababa University',
    rating: 4,
    duration: '3 Week',
    chapters: 13,
    enrolled: '1,124',
  },
  {
    id: '3',
    title: 'Introduction',
    university: 'Addis Ababa University',
    rating: 4,
    duration: '3 Week',
    chapters: 13,
    enrolled: '1,124',
    isPaid: true,
  },
  {
    id: '4',
    title: 'Modern',
    university: 'Addis Ababa University',
    rating: 4,
    duration: '3 Week',
    chapters: 13,
    enrolled: '1,124',
  },
];

export default SuperCoursePage;
