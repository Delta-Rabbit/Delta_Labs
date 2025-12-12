
import React from 'react';

export type SupplementSidebarView = 'browse' | 'profile' | 'history';

interface SupplementSidebarProps {
  activeView: SupplementSidebarView;
  onViewChange: (view: SupplementSidebarView) => void;
}

export const SupplementSidebar: React.FC<SupplementSidebarProps> = ({ activeView, onViewChange }) => {
  const navItems: { id: SupplementSidebarView; icon: JSX.Element; label: string }[] = [
    {
      id: 'browse',
      label: 'Browse',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'History',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center justify-center gap-4 pl-4 bg-surface-primary z-30">
      {navItems.map((item) => {
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`p-3 rounded-lg transition-colors group relative ${
              isActive
                ? 'bg-[#174A5F] text-white'
                : 'hover:bg-gray-100 text-gray-400'
            }`}
            aria-label={item.label}
          >
            <div className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#174A5F]'}`}>
              {item.icon}
            </div>
            
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
