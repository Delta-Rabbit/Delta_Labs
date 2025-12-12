
import React from 'react';
import TakeExercisePage from '../../exercise/pages/TakeExercisePage';
import type { Exercise } from '../../exercise/types';

interface ExerciseSessionViewProps {
  onExit: () => void;
}

// Mock data for the generated exercise
const MOCK_EXERCISE: Exercise = {
  id: 'gen-1',
  title: 'React Hooks Mastery',
  institution: 'Delta Labs AI',
  difficulty: 'medium',
  questionCount: 5,
  questionType: 'multiple-choice',
  duration: 15,
  attempts: 0,
  thumbnail: '',
};

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    questionNumber: 1,
    questionText: 'Which Hook should be used for side effects in a functional component?',
    type: 'multiple-choice' as const,
    options: [
      { id: 'a', label: 'A', text: 'useState' },
      { id: 'b', label: 'B', text: 'useEffect' },
      { id: 'c', label: 'C', text: 'useContext' },
      { id: 'd', label: 'D', text: 'useReducer' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'q2',
    questionNumber: 2,
    questionText: 'What is the return value of useState?',
    type: 'multiple-choice' as const,
    options: [
      { id: 'a', label: 'A', text: 'The current state value' },
      { id: 'b', label: 'B', text: 'A function to update state' },
      { id: 'c', label: 'C', text: 'An array containing the current state and a function to update it' },
      { id: 'd', label: 'D', text: 'An object with state and setter' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 'q3',
    questionNumber: 3,
    questionText: 'True or False: Hooks can be used inside class components.',
    type: 'true-false' as const,
    options: [
      { id: 'true', label: 'A', text: 'True' },
      { id: 'false', label: 'B', text: 'False' },
    ],
    correctAnswer: 'false',
  },
  {
    id: 'q4',
    questionNumber: 4,
    questionText: 'When does useEffect run if the dependency array is empty []?',
    type: 'multiple-choice' as const,
    options: [
      { id: 'a', label: 'A', text: 'On every render' },
      { id: 'b', label: 'B', text: 'Only on mount' },
      { id: 'c', label: 'C', text: 'Only on unmount' },
      { id: 'd', label: 'D', text: 'Never' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 'q5',
    questionNumber: 5,
    questionText: 'What is the primary purpose of useMemo?',
    type: 'multiple-choice' as const,
    options: [
      { id: 'a', label: 'A', text: 'To memorize component state' },
      { id: 'b', label: 'B', text: 'To perform side effects' },
      { id: 'c', label: 'C', text: 'To memoize expensive calculations' },
      { id: 'd', label: 'D', text: 'To manage context' },
    ],
    correctAnswer: 'c',
  },
];

export const ExerciseSessionView: React.FC<ExerciseSessionViewProps> = ({ onExit }) => {
  return (
    <div className="w-full h-full absolute inset-0 bg-white z-50">
      <TakeExercisePage
        exercise={MOCK_EXERCISE}
        questions={MOCK_QUESTIONS}
        onExit={onExit}
        onComplete={(answers) => {
          console.log('Exercise completed with answers:', answers);
          // Here we would typically save the results
        }}
        isFullScreen={true}
      />
    </div>
  );
};
