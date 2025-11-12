/**
 * Delta Labs Navigation Layout
 * Contains the top navigation bar and renders tab content below
 */

import React, { useState } from 'react';
import { useTab } from '../contexts/TabContext';
import { NavigationTabBar } from './navigation/NavigationTabBar';

interface NavigationLayoutProps {
  children: React.ReactNode;
}

export function NavigationLayout({ children }: NavigationLayoutProps) {
  const { tabs, switchTab, closeTab } = useTab();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Tab click and close handlers - navigation will be handled by CoursePage
  // which is inside the CourseNavigationProvider
  const handleTabClick = (tabId: string) => {
    switchTab(tabId);
  };

  const handleTabClose = (tabId: string) => {
    closeTab(tabId);
  };

  return (
    <div className="min-h-screen">
      {/* Top Header Bar */}
      <nav className="w-full bg-[#174A5F] text-white shadow-lg sticky top-0 z-40">
        <div className="flex items-center h-[60px] px-2 sm:px-4 gap-2 sm:gap-4 relative">
          {/* Left Section: Menu & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 mr-4">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-md transition-colors duration-200"
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
            <span className="text-white font-bold text-sm sm:text-base md:text-lg hidden sm:inline">DELTA LABS</span>
          </div>

          {/* Center Section: Tabs */}
          <NavigationTabBar
            tabs={tabs}
            onTabClick={handleTabClick}
            onTabClose={handleTabClose}
          />

          {/* Right Section: Language, AI Bot, User Profile */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Language */}
            <button className="hidden sm:flex items-center gap-1 px-2 sm:px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden md:inline text-sm">English</span>
            </button>

            {/* AI Bot */}
            <button 
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Open AI Assistant"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <span className="text-lg">🤖</span>
              </div>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors duration-200 cursor-pointer">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">J</span>
              </div>
              <span className="hidden sm:inline text-sm font-medium">John</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu - Coming Soon */}
      {isMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 lg:hidden">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            <p className="text-gray-400">Menu items coming soon...</p>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="min-h-[calc(100vh-60px)]">
        {children}
      </div>

      {/* Custom scrollbar hide style */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default NavigationLayout;

