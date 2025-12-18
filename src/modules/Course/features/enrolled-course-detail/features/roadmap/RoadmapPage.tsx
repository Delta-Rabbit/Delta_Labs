/**
 * Delta Labs Roadmap Page
 * Course roadmap and learning path with timeline visualization
 */

import React, { useState } from 'react';
import { RoadmapHeader, ProgressCard, RoadmapSidebar, RoadmapTimeline } from './components';
import { mockRoadmapData } from './utils/mockData';
import type { RoadmapView } from './types';
import PersonalRoadmapPage from './pages/PersonalRoadmapPage';
import CommunityRoadmapPage from './pages/CommunityRoadmapPage';
import SuperRoadmapPage from './pages/SuperRoadmapPage';
import AdjustRoadmapPage from './pages/AdjustRoadmapPage';

const RoadmapPage: React.FC = () => {
  const [activeView, setActiveView] = useState<RoadmapView>('home');
  const [showAdjustRoadmap, setShowAdjustRoadmap] = useState(false);

  const handleAdjustRoadmap = () => {
    setShowAdjustRoadmap(true);
  };

  const handleBackFromAdjust = () => {
    setShowAdjustRoadmap(false);
  };

  return (
    <div className="w-full font-primary py-6 relative">
      {/* Conditionally render Adjust Roadmap as full-screen canvas */}
      {showAdjustRoadmap ? (
        <AdjustRoadmapPage onBack={handleBackFromAdjust} />
      ) : (
        <>
          {/* Left Sidebar Navigation - Only show when NOT in adjust mode */}
          <RoadmapSidebar activeView={activeView} onViewChange={setActiveView} />
          
          {/* Main Content */}
          <div className="w-full">
            {activeView === 'user' ? (
              <PersonalRoadmapPage />
            ) : activeView === 'users' ? (
              <CommunityRoadmapPage />
            ) : activeView === 'roadmap' ? (
              <SuperRoadmapPage />
            ) : (
              <>
                {/* Header */}
                <RoadmapHeader
                  courseTitle={mockRoadmapData.courseTitle}
                  onMaster={() => console.log('Master clicked')}
                  onConvertToSuper={() => console.log('Convert to Super clicked')}
                  onAdjustRoadmap={handleAdjustRoadmap}
                />

                {/* Progress Card - Constrained width */}
                <div className="mb-8 max-w-sm">
                  <ProgressCard
                    progress={mockRoadmapData.progress}
                    progressText={mockRoadmapData.progressText}
                  />
                </div>

                {/* Timeline Content */}
                <div className="w-full">
                  <RoadmapTimeline sections={mockRoadmapData.sections} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RoadmapPage;

