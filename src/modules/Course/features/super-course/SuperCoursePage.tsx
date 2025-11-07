/**
 * Delta Labs Super Course Page
 * Main page for creating and managing Super Courses
 * Refactored with atomic, reusable components
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { Breadcrumbs } from '../../components/common';
import SearchBar from '../../../../components/SearchBar';
import CourseCombiner from './components/CourseCombiner';
import { SuperCourseCard } from './components/SuperCourseCard';
import type { SuperCourse } from '../../types/superCourse';
import Tabs, { type SuperCourseTab } from './components/Tabs';
import CreateSuperCourseButton from './components/CreateSuperCourseButton';
import EmptyState from './components/EmptyState';
import SetupModal from './components/SetupModal';
import CourseSelectionModal, { type Course } from './components/CourseSelectionModal';

const SuperCoursePage: React.FC = () => {
  const { navigate, currentRoute } = useCourseNavigation();
  const [activeTab, setActiveTab] = useState<SuperCourseTab>('create');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isCourseSelectionModalOpen, setIsCourseSelectionModalOpen] = useState(false);
  const [superCourseTitle, setSuperCourseTitle] = useState('physics v1');
  const [visibility, setVisibility] = useState('');
  const [searchQuerySuperCourses, setSearchQuerySuperCourses] = useState('');
  const [isCombinerView, setIsCombinerView] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; title: string } | null>(null);

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

  // Sample courses for selection modal
  const sampleCourses: Course[] = [
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

  // Filter super courses based on active tab
  const personalSuperCourses = useMemo(() => {
    let personal = allSuperCourses.filter(sc => 
      (sc.status === 'completed' || sc.status === 'published') && !sc.author
    );

    if (searchQuerySuperCourses) {
      const query = searchQuerySuperCourses.toLowerCase();
      personal = personal.filter(sc => 
        sc.title.toLowerCase().includes(query) ||
        sc.description?.toLowerCase().includes(query) ||
        sc.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

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
    setIsSetupModalOpen(false);
    setIsCourseSelectionModalOpen(true);
  };

  // Handle course selection
  const handleSelectCourse = (course: Course) => {
    setIsCourseSelectionModalOpen(false);
    setSelectedCourse({ id: course.id, title: course.title });
    setIsCombinerView(true);
  };

  // Handle tab change
  const handleTabChange = (tab: SuperCourseTab) => {
    setActiveTab(tab);
    if (tab !== 'create') {
      setIsCombinerView(false);
    } else {
      if (selectedCourse) {
        setIsCombinerView(true);
      }
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'create' as SuperCourseTab, label: 'Create Super Course' },
    { id: 'personal' as SuperCourseTab, label: 'Personal Super Course' },
    { id: 'community' as SuperCourseTab, label: 'Community Super Course' },
    { id: 'temporary' as SuperCourseTab, label: 'Temporary Super Course' },
  ];

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Super Course',
      isActive: true,
    },
  ];

  // Empty state icons
  const emptyStateIcons = {
    personal: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    community: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    temporary: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  };

  return (
    <div className="space-y-6 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <div className="w-full min-h-[600px] relative" style={{ zIndex: 1 }}>
        {/* Course Combiner View */}
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
        
        {/* Tab Content */}
        {(!isCombinerView || activeTab !== 'create' || !selectedCourse) && (
          <>
            {activeTab === 'create' && (
              <div className="w-full py-8">
                <CreateSuperCourseButton onClick={handleCreateSuperCourse} />
              </div>
            )}

            {activeTab === 'personal' && (
              <div className="w-full py-8">
                <div className="mb-6 max-w-2xl">
                  <SearchBar 
                    maxWidth="2xl"
                    value={searchQuerySuperCourses}
                    onChange={setSearchQuerySuperCourses}
                    placeholder="Search your super courses by title, description, or tags..."
                  />
                </div>

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
                            console.log('Delete super course:', superCourse.id);
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={emptyStateIcons.personal}
                    title="No super courses found"
                    description={searchQuerySuperCourses
                      ? 'Try adjusting your search'
                      : 'Create your first super course to get started'}
                  />
                )}
              </div>
            )}

            {activeTab === 'community' && (
              <div className="w-full py-8">
                <div className="mb-6 max-w-2xl">
                  <SearchBar 
                    maxWidth="2xl"
                    value={searchQuerySuperCourses}
                    onChange={setSearchQuerySuperCourses}
                    placeholder="Search community super courses by title, description, tags, or author..."
                  />
                </div>

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
                  <EmptyState
                    icon={emptyStateIcons.community}
                    title="No community super courses yet"
                    description="Community super courses will appear here"
                  />
                )}
              </div>
            )}

            {activeTab === 'temporary' && (
              <div className="w-full py-8">
                <div className="mb-6 max-w-2xl">
                  <SearchBar 
                    maxWidth="2xl"
                    value={searchQuerySuperCourses}
                    onChange={setSearchQuerySuperCourses}
                    placeholder="Search draft super courses by title, description, or tags..."
                  />
                </div>

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
                            console.log('Delete draft super course:', superCourse.id);
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={emptyStateIcons.temporary}
                    title="No draft super courses"
                    description="Your unsaved drafts will appear here"
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Setup Modal */}
      <SetupModal
        isOpen={isSetupModalOpen}
        onClose={handleCloseModal}
        title={superCourseTitle}
        onTitleChange={setSuperCourseTitle}
        visibility={visibility}
        onVisibilityChange={setVisibility}
        onBack={handleBack}
        onDone={handleDone}
      />

      {/* Course Selection Modal */}
      <CourseSelectionModal
        isOpen={isCourseSelectionModalOpen}
        onClose={() => setIsCourseSelectionModalOpen(false)}
        courses={sampleCourses}
        onSelectCourse={handleSelectCourse}
      />
    </div>
  );
};

export default SuperCoursePage;
