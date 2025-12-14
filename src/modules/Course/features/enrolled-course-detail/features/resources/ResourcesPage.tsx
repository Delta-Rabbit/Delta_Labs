// Resources Page Component - V2
import React, { useState } from 'react';
import { ResourcesSidebar } from './components/ResourcesSidebar';
import { ResourceHeader } from './components/ResourceHeader';
import { ResourcesTabs } from './components/ResourcesTabs';
import { ResourceBudgetCard } from './components/ResourceBudgetCard';
import { CommunityResourceCard } from './components/CommunityResourceCard';
import { ResourceMarketCard } from './components/ResourceMarketCard';
import type { ResourcesSidebarView, ResourceItem } from './types';
import { ResourceViewer } from './components/ResourceViewer';
import { CartPage } from './components/CartPage';
import { OrderPage } from './components/OrderPage';
import { FindSponsorPage } from './components/FindSponsorPage';
import { MyResourcesPage } from './components/MyResourcesPage';
import { NotificationsPage } from './components/NotificationsPage';
import { RentResourcesPage } from './components/RentResourcesPage';
import { useCart } from './hooks/useCart';
import SearchBar from '../../../../../../components/SearchBar/SearchBar';

const ResourcesPage: React.FC = () => {
  const [activeSidebarView, setActiveSidebarView] = useState<ResourcesSidebarView>('home');
  const [activeTab, setActiveTab] = useState<'resources' | 'community'>('resources');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [showFindSponsor, setShowFindSponsor] = useState(false);
  const [orderInitialTab, setOrderInitialTab] = useState<'purchase' | 'rent' | 'financial_aid' | 'rejected'>('purchase');
  const [myResources, setMyResources] = useState<ResourceItem[]>([]);
  const { addToCart, totalQuantity, cartItems, totalPrice } = useCart();

  // Mock Data
  const mockResources: ResourceItem[] = [
    {
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
    {
      id: 'r2',
      title: 'Lab Safety Goggles',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 450,
      rating: 4.8,
      ratingCount: 120,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1569961947231-13359d997232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [{ label: 'Used', color: 'orange' }],
      type: 'resource'
    },
    {
      id: 'r3',
      title: 'Chemistry Glassware Set',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 2500,
      rating: 5,
      ratingCount: 30,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [],
      type: 'resource'
    },
    {
      id: 'r4',
      title: 'External Hard Drive 1TB',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 1800,
      rating: 4.5,
      ratingCount: 42,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1531778921822-77983617be33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [],
      type: 'resource'
    },
    // Community Items
    {
      id: 'c1',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 0,
      rating: 5,
      ratingCount: 65,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [{ label: 'Used', color: 'orange' }],
      type: 'community',
      sharedWith: [
          { avatar: 'https://i.pravatar.cc/150?u=1' },
          { avatar: 'https://i.pravatar.cc/150?u=2' },
          { avatar: 'https://i.pravatar.cc/150?u=3' }
      ]
    },
    {
      id: 'c2',
      title: 'Medical Safety Kit',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 0,
      rating: 4.9,
      ratingCount: 65,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [{ label: 'Used', color: 'orange' }],
      type: 'community',
       sharedWith: [
          { avatar: 'https://i.pravatar.cc/150?u=4' },
          { avatar: 'https://i.pravatar.cc/150?u=5' }
      ]
    },
    {
      id: 'c3',
      title: 'Chemistry Beaker Set',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 0,
      rating: 5,
      ratingCount: 65,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [],
      type: 'community',
      sharedWith: [
          { avatar: 'https://i.pravatar.cc/150?u=6' },
          { avatar: 'https://i.pravatar.cc/150?u=7' },
          { avatar: 'https://i.pravatar.cc/150?u=8' }
      ]
    },
    {
      id: 'c4',
      title: 'IPS LCD Gaming Monitor',
      seller: { name: 'Addis ababa university', logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
      price: 0,
      rating: 4.5,
      ratingCount: 65,
      location: 'Addis Ababa',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badges: [],
      type: 'community',
      sharedWith: [
          { avatar: 'https://i.pravatar.cc/150?u=9' }
      ]
    }
  ];

  const filteredResources = mockResources.filter(item => {
      // Filter by Tab
      if (activeTab === 'resources' && item.type !== 'resource') return false;
      if (activeTab === 'community' && item.type !== 'community') return false;

      // Filter by Search
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true; 
  });

  const handleAddToCart = (resource: ResourceItem) => {
    addToCart(resource, 1);
  };

  return (
    <div className="w-full font-primary relative">
      {/* Sidebar */}
      <ResourcesSidebar activeView={activeSidebarView} onViewChange={setActiveSidebarView} />

      <div className="w-full relative">
         {showFindSponsor ? (
             <FindSponsorPage 
               onBack={() => setShowFindSponsor(false)} 
               onNavigateToOrders={() => {
                 setShowFindSponsor(false);
                 setOrderInitialTab('financial_aid');
                 setActiveSidebarView('bag');
               }}
               cartItems={cartItems}
               totalAmount={totalPrice}
             />
         ) : activeSidebarView === 'cart' ? (
             <CartPage 
               onBack={() => setActiveSidebarView('home')} 
               onFindSponsor={() => setShowFindSponsor(true)}
             />
         ) : activeSidebarView === 'bag' ? (
             <OrderPage 
               onBack={() => setActiveSidebarView('home')} 
               onNavigateToMyResources={() => setActiveSidebarView('analytics')}
               initialTab={orderInitialTab}
             />
         ) : activeSidebarView === 'analytics' ? (
             <MyResourcesPage 
               onBack={() => setActiveSidebarView('home')} 
               resources={myResources}
             />
         ) : activeSidebarView === 'notifications' ? (
             <NotificationsPage 
               onBack={() => setActiveSidebarView('home')} 
             />
         ) : activeSidebarView === 'rent' ? (
             <RentResourcesPage 
               onBack={() => setActiveSidebarView('home')} 
               onNavigateToRentOrders={() => {
                 setOrderInitialTab('rent');
                 setActiveSidebarView('bag');
               }}
             />
         ) : selectedResource ? (
             <ResourceViewer 
                resource={selectedResource} 
                onBack={() => setSelectedResource(null)} 
             />
         ) : (
             <div className="py-6">
                 <ResourceHeader />
                 
                 <div className="absolute top-6 right-0 z-10">
                    <ResourceBudgetCard 
                        totalPrice={300} 
                        itemCount={4} 
                        onFindSponsor={() => setShowFindSponsor(true)}
                    />
                 </div>
        
                 {/* Search & Tabs */}
                 <div className="flex flex-col gap-6 mb-8">
                     <div className="w-[480px]">
                         <SearchBar 
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search"
                            maxWidth="full"
                         />
                     </div>
                     <ResourcesTabs activeTab={activeTab} onTabChange={setActiveTab} />
                 </div>
        
                 {/* Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {filteredResources.map(item => (
                         <div key={item.id} onClick={() => setSelectedResource(item)} className="cursor-pointer">
                             {activeTab === 'community' ? (
                                 <CommunityResourceCard item={item} />
                             ) : (
                                 <ResourceMarketCard 
                                    item={item} 
                                    onAddToCart={() => handleAddToCart(item)}
                                 />
                             )}
                         </div>
                     ))}
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default ResourcesPage;
