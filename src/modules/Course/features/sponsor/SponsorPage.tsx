/**
 * Delta Labs Sponsor Page
 * Display sponsors and manage sponsor applications using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import SearchBar from '../../../../components/SearchBar';
import { Breadcrumbs } from '../../components/common';
import SponsorCard from './components/SponsorCard';
import Tabs from './components/Tabs';

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

  const tabs = [
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'applied', label: 'Applied' },
  ];

  const breadcrumbItems = [
    {
      label: 'Course',
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Wishlist',
      onClick: () => navigate('/wishlist'),
    },
    {
      label: 'Sponsor',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-8 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Search Bar */}
      <div className="w-full max-w-3xl">
        <SearchBar maxWidth="full" />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId as 'sponsors' | 'applied')} />

      {/* Sponsor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'sponsors' ? sponsors : appliedSponsors).map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
            sponsor={sponsor}
            onApply={handleApply}
          />
        ))}
      </div>

      {/* Empty State for Applied Tab */}
      {activeTab === 'applied' && appliedSponsors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary font-primary">No applied sponsors yet.</p>
        </div>
      )}
    </div>
  );
};

export default SponsorPage;
