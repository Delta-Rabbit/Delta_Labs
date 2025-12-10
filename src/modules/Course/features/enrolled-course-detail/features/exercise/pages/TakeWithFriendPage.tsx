/**
 * Delta Labs Take with Friend Page
 * Exercises shared with friends - invitations and owned exercises
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { DeltaButton } from '../../../../../../../components/theme';
import { Pagination, SelectExerciseModal, SelectFriendModal } from '../components';
import type { Exercise } from '../types';

interface TakeWithFriendExercise extends Exercise {
  status: 'owner' | 'invited';
  inviterName?: string;
  participants: { name: string; avatar?: string }[];
}

interface TakeWithFriendPageProps {
  onStartExercise?: (exercise: Exercise) => void;
  onTakeWithFriend?: () => void;
}

export const TakeWithFriendPage: React.FC<TakeWithFriendPageProps> = ({
  onStartExercise,
  onTakeWithFriend,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 25;
  
  // Modal states
  const [isSelectExerciseModalOpen, setIsSelectExerciseModalOpen] = useState(false);
  const [isSelectFriendModalOpen, setIsSelectFriendModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  
  // Mock exercises for selection (could be different from displayed exercises)
  const availableExercises: Exercise[] = [
    {
      id: 'ex-1',
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
      id: 'ex-2',
      title: 'Fluid Mechanics',
      institution: 'Addis Ababa UV',
      difficulty: 'hard',
      questionCount: 12,
      questionType: 'true-false',
      duration: 90,
      attempts: 89,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    },
    {
      id: 'ex-3',
      title: 'Atoms',
      institution: 'The Physics Community',
      difficulty: 'easy',
      questionCount: 6,
      questionType: 'matching',
      duration: 45,
      attempts: 234,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
  ];

  // Mock take with friend exercises data
  const exercises: TakeWithFriendExercise[] = [
    {
      id: 'twf-1',
      title: 'Kinematics',
      institution: 'Addis Ababa UV',
      difficulty: 'medium',
      questionCount: 8,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 150,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      status: 'invited',
      inviterName: 'Leul',
      participants: [
        { name: 'Leul', avatar: undefined },
        { name: 'Friend', avatar: undefined },
      ],
    },
    {
      id: 'twf-2',
      title: 'Kinematics',
      institution: 'Addis Ababa UV',
      difficulty: 'medium',
      questionCount: 8,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 150,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      status: 'owner',
      participants: [
        { name: 'You', avatar: undefined },
        { name: 'Friend', avatar: undefined },
      ],
    },
    {
      id: 'twf-3',
      title: 'Kinematics',
      institution: 'Addis Ababa UV',
      difficulty: 'medium',
      questionCount: 8,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 150,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      status: 'owner',
      participants: [
        { name: 'You', avatar: undefined },
        { name: 'Friend', avatar: undefined },
      ],
    },
    {
      id: 'twf-4',
      title: 'Kinematics',
      institution: 'Addis Ababa UV',
      difficulty: 'medium',
      questionCount: 8,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 150,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      status: 'invited',
      inviterName: 'Leul',
      participants: [
        { name: 'Leul', avatar: undefined },
        { name: 'Friend', avatar: undefined },
      ],
    },
  ];

  // Filter exercises by search query
  const filteredExercises = React.useMemo(() => {
    if (!searchQuery.trim()) return exercises;
    const query = searchQuery.toLowerCase();
    return exercises.filter(ex =>
      ex.title.toLowerCase().includes(query) ||
      ex.institution.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle Take with Friend button click
  const handleTakeWithFriendClick = () => {
    setIsSelectExerciseModalOpen(true);
  };

  // Handle exercise selection (first modal)
  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsSelectExerciseModalOpen(false);
    setIsSelectFriendModalOpen(true);
  };

  // Handle friend invitation (second modal)
  const handleInviteFriend = (friend: { id: string; name: string; email?: string; avatar?: string; status?: 'online' | 'offline' }) => {
    // TODO: Send invitation to friend
    console.log('Inviting friend:', friend, 'to exercise:', selectedExercise);
    setIsSelectFriendModalOpen(false);
    setSelectedExercise(null);
    // You can add a success message or callback here
    if (onTakeWithFriend) {
      onTakeWithFriend();
    }
  };

  // Handle modal close
  const handleCloseSelectExercise = () => {
    setIsSelectExerciseModalOpen(false);
    setSelectedExercise(null);
  };

  const handleCloseSelectFriend = () => {
    setIsSelectFriendModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <div className="w-full font-primary">
      {/* Header with Title and Take with friend Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-2 pb-2 border-b-2 border-primary-600 inline-block font-primary">
          Take with friend
        </h1>
        <DeltaButton
          variant="primary"
          size="md"
          className="bg-primary-500 hover:bg-primary-600"
          onClick={handleTakeWithFriendClick}
        >
          Take with friend
        </DeltaButton>
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
              <div
                key={exercise.id}
                className="bg-white rounded-lg border border-border-primary overflow-hidden shadow-sm hover:shadow-md transition-shadow flex h-full"
              >
                {/* Left Side - Image (1/3 width) */}
                <div className="w-1/3 bg-gray-200 relative overflow-hidden">
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

                {/* Right Side - Content (2/3 width) */}
                <div className="w-2/3 bg-white flex flex-col p-5 relative">
                  {/* Status Badge - Top Left */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="text-sm text-text-secondary font-primary">
                      {exercise.status === 'owner'
                        ? 'Owner'
                        : `Invited by ${exercise.inviterName}`}
                    </span>
                    <div className="flex -space-x-2">
                      {exercise.participants.map((participant, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full bg-primary-200 border-2 border-white flex items-center justify-center text-xs font-medium text-primary-700"
                        >
                          {participant.avatar ? (
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            participant.name.charAt(0).toUpperCase()
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Badge - Top Right */}
                  <div className="absolute top-5 right-5">
                    <div
                      className={`${
                        exercise.difficulty === 'easy'
                          ? 'bg-green-500'
                          : exercise.difficulty === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      } text-white px-3 py-1 rounded text-xs font-medium capitalize`}
                    >
                      {exercise.difficulty}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#174A5F] mb-4 font-primary pr-20 mt-8">
                    {exercise.title}{' '}
                    <span className="text-[#174A5F]/70 font-normal">|</span>{' '}
                    {exercise.institution}
                  </h3>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6 text-sm text-text-secondary font-primary flex-1">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-text-primary font-medium">
                        {exercise.questionCount} total questions
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>1 hr long</span>
                    </div>
                  </div>

                  {/* Actions - Bottom */}
                  <div className="flex items-center justify-end gap-4 mt-auto">
                    <DeltaButton
                      onClick={() => onStartExercise?.(exercise)}
                      variant="primary"
                      size="md"
                      className="bg-[#174A5F] hover:bg-[#174A5F]/90 text-white px-6 py-2.5"
                    >
                      Take Exercise
                    </DeltaButton>
                  </div>
                </div>
              </div>
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
            No exercises found. Try adjusting your search.
          </p>
        </div>
      )}

      {/* Modals */}
      <SelectExerciseModal
        isOpen={isSelectExerciseModalOpen}
        onClose={handleCloseSelectExercise}
        exercises={availableExercises}
        onSelectExercise={handleSelectExercise}
      />
      <SelectFriendModal
        isOpen={isSelectFriendModalOpen}
        onClose={handleCloseSelectFriend}
        exercise={selectedExercise}
        onInviteFriend={handleInviteFriend}
      />
    </div>
  );
};

export default TakeWithFriendPage;

