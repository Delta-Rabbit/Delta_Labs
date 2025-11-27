/**
 * QuestionDetails Organism Component
 * Displays full question details with answers
 */

import React from 'react';
import type { Question } from '../types';
import { IconButton, Badge } from '../ui';
import { TagList, AnswerStatusBadge, AuthorInfo } from '../components';
import { AnswerSection } from './AnswerSection';

interface QuestionDetailsProps {
  question: Question;
  onBack?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
  onUpvoteAnswer?: (answerId: string) => void;
  onDownvoteAnswer?: (answerId: string) => void;
  className?: string;
}

export const QuestionDetails: React.FC<QuestionDetailsProps> = ({
  question,
  onBack,
  onBookmark,
  onShare,
  onFollow,
  onEdit,
  onDelete,
  onClose,
  onUpvoteAnswer,
  onDownvoteAnswer,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Back to questions"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back to Questions</span>
        </button>
      )}

      {/* Question Card */}
      <div className="bg-white border border-border-primary rounded-lg p-6 mb-6">
        <div className="flex gap-3">
          {/* Left Side - Bookmark and Share Icons */}
          <div className="flex flex-col gap-2 pt-0.5">
            <IconButton
              icon={
                <svg
                  className={`w-4 h-4 ${question.isBookmarked ? 'text-primary-600 fill-primary-600' : 'text-text-secondary'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              }
              onClick={onBookmark}
              ariaLabel={question.isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
            />
            <IconButton
              icon={
                <svg
                  className="w-4 h-4 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              }
              onClick={onShare}
              ariaLabel="Share question"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-xl font-bold text-text-primary flex-1">
                {question.title}
              </h1>
              {/* Answer Status and Views - Top Right */}
              <AnswerStatusBadge
                answerCount={question.answerCount}
                views={question.views}
                className="flex-shrink-0"
              />
            </div>
            
            <p className="text-sm text-text-primary mb-4">
              {question.description}
            </p>

            {/* Tags and Author */}
            <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
              <TagList tags={question.tags} />
              <AuthorInfo
                author={question.author}
                date={question.askedDate}
                prefix="Asked"
              />
            </div>

            {/* Question Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-border-primary">
              {onFollow && (
                <button
                  onClick={onFollow}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  aria-label="Follow topic"
                >
                  Follow Topic
                </button>
              )}
              {onEdit && (
                <IconButton
                  icon={
                    <svg
                      className="w-4 h-4 text-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                  onClick={onEdit}
                  ariaLabel="Edit question"
                />
              )}
              {onDelete && (
                <IconButton
                  icon={
                    <svg
                      className="w-4 h-4 text-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                  onClick={onDelete}
                  ariaLabel="Delete question"
                />
              )}
              {onClose && (
                <button
                  onClick={onClose}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    question.isClosed
                      ? 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary'
                      : 'bg-error-50 text-error-600 hover:bg-error-100 border border-error-200'
                  }`}
                  aria-label={question.isClosed ? 'Reopen question' : 'Close question'}
                >
                  {question.isClosed ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reopen question
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Close Question
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      {question.answers && question.answers.length > 0 && (
        <AnswerSection
          answers={question.answers}
          onUpvote={onUpvoteAnswer}
          onDownvote={onDownvoteAnswer}
        />
      )}
    </div>
  );
};



