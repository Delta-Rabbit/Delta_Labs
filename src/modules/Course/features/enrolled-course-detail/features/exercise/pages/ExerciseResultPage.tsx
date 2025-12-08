/**
 * Delta Labs Exercise Result Page
 * Displays results after completing an exercise
 */

import React from 'react';
import type { Exercise } from '../types';

interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  options: {
    id: string;
    label: string;
    text: string;
  }[];
  correctAnswer?: string;
}

interface ExerciseResultPageProps {
  exercise: Exercise;
  questions: Question[];
  answers: Record<string, string>;
  onTryAgain: () => void;
  onEndExercise: () => void;
}

export const ExerciseResultPage: React.FC<ExerciseResultPageProps> = ({
  exercise,
  questions,
  answers,
  onTryAgain,
  onEndExercise,
}) => {
  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (question.correctAnswer && answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const { correct, total } = calculateScore();
  const percentage = (correct / total) * 100;

  // Get performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: 'Congrats, Great performance.', color: 'text-green-600' };
    if (percentage >= 70) return { text: 'Good job! Keep practicing.', color: 'text-blue-600' };
    if (percentage >= 50) return { text: 'Not bad, but you can do better.', color: 'text-yellow-600' };
    return { text: 'Keep practicing to improve.', color: 'text-orange-600' };
  };

  const performance = getPerformanceMessage();

  // Calculate circle progress (for SVG)
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="fixed inset-0 top-[60px] bottom-0 left-0 right-0 w-full h-[calc(100vh-60px)] flex items-center justify-center font-primary bg-white z-[100]">
      <div className="max-w-2xl w-full px-8 py-12">
        {/* Result Title */}
        <h1 className="text-4xl font-bold text-[#174A5F] mb-6 text-center">
          Result
        </h1>

        {/* Completion Message */}
        <p className="text-lg text-text-secondary text-center mb-12">
          You have completed the Exercise.
        </p>

        {/* Score Section */}
        <div className="flex flex-col items-center mb-12">
          <p className="text-xl font-semibold text-text-primary mb-6">Score:</p>
          
          {/* Circular Progress Indicator */}
          <div className="relative w-40 h-40 mb-6">
            <svg className="transform -rotate-90 w-40 h-40">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#174A5F"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            {/* Score text in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-[#174A5F]">
                  {correct}/{total}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Message */}
          <p className={`text-xl font-semibold ${performance.color}`}>
            {performance.text}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onTryAgain}
            className="px-8 py-3 border-2 border-[#174A5F] text-[#174A5F] bg-white rounded-lg font-semibold hover:bg-[#174A5F] hover:text-white transition-colors duration-200"
          >
            Try Again
          </button>
          <button
            onClick={onEndExercise}
            className="px-8 py-3 bg-[#174A5F] hover:bg-[#174A5F]/90 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            End Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseResultPage;

