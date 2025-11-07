/**
 * Delta Labs Preview Modal Component
 * Modal for previewing different content types (audio, video, document)
 */

import React from 'react';
import { DeltaModal } from '../../../../../../components/theme';
import { DocumentEditor } from '../../../../components/common';

export interface CourseContentItem {
  id: string;
  type: 'document' | 'video' | 'audio';
  title: string;
  description: string;
  tags: string[];
}

export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: CourseContentItem | null;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, content }) => {
  if (!content) return null;

  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center justify-center min-h-full py-8 font-primary">
        {content.type === 'audio' ? (
          <div className="bg-surface-primary rounded-lg p-6 max-w-2xl w-full shadow-lg">
            {/* Album Art/Visual */}
            <div className="w-full aspect-square bg-gradient-to-br from-teal-100 to-green-100 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-16 h-16 bg-warning-200 rounded-full"></div>
                <div className="absolute top-8 right-8 w-12 h-12 bg-info-200 rounded-full"></div>
                <div className="absolute bottom-6 left-1/2 w-20 h-20 bg-white rounded-full"></div>
              </div>
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 bg-surface-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-text-secondary mb-2 font-primary">
                <span>20:43</span>
                <span>38:53</span>
              </div>
              <div className="relative h-1 bg-surface-secondary rounded-full">
                <div className="absolute left-0 top-0 h-full bg-success-600 rounded-full" style={{ width: '54%' }}></div>
                <div className="absolute left-[54%] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-success-600 rounded-full"></div>
              </div>
            </div>

            {/* Title and Author */}
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-text-primary mb-1 font-primary">{content.title}</h3>
              <p className="text-sm text-text-secondary font-primary">
                By {content.description.split(' ').slice(0, 2).join(' ') || 'Unknown Author'}
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4">
              <button aria-label="Playback speed" className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary font-primary">
                <span className="text-sm font-medium">1x</span>
              </button>
              <button aria-label="Rewind 10 seconds" className="w-12 h-12 rounded-full border-2 border-border-primary flex items-center justify-center text-text-secondary hover:text-text-primary relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="absolute text-xs font-medium">10</span>
              </button>
              <button aria-label="Play/Pause" className="w-16 h-16 bg-success-600 rounded-lg flex items-center justify-center text-white hover:bg-success-700 shadow-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              </button>
              <button aria-label="Fast forward 30 seconds" className="w-12 h-12 rounded-full border-2 border-border-primary flex items-center justify-center text-text-secondary hover:text-text-primary relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="absolute text-xs font-medium">30</span>
              </button>
              <button aria-label="Closed captions" className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary border border-border-primary rounded font-primary">
                <span className="text-xs font-medium">CC</span>
              </button>
            </div>
          </div>
        ) : content.type === 'video' ? (
          <div className="bg-gray-900 rounded-lg overflow-hidden max-w-6xl mx-auto w-full">
            {/* Title Bar */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-medium font-primary">{content.title}</h3>
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-300"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Display Area */}
            <div className="relative bg-black aspect-video flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-primary">{content.title}</p>
                </div>
              </div>
            </div>

            {/* Control Bar */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-4">
              <button aria-label="Play/Pause" className="text-white hover:text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <div className="flex-1 h-1 bg-gray-700 rounded-full relative">
                <div className="absolute left-0 top-0 h-full bg-white rounded-full" style={{ width: '25%' }}></div>
                <div className="absolute left-[25%] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
              </div>
              <button aria-label="Volume" className="text-white hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343a9 9 0 000 12.728" />
                </svg>
              </button>
              <button aria-label="Settings" className="text-white hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface-primary rounded-lg overflow-hidden w-full h-full">
            {/* Document Header */}
            <div className="border-b border-border-primary px-6 py-4">
              <h3 className="text-2xl font-bold text-text-primary mb-2 font-primary">{content.title}</h3>
              {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-surface-secondary text-text-secondary px-3 py-1 rounded-full font-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Document Editor */}
            <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
              <DocumentEditor
                content={[
                  { id: '1', type: 'paragraph', content: content.description || 'Start editing your document...' }
                ]}
                onSave={(blocks) => {
                  console.log('Document saved:', blocks);
                }}
                readOnly={false}
              />
            </div>
          </div>
        )}
      </div>
    </DeltaModal>
  );
};

export default PreviewModal;

