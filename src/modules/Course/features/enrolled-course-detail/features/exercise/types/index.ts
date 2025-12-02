/**
 * Exercise Module Type Definitions
 */

export type ExerciseTab = 'school' | 'community' | 'my-exercise';
export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'true-false' | 'matching' | 'multiple-choice' | 'blank-space';

export interface Exercise {
  id: string;
  title: string;
  institution: string;
  difficulty: ExerciseDifficulty;
  questionCount: number;
  questionType: QuestionType;
  duration: number; // in minutes
  attempts: number;
  thumbnail: string;
}

export interface CustomizeExerciseData {
  numberOfQuestions: string;
  questionTypes: string[];
  difficulties: string[];
  timer: string;
  roadmapSection?: string;
}

