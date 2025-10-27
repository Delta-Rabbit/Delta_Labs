/**
 * Delta Labs Create Password Form Component
 * Step 5: Create password for registration
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput,
  DeltaCard
} from '../../../../components/theme';

// ============================================================================
// CREATE PASSWORD FORM INTERFACES
// ============================================================================

interface CreatePasswordData {
  newPassword: string;
  confirmPassword: string;
}

interface CreatePasswordFormProps {
  onSubmit: (data: CreatePasswordData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// ============================================================================
// CREATE PASSWORD FORM COMPONENT
// ============================================================================

export const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [formData, setFormData] = useState<CreatePasswordData>({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    
    if (!formData.newPassword || formData.newPassword.length < 6) {
      validationErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
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

        {/* New Password Field */}
        <div className="relative">
          <DeltaInput
            label="Password"
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={handleInputChange}
            error={errors.newPassword || undefined}
            placeholder="Enter your password"
            size="md"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-8 text-text-tertiary hover:text-text-primary delta-transition"
            disabled={isLoading}
            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
          >
            {showNewPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <DeltaInput
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword || undefined}
            placeholder="Confirm your password"
            size="md"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-text-tertiary hover:text-text-primary delta-transition"
            disabled={isLoading}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Completing...' : 'Complete Signup'}
        </DeltaButton>

        {/* Social Auth Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-primary" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface-primary text-text-tertiary">
              Or Sign in with
            </span>
          </div>
        </div>

        {/* Social Auth Icons */}
        <div className="flex justify-center space-x-3">
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign in with Google"
            aria-label="Sign in with Google"
          >
            <img src="/assets/icons/google.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign in with Apple"
            aria-label="Sign in with Apple"
          >
            <img src="/assets/icons/apple.svg" alt="Apple" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign in with GitHub"
            aria-label="Sign in with GitHub"
          >
            <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign in with Facebook"
            aria-label="Sign in with Facebook"
          >
            <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center pt-4 border-t border-border-primary">
          <p className="text-text-secondary text-sm">
            Already Registered ?{' '}
            <button
              type="button"
              className="text-primary-500 hover:text-primary-600 font-medium delta-transition"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </DeltaCard>
  );
};

export default CreatePasswordForm;

