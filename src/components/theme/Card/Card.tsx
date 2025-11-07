/**
 * Delta Labs Card Component
 * Reusable card container with variants
 */

import * as React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  variant?: 'default' | 'course'; // Course variant for course cards
  border?: boolean; // Show border
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md', 
  shadow = 'base',
  hover = false,
  variant = 'default',
  border = false,
}) => {
  const paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-4 rounded-lg', // Using theme border radius (0.5rem = 8px)
    md: 'p-6 rounded-lg', // Using theme border radius (0.5rem = 8px)
    lg: 'p-8 rounded-xl', // Using theme border radius (0.75rem = 12px)
  };
  
  const shadowClasses: Record<string, string> = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow-md', // Theme shadow-base maps to shadow-md in Tailwind
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl',
  };

  const variantClasses: Record<string, string> = {
    default: 'bg-surface-primary',
    course: 'bg-surface-primary border border-border-primary', // Course card variant
  };

  const hoverClasses = hover ? 'hover:shadow-xl transition-all transition-normal ease-ease' : '';
  const borderClass = border && variant !== 'course' ? 'border border-border-primary' : '';
  
  const classes = [
    'delta-card',
    'w-full',
    'overflow-hidden',
    'rounded-lg',
    'font-primary',
    variantClasses[variant],
    borderClass,
    paddingClasses[padding],
    shadowClasses[shadow],
    hoverClasses,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};
