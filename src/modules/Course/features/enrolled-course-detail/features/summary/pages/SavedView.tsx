/**
 * Delta Labs Fast Summary - Saved View
 * Main view displaying saved summaries
 */

import React from 'react';
import { SearchBar, SummaryCard } from '../components';
import type { SavedViewProps } from '../types';

const SavedView: React.FC<SavedViewProps> = ({
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

      {/* Summary Cards */}
      <div className="space-y-0">
        {filteredSummaries.length > 0 ? (
          filteredSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              summary={summary}
              onClick={onSummaryClick}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary font-primary">
              {searchQuery ? 'No summaries found matching your search.' : 'No saved summaries yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedView;
