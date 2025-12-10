/**
 * Delta Labs Exercise History Page
 * Shows history of exercises taken by the user
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { Pagination } from '../components';
import type { Exercise } from '../types';

interface ExerciseHistory extends Exercise {
  completedDate: string;
  score?: number;
  maxScore?: number;
  timeSpent: number; // in minutes
  status: 'completed' | 'in-progress' | 'abandoned';
}

interface HistoryPageProps {
  onViewExercise?: (exerciseId: string) => void;
  onRetakeExercise?: (exerciseId: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onViewExercise,
  onRetakeExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Mock exercise history data
  const exerciseHistory: ExerciseHistory[] = [
    {
      id: 'hist-1',
      title: 'Kinematics',
      institution: 'Addis Ababa UV',
      difficulty: 'medium',
      questionCount: 8,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 150,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      completedDate: '2024-01-15',
      score: 85,
      maxScore: 100,
      timeSpent: 45,
      status: 'completed',
    },
    {
      id: 'hist-2',
      title: 'Fluid Mechanics',
      institution: 'Addis Ababa UV',
      difficulty: 'hard',
      questionCount: 12,
      questionType: 'true-false',
      duration: 90,
      attempts: 89,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
      completedDate: '2024-01-10',
      score: 72,
      maxScore: 100,
      timeSpent: 78,
      status: 'completed',
    },
    {
      id: 'hist-3',
      title: 'Atoms',
      institution: 'The Physics Community',
      difficulty: 'easy',
      questionCount: 6,
      questionType: 'matching',
      duration: 45,
      attempts: 234,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      completedDate: '2024-01-08',
      score: 95,
      maxScore: 100,
      timeSpent: 35,
      status: 'completed',
    },
    {
      id: 'hist-4',
      title: 'Thermodynamics',
      institution: 'Addis Ababa UV',
      difficulty: 'hard',
      questionCount: 15,
      questionType: 'blank-space',
      duration: 75,
      attempts: 67,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
      completedDate: '2024-01-05',
      score: 68,
      maxScore: 100,
      timeSpent: 70,
      status: 'completed',
    },
    {
      id: 'hist-5',
      title: 'Electromagnetism',
      institution: 'The Physics Community',
      difficulty: 'medium',
      questionCount: 10,
      questionType: 'multiple-choice',
      duration: 60,
      attempts: 120,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      completedDate: '2024-01-03',
      timeSpent: 25,
      status: 'in-progress',
    },
  ];

  // Filter exercises by search query
  const filteredHistory = React.useMemo(() => {
    if (!searchQuery.trim()) return exerciseHistory;
    const query = searchQuery.toLowerCase();
    return exerciseHistory.filter(ex =>
      ex.title.toLowerCase().includes(query) ||
      ex.institution.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getScoreColor = (score?: number, maxScore?: number) => {
    if (!score || !maxScore) return 'text-text-secondary';
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
            In Progress
          </span>
        );
      case 'abandoned':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
            Abandoned
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-primary">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block font-primary">
        History
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          placeholder="Search exercise history..."
          value={searchQuery}
          onChange={setSearchQuery}
          maxWidth="full"
          showFilterIcon={true}
        />
      </div>

      {/* History List */}
      {filteredHistory.length > 0 ? (
        <>
          <div className="space-y-3 mb-6">
            {filteredHistory.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-white rounded-lg border border-border-primary overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-full">
                  {/* Left Side - Image */}
                  <div className="w-48 bg-gray-200 relative overflow-hidden flex-shrink-0 self-stretch">
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

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-lg font-semibold text-text-primary font-primary">
                          {exercise.title}
                        </h3>
                        {getStatusBadge(exercise.status)}
                      </div>
                      <p className="text-sm text-text-secondary font-primary mb-2">
                        {exercise.institution}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-text-tertiary font-primary mb-2">
                        <span>{exercise.questionCount} questions</span>
                        <span>•</span>
                        <span>{exercise.duration} mins</span>
                        <span>•</span>
                        <span className="capitalize">{exercise.difficulty}</span>
                      </div>

                      {/* History Details */}
                      <div className="flex items-center gap-6 text-sm font-primary">
                        <div>
                          <p className="text-text-tertiary mb-1">Completed</p>
                          <p className="text-text-primary font-medium">
                            {formatDate(exercise.completedDate)}
                          </p>
                        </div>
                        {exercise.score !== undefined && exercise.maxScore !== undefined ? (
                          <div>
                            <p className="text-text-tertiary mb-1">Score</p>
                            <p className={`font-semibold ${getScoreColor(exercise.score, exercise.maxScore)}`}>
                              {exercise.score} / {exercise.maxScore}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-text-tertiary mb-1">Progress</p>
                            <p className="text-text-primary font-medium">In Progress</p>
                          </div>
                        )}
                        <div>
                          <p className="text-text-tertiary mb-1">Time Spent</p>
                          <p className="text-text-primary font-medium">
                            {exercise.timeSpent} mins
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Right aligned */}
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <button
                        onClick={() => onViewExercise?.(exercise.id)}
                        className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors font-primary"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onRetakeExercise?.(exercise.id)}
                        className="px-4 py-2 text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors font-primary"
                      >
                        Retake
                      </button>
                    </div>
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
            No exercise history found. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;