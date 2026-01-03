/**
 * Delta Labs Community - Members View
 * Member directory and profiles
 */

import React, { useState } from 'react';
import type { CourseMember, MemberRole } from '../types';

interface MembersViewProps {
  members: CourseMember[];
  onFollow: (id: string) => void;
  onMessage: (id: string) => void;
}

const MembersView: React.FC<MembersViewProps> = ({ members, onFollow, onMessage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<MemberRole | 'all'>('all');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (m.bio && m.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = filterRole === 'all' || m.role === filterRole;
    const matchesOnline = !onlineOnly || m.onlineStatus === 'online';
    return matchesSearch && matchesRole && matchesOnline;
  });

  return (
    <div className="w-full p-6 pl-24">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Members</h2>
        <p className="text-sm text-text-secondary mt-1">
          {members.filter((m) => m.onlineStatus === 'online').length} online • {members.length} total
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members..."
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

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as MemberRole | 'all')}
          className="px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="ta">TAs</option>
          <option value="instructor">Instructors</option>
        </select>

        <label className="flex items-center gap-2 px-4 py-2 border border-border-primary rounded-lg cursor-pointer hover:bg-surface-secondary transition-colors">
          <input
            type="checkbox"
            checked={onlineOnly}
            onChange={(e) => setOnlineOnly(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-text-primary">Online only</span>
        </label>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-border-primary rounded-lg p-5 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                  member.role === 'instructor' ? 'bg-purple-500' :
                  member.role === 'ta' ? 'bg-primary-600' :
                  'bg-primary-400'
                }`}>
                  {member.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  member.onlineStatus === 'online' ? 'bg-success-500' :
                  member.onlineStatus === 'away' ? 'bg-warning-500' :
                  'bg-text-tertiary'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-text-primary truncate">{member.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    member.role === 'instructor' ? 'bg-purple-100 text-purple-700' :
                    member.role === 'ta' ? 'bg-primary-100 text-primary-700' :
                    'bg-surface-secondary text-text-secondary'
                  }`}>
                    {member.role.toUpperCase()}
                  </span>
                  {member.onlineStatus === 'online' && (
                    <span className="text-xs text-success-600">Online</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-sm text-text-secondary line-clamp-2 mb-4">{member.bio}</p>
            )}

            {/* Badges */}
            {member.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {member.badges.slice(0, 2).map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-warning-100 text-warning-700 text-xs font-medium rounded-full flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-surface-secondary rounded-lg">
              <div className="text-center">
                <div className="text-sm font-bold text-text-primary">{member.stats.discussionPosts}</div>
                <div className="text-xs text-text-tertiary">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-text-primary">{member.stats.helpfulAnswers}</div>
                <div className="text-xs text-text-tertiary">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-text-primary">{member.stats.resourcesShared}</div>
                <div className="text-xs text-text-tertiary">Resources</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onFollow(member.id)}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  member.isFollowing
                    ? 'bg-surface-secondary text-text-primary hover:bg-surface-tertiary'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {member.isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => onMessage(member.id)}
                className="px-4 py-2 border border-border-primary rounded-lg hover:bg-surface-secondary transition-colors text-sm font-medium text-text-primary"
                title="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">No members found</p>
        </div>
      )}
    </div>
  );
};

export default MembersView;
