/**
 * AnswerSection Organism Component
 * Displays all answers for a question
 */

import React from 'react';
import type { Answer } from '../types';
import { AnswerCard } from '../components';

interface AnswerSectionProps {
  answers: Answer[];
  onUpvote?: (answerId: string) => void;
  onDownvote?: (answerId: string) => void;
  onSeeComments?: (answerId: string) => void;
  onAddComment?: (answerId: string) => void;
  className?: string;
}

export const AnswerSection: React.FC<AnswerSectionProps> = ({
  answers,
  onUpvote,
  onDownvote,
  onSeeComments,
  onAddComment,
  className = '',
}) => {
  if (answers.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {answers.map((answer) => (
        <AnswerCard
          key={answer.id}
          answer={answer}
          onUpvote={onUpvote ? () => onUpvote(answer.id) : undefined}
          onDownvote={onDownvote ? () => onDownvote(answer.id) : undefined}
          onSeeComments={onSeeComments ? () => onSeeComments(answer.id) : undefined}
          onAddComment={onAddComment ? () => onAddComment(answer.id) : undefined}
        />
      ))}
    </div>
  );
};


