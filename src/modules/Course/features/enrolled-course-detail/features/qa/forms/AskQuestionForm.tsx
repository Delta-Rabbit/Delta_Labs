/**
 * AskQuestionForm Component
 * Multi-step form for asking a question
 */

import React from 'react';
import { DeltaButton, DeltaInput, DeltaCheckbox, DeltaRadio, DeltaDropdown } from '../../../../../../../components/theme';
import { RichTextEditor } from './RichTextEditor';
import type { AskQuestionStep, Audience, QuestionPayment } from '../types';

interface AskQuestionFormData {
  title: string;
  details: string;
  tags: string[];
  roadmap: string;
  duplicateSearch: string;
  confirmNoDuplicate: boolean;
  postAnonymously: boolean;
  audience: Audience;
  payment: QuestionPayment;
  questionType: string;
}

interface AskQuestionFormProps {
  step: AskQuestionStep;
  data: AskQuestionFormData;
  onDataChange: (data: Partial<AskQuestionFormData>) => void;
  onStepChange: (step: AskQuestionStep) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AskQuestionForm: React.FC<AskQuestionFormProps> = ({
  step,
  data,
  onDataChange,
  onStepChange,
  onCancel,
  onSubmit,
}) => {
  const handleAddTag = (tag: string) => {
    if (tag.trim() && data.tags.length < 5) {
      onDataChange({ tags: [...data.tags, tag.trim()] });
    }
  };

  const handleRemoveTag = (index: number) => {
    onDataChange({ tags: data.tags.filter((_, i) => i !== index) });
  };

  return (
    <div className="w-full">
      {/* Back Button and Title */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
          aria-label="Back to questions"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-text-primary">Ask a Question</h1>
      </div>

      {step === 1 ? (
        // Step 1: Question Details
        <div className="space-y-6">
          {/* Question Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Question title
            </label>
            <p className="text-sm text-text-secondary mb-2">
              Be specific and imagine you're asking a question to another person.
            </p>
            <p className="text-sm text-text-tertiary mb-3">
              eg. What is Newton's 2nd Law
            </p>
            <DeltaInput
              value={data.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ title: e.target.value })}
              placeholder="Enter your question title"
              className="w-full"
            />
          </div>

          {/* Question Details - Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What are the details of your problem?
            </label>
            <p className="text-sm text-text-secondary mb-3">
              Introduce the problem and expand on what you put in the title. Minimum 20 characters.
            </p>
            <RichTextEditor
              value={data.details}
              onChange={(value) => onDataChange({ details: value })}
              placeholder="answer"
              rows={10}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Tags
            </label>
            <p className="text-sm text-text-secondary mb-3">
              Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="hover:text-primary-900"
                    aria-label={`Remove ${tag} tag`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            {data.tags.length < 5 && (
              <DeltaInput
                placeholder="Tag"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleAddTag(e.currentTarget.value.trim());
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full"
              />
            )}
          </div>

          {/* Select Roadmap */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-text-primary">
                Select roadmap
              </label>
              <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="border border-border-primary rounded-lg p-4 min-h-[100px] bg-surface-secondary">
              {/* Roadmap selection will be rendered here */}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <DeltaButton
              variant="primary"
              size="md"
              className="bg-primary-500 hover:bg-primary-600"
              onClick={() => onStepChange(2)}
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </DeltaButton>
          </div>
        </div>
      ) : (
        // Step 2: Configuration
        <div className="space-y-6">
          {/* Review Duplicate Questions */}
          <div>
            <p className="text-sm text-text-primary mb-3">
              Review questions already on Q & A to see if your question is a duplicate.
            </p>
            <DeltaInput
              value={data.duplicateSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ duplicateSearch: e.target.value })}
              placeholder="Do any of these posts answer your question?"
              className="w-full mb-2"
            />
            <p className="text-sm text-text-secondary">
              No Duplicate questions found.
            </p>
          </div>

          {/* Confirm No Duplicate */}
          <div>
            <p className="text-sm text-text-primary mb-3">
              Confirm that none of these existing posts on Q&A answers your question.
            </p>
            <div className="flex items-center gap-2">
              <DeltaCheckbox
                checked={data.confirmNoDuplicate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ confirmNoDuplicate: e.target.checked })}
                id="confirm-no-duplicate"
              />
              <label htmlFor="confirm-no-duplicate" className="text-sm text-text-secondary">
                I confirm that none of these posts answers my question.
              </label>
            </div>
          </div>

          {/* Configure Your Question */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Configure your question</h3>
            
            {/* Post Anonymously */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-primary">Post anonymously</span>
                <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button
                onClick={() => onDataChange({ postAnonymously: !data.postAnonymously })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  data.postAnonymously ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-label="Toggle post anonymously"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    data.postAnonymously ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Audience Selection */}
            <div>
              <p className="text-sm text-text-primary mb-3">Audience</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DeltaRadio
                    name="audience"
                    value="school"
                    checked={data.audience === 'school'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ audience: e.target.value as Audience })}
                    label={
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm text-text-secondary">As a school</span>
                      </div>
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <DeltaRadio
                    name="audience"
                    value="person"
                    checked={data.audience === 'person'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ audience: e.target.value as Audience })}
                    label={
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm text-text-secondary">As a person</span>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Question Type (Payment) */}
            <div>
              <p className="text-sm text-text-primary mb-3">Question type (payment)</p>
              <div className="flex items-center gap-6">
                <DeltaRadio
                  name="question-payment"
                  value="free"
                  checked={data.payment === 'free'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ payment: e.target.value as QuestionPayment })}
                  label="Free question"
                />
                <DeltaRadio
                  name="question-payment"
                  value="paid"
                  checked={data.payment === 'paid'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDataChange({ payment: e.target.value as QuestionPayment })}
                  label="Paid question"
                />
              </div>
            </div>

            {/* Question Type (Format) */}
            <div>
              <p className="text-sm text-text-primary mb-2">Question Type</p>
              <DeltaDropdown
                options={[
                  { value: 'option1', label: 'Selected Option' },
                  { value: 'option2', label: 'Multiple Choice' },
                  { value: 'option3', label: 'True/False' },
                  { value: 'option4', label: 'Short Answer' },
                ]}
                value={data.questionType}
                onChange={(value) => onDataChange({ questionType: value })}
                placeholder="Select question type"
                className="w-full"
              />
            </div>
          </div>

          {/* Request Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-primary">Request Individual</span>
                <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors" aria-label="Add individual">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <DeltaButton
              variant="primary"
              size="md"
              className="bg-primary-500 hover:bg-primary-600 w-full"
            >
              Payment Requirements
            </DeltaButton>
          </div>

          {/* Done Button */}
          <div className="flex justify-end">
            <DeltaButton
              variant="primary"
              size="md"
              className="bg-primary-500 hover:bg-primary-600"
              onClick={onSubmit}
            >
              Done
            </DeltaButton>
          </div>
        </div>
      )}
    </div>
  );
};



