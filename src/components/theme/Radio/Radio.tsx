/**
 * Delta Labs Radio Button Component
 * Reusable radio button for groups
 */

import * as React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  name: string;
  value: string;
}

export const Radio: React.FC<RadioProps> = ({ 
  label,
  error = false,
  helperText,
  size = 'md',
  name,
  value,
  className = '',
  id,
  ...props 
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const radioClasses = [
    sizeClasses[size],
    'border-2 border-border-primary',
    'cursor-pointer accent-[#174A5F]',
    'hover:accent-[#133E4F]',
    'focus:ring-2 focus:ring-[#174A5F] focus:ring-offset-2 focus:outline-none',
    'hover:border-border-secondary transition-colors duration-150',
    error && 'border-error-500 accent-error-500 focus:ring-error-500',
    className,
  ].filter(Boolean).join(' ');

  const inputId = id || `radio-${name}-${value}`;

  return (
    <div className="flex items-center space-x-2">
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        className={radioClasses}
        {...props}
      />
      {label && (
        <label htmlFor={inputId} className="text-sm text-text-secondary">
          {label}
        </label>
      )}
      {helperText && !label && (
        <p className="text-sm text-text-tertiary">{helperText}</p>
      )}
      {error && label && (
        <p className="text-sm text-error-500">Please select an option</p>
      )}
    </div>
  );
};

