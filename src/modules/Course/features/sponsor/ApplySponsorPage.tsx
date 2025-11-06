/**
 * Delta Labs Apply Sponsor Page
 * Form for applying to a sponsor
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';

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
        <button
          onClick={() => navigate('/sponsor')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Sponsor
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Application for sponsor</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Application for sponsor</h1>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm max-w-3xl">
        <div className="space-y-6">
          {/* Source of Income */}
          <div>
            <label htmlFor="sourceOfIncome" className="block text-sm font-semibold text-gray-700 mb-2">
              Source of Income
            </label>
            <input
              type="text"
              id="sourceOfIncome"
              name="sourceOfIncome"
              value={formData.sourceOfIncome}
              onChange={handleInputChange}
              placeholder="Enter your source of income"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Amount (per month) */}
          <div>
            <label htmlFor="monthlyAmount" className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (per month)
            </label>
            <input
              type="text"
              id="monthlyAmount"
              name="monthlyAmount"
              value={formData.monthlyAmount}
              onChange={handleInputChange}
              placeholder="Enter monthly amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Financial Hardship Explanation */}
          <div>
            <label htmlFor="financialHardship" className="block text-sm font-semibold text-gray-700 mb-2">
              Financial Hardship Explanation
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Explain your financial hardship and why you are requesting a fee waiver for this online course. Please provide as much detail as possible, including any extenuating circumstances:
            </p>
            <textarea
              id="financialHardship"
              name="financialHardship"
              value={formData.financialHardship}
              onChange={handleInputChange}
              rows={6}
              placeholder="Enter your explanation here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-vertical"
            />
          </div>

          {/* Attach Supporting Documents */}
          <div>
            <label htmlFor="documents" className="block text-sm font-semibold text-gray-700 mb-2">
              Attach supporting documents
            </label>
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <p className="text-xs text-gray-500 mt-2">You can upload multiple documents (PDF, DOC, DOCX, JPG, PNG)</p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              Submit Application
            </button>
            <button
              type="button"
              onClick={() => navigate('/sponsor')}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplySponsorPage;
