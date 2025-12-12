/**
 * Delta Labs Fast Summary - AI Summary Generation Page
 * Full-page AI-powered interface for generating summaries
 */

import React, { useState } from 'react';
import { DeltaButton } from '../../../../../../../components/theme';

interface GenerateSummaryViewProps {
  onBack: () => void;
}

type GenerationStep = 'input' | 'generating' | 'preview';

const GenerateSummaryView = ({ onBack }: GenerateSummaryViewProps) => {
  const [step, setStep] = useState<GenerationStep>('input');
  const [prompt, setPrompt] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState('');
  const [generatedSummary, setGeneratedSummary] = useState({
    title: '',
    content: '',
  });

  // Mock roadmaps - replace with actual data
  const roadmaps = [
    { id: '1', name: 'Physics: Core Topics', course: 'Physics 101' },
    { id: '2', name: 'Advanced Mechanics', course: 'Physics 201' },
    { id: '3', name: 'Quantum Physics Basics', course: 'Physics 301' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedRoadmap) return;

    setStep('generating');

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedSummary({
        title: 'AI Generated Summary: ' + roadmaps.find(r => r.id === selectedRoadmap)?.name,
        content: `Based on your prompt: "${prompt}"\n\nThis is a comprehensive summary covering the key concepts and topics. The AI has analyzed the roadmap and generated relevant content that addresses your specific requirements.\n\nKey Points:\n• Fundamental concepts explained clearly\n• Practical examples and applications\n• Important formulas and principles\n• Common misconceptions addressed\n\nThis summary provides a solid foundation for understanding the subject matter and can serve as a quick reference guide for future study.`,
      });
      setStep('preview');
    }, 2000);
  };

  const handleSave = () => {
    console.log('Saving summary:', generatedSummary);
    // TODO: Implement actual save logic
    onBack();
  };

  const handleRegenerate = () => {
    setStep('input');
    setGeneratedSummary({ title: '', content: '' });
  };

  return (
    <div className="w-full h-full bg-white font-primary pt-6 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-primary">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Summary Generator
            </h1>
            <p className="text-sm text-text-secondary mt-1">Create intelligent summaries powered by AI</p>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            step === 'input' ? 'bg-primary-50 text-primary-700' : 'bg-surface-secondary text-text-secondary'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'input' ? 'bg-primary-600 text-white' : 'bg-surface-tertiary'
            }`}>1</span>
            Input
          </div>
          <div className="w-8 h-px bg-border-primary"></div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            step === 'generating' ? 'bg-primary-50 text-primary-700' : 'bg-surface-secondary text-text-secondary'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'generating' ? 'bg-primary-600 text-white' : 'bg-surface-tertiary'
            }`}>2</span>
            Generate
          </div>
          <div className="w-8 h-px bg-border-primary"></div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            step === 'preview' ? 'bg-primary-50 text-primary-700' : 'bg-surface-secondary text-text-secondary'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 'preview' ? 'bg-primary-600 text-white' : 'bg-surface-tertiary'
            }`}>3</span>
            Preview
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Input Step */}
        {(step === 'input' || step === 'generating') && (
          <div className="space-y-8 animate-fadeIn">
            {/* AI Prompt Section */}
            <div>
              <label className="block text-lg font-bold text-text-primary mb-2">What would you like to summarize?</label>
              <p className="text-sm text-text-secondary mb-3">Describe the topic or provide specific instructions for the AI</p>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={step === 'generating'}
                placeholder="Example: Create a comprehensive summary covering the fundamental principles of thermodynamics, including the laws, key concepts, and practical applications..."
                className="w-full h-48 px-4 py-3 border border-border-primary rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none text-text-primary placeholder-text-tertiary disabled:bg-surface-secondary disabled:text-text-secondary"
              />
              <p className="mt-2 text-xs text-text-tertiary">
                Be specific for better results. The AI will generate content based on your instructions.
              </p>
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
                className="min-w-[140px]"
              >
                {step !== 'generating' && (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Summary
                  </>
                )}
                {step === 'generating' && 'Generating...'}
              </DeltaButton>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === 'preview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Success Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Summary Generated</h3>
                <p className="text-sm text-green-700">Review your AI-generated summary below</p>
              </div>
            </div>

            {/* Generated Summary Preview */}
            <div className="border border-border-primary rounded-lg p-6">
              <h2 className="text-2xl font-bold text-text-primary mb-4">{generatedSummary.title}</h2>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-text-primary leading-relaxed">
                  {generatedSummary.content}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Save Summary
              </button>
              
              <button
                onClick={handleRegenerate}
                className="px-6 py-2.5 border border-border-primary hover:bg-surface-secondary text-text-primary font-medium rounded-lg transition-colors"
              >
                Regenerate
              </button>

              <button
                onClick={onBack}
                className="px-6 py-2.5 border border-border-primary hover:bg-surface-secondary text-text-primary font-medium rounded-lg transition-colors ml-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GenerateSummaryView;
