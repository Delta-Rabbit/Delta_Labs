/**
 * RentResourcesPage Component
 * Displays resources available for rent with tabs for Resources, On Hand, and Rent History
 */

import React, { useState } from 'react';
import type { ResourceItem } from '../types';
import SearchBar from '../../../../../../../components/SearchBar/SearchBar';
import { RentProductDetailPage } from './RentProductDetailPage';

interface RentResourcesPageProps {
  onBack: () => void;
  onNavigateToRentOrders: () => void;
}

type RentTab = 'resources' | 'on_hand' | 'rent_history';

export const RentResourcesPage: React.FC<RentResourcesPageProps> = ({ onBack, onNavigateToRentOrders }) => {
  const [activeTab, setActiveTab] = useState<RentTab>('resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const tabs: { id: RentTab; label: string }[] = [
    { id: 'resources', label: 'Resources' },
    { id: 'on_hand', label: 'On Hand' },
    { id: 'rent_history', label: 'Rent History' }
  ];

  // Mock resources for rent
  const mockRentResources: ResourceItem[] = [
    {
      id: 'rent1',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Addis Ababa University', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop' },
      price: 1160,
      rating: 5,
      ratingCount: 65,
      location: 'Addis Ababa',
      badges: [{ label: 'Necessary', color: 'green' as const }],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'rent2',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Addis Ababa University', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop' },
      price: 1160,
      rating: 5,
      ratingCount: 65,
      location: 'Addis Ababa',
      badges: [{ label: 'Necessary', color: 'green' as const }],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'rent3',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Addis Ababa University', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop' },
      price: 1160,
      rating: 5,
      ratingCount: 65,
      location: 'Addis Ababa',
      badges: [{ label: 'Necessary', color: 'green' as const }],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'rent4',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Addis Ababa University', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop' },
      price: 1160,
      rating: 5,
      ratingCount: 65,
      location: 'Addis Ababa',
      badges: [{ label: 'Necessary', color: 'green' as const }],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const filteredResources = mockRentResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle rental request submission
  const handleRentalRequest = (rentalData: any) => {
    console.log('Rental request submitted:', rentalData);
    // In a real app, you would send data to backend here
    // The success modal handling and navigation back is managed by the child component
  };

  // If a resource is selected, show the detail page
  if (selectedResource) {
    return (
      <RentProductDetailPage 
        resource={selectedResource} 
        onBack={() => setSelectedResource(null)}
        onComplete={() => {
          setSelectedResource(null);
          onNavigateToRentOrders();
        }}
        onSubmitRequest={handleRentalRequest}
      />
    );
  }

  return (
    <div className="w-full font-primary py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rent resources</h1>
      </div>

      {/* Search Bar */}
      <div className="w-[480px] mb-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search"
          maxWidth="full"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-gray-900 border-b-2 border-[#174A5F]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl overflow-hidden">
              {/* Image Container */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                {/* Badge */}
                {resource.badges && resource.badges.length > 0 && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#22C55E] text-white text-xs font-medium rounded-md z-10">
                    {resource.badges[0].label}
                  </span>
                )}
                
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Rent Button - below image */}
              <div className="px-4 pt-2">
                <button 
                  onClick={() => setSelectedResource(resource)}
                  className="w-full py-2 bg-white border border-[#174A5F] text-[#174A5F] text-sm font-medium rounded hover:bg-[#174A5F] hover:text-white transition-colors"
                >
                  Rent resource
                </button>
              </div>

              {/* Content */}
              <div className="p-4 pt-3 space-y-1">
                <h3 className="text-gray-900 font-bold text-base line-clamp-1">
                  {resource.title}
                </h3>
                <p className="text-[#E11D48] font-bold text-lg">ETB {resource.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">15 Available Items</p>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({resource.ratingCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'on_hand' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl overflow-hidden">
              {/* Image Container */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                {/* Badge */}
                {resource.badges && resource.badges.length > 0 && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#22C55E] text-white text-xs font-medium rounded-md z-10">
                    {resource.badges[0].label}
                  </span>
                )}
                
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Modify Button - below image */}
              <div className="px-4 pt-2">
                <button className="w-full py-2 bg-white border border-[#174A5F] text-[#174A5F] text-sm font-medium rounded hover:bg-[#174A5F] hover:text-white transition-colors">
                  Modify
                </button>
              </div>

              {/* Content */}
              <div className="p-4 pt-3 space-y-1">
                <h3 className="text-gray-900 font-bold text-base line-clamp-1">
                  {resource.title}
                </h3>
                <p className="text-[#E11D48] font-bold text-lg">ETB {resource.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">15 Available Items</p>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({resource.ratingCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rent_history' && (
        <div className="space-y-4">
          {/* Sample rent history items */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Product"
              className="w-16 h-16 object-contain bg-gray-50 rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">IPS LCD Gaming Monitor</h3>
              <p className="text-sm text-gray-600">Rented for 30 days</p>
              <p className="text-xs text-gray-400">Returned on Dec 10, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#174A5F]">ETB 580</p>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Completed</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Product"
              className="w-16 h-16 object-contain bg-gray-50 rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Lab Safety Goggles</h3>
              <p className="text-sm text-gray-600">Rented for 7 days</p>
              <p className="text-xs text-gray-400">Returned on Nov 28, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#174A5F]">ETB 120</p>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
