/**
 * Delta Labs Error Banner Component
 * Alert banner with variants
 */

import * as React from 'react';

interface ErrorBannerProps {
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
  className?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  type = 'error',
  onClose,
  className = '',
}) => {
  const typeClasses: Record<string, string> = {
    error: 'bg-red-100 border-red-200 text-red-600',
    warning: 'bg-warning-50 border-warning-200 text-warning-700',
    info: 'bg-info-50 border-info-200 text-info-700',
    success: 'bg-success-50 border-success-200 text-success-700',
  };

  const iconClasses: Record<string, string> = {
    error: 'text-white',
    warning: 'text-warning-500',
    info: 'text-info-500',
    success: 'text-success-500',
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg border ${typeClasses[type]} ${className}`}>
      <div className={`flex-shrink-0 ${iconClasses[type]}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${type === 'error' ? 'text-red-600' : ''}`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${iconClasses[type]} hover:opacity-75 delta-transition`}
          aria-label="Close banner"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

