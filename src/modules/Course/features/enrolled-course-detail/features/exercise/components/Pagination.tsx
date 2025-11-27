/**
 * Delta Labs Pagination Component
 * Displays pagination controls with First, Back, Next, Last buttons
 */

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
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
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* First Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'text-text-tertiary cursor-not-allowed'
            : 'text-text-primary hover:bg-surface-secondary'
        }`}
      >
        &lt;&lt; First
      </button>

      {/* Back Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'text-text-tertiary cursor-not-allowed'
            : 'text-text-primary hover:bg-surface-secondary'
        }`}
      >
        &lt; Back
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-500 text-white'
                : 'text-text-primary hover:bg-surface-secondary'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'text-text-tertiary cursor-not-allowed'
            : 'text-text-primary hover:bg-surface-secondary'
        }`}
      >
        Next &gt;
      </button>

      {/* Last Button */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'text-text-tertiary cursor-not-allowed'
            : 'text-text-primary hover:bg-surface-secondary'
        }`}
      >
        Last &gt;&gt;
      </button>
    </div>
  );
};

