
import React from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface AppealFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export const AppealForm: React.FC<AppealFormProps> = ({ onCancel, onSubmit }) => {
  return (
    <div className="space-y-6 font-primary">
      {/* Student Information */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-900">
          Student Information <span className="text-orange-500">*</span>
        </label>
        <input 
          type="text" 
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#174A5F] focus:border-[#174A5F]"
        />
      </div>

      {/* Supporting Evidence */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-900">
          Supporting Evidence <span className="text-normal font-normal text-gray-900">(Optional)</span>
        </label>
        <div className="relative">
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#174A5F] focus:border-[#174A5F]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desired Outcome */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-900">
          Desired Outcome <span className="text-orange-500">*</span>
        </label>
        <input 
          type="text" 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#174A5F] focus:border-[#174A5F]"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <DeltaButton 
          variant="secondary" 
          className="flex-1 h-12 border-gray-300 text-[#174A5F] font-medium hover:bg-gray-50"
          onClick={onCancel}
        >
          Cancel
        </DeltaButton>
        <DeltaButton 
          className="flex-1 h-12 bg-[#174A5F] hover:bg-[#123644] text-white font-medium shadow-none"
          onClick={onSubmit}
        >
          Done
        </DeltaButton>
      </div>
    </div>
  );
};
