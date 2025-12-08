/**
 * Delta Labs Exercise Home Page
 * Starting page with Exercise and Test cards
 */

import React from 'react';
import { ExerciseCard } from '../components';

interface HomePageProps {
  onExerciseClick: () => void;
  onTestClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onExerciseClick,
  onTestClick,
}) => {
  return (
    <div className="w-full font-primary">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-text-primary mb-6 pb-2 border-b-2 border-primary-600 inline-block font-primary">
        Home
      </h1>

      {/* Exercise and Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExerciseCard
          type="exercise"
          title="Exercise"
          description="Take this physics exercise prepared by school of haramaya."
          onContinue={onExerciseClick}
        />
        <ExerciseCard
          type="test"
          title="Test"
          description="Take this physics test prepared by school of haramaya."
          isLive={true}
          onContinue={onTestClick}
        />
      </div>
    </div>
  );
};

