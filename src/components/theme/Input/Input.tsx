/**
 * Delta Labs Input Component
 * Reusable input with label, error, and helper text
 */

import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  helperText, 
  success = false,
  size = 'md', 
  variant = 'default',
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = '', 
  ...props 
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'h-8 px-2 text-sm rounded-sm',
    md: 'h-10 px-3 text-sm rounded-md',
    lg: 'h-12 px-4 text-base rounded-lg',
  };

  const actualVariant = error ? 'error' : success ? 'success' : variant;
  
  const variantClasses: Record<string, string> = {
    default: 'border-border-primary focus:border-primary-500 focus:ring-primary-500',
    error: 'border-error-500 focus:border-error-500 focus:ring-error-500 bg-error-50',
    success: 'border-success-500 focus:border-success-500 focus:ring-success-500 bg-success-50',
    warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-500 bg-warning-50',
  };

  const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
  
  const inputClasses = [
    'delta-input delta-focus w-full rounded-lg border transition-all duration-200',
    sizeClasses[size],
    variantClasses[actualVariant],
    iconPadding,
    props.disabled && 'opacity-50 cursor-not-allowed bg-surface-secondary',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-left text-sm font-medium text-text-secondary mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">
            {leftIcon}
          </div>
        )}
        <input
          className={inputClasses}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary delta-transition"
            disabled={props.disabled}
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && (
        <div className="mt-1 flex items-center space-x-1">
          <svg className="w-4 h-4 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-error-500">{error}</p>
        </div>
      )}
      {success && !error && (
        <div className="mt-1 flex items-center space-x-1">
          <svg className="w-4 h-4 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-success-500">Looks good!</p>
        </div>
      )}
      {helperText && !error && !success && (
        <p className="mt-1 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
};

