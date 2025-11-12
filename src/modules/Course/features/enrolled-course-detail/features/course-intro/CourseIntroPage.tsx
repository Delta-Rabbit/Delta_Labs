/**
 * Delta Labs Course Intro Page
 * Course introduction page with media player, sidebar, and navigation tabs
 * All content sections are displayed in a single scrollable page
 */

import React, { useState, useEffect, useRef } from 'react';
import { DeltaButton, DeltaCard, DeltaInput, DeltaTextarea } from '../../../../../../components/theme';
import AboutCourseTab from './components/AboutCourseTab';
import RelatedCoursesTab from './components/RelatedCoursesTab';
import ReviewsRatingTab from './components/ReviewsRatingTab';
import PrerequisitesRequirementsTab from './components/PrerequisitesRequirementsTab';
import CourseAnalysisTab from './components/CourseAnalysisTab';

// Course navigation tabs
type CourseTab = 'intro' | 'about' | 'related' | 'reviews' | 'prerequisites' | 'analysis' | 'hire-tutor';

const CourseIntroPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CourseTab>('intro');
  
  // Refs for scrolling to sections
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const prerequisitesRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const hireTutorRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs: Record<CourseTab, React.RefObject<HTMLDivElement>> = {
    intro: introRef,
    about: aboutRef,
    related: relatedRef,
    reviews: reviewsRef,
    prerequisites: prerequisitesRef,
    analysis: analysisRef,
    'hire-tutor': hireTutorRef,
  };
  
  // Handle tab click - scroll to section
  const handleTabClick = (tabId: CourseTab) => {
    setActiveTab(tabId);
    const ref = sectionRefs[tabId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Track which section is in view for active tab highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Offset for main nav (60px) + sticky tabs (100px)
      
      // Check each section to see which one is in view
      const sections = Object.entries(sectionRefs);
      let currentSection: CourseTab | null = null;
      
      // Find the section that's currently in view
      for (const [tabId, ref] of sections) {
        if (ref?.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            currentSection = tabId as CourseTab;
            break;
          }
        }
      }
      
      // If we found a section, update the active tab
      if (currentSection) {
        setActiveTab(currentSection);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courseTabs = [
    { id: 'intro' as CourseTab, label: 'Intro' },
    { id: 'about' as CourseTab, label: 'About Course' },
    { id: 'related' as CourseTab, label: 'Related Courses' },
    { id: 'reviews' as CourseTab, label: 'Reviews & Rating' },
    { id: 'prerequisites' as CourseTab, label: 'Prerequisites & Requirements' },
    { id: 'analysis' as CourseTab, label: 'Course Analysis' },
    { id: 'hire-tutor' as CourseTab, label: 'Hire tutor' },
  ];

  // Sample thumbnails
  const thumbnails = [
    { id: 1, image: '/placeholder-thumbnail-1.jpg', alt: 'Thumbnail 1' },
    { id: 2, image: '/placeholder-thumbnail-2.jpg', alt: 'Thumbnail 2' },
    { id: 3, image: '/placeholder-thumbnail-3.jpg', alt: 'Thumbnail 3' },
    { id: 4, image: '/placeholder-thumbnail-4.jpg', alt: 'Thumbnail 4' },
    { id: 5, image: '/placeholder-thumbnail-5.jpg', alt: 'Thumbnail 5' },
  ];

  // Sample comments
  const comments = [
    {
      id: 1,
      author: 'Addis Ababa University',
      avatar: '/placeholder-avatar.jpg',
      text: "She doesn't belong here but glad she's seeing the consequences to an action.",
      likes: 1597,
      dislikes: 1597,
      replies: 1597,
    },
    {
      id: 2,
      author: 'Addis Ababa University',
      avatar: '/placeholder-avatar.jpg',
      text: "She doesn't belong here but glad she's seeing the consequences to an action.",
      likes: 1597,
      dislikes: 1597,
      replies: 1597,
    },
  ];

  return (
    <div className="w-full font-primary">
      {/* Course Navigation Tabs - Sticky (below main navigation) */}
      <div className="sticky top-[60px] bg-surface-primary z-30 border-b border-border-primary mb-6 shadow-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {courseTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-all transition-normal ease-ease whitespace-nowrap font-primary ${
                  isActive
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-label={tab.label}
                aria-selected={isActive ? 'true' : 'false'}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* All Content Sections - Stacked Vertically */}
      
      {/* Intro Section */}
      <div ref={introRef} className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Media Player and Thumbnails */}
        <div className="lg:col-span-2 space-y-4">
          {/* Media Player */}
          <DeltaCard className="w-full aspect-video bg-surface-secondary rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-text-secondary font-primary">Video Player</p>
              </div>
            </div>
          </DeltaCard>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-5 gap-2">
            {thumbnails.map((thumbnail) => (
              <button
                key={thumbnail.id}
                className="aspect-square rounded-lg overflow-hidden bg-surface-secondary hover:opacity-80 transition-opacity"
                aria-label={thumbnail.alt}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-xs text-text-tertiary font-primary">{thumbnail.id}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4">
          {/* Post Button */}
          <DeltaButton variant="primary" size="md" className="w-full font-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Post
          </DeltaButton>

          {/* Go to Roadmap Link */}
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium font-primary">
            Go to roadmap
          </button>

          {/* Course/University Info Card */}
          <DeltaCard className="p-4 space-y-3 font-primary">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex-shrink-0 flex items-center justify-center">
                <span className="text-primary-700 font-bold text-lg">AAU</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-text-primary font-primary">Addis Ababa University</h3>
                <p className="text-sm text-text-secondary mt-1 font-primary">Top trending modern physics course</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs text-primary-600 font-primary">#DigitalLibrary</span>
                  <span className="text-xs text-primary-600 font-primary">#CoursePage</span>
                </div>
              </div>
            </div>
            <DeltaButton variant="outline" size="sm" className="w-full font-primary">
              Follow
            </DeltaButton>
          </DeltaCard>

          {/* Engagement Metrics */}
          <DeltaCard className="p-4 space-y-3 font-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm text-text-secondary font-primary">1.2M</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm text-text-secondary font-primary">5514</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-sm text-text-secondary font-primary">1597</span>
              </div>
            </div>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium font-primary">
              report
            </button>
          </DeltaCard>

          {/* Comment Section */}
          <DeltaCard className="p-4 space-y-4 font-primary">
            <DeltaTextarea
              placeholder="Write a Comment"
              rows={4}
              className="w-full font-primary"
            />
            <DeltaButton variant="outline" size="md" className="w-full font-primary">
              Post
            </DeltaButton>

            {/* Comments Display */}
            <div className="space-y-4 pt-4 border-t border-border-primary">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-xs">AAU</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary font-primary">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-xs font-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {comment.likes}
                        </button>
                        <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-xs font-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                          {comment.dislikes}
                        </button>
                        <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary text-xs font-primary">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {comment.replies}
                        </button>
                      </div>
                      {comment.id === 1 && (
                        <button className="text-primary-600 hover:text-primary-700 text-xs font-medium mt-2 flex items-center gap-1 font-primary">
                          Reply
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DeltaCard>
        </div>
      </div>
      </div>

      {/* About Course Section */}
      <div ref={aboutRef} className="scroll-mt-20 mt-12">
        <AboutCourseTab />
      </div>

      {/* Related Courses Section */}
      <div ref={relatedRef} className="scroll-mt-20 mt-12">
        <RelatedCoursesTab />
      </div>

      {/* Reviews & Rating Section */}
      <div ref={reviewsRef} className="scroll-mt-20 mt-12">
        <ReviewsRatingTab />
      </div>

      {/* Prerequisites & Requirements Section */}
      <div ref={prerequisitesRef} className="scroll-mt-20 mt-12">
        <PrerequisitesRequirementsTab />
      </div>

      {/* Course Analysis Section */}
      <div ref={analysisRef} className="scroll-mt-20 mt-12">
        <CourseAnalysisTab />
      </div>

      {/* Hire Tutor Section - Placeholder */}
      <div ref={hireTutorRef} className="scroll-mt-20 mt-12">
        <div className="w-full py-12 text-center font-primary">
          <p className="text-text-secondary font-primary">Hire tutor content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default CourseIntroPage;
