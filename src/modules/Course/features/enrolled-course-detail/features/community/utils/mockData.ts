/**
 * Delta Labs Community Feature - Mock Data
 * Sample data for all community features
 */

import type {
  ChatMessage,
  OnlineMember,
  DiscussionThread,
  StudyGroup,
  CommunityEvent,
  SharedResource,
  CourseMember,
  CommunityNotification,
} from '../types';

// ============================================================================
// MOCK USERS
// ============================================================================

export const mockCurrentUser = {
  id: 'current-user',
  name: 'You',
  avatar: '',
  role: 'student' as const,
  onlineStatus: 'online' as const,
};

// ============================================================================
// CHAT DATA
// ============================================================================

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    author: { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student', onlineStatus: 'online' },
    content: 'Hey everyone! Did anyone finish Problem Set 3 yet? I\'m stuck on question 4.',
    type: 'text',
    timestamp: '10:30 AM',
    reactions: [{ emoji: '👍', count: 3, users: ['3', '4', '5'] }],
  },
  {
    id: '2',
    author: { id: '3', name: 'Mike Chen', avatar: '', role: 'student', onlineStatus: 'online' },
    content: 'I just finished it! Which part of question 4 is confusing you?',
    type: 'text',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    author: mockCurrentUser,
    content: 'I can help with that! I found a good resource for projectile motion. Let me share it.',
    type: 'text',
    timestamp: '10:35 AM',
    reactions: [{ emoji: '🙏', count: 2, users: ['2', '3'] }],
  },
  {
    id: '4',
    author: { id: '4', name: 'Emily Rodriguez', avatar: '', role: 'ta', onlineStatus: 'online' },
    content: 'Great discussion! Remember to check the course wiki for additional resources on this topic.',
    type: 'text',
    timestamp: '10:40 AM',
    isPinned: true,
  },
  {
    id: '5',
    author: { id: '5', name: 'David Kim', avatar: '', role: 'student', onlineStatus: 'away' },
    content: 'Anyone want to join a study group this weekend? Planning to review chapters 5-7.',
    type: 'text',
    timestamp: '11:15 AM',
    reactions: [{ emoji: '✅', count: 5, users: ['2', '3', '6', '7', '8'] }],
  },
];

