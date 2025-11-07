/**
 * Delta Labs Financial Aid Application Form Page
 * Form for applying for financial aid using theme tokens
 */

import React, { useState } from 'react';
import { useCourseNavigation } from '../../routing/hooks/useCourseNavigation';
import { DeltaCard, DeltaTextarea, DeltaButton } from '../../../../components/theme';
import { Breadcrumbs } from '../../components/common';
import FinancialAidSummaryCard from './components/FinancialAidSummaryCard';

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
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 font-primary">
            Physics financial aid
          </h1>

          <DeltaCard
            variant="default"
            padding="lg"
            shadow="sm"
            className="font-primary"
          >
            <form onSubmit={handleApply} className="space-y-8">
              {/* Question 1 */}
              <div>
                <label htmlFor="why" className="block text-sm font-semibold text-text-primary mb-2 font-primary">
                  Why are you applying for financial aid? <span className="text-text-tertiary text-xs">(150 words minimum)</span>
                </label>
                <DeltaTextarea
                  id="why"
                  value={whyAid}
                  onChange={(e) => setWhyAid(e.target.value)}
                  rows={8}
                  placeholder="Type your answer..."
                />
              </div>

              {/* Question 2 */}
              <div>
                <label htmlFor="helps" className="block text-sm font-semibold text-text-primary mb-2 font-primary">
                  How will taking this course help you? <span className="text-text-tertiary text-xs">(150 words minimum)</span>
                </label>
                <DeltaTextarea
                  id="helps"
                  value={howHelps}
                  onChange={(e) => setHowHelps(e.target.value)}
                  rows={8}
                  placeholder="Type your answer..."
                />
              </div>

              <div className="flex justify-end">
                <DeltaButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="font-primary"
                >
                  Apply
                </DeltaButton>
              </div>
            </form>
          </DeltaCard>
        </div>

        {/* Sidebar */}
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

export default FinancialAidFormPage;
