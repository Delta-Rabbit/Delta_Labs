
import React from 'react';
import { DeltaCard } from '../../../../../../../components/theme';
import type { ScoreProgressStats } from '../types/score.types';

interface ProgressCardProps {
  stats: ScoreProgressStats;
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ stats, className }) => {
  // Calculate circle properties
  const radius = 60;
  const stroke = 12; // Thick width as per design
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (stats.percentage / 100) * circumference;

  return (
    <DeltaCard className={`p-5 font-primary border border-gray-200 shadow-sm ${className || ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-bold text-gray-900">Progress</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-6 mb-6">
        {/* Circle Progress */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            height={radius * 2 + stroke * 2} // 144px total
            width={radius * 2 + stroke * 2}
            className="transform -rotate-90"
            style={{ width: '100%', height: '100%' }}
            viewBox={`0 0 ${radius * 2 + stroke * 2} ${radius * 2 + stroke * 2}`}
          >
            <circle
              stroke="#e5e7eb"
              strokeWidth={stroke}
              fill="transparent"
              r={normalizedRadius}
              cx={radius + stroke}
              cy={radius + stroke}
            />
            <circle
              stroke="#134E4A" // Dark Teal color
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              fill="transparent"
              r={normalizedRadius}
              cx={radius + stroke}
              cy={radius + stroke}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900">{stats.percentage}%</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Hours Logged */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-gray-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base">Hours</span>
                <span className="text-[10px] text-gray-500">Logged</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-[#174A5F]">{stats.hoursLogged}</span>
                <div className="flex items-center text-[10px] text-green-600 font-medium">
                  {stats.hoursLoggedTrend}% 
                  <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
            </div>
          </div>

          {/* Spot Ranking */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
              <div className="text-gray-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base">Spot</span>
                <span className="text-[10px] text-gray-500">In the ranking</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-[#174A5F]">{stats.rank}</span>
                 <div className="flex items-center text-[10px] text-green-600 font-medium">
                  {stats.rankTrend}
                  <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
            </div>
          </div>

           {/* Score */}
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
              <div className="text-gray-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-base">Score</span>
                <span className="text-[10px] text-gray-500">In the ranking</span>
              </div>
            </div>
             <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-[#174A5F]">{stats.score}</span>
                 <div className="flex items-center text-[10px] text-green-600 font-medium">
                  {stats.scoreTrend}
                  <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 text-xs text-gray-600">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>Based on your Progress You will complete this course 6 days ahead of time</p>
      </div>
    </DeltaCard>
  );
};
