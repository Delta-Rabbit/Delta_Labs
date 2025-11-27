/**
 * Delta Labs Exercise Detail/Start Page
 * Split-screen layout with exercise image and start interface
 */

import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';
import type { Exercise } from '../types';

interface ExerciseDetailPageProps {
  exercise: Exercise;
  onStart: () => void;
  onBack: () => void;
}

export const ExerciseDetailPage: React.FC<ExerciseDetailPageProps> = ({
  exercise,
  onStart,
  onBack,
}) => {
  const getDifficultyColor = () => {
    switch (exercise.difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] flex font-primary overflow-hidden">
      {/* Left Side - Exercise Image (1/3 width) */}
      <div className="w-1/3 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={exercise.thumbnail}
            alt={exercise.title}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              // Fallback placeholder
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Right Side - Interface (2/3 width) */}
      <div className="w-2/3 bg-[#174A5F] flex flex-col relative">
        {/* Back Button - Top Left */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 bg-white hover:bg-gray-50 text-[#174A5F] px-5 py-2.5 rounded-lg transition-colors shadow-lg flex items-center gap-2 font-medium"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>

        {/* Difficulty Badge - Upper Right */}
        <div className="absolute top-6 right-6 z-10">
          <div className={`${getDifficultyColor()} text-white px-5 py-2.5 rounded-lg font-medium text-sm capitalize shadow-md`}>
            {exercise.difficulty}
          </div>
        </div>

        {/* Content Area - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Text Cursor - Above Start Button (vertical line) */}
          <div className="absolute bottom-32 w-0.5 h-10 bg-black"></div>

          {/* Start Button - Bottom Center */}
          <div className="absolute bottom-16">
            <button
              onClick={onStart}
              className="bg-white text-[#174A5F] hover:bg-gray-50 px-10 py-4 text-xl font-semibold rounded-lg transition-colors shadow-lg"
            >
              Start Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