export const mockOnlineMembers: OnlineMember[] = [
  { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student', lastSeen: 'online' },
  { id: '3', name: 'Mike Chen', avatar: '', role: 'student', lastSeen: 'online' },
  { id: '4', name: 'Emily Rodriguez', avatar: '', role: 'ta', lastSeen: 'online' },
  { id: '5', name: 'David Kim', avatar: '', role: 'student', lastSeen: '2 min ago' },
  { id: '6', name: 'Lisa Park', avatar: '', role: 'student', lastSeen: 'online' },
  { id: '7', name: 'James Wilson', avatar: '', role: 'student', lastSeen: '5 min ago' },
  { id: '8', name: 'Anna Martinez', avatar: '', role: 'student', lastSeen: 'online' },
];

// ============================================================================
// DISCUSSIONS DATA
// ============================================================================

export const mockDiscussions: DiscussionThread[] = [
  {
    id: '1',
    title: 'Understanding Newton\'s Third Law in Real-World Applications',
    content: 'I\'m having trouble understanding how Newton\'s Third Law applies to rocket propulsion. Can someone explain why the rocket moves forward if the forces are equal and opposite?',
    author: { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
    category: 'concepts',
    tags: ['Physics', 'Mechanics', 'Newton\'s Laws'],
    createdAt: '2 hours ago',
    replyCount: 8,
    views: 45,
    votes: 12,
    isPinned: false,
    isSolved: true,
  },
  {
    id: '2',
    title: 'Problem Set 3 - Question 7 Clarification',
    content: 'Can someone help me understand what the question is asking for in part (b)? The wording is a bit confusing.',
    author: { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
    category: 'homework',
    tags: ['Problem Set 3', 'Homework Help'],
    createdAt: '4 hours ago',
    replyCount: 15,
    views: 89,
    votes: 23,
    isPinned: true,
  },
  {
    id: '3',
    title: 'Study Group for Midterm - Who\'s interested?',
    content: 'Looking to form a study group for the upcoming midterm. Planning to meet twice a week. Reply if you\'re interested!',
    author: { id: '5', name: 'David Kim', avatar: '', role: 'student' },
    category: 'exam-prep',
    tags: ['Midterm', 'Study Group', 'Collaboration'],
    createdAt: '1 day ago',
    replyCount: 22,
    views: 134,
    votes: 45,
  },
  {
    id: '4',
    title: 'Best Resources for Understanding Quantum Mechanics?',
    content: 'I\'m looking for additional resources to supplement the course material on quantum mechanics. Any recommendations for videos, books, or websites?',
    author: { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
    category: 'general',
    tags: ['Quantum Mechanics', 'Resources', 'Study Materials'],
    createdAt: '2 days ago',
    replyCount: 12,
    views: 78,
    votes: 18,
  },
  {
    id: '5',
    title: 'Final Project Ideas - Brainstorming Thread',
    content: 'Let\'s use this thread to share and discuss ideas for the final project. I\'m thinking about doing something with renewable energy systems.',
    author: { id: '7', name: 'James Wilson', avatar: '', role: 'student' },
    category: 'projects',
    tags: ['Final Project', 'Ideas', 'Collaboration'],
    createdAt: '3 days ago',
    replyCount: 31,
    views: 156,
    votes: 38,
  },
];

// ============================================================================
// STUDY GROUPS DATA
// ============================================================================

export const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Physics Masters',
    description: 'Weekly study sessions focused on advanced physics concepts and problem-solving strategies.',
    creator: { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
    members: [
      { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
      { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
      { id: '5', name: 'David Kim', avatar: '', role: 'student' },
      { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
    ],
    maxMembers: 8,
    tags: ['Physics', 'Problem Solving', 'Weekly'],
    createdAt: '2 weeks ago',
    nextSession: 'Saturday, 3:00 PM',
    isPrivate: false,
    activityLevel: 'high',
    topics: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
  },
  {
    id: '2',
    name: 'Midterm Prep Squad',
    description: 'Intensive study group preparing for the upcoming midterm exam. Focus on practice problems and concept review.',
    creator: { id: '5', name: 'David Kim', avatar: '', role: 'student' },
    members: [
      { id: '5', name: 'David Kim', avatar: '', role: 'student' },
      { id: '7', name: 'James Wilson', avatar: '', role: 'student' },
      { id: '8', name: 'Anna Martinez', avatar: '', role: 'student' },
    ],
    maxMembers: 6,
    tags: ['Midterm', 'Exam Prep', 'Practice Problems'],
    createdAt: '1 week ago',
    nextSession: 'Wednesday, 6:00 PM',
    isPrivate: false,
    activityLevel: 'high',
    topics: ['All Topics', 'Past Exams', 'Problem Sets'],
  },
  {
    id: '3',
    name: 'Project Collaboration Hub',
    description: 'Working on final projects together. Share ideas, get feedback, and collaborate on implementations.',
    creator: { id: '7', name: 'James Wilson', avatar: '', role: 'student' },
    members: [
      { id: '7', name: 'James Wilson', avatar: '', role: 'student' },
      { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
    ],
    maxMembers: 10,
    tags: ['Final Project', 'Collaboration', 'Feedback'],
    createdAt: '3 days ago',
    nextSession: 'Friday, 4:00 PM',
    isPrivate: false,
    activityLevel: 'medium',
    topics: ['Project Ideas', 'Implementation', 'Presentations'],
  },
  {
    id: '4',
    name: 'Early Birds Study Session',
    description: 'Morning study group for those who prefer studying early. Casual and supportive environment.',
    creator: { id: '8', name: 'Anna Martinez', avatar: '', role: 'student' },
    members: [
      { id: '8', name: 'Anna Martinez', avatar: '', role: 'student' },
      { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
    ],
    maxMembers: 5,
    tags: ['Morning', 'Casual', 'Supportive'],
    createdAt: '5 days ago',
    nextSession: 'Tuesday, 8:00 AM',
    isPrivate: false,
    activityLevel: 'low',
    topics: ['General Topics', 'Homework Help'],
  },
];

// ============================================================================
// EVENTS DATA
// ============================================================================

export const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Midterm Review Session',
    description: 'Comprehensive review of all topics covered in the midterm. Bring your questions!',
    organizer: { id: '4', name: 'Emily Rodriguez', avatar: '', role: 'ta' },
    type: 'exam-prep',
    startTime: '2024-12-20T18:00:00',
    endTime: '2024-12-20T20:00:00',
    location: 'Zoom',
    isVirtual: true,
    meetingLink: 'https://zoom.us/j/example',
    maxAttendees: 50,
    attendees: [
      { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
      { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
      { id: '5', name: 'David Kim', avatar: '', role: 'student' },
    ],
    tags: ['Midterm', 'Review', 'TA Session'],
  },
  {
    id: '2',
    title: 'Physics Lab Workshop',
    description: 'Hands-on workshop for lab techniques and best practices. Learn how to use equipment effectively.',
    organizer: { id: '9', name: 'Dr. Smith', avatar: '', role: 'instructor' },
    type: 'workshop',
    startTime: '2024-12-22T14:00:00',
    endTime: '2024-12-22T16:00:00',
    location: 'Physics Lab 201',
    isVirtual: false,
    maxAttendees: 20,
    attendees: [
      { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
      { id: '7', name: 'James Wilson', avatar: '', role: 'student' },
    ],
    tags: ['Lab', 'Workshop', 'Hands-on'],
  },
  {
    id: '3',
    title: 'Study Group Social Hour',
    description: 'Casual meetup for all study groups. Get to know your classmates in a relaxed setting!',
    organizer: { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
    type: 'social',
    startTime: '2024-12-24T19:00:00',
    endTime: '2024-12-24T21:00:00',
    location: 'Student Lounge',
    isVirtual: false,
    attendees: [
      { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
      { id: '5', name: 'David Kim', avatar: '', role: 'student' },
      { id: '8', name: 'Anna Martinez', avatar: '', role: 'student' },
    ],
    tags: ['Social', 'Networking', 'Fun'],
  },
  {
    id: '4',
    title: 'Final Project Presentations Practice',
    description: 'Practice your final project presentation and get constructive feedback from peers.',
    organizer: { id: '7', name: 'James Wilson', avatar: '', role: 'student' },
    type: 'project',
    startTime: '2024-12-26T15:00:00',
    endTime: '2024-12-26T17:00:00',
    location: 'Zoom',
    isVirtual: true,
    meetingLink: 'https://zoom.us/j/example2',
    attendees: [
      { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
    ],
    tags: ['Final Project', 'Presentation', 'Feedback'],
  },
];

// ============================================================================
// RESOURCES DATA
// ============================================================================

export const mockResources: SharedResource[] = [
  {
    id: '1',
    title: 'Complete Course Notes - Chapters 1-5',
    description: 'Comprehensive notes covering all key concepts from the first half of the course.',
    type: 'notes',
    fileUrl: '/files/notes-ch1-5.pdf',
    fileName: 'course-notes-ch1-5.pdf',
    fileSize: 2456789,
    uploader: { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
    uploadedAt: '3 days ago',
    downloads: 142,
    votes: 56,
    tags: ['Notes', 'Chapters 1-5', 'Comprehensive'],
    category: 'Study Materials',
  },
  {
    id: '2',
    title: 'Python Code for Problem Set 3',
    description: 'Sample solutions and helper functions for Problem Set 3. Feel free to use as reference!',
    type: 'code',
    fileUrl: '/files/ps3-solutions.py',
    fileName: 'problem-set-3.py',
    fileSize: 15234,
    uploader: { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
    uploadedAt: '1 week ago',
    downloads: 89,
    votes: 34,
    tags: ['Code', 'Problem Set 3', 'Python'],
    category: 'Homework Help',
  },
  {
    id: '3',
    title: 'Quantum Mechanics Explained - Video Series',
    description: 'Link to an excellent YouTube series that breaks down quantum mechanics concepts.',
    type: 'video',
    url: 'https://youtube.com/playlist/example',
    uploader: { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
    uploadedAt: '2 weeks ago',
    downloads: 0,
    votes: 78,
    tags: ['Video', 'Quantum Mechanics', 'External Resource'],
    category: 'Supplementary Materials',
  },
  {
    id: '4',
    title: 'Midterm Cheat Sheet',
    description: 'One-page formula sheet and key concepts for the midterm exam.',
    type: 'document',
    fileUrl: '/files/midterm-cheatsheet.pdf',
    fileName: 'midterm-cheatsheet.pdf',
    fileSize: 456123,
    uploader: { id: '5', name: 'David Kim', avatar: '', role: 'student' },
    uploadedAt: '5 days ago',
    downloads: 234,
    votes: 91,
    tags: ['Cheat Sheet', 'Midterm', 'Formulas'],
    category: 'Exam Prep',
  },
  {
    id: '5',
    title: 'Interactive Physics Simulations',
    description: 'Collection of interactive simulations for visualizing physics concepts.',
    type: 'link',
    url: 'https://phet.colorado.edu/',
    uploader: { id: '4', name: 'Emily Rodriguez', avatar: '', role: 'ta' },
    uploadedAt: '1 month ago',
    downloads: 0,
    votes: 123,
    tags: ['Interactive', 'Simulations', 'Visualization'],
    category: 'Learning Tools',
  },
];

// ============================================================================
// MEMBERS DATA
// ============================================================================

export const mockMembers: CourseMember[] = [
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: '',
    role: 'student',
    bio: 'Physics major interested in quantum mechanics and renewable energy.',
    onlineStatus: 'online',
    joinedAt: '3 months ago',
    stats: {
      discussionPosts: 45,
      helpfulAnswers: 23,
      resourcesShared: 8,
      studyGroupsJoined: 3,
      eventsAttended: 12,
    },
    badges: ['Top Contributor', 'Helpful'],
    interests: ['Quantum Physics', 'Renewable Energy'],
    isFollowing: false,
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: '',
    role: 'student',
    bio: 'Engineering student passionate about problem-solving and coding.',
    onlineStatus: 'online',
    joinedAt: '3 months ago',
    stats: {
      discussionPosts: 38,
      helpfulAnswers: 19,
      resourcesShared: 12,
      studyGroupsJoined: 2,
      eventsAttended: 8,
    },
    badges: ['Code Master', 'Active Member'],
    interests: ['Programming', 'Applied Physics'],
    isFollowing: true,
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    avatar: '',
    role: 'ta',
    bio: 'Teaching Assistant for Physics. Here to help with any questions!',
    onlineStatus: 'online',
    joinedAt: '4 months ago',
    stats: {
      discussionPosts: 120,
      helpfulAnswers: 89,
      resourcesShared: 24,
      studyGroupsJoined: 0,
      eventsAttended: 15,
    },
    badges: ['Teaching Assistant', 'Expert', 'Super Helper'],
    interests: ['Teaching', 'Theoretical Physics'],
    isFollowing: true,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: '',
    role: 'student',
    bio: 'Love organizing study groups and helping classmates succeed!',
    onlineStatus: 'away',
    lastSeen: '15 minutes ago',
    joinedAt: '3 months ago',
    stats: {
      discussionPosts: 52,
      helpfulAnswers: 31,
      resourcesShared: 6,
      studyGroupsJoined: 5,
      eventsAttended: 18,
    },
    badges: ['Study Group Leader', 'Organizer'],
    interests: ['Collaboration', 'Group Learning'],
    isFollowing: false,
  },
  {
    id: '6',
    name: 'Lisa Park',
    avatar: '',
    role: 'student',
    bio: 'Pre-med student taking physics for the challenges and insights.',
    onlineStatus: 'online',
    joinedAt: '2 months ago',
    stats: {
      discussionPosts: 28,
      helpfulAnswers: 14,
      resourcesShared: 15,
      studyGroupsJoined: 2,
      eventsAttended: 6,
    },
    badges: ['Resource Sharer'],
    interests: ['Biophysics', 'Medical Applications'],
    isFollowing: false,
  },
];

// ============================================================================
// NOTIFICATIONS DATA
// ============================================================================

export const mockNotifications: CommunityNotification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message in course chat',
    message: 'Sarah Johnson: "Anyone want to meet up before the exam?"',
    timestamp: '5 minutes ago',
    isRead: false,
    author: { id: '2', name: 'Sarah Johnson', avatar: '', role: 'student' },
  },
  {
    id: '2',
    type: 'discussion',
    title: 'Reply to your discussion',
    message: 'Mike Chen replied to "Understanding Newton\'s Third Law"',
    timestamp: '1 hour ago',
    isRead: false,
    relatedItem: { id: '1', type: 'discussion', title: 'Understanding Newton\'s Third Law' },
    author: { id: '3', name: 'Mike Chen', avatar: '', role: 'student' },
  },
  {
    id: '3',
    type: 'event',
    title: 'Event reminder',
    message: 'Midterm Review Session starts in 2 hours',
    timestamp: '2 hours ago',
    isRead: false,
    relatedItem: { id: '1', type: 'event', title: 'Midterm Review Session' },
  },
  {
    id: '4',
    type: 'group',
    title: 'Study group invitation',
    message: 'David Kim invited you to join "Physics Masters"',
    timestamp: '3 hours ago',
    isRead: true,
    relatedItem: { id: '1', type: 'group', title: 'Physics Masters' },
    author: { id: '5', name: 'David Kim', avatar: '', role: 'student' },
  },
  {
    id: '5',
    type: 'resource',
    title: 'New resource shared',
    message: 'Lisa Park shared "Complete Course Notes - Chapters 1-5"',
    timestamp: '1 day ago',
    isRead: true,
    relatedItem: { id: '1', type: 'resource', title: 'Complete Course Notes - Chapters 1-5' },
    author: { id: '6', name: 'Lisa Park', avatar: '', role: 'student' },
  },
  {
    id: '6',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Emily Rodriguez mentioned you in a discussion',
    timestamp: '2 days ago',
    isRead: true,
    relatedItem: { id: '2', type: 'discussion', title: 'Problem Set 3 - Question 7' },
    author: { id: '4', name: 'Emily Rodriguez', avatar: '', role: 'ta' },
  },
];
