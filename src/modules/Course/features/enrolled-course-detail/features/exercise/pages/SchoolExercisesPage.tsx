/**
 * Delta Labs School Exercises Page
 * Displays school exercises in a grid layout
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { DeltaButton } from '../../../../../../../components/theme';
import { TabBar, ExerciseGridCard, Pagination } from '../components';
import type { ExerciseTab, Exercise } from '../types';

interface SchoolExercisesPageProps {
  exercises: Exercise[];
  onStartExercise: (exerciseId: string) => void;
  onTakeWithFriend: (exerciseId: string) => void;
  onBack?: () => void;
}

export const SchoolExercisesPage: React.FC<SchoolExercisesPageProps> = ({
  exercises,
  onStartExercise,
  onTakeWithFriend,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<ExerciseTab>('school');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 25;

  const tabs = [
    { id: 'school' as ExerciseTab, label: 'School Exercises' },
    { id: 'community' as ExerciseTab, label: 'Community Exercise' },
    { id: 'my-exercise' as ExerciseTab, label: 'My Exercise' },
    { id: 'add-question' as ExerciseTab, label: 'Add Question' },
  ];

  // Filter exercises by search query
  const filteredExercises = React.useMemo(() => {
    if (!searchQuery.trim()) return exercises;
    const query = searchQuery.toLowerCase();
    return exercises.filter(ex =>
      ex.title.toLowerCase().includes(query) ||
      ex.institution.toLowerCase().includes(query)
    );
  }, [exercises, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full font-primary">
      {/* Back Button - Top Left */}
      {onBack && (
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
      )}

      {/* Tab Navigation */}
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Search and Custom Exercise Button */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 max-w-2xl">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
            maxWidth="full"
            showFilterIcon={true}
          />
        </div>
        <DeltaButton
          variant="primary"
          size="md"
          className="bg-primary-500 hover:bg-primary-600"
        >
          Custom Exercise
        </DeltaButton>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {filteredExercises.map((exercise) => (
          <ExerciseGridCard
            key={exercise.id}
            exercise={exercise}
            onStart={() => onStartExercise(exercise.id)}
            onTakeWithFriend={() => onTakeWithFriend(exercise.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

