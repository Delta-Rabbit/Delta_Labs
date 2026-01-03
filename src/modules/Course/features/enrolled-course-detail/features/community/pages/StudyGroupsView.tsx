/**
 * Delta Labs Community - Study Groups View
 * Study group management and discovery
 */

import React, { useState } from 'react';
import type { StudyGroup } from '../types';

interface StudyGroupsViewProps {
  groups: StudyGroup[];
  onCreateGroup: () => void;
  onJoinGroup: (id: string) => void;
  onGroupClick: (id: string) => void;
}

const StudyGroupsView: React.FC<StudyGroupsViewProps> = ({
  groups,
  onCreateGroup,
  onJoinGroup,
  onGroupClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter(
    (g) =>
      searchQuery === '' ||
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full p-6 pl-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Study Groups</h2>
          <p className="text-sm text-text-secondary mt-1">{groups.length} active groups</p>
        </div>
        <button
          onClick={onCreateGroup}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Group
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search study groups..."
            className="w-full px-4 py-3 pl-10 border border-border-primary rounded-lg"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary"
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
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-border-primary rounded-lg p-5 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-text-primary flex-1">{group.name}</h3>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                group.activityLevel === 'high' ? 'bg-success-500' :
                group.activityLevel === 'medium' ? 'bg-warning-500' :
                'bg-text-tertiary'
              }`} title={`${group.activityLevel} activity`} />
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary line-clamp-2 mb-4">{group.description}</p>

            {/* Member Info */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {group.members.slice(0, 3).map((member, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center text-xs font-medium border-2 border-white"
                  >
                    {member.name.charAt(0)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {group.members.length}/{group.maxMembers} members
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {group.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-surface-secondary text-text-secondary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Next Session */}
            {group.nextSession && (
              <div className="flex items-center gap-2 text-sm text-primary-600 mb-4 bg-primary-50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Next: {group.nextSession}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onGroupClick(group.id)}
                className="flex-1 px-4 py-2 bg-surface-secondary text-text-primary rounded-lg hover:bg-surface-tertiary transition-colors text-sm font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => onJoinGroup(group.id)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No study groups found</p>
        </div>
      )}
    </div>
  );
};

export default StudyGroupsView;
