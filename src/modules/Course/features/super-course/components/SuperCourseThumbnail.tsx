/**
 * Delta Labs Super Course Thumbnail Component
 * Thumbnail or placeholder for super course image
 */

import React from 'react';

export interface SuperCourseThumbnailProps {
  thumbnail?: string;
  title: string;
}

const SuperCourseThumbnail: React.FC<SuperCourseThumbnailProps> = ({ thumbnail, title }) => {
  return (
    <div className="w-full h-40 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="text-center">
          <svg className="w-16 h-16 text-primary-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-primary-600 font-medium text-sm font-primary">Super Course</p>
        </div>
      )}
    </div>
  );
};

export default SuperCourseThumbnail;

