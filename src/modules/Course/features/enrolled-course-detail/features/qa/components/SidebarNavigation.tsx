/**
 * Delta Labs Sidebar Navigation Component
 * Shared sidebar navigation for Q&A and Bookmarks pages
 */

import React from 'react';

interface SidebarNavigationProps {
  activeItem: string;
  onItemChange: (item: string) => void;
  currentPage?: 'qa' | 'bookmarks' | 'notifications' | 'community-wiki' | 'live' | 'network' | 'payment';
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeItem,
  onItemChange,
  currentPage = 'qa',
}) => {
  const handleBookmarkClick = () => {
    onItemChange('bookmark');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pl-4 bg-surface-primary z-30">
      {/* Profile Icon */}
      <button
        onClick={() => onItemChange('profile')}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'profile'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Profile"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'profile'
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
        onClick={handleBookmarkClick}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'bookmark' || currentPage === 'bookmarks'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Bookmarks"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'bookmark' || currentPage === 'bookmarks'
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
        onClick={() => onItemChange('notification')}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'notification'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Notifications"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'notification'
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

      {/* Community Wiki Icon */}
      <button
        onClick={() => onItemChange('mindmap')}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'mindmap' || currentPage === 'community-wiki'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Community Wiki"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'mindmap' || currentPage === 'community-wiki'
              ? 'text-white'
              : 'text-text-secondary group-hover:text-primary-600'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        {/* Tooltip */}
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
          Community Wiki
          {/* Tooltip arrow */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
        </span>
      </button>

      {/* Live/Connection Icon */}
      <button
        onClick={() => onItemChange('connection')}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'connection' || currentPage === 'live'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Live Sessions"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'connection' || currentPage === 'live'
              ? 'text-white'
              : 'text-text-secondary group-hover:text-primary-600'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {/* Red live indicator dot */}
        {(activeItem === 'connection' || currentPage === 'live') && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full z-10" />
        )}
        {/* Tooltip */}
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
          Live
          {/* Tooltip arrow */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
        </span>
      </button>

      {/* Links/Chain Icon - Network of Specialized */}
      <button
        onClick={() => onItemChange('links')}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'links' || currentPage === 'network'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Network of Specialized"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'links' || currentPage === 'network'
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
          Network of Specialized
          {/* Tooltip arrow */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
        </span>
      </button>

      {/* Dollar Sign Icon - Payment Management */}
      <button
        onClick={() => onItemChange('financial')}
        className={`p-3 rounded-lg transition-colors group relative ${
          activeItem === 'financial' || currentPage === 'payment'
            ? 'bg-primary-500 text-white'
            : 'hover:bg-surface-secondary text-text-secondary'
        }`}
        aria-label="Payment Management"
      >
        <svg
          className={`w-6 h-6 ${
            activeItem === 'financial' || currentPage === 'payment'
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
          Payment Management
          {/* Tooltip arrow */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
        </span>
      </button>
    </aside>
  );
};

