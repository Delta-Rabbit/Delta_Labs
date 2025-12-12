/**
 * Delta Labs Fast Summary - Type Definitions
 * TypeScript types and interfaces for the Fast Summary feature
 */

// Tab types for top navigation
export type SummaryTab = 'saved' | 'my-summaries' | 'school' | 'community';

// Sidebar view types
export type SidebarView = 'list' | 'create' | 'exercise';

// Summary data structure
export interface Summary {
  id: string;
  title: string;
  description: string;
  university: {
    name: string;
    avatar: string;
  };
  tags: string[];
  readTime: string;
  visibility: 'public' | 'private';
  courseType: string;
  isBookmarked?: boolean;
}

// Reminder data structure
export interface Reminder {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  title: string;
  timestamp?: string;
}

// Exercise data structure
export interface Exercise {
  id: string;
  title: string;
  topic: string;
  date: string;
  questionsCount: number;
  // Extended properties for Grid Card
  thumbnail?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  institution?: string;
  duration?: number;
  questionType?: string;
  attempts?: number;
  questionCount?: number; // Alias for questionsCount to match common usage
}

// Props for main page
export interface FastSummaryPageProps {
  // Future props if needed
}

// View component props
export interface SavedViewProps {
  summaries: Summary[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSummaryClick: (id: string) => void;
}

export interface MySummariesViewProps {
  summaries: Summary[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSummaryClick: (id: string) => void;
}

export interface SchoolViewProps {
  summaries: Summary[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSummaryClick: (id: string) => void;
}

export interface CommunityViewProps {
  summaries: Summary[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSummaryClick: (id: string) => void;
}

export interface HistoryViewProps {
  summaries: Summary[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSummaryClick: (id: string) => void;
}
