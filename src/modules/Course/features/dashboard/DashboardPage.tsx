/**
 * Course Module - Dashboard Page
 * Main dashboard showing feature cards
 * Refactored to use Delta Labs theme components and design tokens
 */

import React from 'react';
import FeatureCardGrid from './components/FeatureCardGrid';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 font-primary">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-primary">
          Course
        </h1>
      </div>
      <FeatureCardGrid />
    </div>
  );
};

export default DashboardPage;
