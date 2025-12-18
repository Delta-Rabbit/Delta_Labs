/**
 * Delta Labs Community Roadmap Page
 * Community-shared roadmaps
 */

import React, { useState } from 'react';
import SearchBar from '../../../../../../../components/SearchBar/SearchBar';
import { DeltaButton } from '../../../../../../../components/theme';

interface RoadmapCard {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  sections: { color: string; label: string }[];
  isAIGenerated?: boolean;
}

const CommunityRoadmapPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockRoadmaps: RoadmapCard[] = [
    {
      id: '1',
      title: 'Physics',
      description: 'All encompassing physics course roadmap.',
      author: {
        name: 'Mark Wako ()',
        avatar: '',
      },
      rating: 0,
      sections: [
        { color: 'bg-pink-400', label: '' },
        { color: 'bg-purple-400', label: '' },
        { color: 'bg-blue-400', label: '' },
        { color: 'bg-yellow-400', label: '' },
        { color: 'bg-green-400', label: '' },
        { color: 'bg-red-400', label: '' },
      ],
    },
    {
      id: '2',
      title: 'Physics',
      description: 'All encompassing physics course roadmap.',
      author: {
        name: 'AI Generated',
        avatar: '',
      },
      rating: 0,
      sections: [
        { color: 'bg-pink-400', label: '' },
        { color: 'bg-purple-400', label: '' },
        { color: 'bg-blue-400', label: '' },
        { color: 'bg-yellow-400', label: '' },
        { color: 'bg-green-400', label: '' },
        { color: 'bg-red-400', label: '' },
      ],
      isAIGenerated: true,
    },
    {
      id: '3',
      title: 'Physics',
      description: 'All encompassing physics course roadmap.',
      author: {
        name: 'Mark Wako ()',
        avatar: '',
      },
      rating: 0,
      sections: [
        { color: 'bg-pink-400', label: '' },
        { color: 'bg-purple-400', label: '' },
        { color: 'bg-blue-400', label: '' },
        { color: 'bg-yellow-400', label: '' },
        { color: 'bg-green-400', label: '' },
        { color: 'bg-red-400', label: '' },
      ],
    },
    {
      id: '4',
      title: 'Physics',
      description: 'All encompassing physics course roadmap.',
      author: {
        name: 'Mark Wako ()',
        avatar: '',
      },
      rating: 0,
      sections: [
        { color: 'bg-pink-400', label: '' },
        { color: 'bg-purple-400', label: '' },
        { color: 'bg-blue-400', label: '' },
        { color: 'bg-yellow-400', label: '' },
        { color: 'bg-green-400', label: '' },
        { color: 'bg-red-400', label: '' },
      ],
    },
  ];

  return (
    <div className="w-full font-primary">
      {/* Header */}
      <h1 className="text-2xl font-bold text-primary-700 mb-6">Community</h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search"
          maxWidth="full"
        />
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRoadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            className="rounded-lg p-4 border border-border-primary hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary-700 mb-1">
                  {roadmap.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {roadmap.description}
                </p>
              </div>
              <button className="text-text-tertiary hover:text-text-primary ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center">
                {roadmap.isAIGenerated ? (
                  <svg className="w-4 h-4 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-text-secondary">{roadmap.author.name}</span>
              {roadmap.isAIGenerated && (
                <span className="text-xs text-primary-600 font-medium">AI Generated</span>
              )}
            </div>

            {/* Section Colors */}
            <div className="flex items-center gap-1 mb-3">
              {roadmap.sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 ${section.color} rounded flex items-center justify-center text-white text-xs font-medium`}
                >
                  {section.label}
                </div>
              ))}
            </div>

            {/* Rating and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-text-secondary mr-1">Rating</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= roadmap.rating ? 'text-yellow-400 fill-current' : 'text-border-secondary'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <DeltaButton variant="primary" size="sm">
                View roadmap
              </DeltaButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityRoadmapPage;
