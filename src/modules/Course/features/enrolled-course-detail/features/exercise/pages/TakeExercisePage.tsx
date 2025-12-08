/**
 * Delta Labs Take Exercise Page
 * Page where users answer questions and work on exercises
 */

import React, { useState, useEffect } from 'react';
import { ExerciseSidebar } from '../components';
import { ExerciseResultPage } from './ExerciseResultPage';
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

interface TakeExercisePageProps {
  exercise: Exercise;
  questions: Question[];
  onExit: () => void;
  onComplete?: (answers: Record<string, string>) => void;
}

export const TakeExercisePage: React.FC<TakeExercisePageProps> = ({
  exercise,
  questions,
  onExit,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(exercise.duration * 60); // in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState<'right' | 'bottom' | 'transparent'>('right');
  const [bottomSidebarHeight, setBottomSidebarHeight] = useState(200);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Timer countdown
  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit or show warning
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeRemaining]);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex - 1].id] || null);
      setShowAnswer(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[questions[currentQuestionIndex + 1].id] || null);
      setShowAnswer(false);
    } else {
      // Last question - show result screen
      setShowResult(true);
      if (onComplete) {
        onComplete(answers);
      }
    }
  };


  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be saved.')) {
      onExit();
    }
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setTimeRemaining(exercise.duration * 60);
    setIsPaused(false);
  };

  const handleEndExercise = () => {
    onExit();
  };

  // Show result screen if completed
  if (showResult) {
    return (
      <ExerciseResultPage
        exercise={exercise}
        questions={questions}
        answers={answers}
        onTryAgain={handleTryAgain}
        onEndExercise={handleEndExercise}
      />
    );
  }

  // Calculate padding based on sidebar position
  const getContentPadding = () => {
    if (sidebarPosition === 'right') return 'pr-80';
    if (sidebarPosition === 'bottom') {
      return ''; // Will use inline style for dynamic padding
    }
    return ''; // transparent - no padding needed
  };

  return (
    <div className="fixed inset-0 top-[60px] bottom-0 left-0 right-0 w-full h-[calc(100vh-60px)] flex font-primary bg-white overflow-hidden z-[100]">
      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col overflow-y-auto ${getContentPadding()}`}
        style={sidebarPosition === 'bottom' ? { paddingBottom: `${bottomSidebarHeight}px` } : undefined}
      >
        {/* Header - Top Bar (if needed, can be added here) */}
        
        {/* Main Question Content */}
        <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
          {/* Exercise Title */}
          <h1 className="text-2xl font-bold text-text-primary mb-6">
            {exercise.title}
          </h1>

          {/* Question Counter */}
          <div className="text-sm text-text-secondary mb-6">
            Question.{currentQuestionIndex + 1}/{totalQuestions}
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <p className="text-lg text-text-primary leading-relaxed">
              {currentQuestion.questionText}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === option.id
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-border-primary bg-white text-text-primary hover:border-primary-300 hover:bg-primary-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg min-w-[32px]">
                    {option.label}.
                  </span>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6 mb-8 text-sm">
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Push to Roadmap
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              See Answer
            </button>
            <button className="text-text-secondary hover:text-text-primary font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Report
            </button>
          </div>

          {/* Answer Display (if shown) */}
          {showAnswer && currentQuestion.correctAnswer && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-2">Correct Answer:</p>
              <p className="text-green-700">
                {currentQuestion.options.find(opt => opt.id === currentQuestion.correctAnswer)?.text}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border-primary">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-text-primary hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Timer and Thinking Board */}
      <ExerciseSidebar
        timeRemaining={timeRemaining}
        totalTime={exercise.duration * 60}
        isPaused={isPaused}
        onPause={handlePause}
        onExit={handleExit}
        position={sidebarPosition}
        onPositionChange={setSidebarPosition}
        onBottomHeightChange={setBottomSidebarHeight}
      />
    </div>
  );
};

export default TakeExercisePage;

