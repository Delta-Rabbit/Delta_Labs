/**
 * Delta Labs Exercise Grid Card Component
 * Card for displaying exercises in grid layout - Horizontal layout design
 */

import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';
import type { Exercise } from '../types';

interface ExerciseGridCardProps {
  exercise: Exercise;
  onStart: () => void;
  onTakeWithFriend: () => void;
}

export const ExerciseGridCard: React.FC<ExerciseGridCardProps> = ({
  exercise,
  onStart,
  onTakeWithFriend,
}) => {
  const getDifficultyColor = () => {
    switch (exercise.difficulty) {
      case 'easy':
        // Green for most easy exercises, orange for the 4th card as per design
        return exercise.id === '4' 
          ? 'bg-orange-500'
          : 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getQuestionTypeLabel = () => {
    switch (exercise.questionType) {
      case 'true-false':
        return 'True/false';
      case 'matching':
        return 'Matching';
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'blank-space':
        return 'Blank Space';
      default:
        return exercise.questionType;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border-primary overflow-hidden shadow-sm hover:shadow-md transition-shadow flex h-full">
      {/* Left Side - Image (1/3 width) */}
      <div className="w-1/3 bg-gray-200 relative overflow-hidden">
        <img
          src={exercise.thumbnail}
          alt={exercise.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #a8c0ff 0%, #ffffff 100%)';
          }}
        />
      </div>

      {/* Right Side - Content (2/3 width) */}
      <div className="w-2/3 bg-white flex flex-col p-5 relative">
        {/* Difficulty Badge - Top Right */}
        <div className="absolute top-5 right-5">
          <div className={`${getDifficultyColor()} text-white px-3 py-1 rounded text-xs font-medium capitalize`}>
            {exercise.difficulty}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#174A5F] mb-4 font-primary pr-20">
          {exercise.title} <span className="text-[#174A5F]/70 font-normal">|</span> {exercise.institution}
        </h3>

        {/* Details - Two Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6 text-sm text-text-secondary font-primary flex-1">
          <div className="text-text-primary font-medium">{exercise.questionCount} questions</div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{exercise.duration} mins</span>
          </div>
          <div>{getQuestionTypeLabel()}</div>
          <div>{exercise.attempts}+ attempts</div>
        </div>

        {/* Actions - Bottom */}
        <div className="flex items-center justify-between gap-4 mt-auto">
          <DeltaButton
            onClick={onStart}
            variant="primary"
            size="md"
            className="bg-[#174A5F] hover:bg-[#174A5F]/90 text-white px-6 py-2.5 flex-shrink-0"
          >
            Start Exercise
          </DeltaButton>
          <button
            onClick={onTakeWithFriend}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary-600 font-primary transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Take with friend</span>
          </button>
        </div>
      </div>
    </div>
  );
};
