/**
 * QuestionCard Molecule Component
 * Displays a question card in the list
 */

import React from 'react';
import type { Question } from '../types';
import { IconButton } from '../ui';
import { TagList, AnswerStatusBadge, AuthorInfo } from './index';

interface QuestionCardProps {
  question: Question;
  onClick?: () => void;
  showActions?: boolean;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onClick,
  showActions = true,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-border-primary rounded-lg p-3 hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex gap-3">
        {/* Left Side - Bookmark and Share Icons */}
        {showActions && (
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
              ariaLabel="Share question"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h3
              className={`text-base font-semibold text-text-primary flex-1 ${onClick ? 'cursor-pointer hover:text-primary-600' : ''}`}
              onClick={onClick}
            >
              {question.title}
            </h3>
            {/* Answer Status and Views - Top Right */}
            <AnswerStatusBadge
              answerCount={question.answerCount}
              views={question.views}
              className="flex-shrink-0"
            />
          </div>
          
          <p className="text-sm text-text-secondary mb-2 line-clamp-2">
            {question.description}
          </p>

          {/* Tags and Author */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <TagList tags={question.tags} />
            <AuthorInfo
              author={question.author}
              date={question.askedDate}
              prefix="Asked"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


