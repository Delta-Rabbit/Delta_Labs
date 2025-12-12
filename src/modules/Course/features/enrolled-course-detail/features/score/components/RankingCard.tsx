import React, { useState } from 'react';
import { DeltaCard } from '../../../../../../../components/theme';
import type { Student } from '../types/score.types';
import { ScoreModal } from './ScoreModal';

interface RankingCardProps {
  students: Student[];
  className?: string;
}

export const RankingCard: React.FC<RankingCardProps> = ({ students, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reusable table content
  const TableContent = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 font-bold uppercase border-b border-gray-200">
          <tr>
            <th scope="col" className="py-2 px-4">Student</th>
            <th scope="col" className="py-2 px-4">Ranking</th>
            <th scope="col" className="py-2 px-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr 
              key={student.id} 
              className={`border-b border-gray-100 last:border-0 transition-colors ${
                student.isCurrentUser ? 'bg-[#174A5F] text-white' : 'hover:bg-gray-50/50'
              }`}
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <span className={`font-medium ${student.isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                    {student.name}
                  </span>
                </div>
              </td>
              <td className={`py-3 px-4 ${student.isCurrentUser ? 'text-white' : 'text-gray-500'}`}>
                {student.rank}
              </td>
              <td className={`py-3 px-4 text-right ${student.isCurrentUser ? 'text-white' : 'text-gray-500'}`}>
                {student.score}
              </td>
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
          <h2 className="text-lg font-bold text-gray-900">Community Ranking</h2>
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
        title="Community Ranking"
        headerAction={
          <button className="text-sm font-bold text-[#174A5F] hover:underline underline-offset-4 pointer-events-auto">
            Find Me
          </button>
        }
      >
        <TableContent />
      </ScoreModal>
    </>
  );
};
