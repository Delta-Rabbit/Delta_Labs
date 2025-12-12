/**
 * Delta Labs Exercise Sidebar Component
 * Contains Timer and Thinking Board
 */

import React, { useState, useRef, useEffect } from 'react';
import { Timer } from './Timer';
import { ThinkingBoard } from './ThinkingBoard';

type SidebarPosition = 'right' | 'bottom' | 'transparent';

interface ExerciseSidebarProps {
  timeRemaining: number; // in seconds
  totalTime: number; // in seconds
  isPaused: boolean;
  onPause: () => void;
  onExit: () => void;
  position: SidebarPosition;
  onPositionChange: (position: SidebarPosition) => void;
  onBottomHeightChange?: (height: number) => void;
  isFullScreen?: boolean;
}

export const ExerciseSidebar: React.FC<ExerciseSidebarProps> = ({
  timeRemaining,
  totalTime,
  isPaused,
  onPause,
  onExit,
  position,
  onPositionChange,
  onBottomHeightChange,
  isFullScreen = false,
}) => {
  const [bottomHeight, setBottomHeight] = useState(200); // Default height in pixels
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Notify parent of height changes
  useEffect(() => {
    if (position === 'bottom' && onBottomHeightChange) {
      onBottomHeightChange(bottomHeight);
    }
  }, [bottomHeight, position, onBottomHeightChange]);

  // Handle resize drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newHeight = window.innerHeight - e.clientY;
      const minHeight = 150;
      const maxHeight = window.innerHeight - 60 - 100; // Leave some space at top
      
      setBottomHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'right':
        return isFullScreen 
          ? 'fixed right-0 top-0 h-screen w-80'
          : 'fixed right-0 top-[60px] h-[calc(100vh-60px)] w-80';
      case 'bottom':
        return `fixed bottom-0 left-0 right-0 w-full`;
      case 'transparent':
        return isFullScreen
          ? 'fixed left-1/2 top-0 h-screen w-1/2 -translate-x-1/2 bg-gray-50/90 backdrop-blur-md border border-border-primary/50'
          : 'fixed left-1/2 top-[60px] h-[calc(100vh-60px)] w-1/2 -translate-x-1/2 bg-gray-50/90 backdrop-blur-md border border-border-primary/50';
      default:
        return isFullScreen
          ? 'fixed right-0 top-0 h-screen w-80'
          : 'fixed right-0 top-[60px] h-[calc(100vh-60px)] w-80';
    }
  };

  // Get flex direction based on position
  const getFlexDirection = () => {
    return position === 'bottom' ? 'flex-row' : 'flex-col';
  };

  return (
    <div 
      ref={sidebarRef}
      className={`${getPositionClasses()} ${position === 'bottom' ? 'border-t' : position !== 'transparent' ? 'border-l' : ''} ${position !== 'transparent' ? 'border-border-primary' : ''} flex ${getFlexDirection()} shadow-lg ${position === 'transparent' ? 'z-50' : 'z-40'} ${position !== 'transparent' ? 'bg-gray-50' : ''}`}
      style={position === 'bottom' ? { height: `${bottomHeight}px` } : undefined}
    >
      {/* Resize Handle - Top of bottom sidebar */}
      {position === 'bottom' && (
        <div 
          className="absolute top-0 left-0 right-0 h-2 cursor-row-resize hover:bg-[#174A5F]/20 transition-colors z-50 flex items-center justify-center group"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
          }}
        >
          <div className="w-12 h-1 bg-gray-400 rounded-full group-hover:bg-[#174A5F] transition-colors"></div>
        </div>
      )}

      {/* Position Controls - Top Right */}
      <div className="flex items-center justify-end gap-1 p-2 absolute top-0 right-0 z-50">
        {/* Right Position Button - Two vertical white lines on right */}
        <button 
          onClick={() => onPositionChange('right')}
          className={`w-10 h-6 rounded transition-colors ${
            position === 'right' 
              ? 'bg-[#174A5F]' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label="Position sidebar to right"
          title="Position sidebar to right"
        >
          <div className="relative w-full h-full flex items-center justify-end pr-1">
            <div className="w-0.5 h-4 bg-white rounded"></div>
            <div className="w-0.5 h-4 bg-white rounded ml-0.5"></div>
          </div>
        </button>
        
        {/* Bottom Position Button - Two horizontal white lines on bottom */}
        <button 
          onClick={() => onPositionChange('bottom')}
          className={`w-10 h-6 rounded transition-colors ${
            position === 'bottom' 
              ? 'bg-[#174A5F]' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label="Position sidebar to bottom"
          title="Position sidebar to bottom"
        >
          <div className="relative w-full h-full flex items-end justify-center pb-1">
            <div className="w-4 h-0.5 bg-white rounded"></div>
            <div className="w-4 h-0.5 bg-white rounded ml-0.5"></div>
          </div>
        </button>
        
        {/* Transparent Position Button - Single vertical dark gray line on right */}
        <button 
          onClick={() => onPositionChange('transparent')}
          className={`w-10 h-6 rounded transition-colors ${
            position === 'transparent' 
              ? 'bg-[#174A5F]' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label="Make sidebar transparent"
          title="Make sidebar transparent"
        >
          <div className="relative w-full h-full flex items-center justify-end pr-1">
            <div className="w-0.5 h-4 bg-gray-600 rounded"></div>
          </div>
        </button>
      </div>

      {/* Content Container */}
      <div className={`flex ${position === 'bottom' ? 'flex-row flex-1' : 'flex-col flex-1'} overflow-hidden`}>
        {/* Timer Section */}
        <div className={position === 'bottom' ? 'w-80 border-r border-border-primary' : ''}>
          <Timer
            timeRemaining={timeRemaining}
            totalTime={totalTime}
            isPaused={isPaused}
            onPause={onPause}
            onExit={onExit}
          />
        </div>

        {/* Thinking Board Section */}
        <div className={position === 'bottom' ? 'flex-1' : ''}>
          <ThinkingBoard />
        </div>
      </div>

      {/* Bottom Icons - Circular Buttons */}
      <div className="flex items-center justify-center gap-4 p-4 border-t border-border-primary mt-auto">
        <button className="w-10 h-10 rounded-full bg-[#174A5F] flex items-center justify-center text-white hover:bg-[#174A5F]/90 transition-colors" aria-label="Document" title="Document">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[#174A5F] hover:bg-gray-300 transition-colors" aria-label="Settings" title="Settings">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

