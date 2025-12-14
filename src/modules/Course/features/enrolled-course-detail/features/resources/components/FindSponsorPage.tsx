import React, { useState } from 'react';
import { SponsorCard } from './SponsorCard';
import { SponsorshipRequestModal } from './SponsorshipRequestModal';
import { SuccessModal } from './SuccessModal';
import type { Sponsor, CartItem } from '../types';
import SearchBar from '../../../../../../../components/SearchBar/SearchBar';

interface FindSponsorPageProps {
  onBack: () => void;
  onNavigateToOrders: () => void;
  cartItems: CartItem[];
  totalAmount: number;
}

export const FindSponsorPage: React.FC<FindSponsorPageProps> = ({
  onBack,
  onNavigateToOrders,
  cartItems,
  totalAmount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock Sponsors Data
  const mockSponsors: Sponsor[] = [
    {
      id: 'sp1',
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      organization: 'Education Foundation',
      bio: 'Passionate about supporting STEM education and helping students achieve their academic dreams.',
      totalSponsored: 15000,
      studentsHelped: 45,
      isActive: true,
      categories: ['Science', 'Technology', 'Engineering', 'Mathematics'],
      maxSponsorshipAmount: 2000
    },
    {
      id: 'sp2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      organization: 'Tech for Good Initiative',
      bio: 'Tech entrepreneur dedicated to making education accessible to all students regardless of financial background.',
      totalSponsored: 28000,
      studentsHelped: 82,
      isActive: true,
      categories: ['Technology', 'Computer Science', 'Engineering'],
      maxSponsorshipAmount: 3000
    },
    {
      id: 'sp3',
      name: 'Prof. Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      organization: 'University Alumni Association',
      bio: 'Former professor committed to ensuring every student has access to the resources they need to succeed.',
      totalSponsored: 12500,
      studentsHelped: 38,
      isActive: true,
      categories: ['General Education', 'Science', 'Arts'],
      maxSponsorshipAmount: 1500
    },
    {
      id: 'sp4',
      name: 'David Williams',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      organization: 'Community Support Fund',
      bio: 'Believer in the power of education to transform lives and communities.',
      totalSponsored: 8900,
      studentsHelped: 25,
      isActive: true,
      categories: ['General Education', 'Technology'],
      maxSponsorshipAmount: 1000
    },
    {
      id: 'sp5',
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      organization: 'Women in STEM Foundation',
      bio: 'Supporting women and underrepresented groups in pursuing STEM careers.',
      totalSponsored: 19500,
      studentsHelped: 56,
      isActive: true,
      categories: ['Science', 'Technology', 'Engineering', 'Mathematics'],
      maxSponsorshipAmount: 2500
    },
    {
      id: 'sp6',
      name: 'James Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      organization: 'Global Education Partners',
      bio: 'Working to bridge the educational gap and provide opportunities for all students.',
      totalSponsored: 5200,
      studentsHelped: 15,
      isActive: false,
      categories: ['General Education'],
      maxSponsorshipAmount: 800
    }
  ];

  // Filter sponsors
  const filteredSponsors = mockSponsors.filter(sponsor => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = sponsor.name.toLowerCase().includes(query);
      const matchesOrg = sponsor.organization?.toLowerCase().includes(query);
      const matchesCategory = sponsor.categories.some(cat => cat.toLowerCase().includes(query));
      
      if (!matchesName && !matchesOrg && !matchesCategory) {
        return false;
      }
    }

    // Filter by active status
    if (filterActive === 'active' && !sponsor.isActive) return false;
    if (filterActive === 'inactive' && sponsor.isActive) return false;

    return true;
  });

  const handleRequestSponsorship = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsRequestModalOpen(true);
  };

  const handleSubmitRequest = async (message: string) => {
    console.log('Sponsorship request submitted:', {
      sponsor: selectedSponsor,
      cartItems,
      totalAmount,
      message
    });
    
    // TODO: Send request to backend
    setIsRequestModalOpen(false);
    setShowSuccessModal(true);
  };

  const handleViewProfile = (sponsor: Sponsor) => {
    console.log('View sponsor profile:', sponsor);
    // TODO: Implement profile modal or navigation
  };

  return (
    <div className="w-full font-primary relative py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#174A5F] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Cart</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Sponsor</h1>
        <p className="text-gray-600 mb-6">
          Connect with kind-hearted sponsors who are willing to support your educational journey
        </p>

        {/* Cart Summary */}
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-6">
          <div className="flex-1">
            <p className="text-sm text-gray-600">You're requesting sponsorship for:</p>
            <p className="font-semibold text-gray-900">{cartItems.length} item(s)</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Amount:</p>
            <p className="text-2xl font-bold text-[#174A5F]">${totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search sponsors by name, organization, or category"
              maxWidth="full"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterActive('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filterActive === 'all'
                  ? 'bg-[#174A5F] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterActive('active')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filterActive === 'active'
                  ? 'bg-[#174A5F] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterActive('inactive')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filterActive === 'inactive'
                  ? 'bg-[#174A5F] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Sponsors Grid */}
      {filteredSponsors.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No sponsors found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery 
              ? 'Try adjusting your search query or filters' 
              : 'There are no sponsors available at the moment'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map(sponsor => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor}
              onRequestSponsorship={() => handleRequestSponsorship(sponsor)}
              onViewProfile={() => handleViewProfile(sponsor)}
            />
          ))}
        </div>
      )}

      {/* Sponsorship Request Modal */}
      <SponsorshipRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        sponsor={selectedSponsor}
        cartItems={cartItems}
        totalAmount={totalAmount}
        onSubmit={handleSubmitRequest}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setSelectedSponsor(null);
          onNavigateToOrders();
        }}
        sponsorName={selectedSponsor?.name || ''}
      />
    </div>
  );
};
