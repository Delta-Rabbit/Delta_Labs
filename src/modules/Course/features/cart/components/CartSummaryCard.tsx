/**
 * Delta Labs Cart Summary Card Component
 * Sidebar card showing cart summary using theme tokens
 */

import React from 'react';
import { DeltaCard, DeltaButton } from '../../../../../components/theme';

interface CartSummaryCardProps {
  totalItems: number;
  totalTime: number; // days
  totalBudget: number;
  onGoToPayment?: () => void;
}

const CartSummaryCard: React.FC<CartSummaryCardProps> = ({
  totalItems,
  totalTime,
  totalBudget,
  onGoToPayment,
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
      
      <DeltaButton
        variant="primary"
        size="md"
        onClick={onGoToPayment}
        className="w-full font-primary"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Go to Payment</span>
        </span>
      </DeltaButton>
    </DeltaCard>
  );
};

export default CartSummaryCard;

