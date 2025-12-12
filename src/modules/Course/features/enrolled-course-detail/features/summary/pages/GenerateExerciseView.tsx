
import React, { useState } from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface GenerateExerciseViewProps {
  onBack: () => void;
  onTakeExercise: (exerciseData: any) => void;
}

export const GenerateExerciseView = ({ onBack, onTakeExercise }: GenerateExerciseViewProps) => {
  const [step, setStep] = useState<'input' | 'generating'>('input');
  const [prompt, setPrompt] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  const roadmaps = [
    { id: '1', name: 'Introduction to React' },
    { id: '2', name: 'State Management' },
    { id: '3', name: 'Advanced Hooks' },
    { id: '4', name: 'Performance Optimization' },
  ];

  const handleGenerate = () => {
    setStep('generating');
    // Simulate AI generation
    setTimeout(() => {
      onTakeExercise({ 
        topic: prompt, 
        roadmapId: selectedRoadmap 
      });
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-white font-primary pt-6 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-primary">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Generate Fast Exercise</h1>
            <p className="text-sm text-text-secondary mt-1">Create a custom exercise with AI</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <div className="space-y-8 animate-fadeIn">
          {/* AI Prompt Section */}
          <div>
            <label className="block text-lg font-bold text-text-primary mb-2">What topic do you want to practice?</label>
            <p className="text-sm text-text-secondary mb-3">Describe the topic or specific concepts you want to be tested on</p>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={step === 'generating'}
              placeholder="Example: Create a quiz about React useEffect hook dependencies and cleanup functions..."
              className="w-full h-48 px-4 py-3 border border-border-primary rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none text-text-primary placeholder-text-tertiary disabled:bg-surface-secondary disabled:text-text-secondary"
            />
          </div>

          {/* Roadmap Selection */}
          <div>
            <label className="block text-lg font-bold text-text-primary mb-2">Select Context</label>
            <p className="text-sm text-text-secondary mb-3">Choose the course or roadmap context</p>
            
            <div className="flex flex-wrap gap-3">
              {roadmaps.map((roadmap) => (
                <button
                  key={roadmap.id}
                  onClick={() => setSelectedRoadmap(roadmap.id)}
                  disabled={step === 'generating'}
                  className={`px-4 py-2 rounded-md font-medium text-sm border transition-colors ${
                    selectedRoadmap === roadmap.id
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-text-primary border-border-primary hover:bg-surface-secondary'
                  } ${step === 'generating' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {roadmap.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-start">
            <DeltaButton
              onClick={handleGenerate}
              disabled={!prompt.trim() || !selectedRoadmap || step === 'generating'}
              loading={step === 'generating'}
              variant="primary"
              size="lg"
              className="min-w-[170px]"
            >
              {step !== 'generating' && (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Exercise
                </>
              )}
              {step === 'generating' && 'Generating...'}
            </DeltaButton>
          </div>
        </div>
      </div>
    </div>
  );
};
