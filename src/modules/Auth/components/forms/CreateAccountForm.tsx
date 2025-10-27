/**
 * Delta Labs Create Account Form
 * Step 3: Collect Phone and Email
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput,
  DeltaCard
} from '../../../../components/theme';

// ============================================================================
// CREATE ACCOUNT FORM INTERFACES
// ============================================================================

interface CreateAccountData {
  phone: string;
  email: string;
}

interface CreateAccountFormProps {
  onSubmit: (data: CreateAccountData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
  onSocialAuth?: (provider: string) => void;
}

// ============================================================================
// CREATE ACCOUNT FORM COMPONENT
// ============================================================================

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onSwitchToLogin,
  onSocialAuth,
}) => {
  const [formData, setFormData] = useState<CreateAccountData>({
    phone: '',
    email: '',
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
    
    if (!formData.phone.trim()) {
      validationErrors.phone = 'Phone number is required';
    }
    if (!formData.email || !formData.email.includes('@')) {
      validationErrors.email = 'Please enter a valid email address';
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
      <form onSubmit={handleSubmit} className="space-y-6 px-3 pb-6">
        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <p className="text-error-700 text-sm">{error}</p>
          </div>
        )}

        {/* Phone Field */}
        <DeltaInput
          label="Phone number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone || undefined}
          placeholder="Enter Your Phone Number"
          size="md"
          disabled={isLoading}
        />

        {/* Email Field */}
        <DeltaInput
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email || undefined}
          placeholder="Enter Your Email Address"
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
          {isLoading ? 'Sending verification...' : 'Send verification'}
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
              Already Registered ?{' '}
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

export default CreateAccountForm;

