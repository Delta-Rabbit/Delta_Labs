import React from 'react';
import type { Order } from '../types';

interface ConfirmReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onConfirm: () => void;
}

export const ConfirmReceiptModal: React.FC<ConfirmReceiptModalProps> = ({
  isOpen,
  onClose,
  order,
  onConfirm
}) => {
  if (!isOpen || !order) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#E8F4F8] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#174A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Confirm Receipt
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-4">
          Have you received your order for <span className="font-semibold text-gray-900">{order.resource.title}</span>?
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <img 
              src={order.resource.imageUrl} 
              alt={order.resource.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{order.resource.title}</p>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm font-bold text-gray-900">br. {order.totalPrice}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#E8F4F8] border border-[#174A5F]/20 rounded-lg p-3 mb-6">
          <p className="text-xs text-[#174A5F]">
            <span className="font-semibold">Note:</span> By confirming, this item will be added to "My Resources" where you can manage, share, or rent it out.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Not Yet
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-[#174A5F] text-white font-semibold rounded-lg hover:bg-[#123644] transition-colors"
          >
            Yes, I Received It
          </button>
        </div>
      </div>
    </div>
  );
};
