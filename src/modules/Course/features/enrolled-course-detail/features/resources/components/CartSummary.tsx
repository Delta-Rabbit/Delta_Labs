import React from 'react';

interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
  onContinueToPayment: () => void;
  onFindSponsor: () => void;
  onGroupPurchase: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalQuantity,
  totalPrice,
  onContinueToPayment,
  onFindSponsor,
  onGroupPurchase
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
      {/* Summary Info */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Product Quantity</span>
          <span className="text-gray-900 font-bold text-lg">{totalQuantity}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Product total</span>
          <span className="text-gray-900 font-bold text-lg">{totalPrice.toLocaleString()} ETB</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onContinueToPayment}
          className="w-full py-3 bg-[#174A5F] text-white font-bold text-sm rounded hover:bg-[#123644] transition-colors uppercase tracking-wide"
        >
          CONTINUE TO PAYMENT
        </button>
        
        <button
          onClick={onFindSponsor}
          className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold text-sm rounded hover:border-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-wide"
        >
          FIND SPONSOR
        </button>
        
        <button
          onClick={onGroupPurchase}
          className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold text-sm rounded hover:border-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-wide"
        >
          GROUP PURCHASE
        </button>
      </div>
    </div>
  );
};
