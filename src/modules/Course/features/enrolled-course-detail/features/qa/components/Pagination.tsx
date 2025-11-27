/**
 * Pagination Molecule Component
 * Displays pagination controls
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
      <button
        onClick={() => onPageChange(1)}
        className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
        aria-label="First page"
      >
        « First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(page as number)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next &gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
        aria-label="Last page"
      >
        Last »
      </button>
    </div>
  );
};


