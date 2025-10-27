/**
 * Delta Labs Forgot Password Form Component
 * Enterprise-grade password recovery with email verification
 * Part of the authentication flow for Delta Labs platform
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput, 
  DeltaCard
} from '../../../../components/theme';
import type { 
  ForgotPasswordData, 
  FormErrors 
} from '../../types';
import { 
  validateForm, 
  hasErrors, 
  sanitizeFormData,
  authValidationRules 
} from '../../utils/validation';

// ============================================================================
// FORGOT PASSWORD FORM INTERFACES
// ============================================================================

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
  onSwitchToLogin?: () => void;
  onSwitchToRegister?: () => void;
  onClose?: () => void;
}

// ============================================================================
// FORGOT PASSWORD FORM COMPONENT
// ============================================================================

/**
 * ForgotPasswordForm Component
 * 
 * @description Professional password recovery form with email-based reset
 * 
 * @features
 * - Email or phone number recovery
 * - Success state with email confirmation
 * - Error handling and display
 * - Loading states
 * - Theme-aware styling
 * - Accessibility support
 * - Navigation helpers
 * 
 * @usage
 * ```tsx
 * <ForgotPasswordForm
 *   onSubmit={handleForgotPassword}
 *   isLoading={isLoading}
 *   error={error}
 *   success={forgotPasswordSuccess}
 *   onSwitchToLogin={() => setShowLogin(true)}
 *   onSwitchToRegister={() => setShowRegister(true)}
 *   onClose={handleClose}
 * />
 * ```
 */
export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  success = false,
  onSwitchToLogin,
  onSwitchToRegister,
  onClose,
}) => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
    
    const sanitizedData = sanitizeFormData(formData);
    const validationErrors = validateForm(sanitizedData, {
      email: authValidationRules.email,
    });
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    
    // For UI testing: just show success state without API call
    if (onSubmit) {
      try {
        await onSubmit(sanitizedData as ForgotPasswordData);
      } catch (error) {
        // Error is handled by parent component
      }
    } else {
      // Simulate success for UI testing
      setTimeout(() => {
        // Success state is controlled by parent
      }, 500);
    }
  }, [formData, onSubmit]);

  // Success State - Email Sent Confirmation
  if (success) {
    return (
      <DeltaCard padding="lg" shadow="lg" className="w-full max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h2 className="text-2xl font-primary-bold text-text-primary mb-2">
              Check Your Email
            </h2>
            <p className="text-text-secondary">
              We've sent a password reset link to <strong>{formData.email}</strong>
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-text-tertiary">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            {onSwitchToLogin && (
              <DeltaButton
                variant="outline"
                size="md"
                onClick={onSwitchToLogin}
                className="w-full"
              >
                Back to Sign In
              </DeltaButton>
            )}
          </div>
        </div>
      </DeltaCard>
    );
  }

  // Main Form - Email Input
  return (
    <DeltaCard padding="none" shadow="none" className="w-full">
      <div className="px-3 pb-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <p className="text-error-700 text-sm">{error}</p>
          </div>
        )}

        {/* Email Field */}
        <DeltaInput
          label="Email or phone number"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email || undefined}
          placeholder="mail@abc.com"
          size="lg"
          disabled={isLoading}
          className="w-full"
        />

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Sending...' : 'Recover'}
        </DeltaButton>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-primary"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface-primary text-text-tertiary">Or Sign in with</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-text-secondary text-sm">
            Not Registered Yet?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary-500 hover:text-primary-600 font-medium delta-transition"
              disabled={isLoading}
            >
              Create an account
            </button>
          </p>
        </div>
      </form>
      </div>
    </DeltaCard>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ForgotPasswordForm;

