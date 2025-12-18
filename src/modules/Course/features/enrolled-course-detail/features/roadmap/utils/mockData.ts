/**
 * Delta Labs Roadmap Feature - Mock Data
 */

import type { RoadmapData } from '../types';

export const mockRoadmapData: RoadmapData = {
  courseTitle: 'Physics Roadmap',
  progress: 5,
  progressText: 'Progress According to physics roadmap',
  sections: [
    {
      id: 'section-1',
      title: 'Section 1',
      description: 'The backroad task is attached as a file .doc Please read it carefully and follow the instru...',
      tags: ['#biology', '#biology'],
      status: 'completed',
      position: 'left',
    },
    {
      id: 'section-2',
      title: 'Section 2',
      description: 'The backroad task is attached as a file .doc Please read it carefully and follow the instru...',
      tags: ['#biology', '#biology'],
      status: 'current',
      position: 'right',
    },
    {
      id: 'section-3',
      title: 'Section 3',
      description: 'The backroad task is attached as a file .doc Please read it carefully and follow the instru...',
      tags: ['#biology', '#biology'],
      status: 'upcoming',
      position: 'left',
    },
  ],
};
