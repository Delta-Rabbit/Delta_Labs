/**
 * Delta Labs Requirements Card Component
 * Card showing applicant requirements using theme tokens
 */

import React from 'react';
import { DeltaCard, DeltaCheckbox, DeltaButton } from '../../../../../components/theme';

interface RequirementsCardProps {
  requirements: string[];
  agreeToTerms: boolean;
  onAgreeChange: (agreed: boolean) => void;
  onNext: () => void;
}

const RequirementsCard: React.FC<RequirementsCardProps> = ({
  requirements,
  agreeToTerms,
  onAgreeChange,
  onNext,
}) => {
  return (
    <DeltaCard
      variant="default"
      padding="lg"
      shadow="sm"
      className="font-primary"
    >
      <h2 className="text-lg font-bold text-text-primary mb-4 font-primary">
        We ask that every applicant
      </h2>
      
      <ul className="space-y-3 mb-6">
        {requirements.map((requirement, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-primary font-primary">{requirement}</span>
          </li>
        ))}
      </ul>

      {/* Terms Agreement */}
      <div className="flex items-center gap-3 pb-4 border-b border-border-primary mb-4">
        <DeltaCheckbox
          id="agreeToTerms"
          label="I agree to the terms above."
          checked={agreeToTerms}
          onChange={(e) => onAgreeChange(e.target.checked)}
          size="md"
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <DeltaButton
          variant="primary"
          size="md"
          onClick={onNext}
          disabled={!agreeToTerms}
          className="font-primary"
        >
          Next
        </DeltaButton>
      </div>
    </DeltaCard>
  );
};

export default RequirementsCard;

