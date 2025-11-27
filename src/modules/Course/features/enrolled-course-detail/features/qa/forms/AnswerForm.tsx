/**
 * AnswerForm Component
 * Form for submitting an answer to a question
 */

import React from 'react';
import { DeltaButton, DeltaTextarea } from '../../../../../../../components/theme';
import { RichTextEditor } from './RichTextEditor';

interface AnswerFormProps {
  content: string;
  anonymous: boolean;
  onContentChange: (content: string) => void;
  onAnonymousChange: (anonymous: boolean) => void;
  onSubmit: () => void;
  className?: string;
}

export const AnswerForm: React.FC<AnswerFormProps> = ({
  content,
  anonymous,
  onContentChange,
  onAnonymousChange,
  onSubmit,
  className = '',
}) => {
  return (
    <div className={`mt-8 ${className}`}>
      <h2 className="text-lg font-semibold text-text-primary mb-4">Your Answer</h2>
      
      {/* Rich Text Editor */}
      <div className="mb-4">
        <RichTextEditor
          value={content}
          onChange={onContentChange}
          placeholder="answer"
          rows={10}
        />
      </div>

      {/* Payment Method Bar */}
      <div className="bg-primary-500 text-white px-4 py-2 rounded-lg mb-4">
        <span className="text-sm font-medium">Payment Method</span>
      </div>

      {/* Anonymous Answer Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-primary">Anonymous answer</span>
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <button
          onClick={() => onAnonymousChange(!anonymous)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            anonymous ? 'bg-primary-500' : 'bg-gray-300'
          }`}
          aria-label="Toggle anonymous answer"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              anonymous ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Answer Button */}
      <div className="flex justify-end">
        <DeltaButton
          variant="primary"
          size="md"
          className="bg-primary-500 hover:bg-primary-600"
          onClick={onSubmit}
        >
          Answer
        </DeltaButton>
      </div>
    </div>
  );
};



