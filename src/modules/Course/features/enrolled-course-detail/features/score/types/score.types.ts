
export interface GradeItem {
  id: string;
  type: string;
  weight: number;
  grade: number;
  weightedGrade: number;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  score: number;
  isCurrentUser?: boolean;
}

export interface ChartData {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

export interface ScoreProgressStats {
  percentage: number;
  hoursLogged: string;
  hoursLoggedTrend: number; // percentage trend
  hoursLoggedUp: boolean;
  rank: number;
  rankTrend: number;
  rankUp: boolean;
  score: number;
  scoreTrend: number;
  scoreUp: boolean;
}
