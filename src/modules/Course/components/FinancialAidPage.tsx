/**
 * Delta Labs Financial Aid Page
 * Apply for financial aid for courses
 */

import React, { useState } from 'react';
import { useCourseView } from '../context/CourseViewContext';

interface FinancialAidPageProps {
  courseId?: string;
  courseName?: string;
}

const FinancialAidPage: React.FC<FinancialAidPageProps> = ({ courseId, courseName = 'Physics' }) => {
  const { setCurrentView } = useCourseView();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleNext = () => {
    if (agreeToTerms) {
      setCurrentView('financialAidForm');
    }
  };

  const requirements = [
    'Shares accurate information on their application',
    'Commits to finishing their courses upon approval',
    'Shares accurate information on their application',
    'Commits to finishing their courses upon approval',
    'Shares accurate information on their application',
    'Commits to finishing their courses upon approval',
  ];

  const totalTime = 20; // days
  const totalBudget = 1200; // Br

  return (
    <div className="space-y-8 -mt-8 pt-16">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => setCurrentView('main')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Course
        </button>
        <span>/</span>
        <button
          onClick={() => setCurrentView('wishlist')}
          className="hover:text-gray-900 transition-colors font-medium"
        >
          Wishlist
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Aid</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content - Left Side */}
        <div className="flex-1 min-w-0">
          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {courseName} financial aid
          </h1>

          {/* Program Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm mb-6">
            <p className="text-gray-700 leading-relaxed">
              We are proud to offer financial aid program that helps people access the skill they want to learn. Our program was created to help those who can't afford to pay for a course on their own.
            </p>
          </div>

          {/* Applicant Requirements */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">We ask that every applicant</h2>
            <ul className="space-y-3 mb-6">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>

            {/* Terms Agreement */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer">
                I agree to the terms above.
              </label>
            </div>

            {/* Next Button */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!agreeToTerms}
                className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
                  agreeToTerms
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-96 xl:w-[420px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Summarized Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Summarized info</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Total time required:</span>
                  <span className="text-base font-bold text-gray-900">{totalTime} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total budget required:</span>
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

export default FinancialAidPage;

