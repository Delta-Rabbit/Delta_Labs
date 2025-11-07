/**
 * Delta Labs Summarized Info Card Component
 * Sidebar card showing wishlist summary using theme tokens
 */

import React from 'react';
import { DeltaCard, DeltaButton } from '../../../../../components/theme';

interface SummarizedInfoCardProps {
  totalItems: number;
  totalTime: number; // days
  totalBudget: number;
  onViewPlanner?: () => void;
  onViewCart?: () => void;
}

const SummarizedInfoCard: React.FC<SummarizedInfoCardProps> = ({
  totalItems,
  totalTime,
  totalBudget,
  onViewPlanner,
  onViewCart,
}) => {
  return (
    <DeltaCard
      variant="default"
      padding="md"
      shadow="sm"
      className="font-primary"
    >
      <h3 className="text-lg font-bold text-text-primary mb-6 font-primary">
        Summarized info
      </h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center pb-3 border-b border-border-primary">
          <span className="text-sm font-medium text-text-secondary font-primary">
            Total items:
          </span>
          <span className="text-base font-bold text-text-primary font-primary">
            {totalItems}
          </span>
        </div>
        
        <div className="flex justify-between items-center pb-3 border-b border-border-primary">
          <span className="text-sm font-medium text-text-secondary font-primary">
            Total time required:
          </span>
          <span className="text-base font-bold text-text-primary font-primary">
            {totalTime} days
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-secondary font-primary">
            Total budget required:
          </span>
          <span className="text-base font-bold text-text-primary font-primary">
            {totalBudget} Br
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <DeltaButton
          variant="primary"
          size="md"
          onClick={onViewPlanner}
          className="w-full font-primary"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>View planner</span>
          </span>
        </DeltaButton>
        
        <DeltaButton
          variant="outline"
          size="md"
          onClick={onViewCart}
          className="w-full font-primary"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Your cart</span>
          </span>
        </DeltaButton>
      </div>
    </DeltaCard>
  );
};

export default SummarizedInfoCard;

