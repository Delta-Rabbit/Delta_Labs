/**
 * Delta Labs Select Exercise Modal
 * First modal in Take with Friend flow - Select an exercise
 */

import React, { useState } from 'react';
import { DeltaModal, DeltaButton } from '../../../../../../../components/theme';
import SearchBar from '../../../../../../../components/SearchBar';
import type { Exercise } from '../types';

interface SelectExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

export const SelectExerciseModal: React.FC<SelectExerciseModalProps> = ({
  isOpen,
  onClose,
  exercises,
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  // Filter exercises by search query
  const filteredExercises = React.useMemo(() => {
    if (!searchQuery.trim()) return exercises;
    const query = searchQuery.toLowerCase();
    return exercises.filter(ex =>
      ex.title.toLowerCase().includes(query) ||
      ex.institution.toLowerCase().includes(query)
    );
  }, [exercises, searchQuery]);

  const handleContinue = () => {
    if (selectedExerciseId) {
      const exercise = exercises.find(e => e.id === selectedExerciseId);
      if (exercise) {
        onSelectExercise(exercise);
        setSelectedExerciseId(null);
        setSearchQuery('');
      }
    }
  };

  const handleClose = () => {
    setSelectedExerciseId(null);
    setSearchQuery('');
    onClose();
  };

  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Select Exercise"
      subtitle="Choose an exercise to take with your friend"
      size="lg"
      closeOnOverlayClick={true}
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <SearchBar
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={setSearchQuery}
          maxWidth="full"
          showFilterIcon={false}
        />

        {/* Exercise List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => setSelectedExerciseId(exercise.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedExerciseId === exercise.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-border-primary hover:border-primary-300 hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={exercise.thumbnail}
                      alt={exercise.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #a8c0ff 0%, #ffffff 100%)';
                      }}
                    />
                  </div>

                  {/* Exercise Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary font-primary mb-1">
                      {exercise.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-primary mb-2">
                      {exercise.institution}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary font-primary">
                      <span>{exercise.questionCount} questions</span>
                      <span>•</span>
                      <span>{exercise.duration} mins</span>
                      <span>•</span>
                      <span className="capitalize">{exercise.difficulty}</span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedExerciseId === exercise.id && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-text-secondary font-primary">
              No exercises found. Try adjusting your search.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
          <DeltaButton
            variant="secondary"
            size="md"
            onClick={handleClose}
          >
            Cancel
          </DeltaButton>
          <DeltaButton
            variant="primary"
            size="md"
            onClick={handleContinue}
            disabled={!selectedExerciseId}
            className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </DeltaButton>
        </div>
      </div>
    </DeltaModal>
  );
};

