/**
 * VoteControl Molecule Component
 * Upvote/downvote control with vote count
 */

import React from 'react';
import { IconButton } from '../ui';

interface VoteControlProps {
  votes: number;
  onUpvote?: () => void;
  onDownvote?: () => void;
  className?: string;
}

export const VoteControl: React.FC<VoteControlProps> = ({
  votes,
  onUpvote,
  onDownvote,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <IconButton
        icon={
          <svg
            className="w-4 h-4 text-text-secondary hover:text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        }
        onClick={onUpvote}
        ariaLabel="Upvote"
      />
      <span className="text-xs font-medium text-text-primary">
        {votes} votes
      </span>
      <IconButton
        icon={
          <svg
            className="w-4 h-4 text-text-secondary hover:text-error-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        }
        onClick={onDownvote}
        ariaLabel="Downvote"
      />
    </div>
  );
};


