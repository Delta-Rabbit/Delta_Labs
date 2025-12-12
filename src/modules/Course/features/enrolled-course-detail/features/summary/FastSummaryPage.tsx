/**
 * Delta Labs Fast Summary Page
 * Main orchestrator component for the Fast Summary feature
 */

import React, { useState } from 'react';
import { SidebarNavigation, TopTabNavigation, ReminderSidebar } from './components';
import { SavedView, MySummariesView, SchoolView, CommunityView, SummaryDetailView,  GenerateSummaryView,
  FastExerciseView,
  GenerateExerciseView,
  ExerciseSessionView,
} from './pages';
import { DeltaButton } from '../../../../../../components/theme';
import type { SummaryTab, SidebarView, Summary, Reminder, Exercise } from './types';

const FastSummaryPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState<SummaryTab>('my-summaries');
  const [activeSidebarView, setActiveSidebarView] = useState<SidebarView>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);
  const [showGenerateView, setShowGenerateView] = useState(false);
  const [showGenerateExerciseView, setShowGenerateExerciseView] = useState(false);
  const [showExerciseSession, setShowExerciseSession] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Mock data - Sample summaries
  const mockSummaries: Summary[] = [
    {
      id: '1',
      title: 'Physics: A brief summary on core topics',
      description: 'An intense way to learn about the process and practice your designs skills — My 1st hackathon Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer. As my portfolo...',
      university: {
        name: 'Addis Ababa University',
        avatar: '',
      },
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      readTime: '3 min read',
      visibility: 'public',
      courseType: 'Full course',
    },
    {
      id: '2',
      title: 'Physics: A brief summary on core topics',
      description: 'An intense way to learn about the process and practice your designs skills — My 1st hackathon Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer. As my portfolo...',
      university: {
        name: 'Addis Ababa University',
        avatar: '',
      },
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      readTime: '3 min read',
      visibility: 'public',
      courseType: 'Full course',
    },
    {
      id: '3',
      title: 'Physics: A brief summary on core topics',
      description: 'An intense way to learn about the process and practice your designs skills — My 1st hackathon Hackathons have been on my mind since I heard it was a good way to gain experience as a junior UX designer. As my portfolo...',
      university: {
        name: 'Addis Ababa University',
        avatar: '',
      },
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      readTime: '3 min read',
      visibility: 'public',
      courseType: 'Full course',
    },
  ];

  // Mock data - Sample reminders
  const mockReminders: Reminder[] = [
    {
      id: '1',
      user: {
        name: 'Amit Das',
        avatar: '',
      },
      title: 'Physics: A brief summary on core topics',
    },
    {
      id: '2',
      user: {
        name: 'Amit Das',
        avatar: '',
      },
      title: 'Physics: A brief summary on core topics',
    },
    {
      id: '3',
      user: {
        name: 'Amit Das',
        avatar: '',
      },
      title: 'Physics: A brief summary on core topics',
    },
    {
      id: '4',
      user: {
        name: 'Amit Das',
        avatar: '',
      },
      title: 'Physics: A brief summary on core topics',
    },
    {
      id: '5',
      user: {
        name: 'Amit Das',
        avatar: '',
      },
      title: 'Physics: A brief summary on core topics',
    },
    {
      id: '6',
      user: {
        name: 'Amit Das',
        avatar: '',
      },
      title: 'Physics: A brief summary on core topics',
    },
  ];

  // Handlers
  const handleSummaryClick = (id: string) => {
    console.log('Summary clicked:', id);
    setSelectedSummaryId(id);
  };

  const handleBackToList = () => {
    setSelectedSummaryId(null);
  };

  const handleSidebarViewChange = (view: SidebarView) => {
    setActiveSidebarView(view);
    setSelectedSummaryId(null); // Reset detail view when changing sidebar view
    console.log('Sidebar view changed to:', view);
  };

  const handleStartExerciseGeneration = () => {
    setShowGenerateExerciseView(true);
  };

  const handleSaveExercise = (exerciseData: any) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      title: exerciseData.topic || 'Untitled Exercise',
      topic: exerciseData.topic || 'General',
      date: 'Just now',
      questionsCount: 10,
      questionCount: 10,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Default Physics/Science image
      difficulty: 'medium',
      institution: 'Delta Labs Academy',
      duration: 15,
      questionType: 'multiple-choice',
      attempts: 0,
    };
    setExercises([newExercise, ...exercises]);
    setShowGenerateExerciseView(false);
  };

  const handleStartExerciseSession = (exercise: Exercise) => {
    console.log('Starting exercise:', exercise);
    setShowExerciseSession(true);
  };

  // Render view based on active sidebar view
  const renderView = () => {
    // If a summary is selected, show detail view
    if (selectedSummaryId) {
      const selectedSummary = mockSummaries.find(s => s.id === selectedSummaryId);
      if (selectedSummary) {
        return (
          <SummaryDetailView
            summary={selectedSummary}
            onBack={handleBackToList}
            onBookmark={() => console.log('Bookmark summary:', selectedSummaryId)}
            onShare={() => console.log('Share summary:', selectedSummaryId)}
            onEdit={() => console.log('Edit summary:', selectedSummaryId)}
            onDelete={() => console.log('Delete summary:', selectedSummaryId)}
            isOwner={activeTab === 'my-summaries'} // Only show edit/delete for My Summaries
          />
        );
      }
    }


    // Default list view - render based on active tab
    switch (activeTab) {
      case 'saved':
        return (
          <SavedView
            summaries={mockSummaries}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSummaryClick={handleSummaryClick}
          />
        );
      
      case 'my-summaries':
        return (
          <MySummariesView
            summaries={mockSummaries}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSummaryClick={handleSummaryClick}
          />
        );
      
      case 'school':
        return (
          <SchoolView
            summaries={mockSummaries}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSummaryClick={handleSummaryClick}
          />
        );
      
      case 'community':
        return (
          <CommunityView
            summaries={mockSummaries}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSummaryClick={handleSummaryClick}
          />
        );
      
      default:
        return null;
    }
  };


  // Show AI Generation View
  if (showGenerateView) {
    return (
      <GenerateSummaryView
        onBack={() => setShowGenerateView(false)}
        onSave={(summary) => {
          console.log('Saved summary:', summary);
          setShowGenerateView(false);
        }}
      />
    );
  }

  if (showGenerateExerciseView) {
    return (
      <GenerateExerciseView
        onBack={() => setShowGenerateExerciseView(false)}
        onTakeExercise={handleSaveExercise} 
      />
    );
  }

  if (showExerciseSession) {
    return (
      <ExerciseSessionView
        onExit={() => setShowExerciseSession(false)}
      />
    );
  }

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden relative">
      {/* Left Sidebar Navigation */}
      <SidebarNavigation
        activeView={activeSidebarView}
        onViewChange={handleSidebarViewChange}
      />

      <div className="flex-1 flex h-full overflow-hidden relative">
        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col h-full overflow-hidden relative pt-6 px-6 ${
          activeSidebarView === 'list' && !selectedSummaryId ? 'pr-80' : ''
        }`}>
          {/* Main Content Render */}
          {activeSidebarView === 'exercise' ? (
            <FastExerciseView 
              exercises={exercises}
              onGenerate={handleStartExerciseGeneration}
              onStartExercise={handleStartExerciseSession}
            />
          ) : (
            <>
              {/* Tabs and Generate Summary Button - Only in list view and not in detail view */}
              {activeSidebarView === 'list' && !selectedSummaryId && (
                <div className="flex items-center justify-between mb-6">
                  <TopTabNavigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                  
                  {/* Generate Summary Button */}
                  <DeltaButton
                    onClick={() => setShowGenerateView(true)}
                    variant="primary"
                    size="lg"
                    className="flex items-center gap-2 shadow-sm font-primary"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Generate Summary
                  </DeltaButton>
                </div>
              )}

              {/* Render active view */}
              {renderView()}

              {/* Right Sidebar - Reminders (only in list view, not in detail view) */}
              {!selectedSummaryId && (
                <div className="fixed right-0 top-[130px] bottom-0 w-80 bg-surface-primary border-l border-border-primary z-20">
                  <ReminderSidebar reminders={mockReminders} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FastSummaryPage;


