
import React from 'react';
import { DeltaCard } from '../../../../../../../components/theme';
import type { Student } from '../types/score.types';

interface RankingCardProps {
  students: Student[];
  className?: string;
}

export const RankingCard: React.FC<RankingCardProps> = ({ students, className }) => {
  return (
    <DeltaCard className={`p-5 font-primary border border-gray-200 shadow-sm ${className || ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Community Ranking</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

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
    </DeltaCard>
  );
};
