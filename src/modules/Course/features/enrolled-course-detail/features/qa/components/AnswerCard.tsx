/**
 * AnswerCard Molecule Component
 * Displays an answer card with left border line
 */

import React from 'react';
import type { Answer } from '../types';
import { Avatar } from '../ui';
import { VoteControl } from './VoteControl';

interface AnswerCardProps {
  answer: Answer;
  onUpvote?: () => void;
  onDownvote?: () => void;
  onSeeComments?: () => void;
  onAddComment?: () => void;
  className?: string;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  onUpvote,
  onDownvote,
  onSeeComments,
  onAddComment,
  className = '',
}) => {
  return (
    <div className={`bg-white pl-3 pr-3 py-3 ml-[52px] relative ${className}`}>
      {/* Left border line - shorter and centered */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-green-300"></div>
      
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <Avatar name={answer.author.name} avatar={answer.author.avatar} size="md" />

        {/* Answer Content */}
        <div className="flex-1 min-w-0">
          {/* Vote Control */}
          <div className="flex items-start gap-4 mb-3">
            <VoteControl
              votes={answer.votes}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            />

            {/* Answer Text */}
            <div className="flex-1">
              <p className="text-sm text-text-primary mb-4">
                {answer.content}
              </p>

              {/* Action Links */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                {/* Left Side - Comments */}
                <div className="flex items-center gap-4">
                  {onSeeComments && (
                    <button
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                      onClick={onSeeComments}
                      aria-label="See comments"
                    >
                      See Comments
                    </button>
                  )}
                  {onAddComment && (
                    <button
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                      onClick={onAddComment}
                      aria-label="Add a comment"
                    >
                      Add a Comment
                    </button>
                  )}
                  <button
                    className="p-1 hover:bg-surface-secondary rounded transition-colors"
                    aria-label="Send gift"
                  >
                    <svg
                      className="w-4 h-4 text-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </button>
                </div>

                {/* Right Side - Actions and Info */}
                <div className="flex items-center gap-4">
                  <button
                    className="text-xs text-text-secondary hover:text-text-primary font-medium"
                    aria-label="Report"
                  >
                    Report
                  </button>
                  <button
                    className="text-xs text-text-secondary hover:text-text-primary font-medium"
                    aria-label="Share"
                  >
                    Share
                  </button>
                  <button
                    className="text-xs text-text-secondary hover:text-text-primary font-medium"
                    aria-label="Follow"
                  >
                    Follow
                  </button>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>{answer.author.name}</span>
                    {answer.answeredAt && (
                      <>
                        <span>•</span>
                        <span>Answered {answer.answeredAt}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


