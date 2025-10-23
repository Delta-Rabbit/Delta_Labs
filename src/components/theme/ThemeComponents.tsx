/**
 * Delta Labs Component Theme System - Simplified Version
 * Reusable, theme-aware components with consistent styling
 */

import * as React from 'react';

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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
  const baseClasses = 'delta-button delta-transition font-primary-medium';
  
  const variantClasses: Record<string, string> = {
    primary: 'delta-button-primary text-white',
    secondary: 'delta-button-secondary text-text-primary',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
    ghost: 'text-primary-500 hover:bg-primary-50',
    danger: 'bg-error-500 text-white hover:bg-error-600',
  };
  
  const sizeClasses: Record<string, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
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

// ============================================================================
// INPUT COMPONENT
// ============================================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  helperText, 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'h-8 px-2 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };
  
  const inputClasses = [
    'delta-input delta-focus',
    sizeClasses[size],
    error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
};

// ============================================================================
// CARD COMPONENT
// ============================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md', 
  shadow = 'base',
  hover = false 
}) => {
  const paddingClasses: Record<string, string> = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const shadowClasses: Record<string, string> = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow-base',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const classes = [
    'delta-card',
    paddingClasses[padding],
    shadowClasses[shadow],
    hover && 'delta-hover-lift',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

// ============================================================================
// MODAL COMPONENT
// ============================================================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div className={`relative bg-surface-primary rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4`}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border-primary">
            <h2 className="text-xl font-semibold text-text-primary font-primary-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-tertiary hover:text-text-primary delta-transition"
              title="Close modal"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// BADGE COMPONENT
// ============================================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variantClasses: Record<string, string> = {
    default: 'bg-neutral-100 text-neutral-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    info: 'bg-info-100 text-info-800',
  };
  
  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const classes = [
    'inline-flex items-center rounded-full font-medium',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };
  
  const colorClasses: Record<string, string> = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    white: 'text-white',
  };
  
  const classes = [
    'animate-spin',
    sizeClasses[size],
    colorClasses[color],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <svg className={classes} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
};

// ============================================================================
// THEME TOGGLE COMPONENT
// ============================================================================

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const handleToggle = () => {
    // Simple theme toggle - you can integrate with your theme context later
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg delta-transition hover:bg-surface-secondary ${className}`}
      title="Toggle theme"
    >
      <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </button>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Button as DeltaButton,
  Input as DeltaInput,
  Card as DeltaCard,
  Modal as DeltaModal,
  Badge as DeltaBadge,
  Spinner as DeltaSpinner,
  ThemeToggle as DeltaThemeToggle,
};