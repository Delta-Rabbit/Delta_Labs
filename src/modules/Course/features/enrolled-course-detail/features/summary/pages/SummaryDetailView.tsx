/**
 * Delta Labs Fast Summary - Summary Detail View
 * Displays full summary details with content and metadata
 */

import React from 'react';
import type { Summary } from '../types';

interface SummaryDetailViewProps {
  summary: Summary;
  onBack: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

const SummaryDetailView: React.FC<SummaryDetailViewProps> = ({
  summary,
  onBack,
  onBookmark,
  onShare,
  onEdit,
  onDelete,
  isOwner = false,
}) => {
  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Back to summaries"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium font-primary">Back to Summaries</span>
      </button>

      {/* Summary Card */}
      <div className="bg-white border border-border-primary rounded-lg p-6 mb-6">
        <div className="flex gap-3">
          {/* Left Side - Bookmark and Share Icons */}
          <div className="flex flex-col gap-2 pt-0.5">
            <button
              onClick={onBookmark}
              className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
              aria-label="Bookmark summary"
            >
              <svg
                className="w-4 h-4 text-text-secondary hover:text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={onShare}
              className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
              aria-label="Share summary"
            >
              <svg
                className="w-4 h-4 text-text-secondary hover:text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* University and Read Time */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-xs">
                    {summary.university.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm text-text-secondary font-medium font-primary">
                  {summary.university.name}
                </span>
              </div>
              <span className="text-xs text-text-secondary font-primary">
                {summary.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-text-primary mb-4 font-primary">
              {summary.title}
            </h1>

            {/* Description/Content */}
            <div className="prose prose-sm max-w-none mb-4">
              <p className="text-base text-text-primary font-primary leading-relaxed">
                {summary.description}
              </p>
              {/* Additional content would go here */}
              <p className="text-base text-text-primary font-primary leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-base text-text-primary font-primary leading-relaxed mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {summary.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-surface-secondary text-text-secondary text-xs font-medium rounded-full font-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-text-secondary font-primary mb-4">
              <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded font-medium">
                {summary.courseType}
              </span>
              <span className="px-2 py-1 bg-surface-secondary rounded font-medium capitalize">
                {summary.visibility}
              </span>
            </div>

            {/* Action Buttons - Only show for owner */}
            {isOwner && (
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border-primary">
                {onEdit && (
                  <button
                    onClick={onEdit}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-primary"
                    aria-label="Edit summary"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={onDelete}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors font-primary"
                    aria-label="Delete summary"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetailView;
