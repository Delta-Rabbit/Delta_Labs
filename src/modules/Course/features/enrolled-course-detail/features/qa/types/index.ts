export type QATab = 'my-questions' | 'my-answers' | 'faqs';
export type NetworkTab = 'my-questions' | 'community-questions' | 'school';
export type QAView = 'qa' | 'bookmarks' | 'notifications' | 'community-wiki' | 'live' | 'network' | 'payment';
export type AskQuestionStep = 1 | 2;
export type Audience = 'school' | 'person';
export type QuestionPayment = 'free' | 'paid';
export type NotificationType = 'answer' | 'mention' | 'course-update' | 'reply' | 'like' | 'follow';
export type LiveSessionStatus = 'roadmap' | 'live' | 'scheduled';
export type LiveSessionAction = 'live' | 'join';
export type InvitationType = 'invited' | 'invited-by';

export interface Author {
  name: string;
  avatar: string;
}

export interface Answer {
  id: string;
  content: string;
  votes: number;
  author: Author;
  editedAt?: string;
  answeredAt?: string;
  commentCount?: number;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: Author;
  askedDate: string;
  answerCount: number;
  views: number;
  isClosed: boolean;
  isBookmarked: boolean;
  userAnswer?: Answer;
  answers?: Answer[];
}

export interface BookmarkedQuestion {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: Author;
  askedDate: string;
  answerCount: number;
  views: number;
  isClosed: boolean;
  isPaid: boolean;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedItem?: {
    id: string;
    title?: string;
    courseName?: string;
  };
  author?: Author;
}

export interface WikiTopic {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: Author;
  askedDate: string;
  answerCount: number;
  views: number;
  isPaid: boolean;
  isBookmarked: boolean;
}

export interface LiveSession {
  id: string;
  title: string;
  host: Author;
  invitationType: InvitationType;
  status: LiveSessionStatus;
  action: LiveSessionAction;
  viewers: number;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  author: string;
  message: string;
  timestamp: string;
}
