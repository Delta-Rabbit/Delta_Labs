/**
 * Delta Labs Financial Aid Application Form Page
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';

const FinancialAidFormPage: React.FC = () => {
  const { navigate } = useCourseNavigation();
  const [whyAid, setWhyAid] = useState('');
  const [howHelps, setHowHelps] = useState('');

  const totalTime = 20; // days
  const totalBudget = 1200; // Br

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit aid application
    console.log({ whyAid, howHelps });
  };

  return (
    <div className="space-y-8 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button onClick={() => navigate('/dashboard')} className="hover:text-gray-900 transition-colors font-medium">Course</button>
        <span>/</span>
        <button onClick={() => navigate('/wishlist')} className="hover:text-gray-900 transition-colors font-medium">Wishlist</button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Aid</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Physics financial aid</h1>

          <form onSubmit={handleApply} className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
            {/* Question 1 */}
            <div className="mb-8">
              <label htmlFor="why" className="block text-sm font-semibold text-gray-800 mb-2">
                Why are you applying for financial aid? <span className="text-gray-400 text-xs">(150 words minimum)</span>
              </label>
              <textarea
                id="why"
                value={whyAid}
                onChange={(e) => setWhyAid(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Type your answer..."
              />
            </div>

            {/* Question 2 */}
            <div className="mb-8">
              <label htmlFor="helps" className="block text-sm font-semibold text-gray-800 mb-2">
                How will taking this course help you? <span className="text-gray-400 text-xs">(150 words minimum)</span>
              </label>
              <textarea
                id="helps"
                value={howHelps}
                onChange={(e) => setHowHelps(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Type your answer..."
              />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 xl:w-[420px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Summarized info</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Total time required</span>
                  <span className="text-base font-bold text-gray-900">{totalTime} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total budget required</span>
                  <span className="text-base font-bold text-gray-900">{totalBudget} Br</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>View planner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAidFormPage;
