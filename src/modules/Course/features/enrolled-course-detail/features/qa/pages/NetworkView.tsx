/**
 * NetworkView Page Component
 * Network of Specialized view
 */

import React from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { DeltaButton } from '../../../../../../../components/theme';
import type { Question, NetworkTab, ChatMessage } from '../types';
import { TabBar } from '../components';
import { QuestionList, QuestionDetails } from '../sections';
import { DeltaInput } from '../../../../../../../components/theme';

interface NetworkViewProps {
  questions: Question[];
  activeTab: NetworkTab;
  onTabChange: (tab: NetworkTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedQuestionId: string | null;
  onQuestionClick: (questionId: string) => void;
  onBackToQuestions: () => void;
  joinedSessionId: string | null;
  onJoinSession: (questionId: string) => void;
  onLeaveSession: () => void;
  isMicMuted: boolean;
  onMicToggle: () => void;
  isCameraOn: boolean;
  onCameraToggle: () => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  onChatInputChange: (input: string) => void;
  onSendMessage: () => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  questions,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  selectedQuestionId,
  onQuestionClick,
  onBackToQuestions,
  joinedSessionId,
  onJoinSession,
  onLeaveSession,
  isMicMuted,
  onMicToggle,
  isCameraOn,
  onCameraToggle,
  chatMessages,
  chatInput,
  onChatInputChange,
  onSendMessage,
}) => {
  const tabs = [
    { id: 'my-questions' as NetworkTab, label: 'My Questions' },
    { id: 'community-questions' as NetworkTab, label: 'Community Questions' },
    { id: 'school' as NetworkTab, label: 'School' },
  ];

  // Filter by search query
  const filteredQuestions = React.useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const query = searchQuery.toLowerCase();
    return questions.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [questions, searchQuery]);

  if (joinedSessionId) {
    const question = questions.find(q => q.id === joinedSessionId);
    if (!question) return null;

    return (
      <div className="w-full h-[calc(100vh-200px)] flex flex-col">
        {/* Session Header */}
        <div className="bg-primary-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onLeaveSession}
              className="p-1 hover:bg-primary-200 rounded transition-colors"
              aria-label="Back to questions"
            >
              <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-text-primary">{question.title}</h2>
            <span className="px-2 py-1 bg-error-500 text-white text-xs font-medium rounded">Live</span>
            <span className="text-sm text-text-secondary">300 participants</span>
          </div>
        </div>

        {/* Main Content Area - Video and Chat */}
        <div className="flex-1 flex gap-4 p-4 bg-surface-primary">
          {/* Video Feeds Area */}
          <div className="flex-1 flex gap-4">
            {/* Main Video (Left) */}
            <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-4">
                <div className="w-32 h-32 rounded-full bg-primary-500 mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium mb-1">Leul Solomon</p>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Participant Videos (Right) */}
            <div className="w-64 flex flex-col gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex-1 bg-black rounded-lg overflow-hidden relative">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 p-3">
                    <div className="w-20 h-20 rounded-full bg-primary-500 mb-2 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-white text-xs font-medium mb-1">Participant {i}</p>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Sidebar (Right) */}
          <div className="w-80 bg-white border border-border-primary rounded-lg flex flex-col">
            <div className="px-4 py-3 border-b border-border-primary">
              <h3 className="text-sm font-semibold text-text-primary">Live Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 ? (
                <p className="text-sm text-text-secondary text-center py-8">No messages yet. Start the conversation!</p>
              ) : (
                chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-primary-600">{msg.author.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-text-primary">{msg.author}</span>
                        <span className="text-xs text-text-tertiary">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-3 border-t border-border-primary">
              <div className="flex items-center gap-2">
                <DeltaInput
                  value={chatInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChatInputChange(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && chatInput.trim()) {
                      onSendMessage();
                    }
                  }}
                />
                <button
                  onClick={onSendMessage}
                  className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="bg-white border-t border-border-primary px-6 py-4 flex items-center justify-center gap-4">
          <button
            onClick={onMicToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMicMuted ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button
            onClick={onCameraToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isCameraOn ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
          >
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Raise hand">
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2.5m6-9V9m0 0a1.5 1.5 0 001.5 1.5h1.5m-1.5-1.5h-3m-3.75 0H9m1.5-1.5v-3m0 3h-1.5m0 0H7.5m0 0v3m0-3v-3m0 3h3m-3 0h-1.5" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Open chat">
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Share screen">
            <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={onLeaveSession}
            className="w-12 h-12 rounded-full bg-error-500 hover:bg-error-600 flex items-center justify-center transition-colors"
            aria-label="End call"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M8 21l5-5 5 5M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (selectedQuestionId) {
    const question = questions.find(q => q.id === selectedQuestionId);
    if (!question) return null;

    return (
      <QuestionDetails
        question={question}
        onBack={onBackToQuestions}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Tabs and Create Question Button */}
      <div className="flex items-center justify-between mb-6">
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        <DeltaButton variant="primary" size="md" className="bg-primary-500 hover:bg-primary-600">
          Create Question
        </DeltaButton>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          placeholder="Search questions..."
          value={searchQuery}
          onChange={onSearchChange}
          maxWidth="full"
          showFilterIcon={true}
        />
      </div>

      {/* Questions List */}
      <QuestionList
        questions={filteredQuestions}
        currentPage={currentPage}
        totalPages={totalPages}
        onQuestionClick={onQuestionClick}
        onPageChange={onPageChange}
      />
    </div>
  );
};

