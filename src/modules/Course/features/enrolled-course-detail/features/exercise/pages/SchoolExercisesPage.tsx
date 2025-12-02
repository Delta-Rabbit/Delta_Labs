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
  onCustomizeExercise?: () => void;
  onAddExercise?: () => void;
  initialTab?: ExerciseTab;
}

export const SchoolExercisesPage: React.FC<SchoolExercisesPageProps> = ({
  exercises,
  onStartExercise,
  onTakeWithFriend,
  onBack,
  onCustomizeExercise,
  onAddExercise,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<ExerciseTab>(initialTab || 'school');
  
  // Update tab when initialTab prop changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 25;

  const tabs = [
    { id: 'school' as ExerciseTab, label: 'School Exercises' },
    { id: 'community' as ExerciseTab, label: 'Community Exercise' },
    { id: 'my-exercise' as ExerciseTab, label: 'My Exercise' },
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

      {/* Header with Tabs and Add Exercise Button */}
      <div className="flex items-center justify-between mb-6">
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {onAddExercise && (
          <DeltaButton
            variant="primary"
            size="md"
            className="bg-primary-500 hover:bg-primary-600"
            onClick={onAddExercise}
          >
            Add Exercise
          </DeltaButton>
        )}
      </div>

      {/* AI Customize Exercise and Search */}
      <div className="flex items-center justify-center gap-4 mb-6 relative">
        {/* AI Customize Exercise - Left of Search */}
        {onCustomizeExercise && (
          <button
            onClick={onCustomizeExercise}
            className="flex items-center gap-2 text-text-secondary hover:text-primary-600 transition-colors font-primary group absolute left-0"
            aria-label="Customize Exercise"
          >
            <div className="w-5 h-5 flex items-center justify-center text-primary-600 group-hover:text-primary-700">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="font-medium text-sm">
              Customize Exercise
            </span>
          </button>
        )}
        
        {/* Search Bar - Centered */}
        <div className="flex-1 max-w-2xl mx-auto">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
            maxWidth="full"
            showFilterIcon={true}
          />
        </div>
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

