/**
 * BookmarksView Page Component
 * Displays bookmarked questions
 */

import React from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import type { BookmarkedQuestion } from '../types';
import { QuestionCard, Pagination } from '../components';

interface BookmarksViewProps {
  questions: BookmarkedQuestion[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onQuestionClick?: (questionId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  questions,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  onQuestionClick,
}) => {
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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block">
          Bookmarks
        </h1>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 max-w-2xl">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={onSearchChange}
            maxWidth="full"
            showFilterIcon={true}
          />
        </div>
        <button
          className="p-3 border border-border-primary rounded-lg hover:bg-surface-secondary transition-colors"
          aria-label="Filter bookmarks"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-2 mb-6">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white border border-border-primary rounded-lg p-3 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3
                    className={`text-base font-semibold text-text-primary flex-1 ${onQuestionClick ? 'cursor-pointer hover:text-primary-600' : ''}`}
                    onClick={onQuestionClick ? () => onQuestionClick(question.id) : undefined}
                  >
                    {question.title}
                  </h3>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    {question.isPaid && (
                      <span className="px-2 py-1 text-xs font-medium bg-error-50 text-error-600 border border-error-200 rounded-lg">
                        Paid
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded-lg">
                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs font-medium text-green-700">
                          {question.answerCount} answer{question.answerCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <span className="text-xs text-text-secondary whitespace-nowrap">
                        {question.views} views
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                  {question.description}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium bg-surface-secondary text-text-secondary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-primary-600">
                        {question.author.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-text-secondary">
                      {question.author.name}
                    </span>
                    <span className="text-sm text-text-secondary">•</span>
                    <span className="text-sm text-text-secondary">
                      Asked {question.askedDate}
                    </span>
                  </div>
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
        onPageChange={onPageChange}
      />
    </div>
  );
};

