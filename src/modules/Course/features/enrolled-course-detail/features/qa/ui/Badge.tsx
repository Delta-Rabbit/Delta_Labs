/**
 * Badge Atom Component
 * Displays status badges with different variants
 */

import React from 'react';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 border-green-200',
  error: 'bg-error-50 text-error-600 border-error-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  secondary: 'bg-surface-secondary text-text-secondary border-border-primary',
};

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'secondary',
  className = '' 
}) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-lg border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};


