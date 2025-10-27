/**
 * Delta Labs Checkbox Component
 * Reusable checkbox with label and error states
 */

import * as React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label,
  error = false,
  helperText,
  size = 'md',
  indeterminate = false,
  className = '',
  id,
  ...props 
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const checkboxClasses = [
    sizeClasses[size],
    'border-2 border-border-primary rounded',
    'cursor-pointer accent-[#174A5F]',
    'hover:accent-[#133E4F]',
    'focus:ring-2 focus:ring-[#174A5F] focus:ring-offset-2 focus:outline-none',
    'hover:border-border-secondary transition-colors duration-150',
    error && 'border-error-500 accent-error-500 focus:ring-error-500',
    className,
  ].filter(Boolean).join(' ');

  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center space-x-2">
          <input
            id={inputId}
            type="checkbox"
            className={checkboxClasses}
            ref={(el) => {
              if (el && indeterminate) {
                el.indeterminate = true;
              }
            }}
            {...props}
          />
          <label htmlFor={inputId} className="text-sm text-text-secondary">
            {label}
          </label>
        </div>
      )}
      {!label && (
        <input
          id={inputId}
          type="checkbox"
          className={checkboxClasses}
          ref={(el) => {
            if (el && indeterminate) {
              el.indeterminate = true;
            }
          }}
          {...props}
        />
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-tertiary">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-error-500">Please check this box</p>
      )}
    </div>
  );
};

