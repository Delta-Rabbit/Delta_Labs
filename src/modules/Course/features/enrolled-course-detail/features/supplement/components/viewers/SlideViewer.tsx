import React, { useState } from 'react';
import type { SupplementResource } from '../../types';

interface SlideViewerProps {
  resource: SupplementResource;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ resource }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 12;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-gray-900 rounded-xl overflow-hidden shadow-2xl relative">
        {/* Main Slide Area */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
            <div className="aspect-[16/9] h-full bg-white rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
                    <p className="text-xl text-gray-600">{resource.chapter}</p>
                    <div className="mt-12 text-gray-400">Slide {currentSlide} Content Placeholder</div>
                </div>
                {/* Mock slide Content */}
                <div className="absolute inset-0 border-[16px] border-white pointer-events-none"></div>
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                disabled={currentSlide === 1}
                className="absolute left-4 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
                disabled={currentSlide === totalSlides}
                className="absolute right-4 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="h-24 bg-black/40 flex items-center gap-4 px-8 overflow-x-auto border-t border-white/10">
            {Array.from({ length: totalSlides }).map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx + 1)}
                    className={`h-16 aspect-[16/9] rounded border-2 transition-all flex-shrink-0 bg-white items-center justify-center flex text-xs font-bold text-gray-400 ${currentSlide === idx + 1 ? 'border-[#40C4FF] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                >
                    {idx + 1}
                </button>
            ))}
        </div>
    </div>
  );
};
