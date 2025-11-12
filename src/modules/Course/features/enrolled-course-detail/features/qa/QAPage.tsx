/**
 * Delta Labs Q&A Page
 * Questions and Answers page for course discussions
 * Features: My Questions, My Answers, FAQs Questions tabs with search, filtering, and pagination
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../components/SearchBar';
import { DeltaButton } from '../../../../../../components/theme';

type QATab = 'my-questions' | 'my-answers' | 'faqs';

interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  askedDate: string;
  answerCount: number;
  views: number;
  isClosed: boolean;
  isBookmarked: boolean;
}

const QAPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<QATab>('my-questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 25;

  // Sample questions data
  const questions: Question[] = [
    {
      id: '1',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: {
        name: 'Leul Solomon',
        avatar: '',
      },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: false,
      isBookmarked: false,
    },
    {
      id: '2',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: {
        name: 'Leul Solomon',
        avatar: '',
      },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: false,
      isBookmarked: false,
    },
    {
      id: '3',
      title: 'Principles of Projectile Motion on an Inclined Plane',
      description: 'Explain how the angle of projection, the incline angle, and the initial velocity affect the trajectory, time of flight, maximum height, and range of a projectile launched from an inclined plane. Discuss how ...',
      tags: ['Open-ended', 'Projectile Motion', 'Kinematics', 'Physics Theory'],
      author: {
        name: 'Leul Solomon',
        avatar: '',
      },
      askedDate: '2 days ago',
      answerCount: 1,
      views: 300,
      isClosed: true,
      isBookmarked: false,
    },
  ];

  const tabs: { id: QATab; label: string }[] = [
    { id: 'my-questions', label: 'My Questions' },
    { id: 'my-answers', label: 'My Answers' },
    { id: 'faqs', label: 'FAQs Questions' },
  ];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Show ellipsis if current page is far from start
    if (currentPage > 4) {
      pages.push('...');
    }
    
    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    // Show ellipsis if current page is far from end
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
          aria-label="First page"
        >
          « First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          &lt; Back
        </button>
        
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">
                ...
              </span>
            );
          }
          
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-500 text-white font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          Next &gt;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
          aria-label="Last page"
        >
          Last »
        </button>
      </div>
    );
  };

  return (
    <div className="w-full font-primary py-6">
      {/* Tabs and Ask Question Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6 border-b border-border-primary" role="tablist">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const ariaSelected = isSelected ? 'true' : 'false';
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
                  isSelected
                    ? 'text-primary-600 font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-selected={ariaSelected}
                role="tab"
              >
                {tab.label}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            );
          })}
        </div>
        
        <DeltaButton
          variant="primary"
          size="md"
          className="bg-primary-500 hover:bg-primary-600"
        >
          Ask Question
        </DeltaButton>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 max-w-2xl">
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={setSearchQuery}
            maxWidth="full"
            showFilterIcon={true}
          />
        </div>
        <button
          className="p-3 border border-border-primary rounded-lg hover:bg-surface-secondary transition-colors"
          aria-label="Filter questions"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-2">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white border border-border-primary rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-3">
              {/* Left Side - Bookmark and Share Icons */}
              <div className="flex flex-col gap-2 pt-0.5">
                <button
                  className="p-1 hover:bg-surface-secondary rounded transition-colors"
                  aria-label={question.isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                >
                  <svg
                    className={`w-4 h-4 ${question.isBookmarked ? 'text-primary-600 fill-primary-600' : 'text-text-secondary'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button
                  className="p-1 hover:bg-surface-secondary rounded transition-colors"
                  aria-label="Share question"
                >
                  <svg
                    className="w-4 h-4 text-text-secondary"
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
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-base font-semibold text-text-primary flex-1">
                    {question.title}
                  </h3>
                  {/* Answer Status and Views - Top Right */}
                  <div className="flex items-center gap-3 flex-shrink-0">
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
                
                <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                  {question.description}
                </p>

                {/* Tags and Author */}
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
                  
                  {/* Author and Date */}
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

              {/* Right Side - Actions */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    aria-label="Follow topic"
                  >
                    Follow Topic
                  </button>
                  <button
                    className="p-1 hover:bg-surface-secondary rounded transition-colors"
                    aria-label="Edit question"
                  >
                    <svg
                      className="w-4 h-4 text-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    className="p-1 hover:bg-surface-secondary rounded transition-colors"
                    aria-label="Delete question"
                  >
                    <svg
                      className="w-4 h-4 text-text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <button
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default QAPage;
