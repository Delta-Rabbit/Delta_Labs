import React from 'react';
import type { SupplementResource } from '../../types';
import { BookViewer } from './BookViewer';
import { VideoViewer } from './VideoViewer';
import { SlideViewer } from './SlideViewer';

interface SupplementViewerProps {
  resource: SupplementResource;
  onBack: () => void;
}

export const SupplementViewer: React.FC<SupplementViewerProps> = ({ resource, onBack }) => {
  
  // Render specific viewer based on type
  const renderViewer = () => {
    switch (resource.type) {
        case 'books':
        case 'documentations':
        case 'generated': // Generated summaries likely text-based
            return <BookViewer resource={resource} />;
            
        case 'slides':
            return <SlideViewer resource={resource} />;
            
        case 'youtube':
        case 'video' as any: // Handle generic video type if added
            return <VideoViewer resource={resource} />;
            
        default:
            return (
                <div className="flex items-center justify-center h-96 text-gray-500">
                    Viewer not available for this content type.
                </div>
            );
    }
  };

  return (
    <div className="w-full font-primary animate-fadeIn">
      {/* Viewer Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#174A5F] transition-colors font-medium"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Supplements
        </button>

        <div className="flex items-center gap-4">
             <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
                 Mark as Complete
             </button>
             <button className="px-4 py-2 bg-[#174A5F] text-white rounded-lg text-sm font-medium hover:bg-[#123644] transition-colors shadow-sm">
                 Download Resource
             </button>
        </div>
      </div>

      {/* Content Area */}
      {renderViewer()}
      
    </div>
  );
};
