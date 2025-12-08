/**
 * Delta Labs Customize Exercise Page
 * Allows users to create their own customized exercise
 */

import React, { useState } from 'react';
import { DeltaButton, DeltaCheckbox, DeltaDropdown } from '../../../../../../../components/theme';
import type { DropdownOption } from '../../../../../../../components/theme';

interface CustomizeExercisePageProps {
  onBack: () => void;
  onGenerate: (data: CustomizeExerciseData) => void;
}

export interface CustomizeExerciseData {
  numberOfQuestions: string;
  questionTypes: string[];
  difficulties: string[];
  timer: string;
  roadmapSection?: string;
}

export const CustomizeExercisePage: React.FC<CustomizeExercisePageProps> = ({
  onBack,
  onGenerate,
}) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>('30');
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [timer, setTimer] = useState<string>('');

  // Question number options
  const questionOptions: DropdownOption[] = [
    { value: '10', label: '10 Questions' },
    { value: '15', label: '15 Questions' },
    { value: '20', label: '20 Questions' },
    { value: '25', label: '25 Questions' },
    { value: '30', label: '30 Questions' },
    { value: '40', label: '40 Questions' },
    { value: '50', label: '50 Questions' },
  ];

  // Question types
  const questionTypeOptions = [
    { id: 'multiple-choice', label: 'Multiple Choice' },
    { id: 'true-false', label: 'True or False' },
    { id: 'matching', label: 'Matching' },
    { id: 'fill-blank', label: 'Fill in the blank' },
    { id: 'all', label: 'All' },
  ];

  // Difficulty options
  const difficultyOptions = [
    { id: 'very-easy', label: 'very easy' },
    { id: 'easy', label: 'easy' },
    { id: 'medium', label: 'medium' },
    { id: 'hard', label: 'Hard' },
    { id: 'very-hard', label: 'very hard' },
  ];

  // Timer options
  const timerOptions = [
    { id: '30mins', label: '30mins' },
    { id: '45mins', label: '45mins' },
    { id: '1hour', label: '1 hour' },
    { id: '2hour', label: '2 hour' },
    { id: 'free', label: 'free' },
  ];

  const handleQuestionTypeChange = (id: string, checked: boolean) => {
    if (id === 'all') {
      if (checked) {
        // Select all except 'all'
        setQuestionTypes(questionTypeOptions.filter(opt => opt.id !== 'all').map(opt => opt.id));
      } else {
        setQuestionTypes([]);
      }
    } else {
      if (checked) {
        const newTypes = [...questionTypes, id];
        setQuestionTypes(newTypes);
        // If all individual types are selected, "All" should appear checked (handled by isAllQuestionTypesSelected)
      } else {
        setQuestionTypes(questionTypes.filter(t => t !== id));
      }
    }
  };

  const handleDifficultyChange = (id: string, checked: boolean) => {
    if (checked) {
      setDifficulties([...difficulties, id]);
    } else {
      setDifficulties(difficulties.filter(d => d !== id));
    }
  };

  const handleTimerChange = (id: string, checked: boolean) => {
    // Timer behaves like radio buttons - only one can be selected
    if (checked) {
      setTimer(id);
    } else if (timer === id) {
      // If unchecking the currently selected timer, clear it
      setTimer('');
    }
  };

  const handleGenerate = () => {
    const data: CustomizeExerciseData = {
      numberOfQuestions,
      questionTypes,
      difficulties,
      timer,
    };
    onGenerate(data);
  };

  const isAllQuestionTypesSelected = questionTypes.length === questionTypeOptions.length - 1; // -1 because 'all' is not in the array

  return (
    <div className="w-full font-primary">
      {/* Back Button - Top Left */}
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-primary"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block font-primary">
        Customize your Exercise
      </h1>

      {/* Form Content */}
      <div className="space-y-8">
        {/* Number of Questions */}
        <div>
          <p className="text-sm text-text-primary mb-3 font-primary">
            Enter the number of questions you want to take an Exercise
          </p>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 font-primary">
              No of Questions:
            </label>
            <DeltaDropdown
              value={numberOfQuestions}
              onChange={setNumberOfQuestions}
              options={questionOptions}
              placeholder="30 Questions"
              className="w-full max-w-xs"
            />
          </div>
        </div>

        {/* Question Types */}
        <div>
          <p className="text-sm text-text-primary mb-3 font-primary">
            Select type of Questions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {questionTypeOptions.map((option) => (
              <div
                key={option.id}
                className={option.id === 'all' ? 'ml-4' : ''}
              >
                <DeltaCheckbox
                  label={option.label}
                  checked={
                    option.id === 'all'
                      ? isAllQuestionTypesSelected
                      : questionTypes.includes(option.id)
                  }
                  onChange={(e) => handleQuestionTypeChange(option.id, e.target.checked)}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Levels */}
        <div>
          <p className="text-sm text-text-primary mb-3 font-primary">
            Select the difficulty of Questions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {difficultyOptions.map((option) => (
              <div key={option.id} className="flex-shrink-0">
                <DeltaCheckbox
                  label={option.label}
                  checked={difficulties.includes(option.id)}
                  onChange={(e) => handleDifficultyChange(option.id, e.target.checked)}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div>
          <p className="text-sm text-text-primary mb-3 font-primary">
            Set Timer
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {timerOptions.map((option) => (
              <div key={option.id} className="flex-shrink-0">
                <DeltaCheckbox
                  label={option.label}
                  checked={timer === option.id}
                  onChange={(e) => handleTimerChange(option.id, e.target.checked)}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Section */}
        <div>
          <p className="text-sm text-text-primary mb-3 font-primary">
            Select section from roadmap
          </p>
          <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border border-border-primary">
            <svg
              className="w-16 h-16 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>
        </div>

        {/* Generate Exercise Button */}
        <div className="flex justify-end pt-4">
          <DeltaButton
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            className="bg-[#174A5F] hover:bg-[#174A5F]/90 text-white px-8 py-3"
          >
            Generate Exercise
          </DeltaButton>
        </div>
      </div>
    </div>
  );
};

