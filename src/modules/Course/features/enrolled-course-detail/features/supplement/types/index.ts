export type SupplementType = 'books' | 'documentations' | 'slides' | 'youtube' | 'generated';

export interface Author {
  name: string;
  avatar: string;
}

export interface SupplementResource {
  id: string;
  type: SupplementType;
  title: string;
  author: Author;
  coverUrl: string;
  rating: number; // 0-5
  chapter: string;
  isRead?: boolean;
  bookmarked?: boolean;
}
