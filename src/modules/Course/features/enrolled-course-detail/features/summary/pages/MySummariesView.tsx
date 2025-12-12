/**
 * Delta Labs Fast Summary - My Summaries View
 * View displaying user's own summaries with edit/delete options
 */

import React from 'react';
import { SearchBar, SummaryCard } from '../components';
import type { MySummariesViewProps } from '../types';

const MySummariesView: React.FC<MySummariesViewProps> = ({
  summaries,
  searchQuery,
  onSearchChange,
  onSummaryClick,
}) => {
  // Filter summaries based on search query
  const filteredSummaries = summaries.filter((summary) =>
    summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    summary.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    summary.university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit summary:', id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete summary:', id);
    // TODO: Implement delete functionality
  };

  return (
    <div className="flex-1">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search"
          maxWidth="full"
        />
      </div>

      {/* Summary Cards with Edit/Delete */}
      <div className="space-y-0">
        {filteredSummaries.length > 0 ? (
          filteredSummaries.map((summary) => (
            <div key={summary.id} className="relative group">
              <SummaryCard
                summary={summary}
                onClick={onSummaryClick}
              />
              {/* Edit/Delete Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleEdit(summary.id, e)}
                  className="p-2 bg-white hover:bg-primary-50 rounded-lg shadow-md border border-border-primary transition-colors"
                  aria-label="Edit summary"
                  title="Edit"
                >
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleDelete(summary.id, e)}
                  className="p-2 bg-white hover:bg-red-50 rounded-lg shadow-md border border-border-primary transition-colors"
                  aria-label="Delete summary"
                  title="Delete"
                >
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary font-primary">
              {searchQuery ? 'No summaries found matching your search.' : 'You haven\'t created any summaries yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySummariesView;
