/**
 * Delta Labs Textarea Component
 * Reusable textarea with label, error, and helper text
 * Follows the same pattern as Input component
 */

import * as React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  success = false,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-3 py-2.5 text-sm rounded-lg',
    lg: 'px-4 py-3 text-base rounded-lg',
  };

  const actualVariant = error ? 'error' : success ? 'success' : variant;

  const variantClasses: Record<string, string> = {
    default: 'border-border-primary focus:border-primary-500 focus:ring-primary-500',
    error: 'border-error-500 focus:border-error-500 focus:ring-error-500 bg-error-50',
    success: 'border-success-500 focus:border-success-500 focus:ring-success-500 bg-success-50',
    warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-500 bg-warning-50',
  };

  const textareaClasses = [
    'delta-textarea delta-focus w-full border transition-all duration-200 resize-none',
    sizeClasses[size],
    variantClasses[actualVariant],
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
      <textarea
        className={textareaClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
};

