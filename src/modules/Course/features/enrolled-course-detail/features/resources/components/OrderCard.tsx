import React from 'react';
import type { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onShowOnMap: () => void;
  onCancelOrder: () => void;
  onOrderReceived: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onShowOnMap,
  onCancelOrder,
  onOrderReceived
}) => {
  const { resource, status, type } = order;

  // Get status banner config
  const getStatusConfig = () => {
    if (type === 'financial_aid') {
      if (status === 'pending') {
        return { label: 'Requested', bgColor: 'bg-orange-500', textColor: 'text-white' };
      } else if (status === 'rejected') {
        return { label: 'Rejected', bgColor: 'bg-red-600', textColor: 'text-white' };
      } else if (status === 'approved') {
        return { label: 'Approved', bgColor: 'bg-green-600', textColor: 'text-white' };
      }
    }
    return null;
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={resource.imageUrl} 
          alt={resource.title} 
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Status Banner (for financial aid) */}
      {statusConfig && (
        <div className={`${statusConfig.bgColor} ${statusConfig.textColor} py-2 px-4 text-center font-semibold text-sm`}>
          {statusConfig.label}
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem]">
          {resource.title}
        </h3>

        {/* Seller Info */}
        <div className="flex items-center gap-2">
          <img 
            src={resource.seller.logo} 
            alt={resource.seller.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-gray-600 truncate">{resource.seller.name}</span>
        </div>

        {/* Price */}
        <p className="text-sm font-bold text-gray-900">br. {resource.price}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-600 ml-1">({resource.ratingCount})</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{resource.location}</span>
        </div>

        {/* Action Buttons - Only show for non-financial-aid or if needed */}
        {type !== 'financial_aid' && (
          <div className="space-y-2 pt-2">
            <button
              onClick={onShowOnMap}
              className="w-full py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:border-[#174A5F] hover:text-[#174A5F] transition-colors"
            >
              Show on map
            </button>
            
            {status === 'shipped' && (
              <button
                onClick={onOrderReceived}
                className="w-full py-2 bg-[#174A5F] text-white rounded text-sm font-medium hover:bg-[#123644] transition-colors"
              >
                Confirm Receipt
              </button>
            )}
            
            {status !== 'delivered' && status !== 'cancelled' && (
              <button
                onClick={onCancelOrder}
                className="w-full py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-500 transition-colors"
              >
                Cancel Order
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
