/**
 * Delta Labs Community Feature - Type Definitions
 * All TypeScript types for community functionality
 */

// ============================================================================
// ENUMS & LITERALS
// ============================================================================

export type CommunityView = 
  | 'chat' 
  | 'discussions' 
  | 'study-groups' 
  | 'events' 
  | 'resources' 
  | 'members' 
  | 'notifications';

export type MessageType = 'text' | 'image' | 'file' | 'system';
export type DiscussionCategory = 'general' | 'homework' | 'concepts' | 'projects' | 'exam-prep';
export type ResourceType = 'notes' | 'code' | 'slides' | 'video' | 'link' | 'document';
export type EventType = 'study-session' | 'workshop' | 'social' | 'exam-prep' | 'project';
export type NotificationType = 'message' | 'discussion' | 'event' | 'group' | 'resource' | 'mention';
export type MemberRole = 'student' | 'ta' | 'instructor';
export type OnlineStatus = 'online' | 'away' | 'offline';

// ============================================================================
// USER & AUTHOR
// ============================================================================

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  role?: MemberRole;
  onlineStatus?: OnlineStatus;
}

// ============================================================================
// CHAT
// ============================================================================

export interface ChatMessage {
  id: string;
  author: Author;
  content: string;
  type: MessageType;
  timestamp: string;
  isEdited?: boolean;
  isPinned?: boolean;
  reactions?: MessageReaction[];
  replies?: ChatMessage[];
  fileUrl?: string;
  imageUrl?: string;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface OnlineMember {
  id: string;
  name: string;
  avatar?: string;
  role: MemberRole;
  lastSeen?: string;
}

// ============================================================================
// DISCUSSIONS
// ============================================================================

export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  author: Author;
  category: DiscussionCategory;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  replyCount: number;
  views: number;
  votes: number;
  isPinned?: boolean;
  isLocked?: boolean;
  isSolved?: boolean;
  bestAnswerId?: string;
  replies?: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  votes: number;
  isBestAnswer?: boolean;
}

// ============================================================================
// STUDY GROUPS
// ============================================================================

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  creator: Author;
  members: Author[];
  maxMembers: number;
  tags: string[];
  createdAt: string;
  nextSession?: string;
  isPrivate: boolean;
  activityLevel: 'low' | 'medium' | 'high';
  topics: string[];
}

export interface GroupSession {
  id: string;
  groupId: string;
  title: string;
  scheduledAt: string;
  duration: number; // in minutes
  location?: string; // for virtual, a meeting link
  attendees: string[];
}

// ============================================================================
// EVENTS
// ============================================================================

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  organizer: Author;
  type: EventType;
  startTime: string;
  endTime: string;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  maxAttendees?: number;
  attendees: Author[];
  tags: string[];
  isRecurring?: boolean;
  recurringPattern?: string;
}

export interface EventRSVP {
  eventId: string;
  userId: string;
  status: 'going' | 'maybe' | 'not-going';
  timestamp: string;
}

// ============================================================================
// RESOURCES
// ============================================================================

export interface SharedResource {
  id: string;
  title: string;
  description?: string;
  type: ResourceType;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number; // in bytes
  uploader: Author;
  uploadedAt: string;
  downloads: number;
  votes: number;
  tags: string[];
  category?: string;
  thumbnailUrl?: string;
  comments?: ResourceComment[];
}

export interface ResourceComment {
  id: string;
  author: Author;
  content: string;
  createdAt: string;
  votes: number;
}

// ============================================================================
// MEMBERS
// ============================================================================

export interface CourseMember {
  id: string;
  name: string;
  avatar?: string;
  role: MemberRole;
  bio?: string;
  onlineStatus: OnlineStatus;
  lastSeen?: string;
  joinedAt: string;
  stats: MemberStats;
  badges: string[];
  interests?: string[];
  isFollowing?: boolean;
}

export interface MemberStats {
  discussionPosts: number;
  helpfulAnswers: number;
  resourcesShared: number;
  studyGroupsJoined: number;
  eventsAttended: number;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface CommunityNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedItem?: {
    id: string;
    type: string;
    title?: string;
  };
  author?: Author;
  actionUrl?: string;
}

// ============================================================================
// FILTERS & SEARCH
// ============================================================================

export interface DiscussionFilters {
  category?: DiscussionCategory;
  tags?: string[];
  sortBy?: 'recent' | 'popular' | 'unanswered';
  showSolved?: boolean;
}

export interface ResourceFilters {
  type?: ResourceType;
  tags?: string[];
  sortBy?: 'recent' | 'popular' | 'downloads';
}

export interface MemberFilters {
  role?: MemberRole;
  onlineOnly?: boolean;
  badges?: string[];
  sortBy?: 'name' | 'contributions' | 'recent';
}
