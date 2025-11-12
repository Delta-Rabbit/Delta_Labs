/**
 * Delta Labs Prerequisites & Requirements Tab
 * Display course prerequisites and required resources
 */

import React from 'react';
import { DeltaCard, DeltaButton } from '../../../../../../../components/theme';

interface Requirement {
  id: string;
  title: string;
  image: string;
  specifications: string[];
  isPurchased?: boolean;
}

const PrerequisitesRequirementsTab: React.FC = () => {
  const prerequisites = [
    'Basics of Chemistry',
    'General knowledge of how the Nature works is recommended but not a must-have',
    'Absolutely no understanding of Advanced theories are required, I take you from beginner to intermediate.',
  ];

  const requirements: Requirement[] = [
    {
      id: '1',
      title: 'Modern Laptop or tablet',
      image: '/placeholder-laptop.jpg',
      specifications: ['4/8 GB RAM', '>251 GB Storage', '>core i3'],
    },
    {
      id: '2',
      title: 'Safety goggles',
      image: '/placeholder-goggles.jpg',
      specifications: ['anti-fog coating', 'ANSI Z87.1', 'Polycarbonate'],
      isPurchased: true,
    },
    {
      id: '3',
      title: 'Laboratory Glass',
      image: '/placeholder-glass.jpg',
      specifications: ['Florence Flask', 'Borosilicate Glass', '500 ml'],
    },
    {
      id: '4',
      title: "Newton's Cradle",
      image: '/placeholder-newton.jpg',
      specifications: ['Suspension string', 'Stainless Steel', '5 inches in height'],
    },
  ];

  return (
    <div className="w-full font-primary">
      {/* Prerequisites Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6 font-primary">Prerequisites</h2>
        <DeltaCard className="p-6 font-primary">
          <ul className="space-y-3">
            {prerequisites.map((prerequisite, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-text-secondary font-primary">{prerequisite}</span>
              </li>
            ))}
          </ul>
        </DeltaCard>
      </div>

      {/* Requirements Section */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 font-primary">Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((requirement) => (
            <DeltaCard key={requirement.id} className="p-4 font-primary">
              {/* Image Section */}
              <div className="relative mb-4 rounded-lg overflow-hidden bg-surface-secondary aspect-square">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                  <span className="text-xs text-text-tertiary font-primary">{requirement.title}</span>
                </div>
                {/* Purchased Badge */}
                {requirement.isPurchased && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium font-primary">
                      Purchased
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-text-primary mb-3 font-primary">{requirement.title}</h3>

              {/* Specifications */}
              <div className="space-y-2 mb-4">
                {requirement.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-text-secondary font-primary">
                    <svg className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Look for Resource Button */}
              <DeltaButton variant="outline" size="sm" className="w-full font-primary">
                Look for Resource
              </DeltaButton>
            </DeltaCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrerequisitesRequirementsTab;

