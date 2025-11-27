/**
 * Delta Labs Exercise & Test Page
 * Main orchestrator for Exercise & Test module
 */

import React, { useState } from 'react';
import { SidebarNavigation } from './components';
import { HomePage, SchoolExercisesPage, ExerciseDetailPage } from './pages';
import type { Exercise } from './types';

type ExerciseView = 'home' | 'school-exercises' | 'exercise-detail' | 'people' | 'profile' | 'history' | 'education' | 'notifications';

const ExerciseTestPage: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('home');
  const [activeView, setActiveView] = useState<ExerciseView>('home');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Mock exercise data
  const exercises: Exercise[] = [
    {
      id: '1',
      title: 'Kinematics',
      institution: 'AAU',
      difficulty: 'easy',
      questionCount: 25,
      questionType: 'true-false',
      duration: 30,
      attempts: 300,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Kinematics',
      institution: 'AAU',
      difficulty: 'easy',
      questionCount: 25,
      questionType: 'matching',
      duration: 30,
      attempts: 300,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Kinematics',
      institution: 'AAU',
      difficulty: 'easy',
      questionCount: 25,
      questionType: 'multiple-choice',
      duration: 30,
      attempts: 300,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      title: 'Kinematics',
      institution: 'AAU',
      difficulty: 'easy',
      questionCount: 25,
      questionType: 'blank-space',
      duration: 30,
      attempts: 300,
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    },
  ];

  const handleSidebarItemChange = (item: string) => {
    setActiveSidebarItem(item);
    const viewMap: Record<string, ExerciseView> = {
      'home': 'home',
      'people': 'people',
      'profile': 'profile',
      'history': 'history',
      'education': 'education',
      'notifications': 'notifications',
    };
    setActiveView(viewMap[item] || 'home');
  };

  const handleExerciseClick = () => {
    setActiveView('school-exercises');
  };

  const handleTestClick = () => {
    // TODO: Navigate to test detail page
    console.log('Test clicked');
  };

  const handleStartExercise = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (exercise) {
      setSelectedExercise(exercise);
      setActiveView('exercise-detail');
    }
  };

  const handleTakeWithFriend = (exerciseId: string) => {
    // TODO: Open take with friend modal/page
    console.log('Take with friend:', exerciseId);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomePage
            onExerciseClick={handleExerciseClick}
            onTestClick={handleTestClick}
          />
        );
      case 'school-exercises':
        return (
          <SchoolExercisesPage
            exercises={exercises}
            onStartExercise={handleStartExercise}
            onTakeWithFriend={handleTakeWithFriend}
            onBack={() => setActiveView('home')}
          />
        );
      case 'exercise-detail':
        if (!selectedExercise) return null;
        return (
          <ExerciseDetailPage
            exercise={selectedExercise}
            onStart={() => {
              // TODO: Navigate to actual test/exercise taking interface
              console.log('Starting exercise:', selectedExercise.id);
            }}
            onBack={() => {
              setActiveView('school-exercises');
              setSelectedExercise(null);
            }}
          />
        );
      case 'people':
        return (
          <div className="w-full font-primary">
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-primary">People</h1>
            <p className="text-text-secondary font-primary">People view coming soon...</p>
          </div>
        );
      case 'profile':
        return (
          <div className="w-full font-primary">
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-primary">Profile</h1>
            <p className="text-text-secondary font-primary">Profile view coming soon...</p>
          </div>
        );
      case 'history':
        return (
          <div className="w-full font-primary">
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-primary">History</h1>
            <p className="text-text-secondary font-primary">History view coming soon...</p>
          </div>
        );
      case 'education':
        return (
          <div className="w-full font-primary">
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-primary">Education</h1>
            <p className="text-text-secondary font-primary">Education view coming soon...</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="w-full font-primary">
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-primary">Notifications</h1>
            <p className="text-text-secondary font-primary">Notifications view coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-primary py-6 relative">
      {/* Left Sidebar Navigation - Hidden on detail page */}
      {activeView !== 'exercise-detail' && (
        <SidebarNavigation
          activeItem={activeSidebarItem}
          onItemChange={handleSidebarItemChange}
        />
      )}
      
      {/* Main Content */}
      {renderView()}
    </div>
  );
};

export default ExerciseTestPage;
