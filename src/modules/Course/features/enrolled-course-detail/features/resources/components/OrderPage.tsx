import React, { useState } from 'react';
import { OrderTabs, type OrderTab } from './OrderTabs';
import { OrderCard } from './OrderCard';
import { CancelOrderModal } from './CancelOrderModal';
import { OrderTrackingModal } from './OrderTrackingModal';
import { ConfirmReceiptModal } from './ConfirmReceiptModal';
import type { Order } from '../types';
import SearchBar from '../../../../../../../components/SearchBar/SearchBar';

// Assuming OrderType is an alias for OrderTab or a similar type defined elsewhere.
// If OrderType is not defined, this would cause a compilation error.
// For the purpose of making the provided snippet syntactically correct,
// we'll assume OrderType is equivalent to OrderTab in this context.
type OrderType = OrderTab;

interface OrderPageProps {
  onBack: () => void;
  onNavigateToMyResources: () => void;
  initialTab?: OrderType;
}

export const OrderPage: React.FC<OrderPageProps> = ({ onBack, onNavigateToMyResources, initialTab = 'purchase' }) => {
  const [activeTab, setActiveTab] = useState<OrderType>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState<Order | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [selectedOrderForReceipt, setSelectedOrderForReceipt] = useState<Order | null>(null);

  // Mock Orders Data
  const mockOrders: Order[] = [
    {
      id: 'o1',
      resource: {
        id: 'r1',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'purchase',
      status: 'shipped',
      orderDate: new Date('2024-01-15'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160
    },
    {
      id: 'o2',
      resource: {
        id: 'r2',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'purchase',
      status: 'delivered',
      orderDate: new Date('2024-01-10'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160
    },
    {
      id: 'o3',
      resource: {
        id: 'r3',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'rent',
      status: 'processing',
      orderDate: new Date('2024-01-18'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 450
    },
    {
      id: 'o4',
      resource: {
        id: 'r4',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'purchase',
      status: 'pending',
      orderDate: new Date('2024-01-20'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160
    },
    // Financial Aid Orders
    {
      id: 'fa1',
      resource: {
        id: 'r5',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'financial_aid',
      status: 'pending',
      orderDate: new Date('2024-01-21'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160,
      sponsorName: 'Dr. Sarah Johnson'
    },
    {
      id: 'fa2',
      resource: {
        id: 'r6',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'financial_aid',
      status: 'rejected',
      orderDate: new Date('2024-01-19'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160,
      sponsorName: 'Tech Foundation'
    },
    {
      id: 'fa3',
      resource: {
        id: 'r7',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'financial_aid',
      status: 'pending',
      orderDate: new Date('2024-01-22'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160,
      sponsorName: 'Education First Initiative'
    },
    {
      id: 'fa4',
      resource: {
        id: 'r8',
        title: 'IPS LCD Gaming Monitor',
        seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        price: 1160,
        rating: 5,
        ratingCount: 65,
        location: 'Addis Ababa',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badges: [{ label: 'Necessary', color: 'green' }],
        type: 'resource'
      },
      type: 'financial_aid',
      status: 'approved',
      orderDate: new Date('2024-01-17'),
      deliveryLocation: {
        lat: 9.0320,
        lng: 38.7469,
        address: 'Addis Ababa University, Main Campus'
      },
      quantity: 1,
      totalPrice: 1160,
      sponsorName: 'Global Education Fund'
    }
  ];

  // Filter orders by active tab and search query
  const filteredOrders = mockOrders.filter(order => {
    // Filter by tab
    if (activeTab === 'purchase' && order.type !== 'purchase') return false;
    if (activeTab === 'rent' && order.type !== 'rent') return false;
    if (activeTab === 'financial_aid' && order.type !== 'financial_aid') return false;
    if (activeTab === 'rejected' && order.type !== 'rejected') return false;

    // Filter by search
    if (searchQuery && !order.resource.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleShowOnMap = (order: Order) => {
    setSelectedOrderForTracking(order);
  };

  const handleCancelOrder = (order: Order) => {
    setSelectedOrderForCancel(order);
  };

  const handleConfirmCancel = () => {
    console.log('Order cancelled:', selectedOrderForCancel?.id);
    // TODO: Update order status to cancelled in backend
  };

  const handleOrderReceived = (order: Order) => {
    setSelectedOrderForReceipt(order);
  };

  const handleConfirmReceipt = () => {
    console.log('Order receipt confirmed:', selectedOrderForReceipt?.id);
    // Navigate to My Resources first
    onNavigateToMyResources();
    // Then close the modal (slight delay to ensure navigation happens)
    setTimeout(() => {
      setSelectedOrderForReceipt(null);
    }, 100);
  };

  return (
    <div className="w-full font-primary relative py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Order</h1>
        
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

      {/* Tabs */}
      <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery 
              ? 'Try adjusting your search query' 
              : `You don't have any ${activeTab === 'purchase' ? 'purchase' : activeTab === 'rent' ? 'rental' : activeTab === 'financial_aid' ? 'financial aid' : 'rejected'} orders yet`
            }
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#174A5F] text-white font-medium rounded hover:bg-[#123644] transition-colors"
          >
            Browse Resources
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onShowOnMap={() => handleShowOnMap(order)}
              onCancelOrder={() => handleCancelOrder(order)}
              onOrderReceived={() => handleOrderReceived(order)}
            />
          ))}
        </div>
      )}

      {/* Cancel Order Modal */}
      <CancelOrderModal
        isOpen={!!selectedOrderForCancel}
        onClose={() => setSelectedOrderForCancel(null)}
        order={selectedOrderForCancel}
        onConfirm={handleConfirmCancel}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={!!selectedOrderForTracking}
        onClose={() => setSelectedOrderForTracking(null)}
        order={selectedOrderForTracking}
      />

      {/* Confirm Receipt Modal */}
      <ConfirmReceiptModal
        isOpen={!!selectedOrderForReceipt}
        onClose={() => setSelectedOrderForReceipt(null)}
        order={selectedOrderForReceipt}
        onConfirm={handleConfirmReceipt}
      />
    </div>
  );
};
