/**
 * Delta Labs Super Course Page
 * Main page for creating and managing Super Courses
 * Super Course: Combine 2+ different course roadmaps, edit them, and create custom learning paths
 */

import React, { useState } from 'react';
import { useCourseView } from '../context/CourseViewContext';
import { DeltaModal, DeltaInput, DeltaButton, DeltaDropdown } from '../../../components/theme';
import CourseCombiner from './CourseCombiner';

// ============================================================================
// SUPER COURSE TAB TYPES
// ============================================================================

type SuperCourseTab = 'create' | 'personal' | 'community' | 'temporary';

// ============================================================================
// SUPER COURSE PAGE COMPONENT
// ============================================================================

const SuperCoursePage: React.FC = () => {
  const { setCurrentView } = useCourseView();
  const [activeTab, setActiveTab] = useState<SuperCourseTab>('create');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isCourseSelectionModalOpen, setIsCourseSelectionModalOpen] = useState(false);
  const [superCourseTitle, setSuperCourseTitle] = useState('physics v1');
  const [visibility, setVisibility] = useState('');
  const [courseCategory, setCourseCategory] = useState<'all' | 'recommended' | 'recent'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCombinerView, setIsCombinerView] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; title: string } | null>(null);

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
          onClick={() => setCurrentView('main')}
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
              onClick={() => setActiveTab(tab.id)}
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
      <div className="w-full min-h-[600px]">
        {/* Course Combiner View - Where the magic happens */}
        {isCombinerView && selectedCourse ? (
          <CourseCombiner
            courseId={selectedCourse.id}
            courseTitle={selectedCourse.title}
            onBack={() => {
              setIsCombinerView(false);
              setSelectedCourse(null);
            }}
          />
        ) : (
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

            {/* Placeholder for other tabs */}
            {activeTab !== 'create' && (
              <div className="w-full min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">{tabs.find(t => t.id === activeTab)?.label}</p>
                  <p className="text-gray-400 text-sm mt-2">Coming soon...</p>
                </div>
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

