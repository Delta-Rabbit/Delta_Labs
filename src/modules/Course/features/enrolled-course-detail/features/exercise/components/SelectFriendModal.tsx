/**
 * Delta Labs Select Friend Modal
 * Second modal in Take with Friend flow - Search and select a friend
 */

import React, { useState } from 'react';
import { DeltaModal, DeltaButton } from '../../../../../../../components/theme';
import SearchBar from '../../../../../../../components/SearchBar';
import type { Exercise } from '../types';

interface Friend {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status?: 'online' | 'offline';
}

interface SelectFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise | null;
  onInviteFriend: (friend: Friend) => void;
}

export const SelectFriendModal: React.FC<SelectFriendModalProps> = ({
  isOpen,
  onClose,
  exercise,
  onInviteFriend,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  // Mock friends data
  const friends: Friend[] = [
    {
      id: 'friend-1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'online',
    },
    {
      id: 'friend-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'offline',
    },
    {
      id: 'friend-3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'online',
    },
    {
      id: 'friend-4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      status: 'online',
    },
    {
      id: 'friend-5',
      name: 'David Brown',
      email: 'david@example.com',
      status: 'offline',
    },
  ];

  // Filter friends by search query
  const filteredFriends = React.useMemo(() => {
    if (!searchQuery.trim()) return friends;
    const query = searchQuery.toLowerCase();
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(query) ||
      friend.email?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleInvite = () => {
    if (selectedFriendId) {
      const friend = friends.find(f => f.id === selectedFriendId);
      if (friend) {
        onInviteFriend(friend);
        setSelectedFriendId(null);
        setSearchQuery('');
      }
    }
  };

  const handleClose = () => {
    setSelectedFriendId(null);
    setSearchQuery('');
    onClose();
  };

  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Select Friend"
      subtitle={exercise ? `Invite a friend to take "${exercise.title}" with you` : 'Select a friend to invite'}
      size="lg"
      closeOnOverlayClick={true}
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <SearchBar
          placeholder="Search friends..."
          value={searchQuery}
          onChange={setSearchQuery}
          maxWidth="full"
          showFilterIcon={false}
        />

        {/* Friends List */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => setSelectedFriendId(friend.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFriendId === friend.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-border-primary hover:border-primary-300 hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-semibold">
                      {friend.avatar ? (
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        friend.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    {/* Online Status Indicator */}
                    {friend.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Friend Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary font-primary mb-1">
                      {friend.name}
                    </h3>
                    {friend.email && (
                      <p className="text-sm text-text-secondary font-primary">
                        {friend.email}
                      </p>
                    )}
                  </div>

                  {/* Selection Indicator */}
                  {selectedFriendId === friend.id && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-text-secondary font-primary">
              No friends found. Try adjusting your search.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
          <DeltaButton
            variant="secondary"
            size="md"
            onClick={handleClose}
          >
            Cancel
          </DeltaButton>
          <DeltaButton
            variant="primary"
            size="md"
            onClick={handleInvite}
            disabled={!selectedFriendId}
            className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Invite Friend
          </DeltaButton>
        </div>
      </div>
    </DeltaModal>
  );
};

