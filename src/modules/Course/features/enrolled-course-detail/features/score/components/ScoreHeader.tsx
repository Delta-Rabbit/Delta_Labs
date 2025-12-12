
import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface ScoreHeaderProps {
  viewMode: 'cards' | 'table';
  onToggleView: () => void;
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ viewMode, onToggleView }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 font-primary">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-900">Score</h1>

      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleView}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mr-4"
        >
          {viewMode === 'cards' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <span className="font-medium">View By Chapters</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="font-medium">View By Cards</span>
            </>
          )}
        </button>
        <DeltaButton 
          variant="secondary" 
          size="lg"
          className="!bg-[#174A5F] !text-white hover:!bg-[#123644] border-none"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Export
          </div>
        </DeltaButton>
      </div>
    </div>
  );
};
