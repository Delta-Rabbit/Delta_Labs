
import React from 'react';
import type { SupplementResource } from '../types';
import { DeltaButton } from '../../../../../../../components/theme';

interface SupplementCardProps {
  resource: SupplementResource;
  enableActions?: boolean;
  onClick?: () => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({ resource, enableActions = false, onClick }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: string) => {
      console.log(`Action ${action} triggered for ${resource.title}`);
      setShowMenu(false);
  };
  const renderThumbnail = () => {
    switch (resource.type) {
      case 'youtube':
        return (
          <div className="relative w-full h-full bg-black group">
            <img 
              src={resource.coverUrl} 
              alt={resource.title} 
              className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Duration badge or similar could go here */}
             <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
               12:45
             </div>
          </div>
        );
      
      case 'documentations':
        return (
          <div className="relative w-full h-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:border-blue-200 transition-colors">
            <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>
            {/* "Read" overlay for docs too? */}
             <div className="absolute bottom-0 left-0 right-0 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                    type="button"
                    className="w-full bg-[#174A5F] text-white py-3 text-sm font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick?.();
                    }}
                >
                    Read Document
                </button>
            </div>
          </div>
        );

      case 'slides':
         return (
          <div className="relative w-full h-full bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:border-orange-200 transition-colors">
            <div className="text-center p-6">
                 <div className="w-16 h-16 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-orange-500 group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
            </div>
             <div className="absolute bottom-0 left-0 right-0 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                    type="button"
                    className="w-full bg-[#174A5F] text-white py-3 text-sm font-medium"
                    onClick={(e) => {
                         e.stopPropagation();
                         onClick?.();
                    }}
                >
                    View Slides
                </button>
            </div>
          </div>
        );

      case 'generated':
        return (
            <div className="relative w-full h-full bg-purple-50 flex items-center justify-center border border-purple-100 group-hover:border-purple-200 transition-colors">
            <div className="text-center p-6">
                 <div className="w-16 h-16 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>
             <div className="absolute bottom-0 left-0 right-0 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                    type="button"
                    className="w-full bg-[#174A5F] text-white py-3 text-sm font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick?.();
                    }}
                >
                    View Summary
                </button>
            </div>
          </div>
        );

      case 'books':
      default:
        return (
           <>
            <img 
              src={resource.coverUrl} 
              alt={resource.title} 
              className="w-full h-full object-cover"
            />
            {/* Read Button Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                <button 
                    type="button"
                    className="w-full bg-[#174A5F] hover:bg-[#123644] text-white py-3 text-sm font-medium transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick?.();
                    }}
                >
                    Read
                </button>
            </div>
           </>
        );
    }
  };

  return (
    <div 
        className={`group font-primary cursor-pointer ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
    >
      {/* Card Image Container */}
      <div className="relative aspect-[4/3] mb-3 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
        {renderThumbnail()}
      </div>
      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-bold text-gray-900 line-clamp-1" title={resource.title}>
          {resource.title}
        </h3>
        
        <div className="flex items-center justify-between">
            <span className="text-sm text-[#174A5F] font-medium cursor-pointer hover:underline">Rate</span>
        </div>

        {/* Rating Stars & Actions */}
        <div className="flex items-center justify-between">
            {/* Stars */}
            <div className="flex items-center gap-0.5 text-[#174A5F]">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.floor(resource.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                ))} 
                {resource.rating % 1 !== 0 && (
                     <svg className="w-3 h-3 fill-current text-[#174A5F]" viewBox="0 0 24 24">
                         {/* Half star logic simplified for now, just full stars */}
                     </svg>
                )}
            </div>

            {/* Icon Actions */}
            <div className="flex items-center gap-2 text-gray-400">
                {enableActions ? (
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                            className="p-1 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                        >
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                        
                        {showMenu && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-1">
                                <button onClick={() => handleAction('rename')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                     Rename
                                </button>
                                <button onClick={() => handleAction('share')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Share
                                </button>
                                 <div className="h-px bg-gray-100 my-1"></div>
                                <button onClick={() => handleAction('delete')} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button className="hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                        <button className="hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 pt-1">
            <img 
                src={resource.author.avatar} 
                alt={resource.author.name} 
                className="w-5 h-5 rounded-full object-cover bg-gray-200"
            />
            <span className="text-xs text-gray-500 font-medium">
                {resource.author.name}
            </span>
        </div>
      </div>
    </div>
  );
};
