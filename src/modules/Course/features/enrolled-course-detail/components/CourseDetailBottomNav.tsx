/**
 * Delta Labs Course Detail Bottom Navigation
 * Bottom navigation bar with 9 course detail features
 * Matches the design exactly with specific icons and rounded top corners
 */

import React from 'react';

export type CourseDetailFeature = 
  | 'intro'
  | 'qa'
  | 'exercise'
  | 'summary'
  | 'score'
  | 'supplement'
  | 'resources'
  | 'roadmap'
  | 'community';

export interface CourseDetailBottomNavProps {
  activeFeature: CourseDetailFeature;
  onFeatureChange: (feature: CourseDetailFeature) => void;
}

interface NavItem {
  id: CourseDetailFeature;
  label: string;
  icon: React.ReactNode;
}

const CourseDetailBottomNav: React.FC<CourseDetailBottomNavProps> = ({
  activeFeature,
  onFeatureChange,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'intro',
      label: 'Course intro',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Top-left square (outline) */}
          <rect x="3" y="3" width="7" height="7" stroke="currentColor" fill="none" />
          {/* Top-right circle (solid) */}
          <circle cx="16.5" cy="6.5" r="3" fill="currentColor" />
          {/* Bottom-left circle (solid) */}
          <circle cx="6.5" cy="16.5" r="3" fill="currentColor" />
          {/* Bottom-right square (outline) */}
          <rect x="14" y="14" width="7" height="7" stroke="currentColor" fill="none" />
        </svg>
      ),
    },
    {
      id: 'qa',
      label: 'Q&A',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Square speech bubble */}
          <rect x="4" y="5" width="16" height="13" rx="2" stroke="currentColor" fill="none" />
          {/* Question mark inside - larger and clearer */}
          <circle cx="12" cy="9.5" r="2" fill="none" stroke="currentColor" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v1.5M12 15v.5" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      id: 'exercise',
      label: 'Exercise & Test',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Document */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          {/* Question mark badge on top-right */}
          <circle cx="17.5" cy="6.5" r="2.5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 5.8v.7M17.5 7.2" strokeWidth={1.2} stroke="white" />
        </svg>
      ),
    },
    {
      id: 'summary',
      label: 'Fast Summary',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Document */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          {/* Circular arrow on top-left */}
          <circle cx="6.5" cy="6.5" r="2.5" fill="none" stroke="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 6.5l1-1M5.5 6.5l1 1M7.5 4.5A2.5 2.5 0 005 7" strokeWidth={1.5} />
        </svg>
      ),
    },
    {
      id: 'score',
      label: 'Score',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Flag pole */}
          <line x1="5" y1="4" x2="5" y2="20" strokeWidth={2.5} />
          {/* Checkered flag - alternating pattern */}
          <rect x="5" y="4" width="6" height="3" fill="currentColor" />
          <rect x="11" y="4" width="6" height="3" fill="none" stroke="currentColor" />
          <rect x="5" y="7" width="6" height="3" fill="none" stroke="currentColor" />
          <rect x="11" y="7" width="6" height="3" fill="currentColor" />
          <rect x="5" y="10" width="6" height="3" fill="currentColor" />
          <rect x="11" y="10" width="6" height="3" fill="none" stroke="currentColor" />
        </svg>
      ),
    },
    {
      id: 'supplement',
      label: 'Supplement',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Document */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          {/* Horizontal lines */}
          <line x1="9" y1="8" x2="15" y2="8" strokeWidth={2} />
          <line x1="9" y1="10" x2="15" y2="10" strokeWidth={2} />
        </svg>
      ),
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* 3D Cube - simplified isometric */}
          {/* Top face */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l6-3 6 3" fill="none" />
          {/* Front face */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8v6l6 3v-6" fill="none" />
          {/* Right face */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l6 3v6l-6-3" fill="none" />
          {/* Vertical edges */}
          <line x1="6" y1="8" x2="6" y2="14" strokeWidth={2} />
          <line x1="12" y1="5" x2="12" y2="11" strokeWidth={2} />
          <line x1="18" y1="8" x2="18" y2="14" strokeWidth={2} />
        </svg>
      ),
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Winding path */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM10 6c1.5 0 3 .8 3 2s-1 2-2.5 2-2.5-.8-2.5-2 .5-2 2-2zM13.5 12c-1.5 0-3 .8-3 2s1 2 2.5 2 2.5-.8 2.5-2-.5-2-2-2zM18 18c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
          {/* Path connections */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4l2 2M12 6l1.5 6M16 12l2 6" strokeWidth={1.5} />
          {/* Start point (solid circle) */}
          <circle cx="6" cy="4" r="1.5" fill="currentColor" />
          {/* End point (solid circle) */}
          <circle cx="18" cy="18" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'community',
      label: 'Community',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          {/* Left person (outline) */}
          <circle cx="7" cy="9" r="2.5" fill="none" stroke="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12v2.5M5 15h4" />
          {/* Center person (solid) */}
          <circle cx="12" cy="9" r="2.5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v2.5M10 15h4" fill="currentColor" />
          {/* Right person (outline) */}
          <circle cx="17" cy="9" r="2.5" fill="none" stroke="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 12v2.5M15 15h4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-500 text-white shadow-lg z-40 font-primary rounded-t-2xl">
      <div className="flex items-center justify-center gap-3 sm:gap-5 px-3 py-3 max-w-full overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activeFeature === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onFeatureChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1.5 px-2 py-1.5 flex-shrink-0 transition-all transition-normal ease-ease rounded-lg w-[75px] sm:w-[85px] ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label={item.label}
              aria-selected={isActive ? 'true' : 'false'}
            >
              <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-white/80'}`}>
                {item.icon}
              </div>
              <span className={`text-xs font-medium text-center leading-tight whitespace-nowrap w-full overflow-hidden text-ellipsis ${
                isActive ? 'text-white font-semibold' : 'text-white/80'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CourseDetailBottomNav;
