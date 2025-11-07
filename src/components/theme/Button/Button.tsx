/**
 * Delta Labs Button Component
 * Reusable, theme-aware button with variants
 */

import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'unroll';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all transition-normal ease-ease focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-primary';
  
  const variantClasses: Record<string, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 rounded-lg',
    secondary: 'bg-secondary-500 text-primary-500 hover:bg-secondary-600 focus:ring-primary-500 rounded-lg',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500 rounded-lg',
    ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500 rounded-lg',
    danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 rounded-lg',
    unroll: 'px-3 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-primary rounded-lg hover:bg-surface-secondary focus:ring-primary-500', // Unroll button variant
  };
  
  const sizeClasses: Record<string, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };

  // Unroll variant has its own sizing, so don't apply size classes
  const shouldApplySize = variant !== 'unroll';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    shouldApplySize && sizeClasses[size],
    loading && 'opacity-50 cursor-not-allowed',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
