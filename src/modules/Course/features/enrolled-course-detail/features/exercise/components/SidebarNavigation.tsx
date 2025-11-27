/**
 * Delta Labs Exercise Sidebar Navigation Component
 * Sidebar navigation for Exercise & Test module
 */

import React from 'react';

interface SidebarNavigationProps {
  activeItem: string;
  onItemChange: (item: string) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeItem,
  onItemChange,
}) => {
  const sidebarItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
    },
    {
      id: 'people',
      label: 'People',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
      hasNotification: true,
    },
    {
      id: 'history',
      label: 'History',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      ),
    },
    {
      id: 'education',
      label: 'Education',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v9M12 14l-9-5M12 14l9-5m-9 5v9m9-5v9" />
        </>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      ),
      hasNotification: true,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pl-4 bg-surface-primary z-30">
      {sidebarItems.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onItemChange(item.id)}
            className={`p-3 rounded-lg transition-colors group relative ${
              isActive
                ? 'bg-primary-500 text-white'
                : 'hover:bg-surface-secondary text-text-secondary'
            }`}
            aria-label={item.label}
          >
            <svg
              className={`w-6 h-6 ${
                isActive
                  ? 'text-white'
                  : 'text-text-secondary group-hover:text-primary-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {item.icon}
            </svg>
            {/* Notification dot */}
            {item.hasNotification && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full z-10" />
            )}
            {/* Tooltip */}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-tooltip">
              {item.label}
              {/* Tooltip arrow */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-700"></span>
            </span>
          </button>
        );
      })}
    </aside>
  );
};

