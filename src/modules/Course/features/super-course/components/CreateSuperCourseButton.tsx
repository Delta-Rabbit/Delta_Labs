/**
 * Delta Labs Create Super Course Button Component
 * Large button/placeholder for creating a new super course
 */

import React from 'react';

export interface CreateSuperCourseButtonProps {
  onClick: () => void;
}

const CreateSuperCourseButton: React.FC<CreateSuperCourseButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-start">
      <button
        onClick={onClick}
        className="
          w-full max-w-md h-96 border-2 border-dashed border-border-primary 
          rounded-lg flex items-center justify-center
          hover:border-primary-500 hover:bg-primary-50/30
          transition-all transition-normal ease-ease
          group cursor-pointer font-primary
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        "
        aria-label="Create Super Course"
      >
        {/* Primary Circle with White Plus Icon */}
        <div className="
          w-20 h-20 rounded-full bg-primary-600 
          flex items-center justify-center
          shadow-lg group-hover:shadow-xl
          group-hover:scale-110
          transition-all transition-normal ease-ease
        ">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default CreateSuperCourseButton;

