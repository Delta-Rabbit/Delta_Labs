import React, { useEffect, useRef } from 'react';
import type { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !order || !order.deliveryLocation) return;
    const { lat, lng } = order.deliveryLocation;
    console.log('Map coordinates:', lat, lng);
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const deliveryLocation = order.deliveryLocation;

  // Get tracking stages based on order status
  const getTrackingStages = () => {
    const stages = [
      { 
        id: 'picking', 
        label: 'Order Picking', 
        icon: '🔄',
        time: '3 mins',
        completed: true,
        active: order.status === 'processing'
      },
      { 
        id: 'on_way', 
        label: 'On the way', 
        icon: '✈️',
        time: '10 mins',
        completed: order.status === 'shipped' || order.status === 'delivered',
        active: order.status === 'shipped'
      },
      { 
        id: 'delivered', 
        label: 'Delivered', 
        icon: '📍',
        time: '',
        completed: order.status === 'delivered',
        active: order.status === 'delivered'
      }
    ];
    return stages;
  };

  const trackingStages = getTrackingStages();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full h-[600px] overflow-hidden shadow-2xl flex">
        
        {/* Left Side - Map */}
        <div className="w-1/2 relative bg-gray-100">
          {/* Map Container */}
          <div className="absolute inset-0">
            {deliveryLocation ? (
              <>
                {/* Simulated Map Background */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {/* Grid pattern to simulate streets */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="2"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Route Path */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                    {/* Dashed route line */}
                    <path 
                      d="M 100 120 L 180 180 L 250 220 L 200 320" 
                      stroke="#174A5F" 
                      strokeWidth="3" 
                      strokeDasharray="10,5" 
                      fill="none"
                      className="animate-pulse"
                    />
                    {/* Solid completed route */}
                    <path 
                      d="M 100 120 L 180 180" 
                      stroke="#174A5F" 
                      strokeWidth="4" 
                      fill="none"
                    />
                  </svg>

                  {/* Start Point (Warehouse/Store) */}
                  <div className="absolute top-[30%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-[#174A5F] rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  {/* Current Location (Delivery Vehicle) */}
                  <div className="absolute top-[45%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      {/* Pulsing circle */}
                      <div className="absolute inset-0 w-8 h-8 bg-[#174A5F] rounded-full opacity-20 animate-ping"></div>
                      {/* Vehicle icon */}
                      <div className="relative w-8 h-8 bg-[#174A5F] rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* End Point (Delivery Location) */}
                  <div className="absolute top-[80%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                </div>

                {/* Order Tracking Title Overlay */}
                <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900">Order Tracking</h3>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No delivery location available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Tracking Timeline */}
        <div className="w-1/2 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Order #{order.id}</h3>
              <p className="text-sm text-gray-600 mt-1">{order.resource.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tracking Timeline */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="space-y-6">
              {trackingStages.map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    stage.completed ? 'bg-[#174A5F]' : 'bg-gray-400'
                  } shadow-md`}>
                    {stage.id === 'picking' && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                    {stage.id === 'on_way' && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                    {stage.id === 'delivered' && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold ${stage.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {stage.label}
                      </h4>
                      {stage.time && (
                        <span className="text-sm text-gray-500">
                          Estimated time: <span className="font-medium">{stage.time}</span>
                        </span>
                      )}
                    </div>
                    {stage.active && (
                      <p className="text-sm text-[#174A5F] mt-1 font-medium">In Progress...</p>
                    )}
                  </div>

                  {/* Connecting Line */}
                  {index < trackingStages.length - 1 && (
                    <div className="absolute left-[50px] mt-12 w-0.5 h-6 bg-gray-300" style={{ marginLeft: '-26px' }}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            {deliveryLocation && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#174A5F] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-medium text-gray-900 mt-1">{deliveryLocation.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

