/**
 * Delta Labs Modal Component
 * Reusable modal with backdrop, close buttons, and error banners
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeftIcon, CloseIcon } from '../DeltaIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  errorBanner?: {
    message: string;
    type?: 'error' | 'warning' | 'info' | 'success';
    onClose?: () => void;
  };
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  showBackButton = false,
  errorBanner,
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'max-w-md rounded-lg',
    md: 'max-w-lg rounded-lg',
    lg: 'max-w-2xl rounded-xl',
    xl: 'max-w-6xl rounded-xl',
    full: 'max-w-[95vw] w-full rounded-xl',
  };
  
  if (!isOpen) return null;
  
  // Render overlay and modal using portal to ensure they're above everything
  const modalContent = (
    <>
      {/* Full-page blur overlay - covers entire viewport including top header */}
      <div 
        className="fixed bg-black/50 backdrop-blur-sm"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          margin: 0,
          padding: 0
        }}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      {/* Modal container - centered with padding */}
      <div className="fixed inset-0 flex items-center justify-center p-6 sm:p-8" style={{ zIndex: 10000, pointerEvents: 'none' }}>
        <div className={`relative bg-surface-primary shadow-xl ${sizeClasses[size]} w-full ${size === 'full' ? 'h-[85vh]' : size === 'xl' ? 'max-h-[75vh]' : 'max-h-[90vh]'} overflow-hidden pointer-events-auto ${size === 'full' ? 'flex flex-col' : size === 'xl' ? 'flex flex-col' : ''}`}>
        {/* Header with Back Arrow and Close X - Figma Design */}
        <div className="flex items-center justify-between p-6 pb-0">
          {showBackButton ? (
            <ArrowLeftIcon
              size="md"
              color="neutral"
              colorIntensity={400}
              onClick={onClose}
              className="text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
              title="Go back"
              aria-label="Go back"
            />
          ) : (
            <div></div>
          )}
          <CloseIcon
            size="md"
            color="neutral"
            colorIntensity={400}
            onClick={onClose}
            className="text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
            title="Close modal"
            aria-label="Close modal"
          />
        </div>

        {/* Error Message - No Banner Background */}
        {errorBanner && (
          <div className="flex items-center justify-center px-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-error-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-error-500 text-sm font-medium">{errorBanner.message}</span>
              {errorBanner.onClose && (
                <button
                  onClick={errorBanner.onClose}
                  className="text-text-tertiary hover:text-text-secondary ml-2"
                  aria-label="Close error message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Title and Subtitle - Figma Design */}
        {title && (
          <div className="px-6 pt-6 text-center">
            <h2 className="text-xl font-semibold text-text-primary font-primary-semibold mb-2">{title}</h2>
            {subtitle && <p className="text-text-secondary text-sm">{subtitle}</p>}
          </div>
        )}
        
        {/* Content */}
        <div className={`px-6 pt-4 ${size === 'full' || size === 'xl' ? 'flex-1 overflow-hidden min-h-0 flex flex-col pb-3' : 'pb-4 overflow-y-auto max-h-[calc(90vh-200px)]'}`}>
          {children}
        </div>
        </div>
      </div>
    </>
  );
  
  // Use portal to render at document body level, ensuring it's above everything
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
};

