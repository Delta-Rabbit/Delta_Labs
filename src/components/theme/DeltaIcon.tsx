/**
 * Delta Labs Icon Component
 * Consistent icon system using design tokens
 * Supports multiple sizes, styles, and animations
 */

import React from 'react';

// ============================================================================
// ICON PROPS INTERFACE
// ============================================================================

export interface DeltaIconProps {
  // Icon content (SVG path, React component, or string)
  children?: React.ReactNode;
  
  // Size variants using design tokens
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  
  // Stroke width variants
  strokeWidth?: 'thin' | 'base' | 'medium' | 'thick';
  
  // Icon style variants
  style?: 'outline' | 'filled' | 'duotone';
  
  // Animation variants
  animation?: 'none' | 'spin' | 'pulse' | 'bounce' | 'ping';
  
  // Color variants
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  colorIntensity?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  
  // Additional props
  className?: string;
  onClick?: () => void;
  title?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

// ============================================================================
// ICON COMPONENT
// ============================================================================

export const DeltaIcon: React.FC<DeltaIconProps> = ({
  children,
  size = 'base',
  strokeWidth = 'base',
  style = 'outline',
  animation = 'none',
  color = 'neutral',
  colorIntensity = 500,
  className = '',
  onClick,
  title,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = false,
}) => {
  // Generate CSS classes using Tailwind classes
  const sizeClass = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    base: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12',
    '3xl': 'w-16 h-16',
  }[size];
  
  const strokeClass = {
    thin: 'stroke-1',
    base: 'stroke-[1.5]',
    medium: 'stroke-2',
    thick: 'stroke-[2.5]',
  }[strokeWidth];
  
  const animationClass = animation !== 'none' ? {
    spin: 'animate-spin',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    ping: 'animate-ping',
  }[animation] : '';
  
  // Color classes based on Tailwind
  const colorClass = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-500',
    neutral: 'text-gray-500',
  }[color];
  
  // Style-specific classes
  const styleClass = style === 'filled' ? 'fill-current' : 'fill-none';
  
  // Interactive classes
  const interactiveClass = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity duration-150' : '';
  
  // Combine all classes
  const combinedClassName = [
    'inline-flex items-center justify-center',
    sizeClass,
    strokeClass,
    animationClass,
    colorClass,
    styleClass,
    interactiveClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <svg
      className={combinedClassName}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ? 'true' : 'false'}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </svg>
  );
};

// ============================================================================
// COMMON ICON COMPONENTS
// ============================================================================

// Close Icon
export const CloseIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </DeltaIcon>
);

// Arrow Left Icon
export const ArrowLeftIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </DeltaIcon>
);

// Arrow Right Icon
export const ArrowRightIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </DeltaIcon>
);

// Eye Icon (Show Password)
export const EyeIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </DeltaIcon>
);

// Eye Off Icon (Hide Password)
export const EyeOffIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </DeltaIcon>
);

// Check Icon
export const CheckIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </DeltaIcon>
);

// Loading Spinner Icon
export const LoadingIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props} animation="spin">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </DeltaIcon>
);

// Error Icon
export const ErrorIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props} color="error">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </DeltaIcon>
);

// Success Icon
export const SuccessIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props} color="success">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </DeltaIcon>
);

// Warning Icon
export const WarningIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props} color="warning">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </DeltaIcon>
);

// Info Icon
export const InfoIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props} color="info">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </DeltaIcon>
);

// ============================================================================
// SOCIAL AUTH ICONS
// ============================================================================

// Google Icon
export const GoogleIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </DeltaIcon>
);

// Apple Icon
export const AppleIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </DeltaIcon>
);

// GitHub Icon
export const GitHubIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </DeltaIcon>
);

// Facebook Icon
export const FacebookIcon: React.FC<Omit<DeltaIconProps, 'children'>> = (props) => (
  <DeltaIcon {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </DeltaIcon>
);

// ============================================================================
// EXPORTS
// ============================================================================

export default DeltaIcon;
