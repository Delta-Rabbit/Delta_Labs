
/**
 * Delta Labs Score Page
 * Student scores, grades, and performance tracking dashboard
 */

import React, { useState } from 'react';
import { ScoreHeader } from './components/ScoreHeader';
import { ScoreTableView } from './components/ScoreTableView';
import { ProgressCard } from './components/ProgressCard';
import { GradeSummaryCard } from './components/GradeSummaryCard';
import { RankingCard } from './components/RankingCard';
import { ChartCard } from './components/ChartCard';
import { 
  mockProgressStats, 
  mockGrades, 
  mockRanking, 
  mockChartData 
} from './utils/mockData';

const ScorePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  return (
    <div className="w-full max-w-[1400px] mx-auto p-8 font-primary">
      <ScoreHeader 
        viewMode={viewMode} 
        onToggleView={() => setViewMode(prev => prev === 'cards' ? 'table' : 'cards')} 
      />
      
      {viewMode === 'table' ? (
        <ScoreTableView />
      ) : (
        <div className="space-y-6">
        {/* Top Row: Grade Summary & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8">
            <GradeSummaryCard grades={mockGrades} className="h-full" />
          </div>
          <div className="lg:col-span-4">
            <ProgressCard stats={mockProgressStats} className="h-full flex flex-col justify-between" />
          </div>
        </div>

        {/* Bottom Row: Chart & Ranking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8">
            <ChartCard data={mockChartData} className="h-full" />
          </div>
          <div className="lg:col-span-4">
            <RankingCard students={mockRanking} className="h-full" />
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ScorePage;
