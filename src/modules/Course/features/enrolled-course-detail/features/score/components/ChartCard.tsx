
import React from 'react';
import { DeltaCard, DeltaDropdown } from '../../../../../../../components/theme';
import type { ChartData } from '../types/score.types';

interface ChartCardProps {
  data: ChartData[];
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ data, className }) => {
  return (
    <DeltaCard className={`p-5 font-primary border border-gray-200 flex flex-col shadow-sm ${className || ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Graphical Process Representation</h2>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Activity</span>
             <span className="text-[10px] text-gray-400">400</span>
        </div>
        
        <div className="flex items-center gap-2">
           <span className="text-xs font-medium text-[#174A5F]">Bar Chart</span>
           <svg className="w-3 h-3 text-[#174A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
           </svg>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Y Axis Labels (Simple) */}
        <div className="flex flex-col justify-between text-[10px] text-gray-400 h-48 py-2">
             <span>300</span>
             <span>200</span>
             <span>100</span>
             <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex items-end justify-around h-48 gap-3 px-2 pb-2 border-l border-b border-gray-200">
           {data.map((item, index) => {
             const heightPercent = (item.value / item.maxValue) * 100; // Relative to max possible
             // Normalizing for visual representation based on design where 400 seems to be top of Y axis but bars go higher visually?
             // Design shows bars in containers. 
             // Let's approximate the visual style: capsule container, filled bottom part.
             
             return (
               <div key={index} className="flex flex-col items-center gap-1 h-full justify-end group w-12">
                 {/* Bar container */}
                 <div className="relative w-8 h-full bg-gray-50 rounded-full overflow-hidden flex items-end">
                    <div 
                      className={`w-full rounded-full ${item.color} transition-all duration-700 ease-out`}
                      style={{ height: `${heightPercent}%` }}
                    />
                 </div>
                 <span className="text-[10px] text-gray-500 text-center">{item.label}</span>
               </div>
             );
           })}
        </div>

        {/* Legend */}
        <div className="flex flex-col justify-center gap-4 min-w-[100px]">
           <h3 className="text-xs font-medium text-gray-900 mb-1">Legend</h3>
           {data.map((item, index) => (
             <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                   <span className="text-[10px] text-gray-600">{item.label}</span>
                </div>
                <div className="text-[10px] text-gray-400">
                   <span className="text-gray-900 font-medium">{item.value}</span>/{item.maxValue}
                </div>
             </div>
           ))}
        </div>
      </div>
    </DeltaCard>
  );
};
