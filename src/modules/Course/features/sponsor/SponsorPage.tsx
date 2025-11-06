/**
 * Delta Labs Sponsor Page
 * Display sponsors and manage sponsor applications
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import SponsorCard from './components/SponsorCard';

interface Sponsor {
  id: string;
  name: string;
  website: string;
  description: string;
  logo: string;
  image: string;
}

const SponsorPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const [activeTab, setActiveTab] = useState<'sponsors' | 'applied'>('sponsors');

  // Sample sponsors data
  const sponsors: Sponsor[] = [
    {
      id: 'sponsor-1',
      name: 'Mekdes',
      website: 'medkes.com',
      description: 'Here goes a little description whether a person or a company.',
      logo: '',
      image: '',
    },
    {
      id: 'sponsor-2',
      name: 'Kidist',
      website: 'kidist.com',
      description: 'Here goes a little description whether a person or a company.',
      logo: '',
      image: '',
    },
    {
      id: 'sponsor-3',
      name: 'Fikir',
      website: 'fikir.com',
      description: 'Here goes a little description whether a person or a company.',
      logo: '',
      image: '',
    },
    {
      id: 'sponsor-4',
      name: 'Haron',
      website: 'haron.com',
      description: 'Here goes a little description whether a person or a company.',
      logo: '',
      image: '',
    },
    {
      id: 'sponsor-5',
      name: 'Leul',
      website: 'leul.com',
      description: 'Here goes a little description whether a person or a company.',
      logo: '',
      image: '',
    },
    {
      id: 'sponsor-6',
      name: 'Hilina',
      website: 'hilina.com',
      description: 'Here goes a little description whether a person or a company.',
      logo: '',
      image: '',
    },
  ];

  const appliedSponsors: Sponsor[] = []; // Can be populated later

  const handleApply = (sponsorId: string, sponsorName: string) => {
    navigate('/sponsor/apply');
    // You can pass sponsorId and sponsorName to the apply page if needed
  };

  return (
    <div className="space-y-8 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <button
          onClick={() => navigate('/wishlist')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Wishlist
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Sponsor</span>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-3xl">
        <SearchBar maxWidth="full" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveTab('sponsors')}
          className={`text-base font-medium transition-colors pb-2 border-b-2 ${
            activeTab === 'sponsors'
              ? 'text-gray-900 border-gray-900'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Sponsors
        </button>
        <button
          onClick={() => setActiveTab('applied')}
          className={`text-base font-medium transition-colors pb-2 border-b-2 ${
            activeTab === 'applied'
              ? 'text-gray-900 border-gray-900'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Applied
        </button>
      </div>

      {/* Sponsor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'sponsors' ? sponsors : appliedSponsors).map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
            sponsor={sponsor}
            onApply={() => handleApply(sponsor.id, sponsor.name)}
          />
        ))}
      </div>

      {/* Empty State for Applied Tab */}
      {activeTab === 'applied' && appliedSponsors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No applied sponsors yet.</p>
        </div>
      )}
    </div>
  );
};

export default SponsorPage;
