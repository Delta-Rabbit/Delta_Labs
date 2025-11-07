/**
 * Delta Labs Financial Aid Page
 * Apply for financial aid for courses using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { DeltaCard } from '../../../../components/theme';
import { Breadcrumbs } from '../../components/common';
import RequirementsCard from './components/RequirementsCard';
import FinancialAidSummaryCard from './components/FinancialAidSummaryCard';

interface FinancialAidPageProps {
  courseId?: string;
  courseName?: string;
}

const FinancialAidPage: React.FC<FinancialAidPageProps> = ({ courseId, courseName = 'Physics' }) => {
  const { navigate } = useCourseNavigation();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleNext = () => {
    if (agreeToTerms) {
      navigate('/financial-aid/apply');
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
      label: 'Aid',
      isActive: true,
    },
  ];

  return (
    <div className="space-y-8 -mt-8 pt-16 font-primary">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main Content - Left Side */}
        <div className="flex-1 min-w-0">
          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 font-primary">
            {courseName} financial aid
          </h1>

          {/* Program Description */}
          <DeltaCard
            variant="default"
            padding="lg"
            shadow="sm"
            className="mb-6 font-primary"
          >
            <p className="text-text-primary leading-relaxed font-primary">
              We are proud to offer financial aid program that helps people access the skill they want to learn. Our program was created to help those who can't afford to pay for a course on their own.
            </p>
          </DeltaCard>

          {/* Applicant Requirements */}
          <RequirementsCard
            requirements={requirements}
            agreeToTerms={agreeToTerms}
            onAgreeChange={setAgreeToTerms}
            onNext={handleNext}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-96 xl:w-[420px] flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <FinancialAidSummaryCard
              totalTime={totalTime}
              totalBudget={totalBudget}
              onViewPlanner={() => {
                navigate('/planner');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAidPage;
