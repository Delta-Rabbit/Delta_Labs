
import type { GradeItem, Student, ChartData, ScoreProgressStats } from '../types/score.types';

export const mockProgressStats: ScoreProgressStats = {
  percentage: 80,
  hoursLogged: '14:20',
  hoursLoggedTrend: 8,
  hoursLoggedUp: true,
  rank: 100,
  rankTrend: 10,
  rankUp: true,
  score: 150,
  scoreTrend: 30,
  scoreUp: true,
};

export const mockGrades: GradeItem[] = [
  { id: '1', type: 'Lab', weight: 0, grade: 0, weightedGrade: 0 },
  { id: '2', type: 'Graded Test', weight: 90, grade: 0, weightedGrade: 0 },
  { id: '3', type: 'Exercise', weight: 10, grade: 0, weightedGrade: 0 },
  { id: '4', type: 'Exercise', weight: 10, grade: 0, weightedGrade: 0 },
  { id: '5', type: 'Exercise', weight: 10, grade: 0, weightedGrade: 0 },
];

export const mockRanking: Student[] = [
  { id: '1', name: 'Abebe Kebede', avatar: 'https://i.pravatar.cc/150?u=1', rank: 98, score: 120 },
  { id: '2', name: 'Abebe Kebede', avatar: 'https://i.pravatar.cc/150?u=2', rank: 99, score: 120 },
  { id: '3', name: 'Abebe Kebede', avatar: 'https://i.pravatar.cc/150?u=3', rank: 100, score: 120, isCurrentUser: true },
  { id: '4', name: 'Abebe Kebede', avatar: 'https://i.pravatar.cc/150?u=4', rank: 101, score: 120 },
  { id: '5', name: 'Abebe Kebede', avatar: 'https://i.pravatar.cc/150?u=5', rank: 102, score: 120 },
];

export const mockChartData: ChartData[] = [
  { label: 'Multiple choice', value: 300, maxValue: 500, color: 'bg-blue-500' },
  { label: 'True/ False', value: 250, maxValue: 500, color: 'bg-lime-500' },
  { label: 'Matching', value: 280, maxValue: 200, color: 'bg-orange-400' }, 
];
