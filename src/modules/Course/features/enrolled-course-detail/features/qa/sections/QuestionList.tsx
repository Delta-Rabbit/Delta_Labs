/**
 * QuestionList Organism Component
 * Displays a list of questions with pagination
 */

import React from 'react';
import type { Question } from '../types';
import { QuestionCard, Pagination } from '../components';

interface QuestionListProps {
  questions: Question[];
  currentPage: number;
  totalPages: number;
  onQuestionClick?: (questionId: string) => void;
  onPageChange: (page: number) => void;
  className?: string;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  currentPage,
  totalPages,
  onQuestionClick,
  onPageChange,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Questions List */}
      <div className="space-y-2 mb-6">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onClick={onQuestionClick ? () => onQuestionClick(question.id) : undefined}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};


