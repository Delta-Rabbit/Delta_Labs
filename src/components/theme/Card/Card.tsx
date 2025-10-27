/**
 * Delta Labs Card Component
 * Reusable card container
 */

import * as React from 'react';

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
    sm: 'p-4 rounded-md',
    md: 'p-6 rounded-lg',
    lg: 'p-8 rounded-xl',
  };
  
  const shadowClasses: Record<string, string> = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow-md',
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl',
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

