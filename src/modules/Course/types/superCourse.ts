/**
 * Super Course Type Definitions
 */

export interface SuperCourse {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  courseCount: number; // Number of courses combined
  sectionCount: number; // Total sections
  contentCount: number; // Total content items
  status: 'completed' | 'draft' | 'published';
  visibility: 'public' | 'private';
  tags?: string[];
}

