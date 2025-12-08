/**
 * Delta Labs Community Page
 * Community exercises and tests with tabs
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { ExerciseGridCard, Pagination } from '../components';
import type { Exercise } from '../types';

type CommunityTab = 'community-test' | 'community-exercise' | 'my-exercise';

interface CommunityPageProps {
  exercises?: Exercise[];
  onStartExercise?: (exerciseId: string) => void;
  onTakeWithFriend?: (exerciseId: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({
  exercises = [],
  onStartExercise,
  onTakeWithFriend,
}) => {
  const [activeTab, setActiveTab] = useState<CommunityTab>('community-test');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const tabs = [
    { id: 'community-test' as CommunityTab, label: 'Community Test' },
    { id: 'community-exercise' as CommunityTab, label: 'Community Exercise' },
    { id: 'my-exercise' as CommunityTab, label: 'My Exercise' },
  ];

  // Mock community tests data
  const communityTests: Exercise[] = [
    {
      id: 'test-1',
      title: 'Kinematics',
      institution: 'Addis Ababa UV',
      difficulty: 'medium',
      questionCount: 8,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 150,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
    {
      id: 'test-2',
      title: 'Fluid Mechanics',
      institution: 'Addis Ababa UV',
      difficulty: 'hard',
      questionCount: 12,
      questionType: 'true-false',
      duration: 90,
      attempts: 89,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    },
  ];

  // Mock community exercises data
  const communityExercises: Exercise[] = [
    {
      id: 'comm-ex-1',
      title: 'Atoms',
      institution: 'The Physics Community',
      difficulty: 'easy',
      questionCount: 6,
      questionType: 'matching',
      duration: 45,
      attempts: 234,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
    {
      id: 'comm-ex-2',
      title: 'Kinematics',
      institution: 'John Doe',
      difficulty: 'medium',
      questionCount: 10,
      questionType: 'blank-space',
      duration: 75,
      attempts: 67,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    },
  ];

  // Mock my exercises data
  const myExercises: Exercise[] = exercises.length > 0 ? exercises : [
    {
      id: 'my-ex-1',
      title: 'My Physics Exercise',
      institution: 'Me',
      difficulty: 'medium',
      questionCount: 15,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 5,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
  ];

  // Get current exercises based on active tab
  const getCurrentExercises = (): Exercise[] => {
    switch (activeTab) {
      case 'community-test':
        return communityTests;
      case 'community-exercise':
        return communityExercises;
      case 'my-exercise':
        return myExercises;
      default:
        return [];
    }
  };

  // Filter exercises by search query
  const filteredExercises = React.useMemo(() => {
    const currentExercises = getCurrentExercises();
    if (!searchQuery.trim()) return currentExercises;
    const query = searchQuery.toLowerCase();
    return currentExercises.filter(ex =>
      ex.title.toLowerCase().includes(query) ||
      ex.institution.toLowerCase().includes(query)
    );
  }, [activeTab, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full font-primary">
      {/* Page Title - Similar to QA headers */}
      <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block font-primary">
        Community
      </h1>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex items-center gap-6 border-b border-border-primary mb-6" role="tablist">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                role="tab"
                aria-selected={isActive ? 'true' : 'false'}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          placeholder="Search"
          value={searchQuery}
          onChange={setSearchQuery}
          maxWidth="full"
          showFilterIcon={true}
        />
      </div>

      {/* Exercise Grid */}
      {filteredExercises.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {filteredExercises.map((exercise) => (
              <ExerciseGridCard
                key={exercise.id}
                exercise={exercise}
                onStart={() => onStartExercise?.(exercise.id)}
                onTakeWithFriend={() => onTakeWithFriend?.(exercise.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary font-primary">
            No {activeTab === 'community-test' ? 'tests' : activeTab === 'community-exercise' ? 'exercises' : 'my exercises'} found. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
