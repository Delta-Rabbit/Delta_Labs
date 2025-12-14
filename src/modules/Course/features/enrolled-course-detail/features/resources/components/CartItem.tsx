import React from 'react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const { resource, quantity } = item;

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg mb-3">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <img 
          src={resource.imageUrl} 
          alt={resource.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 mb-1 truncate">{resource.title}</h3>
        <div className="text-xs text-gray-500 mb-1">
          75% battery life
        </div>
        <div className="text-xs text-gray-500 mb-2">
          2 items left
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.round(resource.rating))}
          </div>
          <span className="text-xs text-gray-400">({resource.ratingCount})</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="w-8 text-center text-sm font-medium border-0 focus:outline-none"
        />
        <button
          onClick={handleIncrement}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
        >
          +
        </button>
      </div>

      {/* Price */}
      <div className="text-sm font-medium text-gray-900 w-20 text-right">
        {resource.price}br
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="flex items-center gap-2 px-4 py-2 bg-[#174A5F] text-white text-sm font-medium rounded hover:bg-[#123644] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Remove from Cart
      </button>
    </div>
  );
};
