
import React, { useState } from 'react';
import { DeltaCard } from '../../../../../../../components/theme';
import type { GradeItem } from '../types/score.types';
import { ScoreModal } from './ScoreModal';

interface GradeSummaryCardProps {
  grades: GradeItem[];
  className?: string;
}

export const GradeSummaryCard: React.FC<GradeSummaryCardProps> = ({ grades, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reusable table content
  const TableContent = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 font-bold uppercase border-b border-gray-200">
          <tr>
            <th scope="col" className="py-2 pr-4">Assignment type</th>
            <th scope="col" className="py-2 px-4 text-center">Weight</th>
            <th scope="col" className="py-2 px-4 text-center">Grade</th>
            <th scope="col" className="py-2 pl-4 text-right">Weighted-Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
              <td className="py-3 pr-4 font-medium text-gray-900">{grade.type}</td>
              <td className="py-3 px-4 text-center text-gray-500">{grade.weight}%</td>
              <td className="py-3 px-4 text-center text-gray-500">{grade.grade}%</td>
              <td className="py-3 pl-4 text-right text-gray-500">{grade.weightedGrade}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <DeltaCard className={`p-5 font-primary border border-gray-200 shadow-sm ${className || ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Grade Summary</h2>
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

        <TableContent />
      </DeltaCard>

      <ScoreModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Grade Summary"
      >
        <TableContent />
      </ScoreModal>
    </>
  );
};
