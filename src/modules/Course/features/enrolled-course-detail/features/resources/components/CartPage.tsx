import React from 'react';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { useCart } from '../hooks/useCart';
import SearchBar from '../../../../../../../components/SearchBar/SearchBar';

interface CartPageProps {
  onBack: () => void;
  onFindSponsor: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onBack, onFindSponsor }) => {
  const { cartItems, updateQuantity, removeFromCart, totalQuantity, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleContinueToPayment = () => {
    console.log('Continue to payment');
    // TODO: Implement payment flow
  };

  const handleFindSponsor = () => {
    onFindSponsor();
  };

  const handleGroupPurchase = () => {
    console.log('Group purchase');
    // TODO: Implement group purchase flow
  };

  return (
    <div className="w-full font-primary relative py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cart</h1>
          
          {/* Search Bar */}
          <div className="w-[480px]">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search"
              maxWidth="full"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items - Left Column (8 cols) */}
          <div className="lg:col-span-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">My Cart</h2>
            
            {cartItems.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add items from the marketplace to get started</p>
                <button
                  onClick={onBack}
                  className="px-6 py-2 bg-[#174A5F] text-white font-medium rounded hover:bg-[#123644] transition-colors"
                >
                  Browse Resources
                </button>
              </div>
            ) : (
              <div>
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary - Right Column (4 cols) */}
          <div className="lg:col-span-4">
            {cartItems.length > 0 && (
              <CartSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
                onContinueToPayment={handleContinueToPayment}
                onFindSponsor={handleFindSponsor}
                onGroupPurchase={handleGroupPurchase}
              />
            )}
          </div>
        </div>
      </div>
  );
};
