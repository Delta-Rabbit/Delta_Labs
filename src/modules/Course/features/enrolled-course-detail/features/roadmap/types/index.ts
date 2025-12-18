/**
 * Delta Labs Roadmap Feature - Type Definitions
 */

export interface RoadmapSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'completed' | 'current' | 'upcoming';
  position: 'left' | 'right';
}

export interface RoadmapData {
  courseTitle: string;
  progress: number;
  progressText: string;
  sections: RoadmapSection[];
}

export type RoadmapView = 'home' | 'user' | 'users' | 'roadmap';
