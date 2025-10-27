/**
 * Delta Labs Social Authentication Components
 * Professional social login providers with theme integration
 */

import React from 'react';
import { DeltaButton } from '../../../../components/theme';
import type { SocialAuthProvider } from '../../types';

// ============================================================================
// SOCIAL AUTH PROVIDER CONFIGURATION
// ============================================================================

const socialAuthProviders: SocialAuthProvider[] = [
  {
    name: 'Google',
    icon: '/assets/icons/google.svg',
    color: '#4285F4',
    login: async () => {
      // Implement Google OAuth
      console.log('Google login clicked');
    },
  },
  {
    name: 'Apple',
    icon: '/assets/icons/apple.svg',
    color: '#000000',
    login: async () => {
      // Implement Apple OAuth
      console.log('Apple login clicked');
    },
  },
  {
    name: 'GitHub',
    icon: '/assets/icons/git-hub-logo.svg',
    color: '#333333',
    login: async () => {
      // Implement GitHub OAuth
      console.log('GitHub login clicked');
    },
  },
  {
    name: 'Facebook',
    icon: '/assets/icons/facebook.svg',
    color: '#1877F2',
    login: async () => {
      // Implement Facebook OAuth
      console.log('Facebook login clicked');
    },
  },
];

// ============================================================================
// SOCIAL AUTH BUTTON COMPONENT
// ============================================================================

interface SocialAuthButtonProps {
  provider: SocialAuthProvider;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onClick,
  disabled = false,
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'h-10 px-3',
    md: 'h-12 px-4',
    lg: 'h-14 px-6',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${sizeClasses[size]}
          w-full flex items-center justify-center
          border border-border-primary rounded-lg
          bg-surface-primary hover:bg-surface-secondary
          delta-transition
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        style={{ borderColor: provider.color }}
      >
        <img
          src={provider.icon}
          alt={provider.name}
          className={`${iconSizes[size]} mr-3`}
        />
        <span className="text-text-primary font-medium">
          {provider.name}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        w-full flex items-center justify-center
        border border-border-primary rounded-lg
        bg-surface-primary hover:bg-surface-secondary
        delta-transition
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <img
        src={provider.icon}
        alt={provider.name}
        className={`${iconSizes[size]} mr-3`}
      />
      <span className="text-text-primary font-medium">
        Continue with {provider.name}
      </span>
    </button>
  );
};

// ============================================================================
// SOCIAL AUTH GRID COMPONENT
// ============================================================================

interface SocialAuthGridProps {
  onProviderClick: (provider: SocialAuthProvider) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'icons-only';
  providers?: SocialAuthProvider[];
}

const SocialAuthGrid: React.FC<SocialAuthGridProps> = ({
  onProviderClick,
  disabled = false,
  size = 'md',
  variant = 'default',
  providers = socialAuthProviders,
}) => {
  if (variant === 'icons-only') {
    return (
      <div className="flex items-center justify-center space-x-2">
        {providers.map((provider) => (
          <button
            key={provider.name}
            onClick={() => onProviderClick(provider)}
            disabled={disabled}
            className="
              w-12 h-12 flex items-center justify-center
              border border-border-primary rounded-full
              bg-surface-primary hover:bg-surface-secondary
              delta-transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            title={`Continue with ${provider.name}`}
          >
            <img
              src={provider.icon}
              alt={provider.name}
              className="w-6 h-6"
            />
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {providers.map((provider) => (
          <SocialAuthButton
            key={provider.name}
            provider={provider}
            onClick={() => onProviderClick(provider)}
            disabled={disabled}
            size={size}
            variant="compact"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <SocialAuthButton
          key={provider.name}
          provider={provider}
          onClick={() => onProviderClick(provider)}
          disabled={disabled}
          size={size}
          variant="default"
        />
      ))}
    </div>
  );
};

// ============================================================================
// SOCIAL AUTH DIVIDER COMPONENT
// ============================================================================

interface SocialAuthDividerProps {
  text?: string;
}

const SocialAuthDivider: React.FC<SocialAuthDividerProps> = ({
  text = 'Or continue with',
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border-primary" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-surface-primary text-text-tertiary">
          {text}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// SOCIAL AUTH SECTION COMPONENT
// ============================================================================

interface SocialAuthSectionProps {
  onProviderClick: (provider: SocialAuthProvider) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'icons-only';
  showDivider?: boolean;
  dividerText?: string;
  providers?: SocialAuthProvider[];
}

const SocialAuthSection: React.FC<SocialAuthSectionProps> = ({
  onProviderClick,
  disabled = false,
  size = 'md',
  variant = 'default',
  showDivider = true,
  dividerText = 'Or continue with',
  providers = socialAuthProviders,
}) => {
  return (
    <div className="space-y-4">
      {showDivider && <SocialAuthDivider text={dividerText} />}
      <SocialAuthGrid
        onProviderClick={onProviderClick}
        disabled={disabled}
        size={size}
        variant={variant}
        providers={providers}
      />
    </div>
  );
};

// ============================================================================
// SOCIAL AUTH MODAL COMPONENT
// ============================================================================

interface SocialAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProviderClick: (provider: SocialAuthProvider) => void;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
}

const SocialAuthModal: React.FC<SocialAuthModalProps> = ({
  isOpen,
  onClose,
  onProviderClick,
  disabled = false,
  title = 'Choose Sign In Method',
  subtitle = 'Select your preferred way to sign in',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-surface-primary rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-primary-semibold text-text-primary">
              {title}
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              {subtitle}
            </p>
          </div>
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

        <SocialAuthSection
          onProviderClick={onProviderClick}
          disabled={disabled}
          size="lg"
          variant="default"
          showDivider={false}
        />
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  socialAuthProviders,
  SocialAuthButton,
  SocialAuthGrid,
  SocialAuthDivider,
  SocialAuthSection,
  SocialAuthModal,
};
