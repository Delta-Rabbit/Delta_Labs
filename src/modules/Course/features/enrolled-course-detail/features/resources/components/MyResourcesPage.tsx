import React, { useState } from 'react';
import type { ResourceItem } from '../types';
import SearchBar from '../../../../../../../components/SearchBar/SearchBar';
import { AddResourcePage } from './AddResourcePage';

interface MyResourcesPageProps {
  onBack: () => void;
  resources: ResourceItem[];
}

type ResourceTab = 'my_resources' | 'used' | 'rent' | 'shared' | 'sold' | 'rented' | 'orders';

export const MyResourcesPage: React.FC<MyResourcesPageProps> = ({ onBack, resources }) => {
  const [activeTab, setActiveTab] = useState<ResourceTab>('my_resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddResource, setShowAddResource] = useState(false);

  const tabs: { id: ResourceTab; label: string }[] = [
    { id: 'my_resources', label: 'My Resources' },
    { id: 'used', label: 'Used' },
    { id: 'rent', label: 'Rent' },
    { id: 'shared', label: 'Shared' },
    { id: 'sold', label: 'Sold' },
    { id: 'rented', label: 'Rented' },
    { id: 'orders', label: 'Orders' }
  ];

  // Mock resources for testing
  const mockResources: ResourceItem[] = [
    {
      id: 'mr1',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Electronics Store', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 1160,
      rating: 4.5,
      ratingCount: 128,
      location: 'Addis Ababa',
      badges: [],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'mr2',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Tech Hub', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 1160,
      rating: 4.5,
      ratingCount: 95,
      location: 'Addis Ababa',
      badges: [],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'mr3',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Digital Shop', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 1160,
      rating: 4.5,
      ratingCount: 76,
      location: 'Addis Ababa',
      badges: [],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'mr4',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Computer World', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 1160,
      rating: 4.5,
      ratingCount: 112,
      location: 'Addis Ababa',
      badges: [],
      type: 'resource',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handlePublish = (data: any) => {
    console.log('New Resource Published:', data);
    // In a real app, you would add this to the resources list
    setShowAddResource(false);
  };

  if (showAddResource) {
    return <AddResourcePage onBack={() => setShowAddResource(false)} onPublish={handlePublish} />;
  }

  // ... (existing logic for combining resources)
  const allResources = resources.length > 0 ? resources : mockResources;
  const filteredResources = allResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full font-primary relative py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My resources</h1>
        <button 
          onClick={() => setShowAddResource(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#174A5F] text-white font-medium rounded-lg hover:bg-[#123644] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Resource
        </button>
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
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-[#174A5F] border-b-2 border-[#174A5F]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Tab - Incoming Orders Management */}
      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {/* Incoming Orders Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">Filter:</span>
              <button className="px-3 py-1 bg-[#174A5F] text-white text-sm rounded">All</button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:border-[#174A5F]">Purchase</button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:border-[#174A5F]">Rent</button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:border-[#174A5F]">Pending</button>
            </div>
          </div>

          {/* Incoming Orders List */}
          <div className="space-y-4">
            {/* Order Item 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Product"
                className="w-20 h-20 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Purchase</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Pending</span>
                </div>
                <h3 className="font-semibold text-gray-900">IPS LCD Gaming Monitor</h3>
                <p className="text-sm text-gray-600">Quantity: 2 items</p>
                <div className="flex items-center gap-2 mt-1">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop" alt="Buyer" className="w-5 h-5 rounded-full" />
                  <span className="text-sm text-gray-600">Abebe Kebede</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#174A5F]">br. 2,320</p>
                <p className="text-xs text-gray-500">Ordered 2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded hover:bg-red-50 transition-colors">
                  Reject
                </button>
              </div>
            </div>

            {/* Order Item 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Product"
                className="w-20 h-20 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">Rent</span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Pending</span>
                </div>
                <h3 className="font-semibold text-gray-900">IPS LCD Gaming Monitor</h3>
                <p className="text-sm text-gray-600">Duration: 30 days</p>
                <div className="flex items-center gap-2 mt-1">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop" alt="Buyer" className="w-5 h-5 rounded-full" />
                  <span className="text-sm text-gray-600">Fikir Twelde</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#174A5F]">br. 580/month</p>
                <p className="text-xs text-gray-500">Requested 5 hours ago</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded hover:bg-red-50 transition-colors">
                  Reject
                </button>
              </div>
            </div>

            {/* Order Item 3 - Accepted */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Product"
                className="w-20 h-20 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Purchase</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Accepted</span>
                </div>
                <h3 className="font-semibold text-gray-900">IPS LCD Gaming Monitor</h3>
                <p className="text-sm text-gray-600">Quantity: 1 item</p>
                <div className="flex items-center gap-2 mt-1">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop" alt="Buyer" className="w-5 h-5 rounded-full" />
                  <span className="text-sm text-gray-600">Sara Ahmed</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#174A5F]">br. 1,160</p>
                <p className="text-xs text-gray-500">Accepted yesterday</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#174A5F] text-white text-sm font-medium rounded hover:bg-[#123644] transition-colors">
                  View Details
                </button>
              </div>
            </div>

            {/* Order Item 4 - Rejected */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 opacity-60">
              <img 
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Product"
                className="w-20 h-20 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">Rent</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Rejected</span>
                </div>
                <h3 className="font-semibold text-gray-900">IPS LCD Gaming Monitor</h3>
                <p className="text-sm text-gray-600">Duration: 7 days</p>
                <div className="flex items-center gap-2 mt-1">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop" alt="Buyer" className="w-5 h-5 rounded-full" />
                  <span className="text-sm text-gray-600">Dawit Hailu</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-500">br. 290/week</p>
                <p className="text-xs text-gray-500">Rejected 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Resources Grid for other tabs */
        <>
          {filteredResources.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? 'Try adjusting your search query' 
                  : 'You don\'t have any resources yet'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {/* Resource Image */}
                  <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* My Resources Tab - with action buttons */}
                  {activeTab === 'my_resources' && (
                    <>
                      <div className="flex gap-2 px-4 -mt-4 relative z-10">
                        <button className="flex-1 py-2 bg-white border border-[#174A5F] text-[#174A5F] text-xs font-medium rounded hover:bg-[#174A5F] hover:text-white transition-colors">
                          Add To Rent
                        </button>
                        <button className="flex-1 py-2 bg-[#174A5F] text-white text-xs font-medium rounded hover:bg-[#123644] transition-colors">
                          Add To Sale
                        </button>
                      </div>
                      <div className="p-4 pt-3 space-y-2">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                        <p className="text-sm text-gray-600">15 Items</p>
                        <div className="space-y-2 pt-1">
                          <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-[#174A5F] hover:text-[#174A5F] transition-colors">
                            Remove Resource
                          </button>
                          <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-[#174A5F] hover:text-[#174A5F] transition-colors">
                            Share resource
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Used Tab */}
                  {activeTab === 'used' && (
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600">15 Items</p>
                      <div className="space-y-2 pt-1">
                        <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-[#174A5F] hover:text-[#174A5F] transition-colors">
                          Modify
                        </button>
                        <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-[#174A5F] hover:text-[#174A5F] transition-colors">
                          Remove Resource
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rent Tab */}
                  {activeTab === 'rent' && (
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600">15 Items</p>
                      <div className="space-y-2 pt-1">
                        <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-[#174A5F] hover:text-[#174A5F] transition-colors">
                          Modify
                        </button>
                        <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:border-[#174A5F] hover:text-[#174A5F] transition-colors">
                          Remove Resource
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Shared Tab */}
                  {activeTab === 'shared' && (
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Shared with</span>
                        <div className="flex -space-x-2">
                          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop" alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                        </div>
                        <span className="text-sm text-[#174A5F] font-medium">+ 3 others</span>
                      </div>
                    </div>
                  )}

                  {/* Sold Tab */}
                  {activeTab === 'sold' && (
                    <div className="p-4 space-y-1">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600">15 Items</p>
                      <p className="text-[#C85A5A] font-bold">br. {resource.price}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(65)</span>
                      </div>
                    </div>
                  )}

                  {/* Rented Tab */}
                  {activeTab === 'rented' && (
                    <div className="p-4 space-y-1">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600">15 Items</p>
                      <p className="text-sm text-[#174A5F] font-medium">15 Days Left</p>
                      <p className="text-[#C85A5A] font-bold">br. {resource.price}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(65)</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop" alt="Renter" className="w-6 h-6 rounded-full" />
                        <span className="text-sm text-gray-700">Fikir Twelde</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
