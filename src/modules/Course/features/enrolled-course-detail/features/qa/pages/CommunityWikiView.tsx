/**
 * CommunityWikiView Page Component
 * Displays community wiki topics
 */

import React from 'react';
import SearchBar from '../../../../../../../components/SearchBar';
import type { WikiTopic } from '../types';
import { QuestionCard, Pagination } from '../components';

interface CommunityWikiViewProps {
  topics: WikiTopic[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onTopicClick?: (topicId: string) => void;
}

export const CommunityWikiView: React.FC<CommunityWikiViewProps> = ({
  topics,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  onTopicClick,
}) => {
  // Filter by search query
  const filteredTopics = React.useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const query = searchQuery.toLowerCase();
    return topics.filter(t => 
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [topics, searchQuery]);

  // Convert WikiTopic to Question format for QuestionCard
  const topicsAsQuestions = filteredTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    tags: topic.tags,
    author: topic.author,
    askedDate: topic.askedDate,
    answerCount: topic.answerCount,
    views: topic.views,
    isClosed: false,
    isBookmarked: topic.isBookmarked,
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block">
          Community Wiki
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          placeholder="Search wiki topics..."
          value={searchQuery}
          onChange={onSearchChange}
          maxWidth="full"
          showFilterIcon={true}
        />
      </div>

      {/* Topics List */}
      <div className="space-y-2 mb-6">
        {topicsAsQuestions.map((topic) => (
          <div key={topic.id} className="relative">
            <QuestionCard
              question={topic}
              onClick={onTopicClick ? () => onTopicClick(topic.id) : undefined}
            />
            {filteredTopics.find(t => t.id === topic.id)?.isPaid && (
              <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-error-50 text-error-600 border border-error-200 rounded-lg">
                Paid
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

