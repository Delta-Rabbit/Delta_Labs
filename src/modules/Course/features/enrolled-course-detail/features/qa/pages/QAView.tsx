/**
 * QAView Page Component
 * Main Q&A view with tabs (My Questions, My Answers, FAQs)
 */

import React from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import { DeltaButton } from '../../../../../../../components/theme';
import type { QATab, Question } from '../types';
import { TabBar } from '../components';
import { QuestionList, QuestionDetails } from '../sections';
import { AnswerForm } from '../forms';

interface QAViewProps {
  activeTab: QATab;
  onTabChange: (tab: QATab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  questions: Question[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedQuestionId: string | null;
  onQuestionClick: (questionId: string) => void;
  onBackToQuestions: () => void;
  onAskQuestion: () => void;
  answerContent: string;
  onAnswerContentChange: (content: string) => void;
  anonymousAnswer: boolean;
  onAnonymousAnswerChange: (anonymous: boolean) => void;
  onAnswerSubmit: () => void;
}

export const QAView: React.FC<QAViewProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  questions,
  currentPage,
  totalPages,
  onPageChange,
  selectedQuestionId,
  onQuestionClick,
  onBackToQuestions,
  onAskQuestion,
  answerContent,
  onAnswerContentChange,
  anonymousAnswer,
  onAnonymousAnswerChange,
  onAnswerSubmit,
}) => {
  const tabs = [
    { id: 'my-questions' as QATab, label: 'My Questions' },
    { id: 'my-answers' as QATab, label: 'My Answers' },
    { id: 'faqs' as QATab, label: 'FAQs Questions' },
  ];

  // Filter questions based on active tab
  const filteredQuestions = React.useMemo(() => {
    if (activeTab === 'my-answers') {
      return questions.filter(q => q.userAnswer);
    }
    return questions;
  }, [questions, activeTab]);

  // Filter by search query
  const searchedQuestions = React.useMemo(() => {
    if (!searchQuery.trim()) return filteredQuestions;
    const query = searchQuery.toLowerCase();
    return filteredQuestions.filter(q => 
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query) ||
      q.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [filteredQuestions, searchQuery]);

  if (selectedQuestionId) {
    const question = questions.find(q => q.id === selectedQuestionId);
    if (!question) return null;

    return (
      <div className="w-full">
        <QuestionDetails
          question={question}
          onBack={onBackToQuestions}
        />
        <AnswerForm
          content={answerContent}
          anonymous={anonymousAnswer}
          onContentChange={onAnswerContentChange}
          onAnonymousChange={onAnonymousAnswerChange}
          onSubmit={onAnswerSubmit}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Tabs and Ask Question Button */}
      <div className="flex items-center justify-between mb-6">
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        <DeltaButton
          variant="primary"
          size="md"
          className="bg-primary-500 hover:bg-primary-600"
          onClick={onAskQuestion}
        >
          Ask Question
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
        questions={searchedQuestions}
        currentPage={currentPage}
        totalPages={totalPages}
        onQuestionClick={onQuestionClick}
        onPageChange={onPageChange}
      />
    </div>
  );
};

