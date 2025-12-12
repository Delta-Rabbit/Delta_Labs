
import React, { useState } from 'react';
import { DeltaCard, DeltaButton } from '../../../../../../../components/theme';
import { ScoreModal } from './ScoreModal';
import { AppealForm } from './AppealForm';

interface TestScore {
  id: string;
  name: string;
  score: string;
  canAppeal: boolean;
  canRetake: boolean;
  status?: string;
}

interface ChapterScore {
  id: string;
  name: string;
  averageScore: string;
  noOfTests: number;
  taken: number;
  tests: TestScore[];
}

const mockChapterScores: ChapterScore[] = [
  { 
    id: '1', 
    name: 'Chapter 1', 
    averageScore: '8/10', 
    noOfTests: 3, 
    taken: 2,
    tests: [
      { id: '1-1', name: 'Introduction to AC', score: 'NA', canAppeal: true, canRetake: false },
      { id: '1-2', name: 'Introduction to AC', score: '8/10', canAppeal: true, canRetake: true },
      { id: '1-3', name: 'Introduction to AC', score: '0/10', canAppeal: false, canRetake: true, status: 'Appeal Rejected' },
    ]
  },
  { 
    id: '2', 
    name: 'Chapter 2', 
    averageScore: '8/10', 
    noOfTests: 3, 
    taken: 2,
    tests: [
        { id: '2-1', name: 'Introduction to AC', score: 'NA', canAppeal: true, canRetake: false },
        { id: '2-2', name: 'Introduction to AC', score: '8/10', canAppeal: true, canRetake: true },
    ]
  },
];

export const ScoreTableView: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleAppealClick = () => {
    setIsAppealModalOpen(true);
  };

  const handleCloseAppeal = () => {
    setIsAppealModalOpen(false);
  };

  return (
    <>
      <div className="font-primary bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold uppercase border-b border-gray-200 bg-white">
              <tr>
                <th scope="col" className="py-4 px-6 w-12"></th>
                <th scope="col" className="py-4 px-6">Chapter</th>
                <th scope="col" className="py-4 px-6">Average Score</th>
                <th scope="col" className="py-4 px-6">No of Tests</th>
                <th scope="col" className="py-4 px-6">Taken</th>
              </tr>
            </thead>
            <tbody>
              {mockChapterScores.map((chapter) => (
                <React.Fragment key={chapter.id}>
                  <tr 
                    className={`border-b border-gray-100 transition-colors cursor-pointer bg-[#E2E8F0] hover:bg-[#d0dbe9]`}
                    onClick={() => toggleRow(chapter.id)}
                  >
                    <td className="py-4 px-6 text-gray-400">
                      <svg 
                          className={`w-4 h-4 transition-transform ${expandedRows.includes(chapter.id) ? 'rotate-180 text-gray-700' : ''}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">{chapter.name}</td>
                    <td className="py-4 px-6 text-gray-500">{chapter.averageScore}</td>
                    <td className="py-4 px-6 text-gray-500">{chapter.noOfTests}</td>
                    <td className="py-4 px-6 text-gray-500">{chapter.taken}</td>
                  </tr>
                  
                  {/* Expanded Row */}
                  {expandedRows.includes(chapter.id) && (
                    <tr className="bg-[#E2E8F0] border-b border-gray-100">
                      <td colSpan={5} className="px-6 pb-6 pt-2">
                        <div className="grid grid-cols-12 text-xs font-bold text-gray-700 uppercase mb-4 px-2">
                          <div className="col-span-4">Test Name</div>
                          <div className="col-span-2">Score</div>
                          <div className="col-span-6"></div>
                        </div>
                        
                        <div className="space-y-3">
                          {chapter.tests.map((test) => (
                            <div key={test.id} className="grid grid-cols-12 items-center px-2">
                              <div className="col-span-4 text-gray-600 font-medium">{test.name}</div>
                              <div className="col-span-2 text-gray-600">{test.score}</div>
                              <div className="col-span-6 flex items-center justify-end gap-3">
                                {test.canRetake ? (
                                  <DeltaButton className="bg-[#174A5F] hover:bg-[#123644] text-white px-4 py-2 rounded-md shadow-sm h-10 w-40 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Re Take Test
                                  </DeltaButton>
                                ) : (
                                  <DeltaButton className="bg-[#174A5F] hover:bg-[#123644] text-white px-4 py-2 rounded-md shadow-sm h-10 w-40 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Take test
                                  </DeltaButton>
                                )}

                                {test.canAppeal && (
                                  <DeltaButton 
                                    className="bg-[#174A5F] hover:bg-[#123644] text-white px-4 py-2 rounded-md shadow-sm h-10 w-40 flex items-center justify-center gap-2"
                                    onClick={handleAppealClick}
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Make appeal
                                  </DeltaButton>
                                )}

                                {test.status === 'Appeal Rejected' && (
                                  <div className="h-10 w-40 flex items-center justify-end font-bold text-red-600">
                                    Appeal Rejected
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ScoreModal
        isOpen={isAppealModalOpen}
        onClose={handleCloseAppeal}
        title="Appeal form"
        maxWidth="max-w-lg"
      >
        <AppealForm 
          onCancel={handleCloseAppeal} 
          onSubmit={handleCloseAppeal} 
        />
      </ScoreModal>
    </>
  );
};
