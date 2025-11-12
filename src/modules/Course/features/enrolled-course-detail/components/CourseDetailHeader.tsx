/**
 * Delta Labs Course Detail Header
 * Header component for enrolled course detail pages
 * Matches the design with hamburger menu, logo, Course tab, language selector, AI bot, and user avatar
 */

import React from 'react';

export interface CourseDetailHeaderProps {
  courseTitle?: string;
  onMenuClick?: () => void;
  onLanguageClick?: () => void;
  onAIBotClick?: () => void;
  onUserClick?: () => void;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({
  courseTitle,
  onMenuClick,
  onLanguageClick,
  onAIBotClick,
  onUserClick,
}) => {
  return (
    <nav className="w-full bg-primary-500 text-white shadow-lg sticky top-0 z-40 font-primary">
      <div className="flex items-center h-[60px] px-2 sm:px-4 gap-2 sm:gap-4 relative">
        {/* Left Section: Menu & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 mr-4">
          {/* Hamburger Menu */}
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/10 rounded-md transition-colors transition-normal ease-ease"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded flex-shrink-0">
            <span className="text-white font-bold text-xs">DL</span>
          </div>
        </div>

        {/* Center Section: Course Tab */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md">
            <span className="text-sm font-medium truncate">Course</span>
            <button
              className="ml-1 p-0.5 hover:bg-white/20 rounded transition-colors transition-normal ease-ease"
              aria-label="Close course"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section: Language, AI Bot, User Profile */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Language Selector */}
          <button
            onClick={onLanguageClick}
            className="hidden sm:flex items-center gap-1 px-2 sm:px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors transition-normal ease-ease text-sm"
            aria-label="Change language"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden md:inline text-sm">English</span>
          </button>

          {/* AI Bot */}
          <button
            onClick={onAIBotClick}
            className="text-white hover:opacity-80 transition-opacity transition-normal ease-ease"
            aria-label="Open AI Assistant"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow transition-normal ease-ease">
              <span className="text-lg">🤖</span>
            </div>
          </button>

          {/* User Profile */}
          <div
            onClick={onUserClick}
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors transition-normal ease-ease cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">J</span>
            </div>
            <span className="hidden sm:inline text-sm font-medium">John</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CourseDetailHeader;

