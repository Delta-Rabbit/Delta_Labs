
import React, { useState } from 'react';
import { DeltaButton } from '../../../../../../../components/theme';
import { ExerciseGridCard } from '../../exercise/components';

import type { Exercise } from '../types';

interface FastExerciseViewProps {
  onGenerate: () => void;
  exercises: Exercise[];
  onStartExercise: (exercise: Exercise) => void;
}

export const FastExerciseView = ({ onGenerate, exercises, onStartExercise }: FastExerciseViewProps) => {
  const [activeTab, setActiveTab] = useState<'my' | 'school' | 'community'>('my');

  return (
    <div className="w-full h-full bg-white font-primary">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block font-primary">
            Fast Exercise
          </h1>
        </div>
        <DeltaButton
          onClick={onGenerate}
          variant="primary"
          size="lg"
          className="flex items-center gap-2 shadow-sm font-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Generate Fast Exercise
        </DeltaButton>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-primary mb-6">
        <div className="flex gap-8">
          {[
            { id: 'my', label: 'My Exercises' },
            { id: 'school', label: 'School Exercises' },
            { id: 'community', label: 'Community' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-primary-600'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'my' && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseGridCard
              key={exercise.id}
              exercise={exercise}
              onStart={() => onStartExercise(exercise)}
              onTakeWithFriend={() => console.log('Take with friend:', exercise.id)}
            />
          ))
        ) : (
          /* Placeholder for Empty State */
          <div className="p-8 border border-border-primary border-dashed rounded-lg flex flex-col items-center justify-center text-center col-span-full h-64 bg-surface-secondary/30">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">No exercises found</h3>
            <p className="text-text-secondary max-w-sm">
              You haven't generated any fast exercises yet. Click the button above to create one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
