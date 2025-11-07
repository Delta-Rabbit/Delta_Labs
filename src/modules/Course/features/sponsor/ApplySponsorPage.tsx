/**
 * Delta Labs Apply Sponsor Page
 * Form for applying to a sponsor using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { DeltaInput, DeltaTextarea, DeltaButton, DeltaCard } from '../../../../components/theme';
import { Breadcrumbs } from '../../components/common';

interface ApplySponsorPageProps {
  sponsorId?: string;
  sponsorName?: string;
}

const ApplySponsorPage: React.FC<ApplySponsorPageProps> = ({ sponsorId, sponsorName }) => {
  const { navigate } = useCourseNavigation();
  const [formData, setFormData] = useState({
    sourceOfIncome: '',
    monthlyAmount: '',
    financialHardship: '',
    documents: null as FileList | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, documents: e.target.files }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit application:', formData);
    // Handle form submission
  };

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
      onClick: () => navigate('/sponsor'),
    },
    {
      label: 'Application for sponsor',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-8 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-primary">
        Application for sponsor
      </h1>

      {/* Application Form */}
      <DeltaCard
        variant="default"
        padding="lg"
        shadow="sm"
        className="max-w-3xl font-primary"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Source of Income */}
          <div>
            <DeltaInput
              id="sourceOfIncome"
              name="sourceOfIncome"
              label="Source of Income"
              value={formData.sourceOfIncome}
              onChange={handleInputChange}
              placeholder="Enter your source of income"
            />
          </div>

          {/* Amount (per month) */}
          <div>
            <DeltaInput
              id="monthlyAmount"
              name="monthlyAmount"
              label="Amount (per month)"
              value={formData.monthlyAmount}
              onChange={handleInputChange}
              placeholder="Enter monthly amount"
            />
          </div>

          {/* Financial Hardship Explanation */}
          <div>
            <label htmlFor="financialHardship" className="block text-sm font-semibold text-text-primary mb-2 font-primary">
              Financial Hardship Explanation
            </label>
            <p className="text-sm text-text-secondary mb-3 font-primary">
              Explain your financial hardship and why you are requesting a fee waiver for this online course. Please provide as much detail as possible, including any extenuating circumstances:
            </p>
            <DeltaTextarea
              id="financialHardship"
              name="financialHardship"
              value={formData.financialHardship}
              onChange={handleInputChange}
              rows={6}
              placeholder="Enter your explanation here..."
            />
          </div>

          {/* Attach Supporting Documents */}
          <div>
            <label htmlFor="documents" className="block text-sm font-semibold text-text-primary mb-2 font-primary">
              Attach supporting documents
            </label>
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-3 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all transition-normal ease-ease file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 font-primary"
            />
            <p className="text-xs text-text-tertiary mt-2 font-primary">
              You can upload multiple documents (PDF, DOC, DOCX, JPG, PNG)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-4">
            <DeltaButton
              type="submit"
              variant="primary"
              size="md"
              className="font-primary"
            >
              Submit Application
            </DeltaButton>
            <DeltaButton
              type="button"
              variant="secondary"
              size="md"
              onClick={() => navigate('/sponsor')}
              className="font-primary"
            >
              Cancel
            </DeltaButton>
          </div>
        </form>
      </DeltaCard>
    </div>
  );
};

export default ApplySponsorPage;
