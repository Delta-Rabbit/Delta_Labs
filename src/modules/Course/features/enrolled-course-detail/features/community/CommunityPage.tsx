/**
 * Delta Labs Community Page
 * Main orchestrator component for course community features
 * Following QA module architecture pattern
 */

import React, { useState } from 'react';
import SidebarNavigation from './components/SidebarNavigation';
import ChatView from './pages/ChatView';
import DiscussionsView from './pages/DiscussionsView';
import StudyGroupsView from './pages/StudyGroupsView';
import EventsView from './pages/EventsView';
import ResourcesView from './pages/ResourcesView';
import MembersView from './pages/MembersView';
import NotificationsView from './pages/NotificationsView';
import type { CommunityView, ChatMessage } from './types';
import {
  mockChatMessages,
  mockOnlineMembers,
  mockDiscussions,
  mockStudyGroups,
  mockEvents,
  mockResources,
  mockMembers,
  mockNotifications,
  mockCurrentUser,
} from './utils/mockData';

const CommunityPage: React.FC = () => {
  // View state
  const [activeView, setActiveView] = useState<CommunityView>('chat');

  // Chat state
  const [chatMessages, setChatMessages] = useState(mockChatMessages);

  // Notifications
  const unreadNotifications = mockNotifications.filter((n) => !n.isRead).length;

  // ============================================================================
  // HANDLERS
  // ============================================================================

  // Chat handlers
  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      author: mockCurrentUser,
      content: message,
      type: 'text',
      timestamp: 'just now',
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  // Discussion handlers
  const handleCreateDiscussion = () => {
    // TODO: Open create discussion modal
    console.log('Create discussion clicked');
  };

  const handleDiscussionClick = (id: string) => {
    // TODO: Open discussion detail view
    console.log('Discussion clicked:', id);
  };

  // Study Groups handlers
  const handleCreateGroup = () => {
    // TODO: Open create group modal
    console.log('Create group clicked');
  };

  const handleJoinGroup = (id: string) => {
    // TODO: Handle join group
    console.log('Join group:', id);
  };

  const handleGroupClick = (id: string) => {
    // TODO: Open group detail modal
    console.log('Group clicked:', id);
  };

  // Events handlers
  const handleCreateEvent = () => {
    // TODO: Open create event modal
    console.log('Create event clicked');
  };

  const handleRSVP = (eventId: string) => {
    // TODO: Handle RSVP
    console.log('RSVP to event:', eventId);
  };

  // Resources handlers
  const handleUploadResource = () => {
    // TODO: Open upload modal
    console.log('Upload resource clicked');
  };

  const handleDownload = (id: string) => {
    // TODO: Handle download
    console.log('Download resource:', id);
  };

  // Members handlers
  const handleFollow = (id: string) => {
    // TODO: Handle follow/unfollow
    console.log('Follow member:', id);
  };

  const handleMessage = (id: string) => {
    // TODO: Open DM with member
    console.log('Message member:', id);
  };

  // Notifications handlers
  const handleMarkAsRead = (id: string) => {
    // TODO: Mark notification as read
    console.log('Mark as read:', id);
  };

  const handleNotificationClick = (id: string) => {
    // TODO: Navigate to notification target
    console.log('Notification clicked:', id);
  };

  // ============================================================================
  // RENDER VIEW
  // ============================================================================

  const renderView = () => {
    switch (activeView) {
      case 'chat':
        return (
          <ChatView
            messages={chatMessages}
            onlineMembers={mockOnlineMembers}
            onSendMessage={handleSendMessage}
          />
        );

      case 'discussions':
        return (
          <DiscussionsView
            discussions={mockDiscussions}
            onCreateDiscussion={handleCreateDiscussion}
            onDiscussionClick={handleDiscussionClick}
          />
        );

      case 'study-groups':
        return (
          <StudyGroupsView
            groups={mockStudyGroups}
            onCreateGroup={handleCreateGroup}
            onJoinGroup={handleJoinGroup}
            onGroupClick={handleGroupClick}
          />
        );

      case 'events':
        return (
          <EventsView
            events={mockEvents}
            onCreateEvent={handleCreateEvent}
            onRSVP={handleRSVP}
          />
        );

      case 'resources':
        return (
          <ResourcesView
            resources={mockResources}
            onUploadResource={handleUploadResource}
            onDownload={handleDownload}
          />
        );

      case 'members':
        return (
          <MembersView
            members={mockMembers}
            onFollow={handleFollow}
            onMessage={handleMessage}
          />
        );

      case 'notifications':
        return (
          <NotificationsView
            notifications={mockNotifications}
            onMarkAsRead={handleMarkAsRead}
            onNotificationClick={handleNotificationClick}
          />
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="w-full font-primary py-6 relative">
      {/* Left Sidebar Navigation */}
      <SidebarNavigation
        activeView={activeView}
        onViewChange={setActiveView}
        unreadCount={unreadNotifications}
      />

      {/* Main Content */}
      {renderView()}
    </div>
  );
};

export default CommunityPage;
