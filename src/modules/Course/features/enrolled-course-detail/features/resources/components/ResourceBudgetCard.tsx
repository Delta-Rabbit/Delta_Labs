
import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface ResourceBudgetCardProps {
  totalPrice: number;
  itemCount: number;
  onFindSponsor?: () => void;
}

export const ResourceBudgetCard: React.FC<ResourceBudgetCardProps> = ({ totalPrice, itemCount, onFindSponsor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-72 transition-all hover:shadow-md">
      <div className="flex flex-col gap-4">
        {/* Price Section */}
        <div>
           <div className="flex items-center justify-between mb-1">
             <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Est. Cost</span>
             <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {itemCount} Items
             </span>
           </div>
           <div className="text-3xl font-bold text-gray-900 font-primary">
             <span className="text-lg text-gray-400 font-normal mr-1">br.</span>
             {totalPrice.toLocaleString()}
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
            <DeltaButton 
                variant="primary" 
                className="w-full bg-[#174A5F] hover:bg-[#123644] text-white justify-center h-10 text-sm"
            >
                Buy All Resources
            </DeltaButton>
            
            <button 
              onClick={onFindSponsor}
              className="w-full border border-gray-200 hover:border-[#174A5F] hover:text-[#174A5F] text-gray-600 bg-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
               <span>Find Sponsor</span>
            </button>
        </div>
      </div>
    </div>
  );
};
