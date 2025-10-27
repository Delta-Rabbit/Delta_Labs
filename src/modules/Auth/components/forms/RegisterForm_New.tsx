/**
 * Delta Labs Registration Form Component
 * Step 1: Collect Name and Username
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput,
  DeltaCard
} from '../../../../components/theme';

// ============================================================================
// REGISTER FORM INTERFACES
// ============================================================================

interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
  onSocialAuth?: (provider: string) => void;
}

// ============================================================================
// REGISTER FORM COMPONENT
// ============================================================================

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onSwitchToLogin,
  onSocialAuth,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    username: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      validationErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      validationErrors.lastName = 'Last name is required';
    }
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error is handled by parent component
    }
  }, [formData, onSubmit]);

  return (
    <DeltaCard padding="none" shadow="none" className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <p className="text-error-700 text-sm">{error}</p>
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <DeltaInput
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName || undefined}
            placeholder="Abel"
            size="md"
            disabled={isLoading}
          />
          <DeltaInput
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName || undefined}
            placeholder="Bekele"
            size="md"
            disabled={isLoading}
          />
        </div>

        {/* Username Field */}
        <DeltaInput
          label="User Name"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username || undefined}
          placeholder="Enter User Name"
          size="md"
          disabled={isLoading}
        />

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Creating Account...' : 'Next →'}
        </DeltaButton>

        {/* Social Auth Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-primary" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface-primary text-text-tertiary">
              Or Sign up with
            </span>
          </div>
        </div>

        {/* Social Auth Icons */}
        <div className="flex justify-center space-x-3">
          {onSocialAuth && (
            <>
              <button
                type="button"
                onClick={() => onSocialAuth('Google')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign up with Google"
                aria-label="Sign up with Google"
              >
                <img src="/assets/icons/google.svg" alt="Google" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => onSocialAuth('Apple')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign up with Apple"
                aria-label="Sign up with Apple"
              >
                <img src="/assets/icons/apple.svg" alt="Apple" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => onSocialAuth('GitHub')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign up with GitHub"
                aria-label="Sign up with GitHub"
              >
                <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => onSocialAuth('Facebook')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign up with Facebook"
                aria-label="Sign up with Facebook"
              >
                <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Switch to Login */}
        {onSwitchToLogin && (
          <div className="text-center pt-4 border-t border-border-primary">
            <p className="text-text-secondary text-sm">
              Already Registered?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary-500 hover:text-primary-600 font-medium delta-transition"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </form>
    </DeltaCard>
  );
};

export default RegisterForm;

