/**
 * Delta Labs Sponsor Card Component
 * Professional sponsor card using Delta Labs theme components
 */

import React from 'react';
import { DeltaCard, DeltaButton } from '../../../../../components/theme';

interface Sponsor {
  id: string;
  name: string;
  website: string;
  description: string;
  logo: string;
  image: string;
}

interface SponsorCardProps {
  sponsor: Sponsor;
  onApply: (sponsorId: string, sponsorName: string) => void;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, onApply }) => {
  return (
    <DeltaCard
      variant="default"
      padding="none"
      shadow="lg"
      hover={true}
      className="relative font-primary overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-surface-secondary to-surface-tertiary">
        {/* Logo - Bottom Left Corner */}
        <div className="absolute bottom-3 left-3 w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Name */}
        <h3 className="text-lg font-bold text-text-primary mb-2 font-primary">
          {sponsor.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 font-primary">
          {sponsor.description}
        </p>

        {/* Website Link */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <a
            href={`https://${sponsor.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors transition-normal ease-ease font-primary"
          >
            {sponsor.website}
          </a>
        </div>

        {/* Apply Button */}
        <DeltaButton
          variant="primary"
          size="md"
          onClick={() => onApply(sponsor.id, sponsor.name)}
          className="w-full font-primary"
        >
          Apply
        </DeltaButton>
      </div>
    </DeltaCard>
  );
};

export default SponsorCard;
