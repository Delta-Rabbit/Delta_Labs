/**
 * Delta Labs Timer Component
 * Displays countdown timer with pause and exit controls
 */

import React from 'react';

interface TimerProps {
  timeRemaining: number; // in seconds
  totalTime: number; // in seconds
  isPaused: boolean;
  onPause: () => void;
  onExit: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  totalTime,
  isPaused,
  onPause,
  onExit,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = ((totalTime - timeRemaining) / totalTime) * 100;

  return (
    <div className="p-4 border-b border-border-primary bg-gray-50">
      <h3 className="text-sm font-bold text-text-primary mb-3">Timer</h3>
      
      {/* Clock Display */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-12 h-12">
          <svg className="w-6 h-6 text-[#174A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-xl font-bold text-text-primary font-mono">
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-300 rounded-full mb-3 overflow-hidden">
        <div 
          className="h-full bg-[#174A5F] transition-all duration-1000"
          style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` } as React.CSSProperties}
        ></div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPause}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-border-primary rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-text-primary"
        >
          {isPaused ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause
            </>
          )}
        </button>
        <button
          onClick={onExit}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-border-primary rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-text-primary"
          aria-label="Exit exercise"
          title="Exit exercise"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exit
        </button>
      </div>
    </div>
  );
};

