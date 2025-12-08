/**
 * Delta Labs Exercise & Test Page
 * Main orchestrator for Exercise & Test module
 */

import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from './components';
import { HomePage, SchoolExercisesPage, ExerciseDetailPage, CustomizeExercisePage, AddExercisePage, CommunityPage, TakeWithFriendPage, HistoryPage, TutorPage, NotificationsPage, TakeExercisePage } from './pages';
import type { Exercise, CustomizeExerciseData, ExerciseTab } from './types';

type ExerciseView = 'home' | 'school-exercises' | 'exercise-detail' | 'customize-exercise' | 'add-exercise' | 'community' | 'take-with-friend' | 'history' | 'tutor' | 'notifications' | 'take-exercise';

const ExerciseTestPage: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('home');
  const [activeView, setActiveView] = useState<ExerciseView>('home');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [shouldShowMyExerciseTab, setShouldShowMyExerciseTab] = useState<boolean>(false);

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
      'community': 'community',
      'take-with-friend': 'take-with-friend',
      'history': 'history',
      'education': 'tutor',
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
      setActiveView('take-exercise');
    }
  };

  const handleTakeWithFriend = (exerciseId: string) => {
    // TODO: Open take with friend modal/page
    console.log('Take with friend:', exerciseId);
  };

  const handleCustomizeExercise = () => {
    setActiveView('customize-exercise');
  };

  const handleAddExercise = () => {
    setActiveView('add-exercise');
  };

  const handleSaveDraft = () => {
    // TODO: Save exercise as draft
    console.log('Save draft clicked');
  };

  const handleReviewPost = () => {
    // TODO: Review and post exercise
    console.log('Review & Post clicked');
  };

  const handleAddNextQuestion = () => {
    // TODO: Add next question to the exercise
    console.log('Add next question clicked');
  };

  const handleGenerateExercise = (data: CustomizeExerciseData) => {
    // TODO: Generate exercise based on customization data
    console.log('Generating exercise with data:', data);
    // Navigate to school exercises with "my-exercise" tab active
    setShouldShowMyExerciseTab(true);
    setActiveView('school-exercises');
    setActiveSidebarItem('home'); // Ensure we're on the right sidebar item
  };

  // Reset the flag after navigating to school-exercises
  useEffect(() => {
    if (shouldShowMyExerciseTab && activeView === 'school-exercises') {
      const timer = setTimeout(() => {
        setShouldShowMyExerciseTab(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldShowMyExerciseTab, activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomePage
            onExerciseClick={handleExerciseClick}
            onTestClick={handleTestClick}
          />
        );
      case 'school-exercises': {
        const initialTabValue = shouldShowMyExerciseTab ? 'my-exercise' as ExerciseTab : undefined;
        return (
          <SchoolExercisesPage
            exercises={exercises}
            onStartExercise={handleStartExercise}
            onTakeWithFriend={handleTakeWithFriend}
            onBack={() => {
              setActiveView('home');
              setShouldShowMyExerciseTab(false);
            }}
            onCustomizeExercise={handleCustomizeExercise}
            onAddExercise={handleAddExercise}
            initialTab={initialTabValue}
          />
        );
      }
      case 'exercise-detail':
        if (!selectedExercise) return null;
        return (
          <ExerciseDetailPage
            exercise={selectedExercise}
            onStart={() => {
              setActiveView('take-exercise');
            }}
            onBack={() => {
              setActiveView('school-exercises');
              setSelectedExercise(null);
            }}
          />
        );
      case 'take-exercise':
        if (!selectedExercise) return null;
        // Mock questions data - in real app, this would come from API
        const mockQuestions = [
          {
            id: 'q1',
            questionNumber: 1,
            questionText: 'Graphically, the pair of equations 7x - y = 5; 21x - 3y = 10 represents two lines which are',
            options: [
              { id: 'a', label: 'A', text: 'Intersect at one point' },
              { id: 'b', label: 'B', text: 'Parallel' },
              { id: 'c', label: 'C', text: 'Intersect at two point' },
              { id: 'd', label: 'D', text: 'Coincident' },
            ],
            correctAnswer: 'b',
          },
          {
            id: 'q2',
            questionNumber: 2,
            questionText: 'What is the derivative of x²?',
            options: [
              { id: 'a', label: 'A', text: 'x' },
              { id: 'b', label: 'B', text: '2x' },
              { id: 'c', label: 'C', text: 'x²' },
              { id: 'd', label: 'D', text: '2x²' },
            ],
            correctAnswer: 'b',
          },
          {
            id: 'q3',
            questionNumber: 3,
            questionText: 'What is the value of π (pi) approximately?',
            options: [
              { id: 'a', label: 'A', text: '3.14' },
              { id: 'b', label: 'B', text: '2.71' },
              { id: 'c', label: 'C', text: '1.41' },
              { id: 'd', label: 'D', text: '4.15' },
            ],
            correctAnswer: 'a',
          },
        ];
        return (
          <TakeExercisePage
            exercise={selectedExercise}
            questions={mockQuestions}
            onExit={() => {
              setActiveView('school-exercises');
              setSelectedExercise(null);
            }}
            onComplete={(answers) => {
              console.log('Exercise completed with answers:', answers);
              // Don't navigate here - let the result screen handle navigation
              // The result screen will call onExit when "End Exercise" is clicked
            }}
          />
        );
      case 'customize-exercise':
        return (
          <CustomizeExercisePage
            onBack={() => setActiveView('school-exercises')}
            onGenerate={handleGenerateExercise}
          />
        );
      case 'add-exercise':
        return (
          <AddExercisePage
            onBack={() => setActiveView('school-exercises')}
            onSaveDraft={handleSaveDraft}
            onReviewPost={handleReviewPost}
            onAddNextQuestion={handleAddNextQuestion}
          />
        );
      case 'community':
        return (
          <CommunityPage
            exercises={exercises}
            onStartExercise={handleStartExercise}
            onTakeWithFriend={handleTakeWithFriend}
          />
        );
      case 'take-with-friend':
        return (
          <TakeWithFriendPage
            onStartExercise={handleStartExercise}
            onTakeWithFriend={handleTakeWithFriend}
          />
        );
      case 'history':
        return (
          <HistoryPage
            onViewExercise={(exerciseId) => {
              const exercise = exercises.find(e => e.id === exerciseId);
              if (exercise) {
                setSelectedExercise(exercise);
                setActiveView('exercise-detail');
              }
            }}
            onRetakeExercise={(exerciseId) => {
              handleStartExercise(exerciseId);
            }}
          />
        );
      case 'tutor':
        return (
          <TutorPage
            onInviteTutor={(tutorId) => {
              console.log('Inviting tutor:', tutorId);
            }}
            onMessageTutor={(tutorId) => {
              console.log('Messaging tutor:', tutorId);
            }}
            onBroadcast={() => {
              console.log('Broadcasting...');
            }}
          />
        );
      case 'notifications':
        return (
          <NotificationsPage
            onGoToExercise={(notificationId) => {
              console.log('Go to exercise for notification:', notificationId);
              // TODO: Navigate to exercise based on notification
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-primary py-6 relative">
      {/* Left Sidebar Navigation - Hidden on detail, customize, add-exercise, and take-exercise pages */}
      {activeView !== 'exercise-detail' && activeView !== 'customize-exercise' && activeView !== 'add-exercise' && activeView !== 'take-exercise' && (
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
