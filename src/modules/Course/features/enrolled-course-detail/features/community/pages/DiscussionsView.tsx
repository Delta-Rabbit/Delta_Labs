/**
 * Delta Labs Community - Discussions View
 * Discussion board for structured conversations
 */

import React, { useState } from 'react';
import type { DiscussionThread, DiscussionCategory } from '../types';

interface DiscussionsViewProps {
  discussions: DiscussionThread[];
  onCreateDiscussion: () => void;
  onDiscussionClick: (id: string) => void;
}

const DiscussionsView: React.FC<DiscussionsViewProps> = ({
  discussions,
  onCreateDiscussion,
  onDiscussionClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiscussionCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');

  const categories: { value: DiscussionCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Topics' },
    { value: 'general', label: 'General' },
    { value: 'homework', label: 'Homework Help' },
    { value: 'concepts', label: 'Concepts' },
    { value: 'projects', label: 'Projects' },
    { value: 'exam-prep', label: 'Exam Prep' },
  ];

  const filteredDiscussions = discussions
    .filter((d) => {
      const matchesSearch =
        searchQuery === '' ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.votes - a.votes;
      if (sortBy === 'unanswered') return a.replyCount - b.replyCount;
      return 0; // recent is default order
    });

  return (
    <div className="w-full p-6 pl-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Discussions</h2>
          <p className="text-sm text-text-secondary mt-1">
            {discussions.length} discussions • {discussions.filter((d) => !d.isSolved).length} unanswered
          </p>
        </div>
        <button
          onClick={onCreateDiscussion}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Discussion
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full px-4 py-2 pl-10 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as DiscussionCategory | 'all')}
          className="px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'unanswered')}
          className="px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="unanswered">Unanswered</option>
        </select>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <div
            key={discussion.id}
            onClick={() => onDiscussionClick(discussion.id)}
            className="bg-white border border-border-primary rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  {discussion.isPinned && (
                    <svg className="w-4 h-4 text-warning-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                  <h3 className="text-lg font-semibold text-text-primary hover:text-primary-600 truncate">
                    {discussion.title}
                  </h3>
                  {discussion.isSolved && (
                    <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-medium rounded-full flex-shrink-0">
                      ✓ Solved
                    </span>
                  )}
                  {discussion.isLocked && (
                    <svg className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Content Preview */}
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">{discussion.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {discussion.category}
                  </span>
                  {discussion.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-surface-secondary text-text-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-text-tertiary">
                  <span>by {discussion.author.name}</span>
                  <span>•</span>
                  <span>{discussion.createdAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {discussion.views}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <div className="flex items-center gap-1 text-sm">
                  <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="font-medium text-text-primary">{discussion.votes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-text-secondary">{discussion.replyCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredDiscussions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No discussions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionsView;
