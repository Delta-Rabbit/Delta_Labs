/**
 * Delta Labs Verification Code Form Component
 * Verify code sent via email or SMS for password reset
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput,
  DeltaCard,
  DeltaRadio
} from '../../../../components/theme';

// ============================================================================
// VERIFICATION CODE FORM INTERFACES
// ============================================================================

interface VerificationCodeFormProps {
  onSubmit: (code: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onResend?: () => void;
  resendTimer?: number;
  deliveryMethod?: 'sms' | 'email';
  onDeliveryMethodChange?: (method: 'sms' | 'email') => void;
}

// ============================================================================
// VERIFICATION CODE FORM COMPONENT
// ============================================================================

export const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onResend,
  resendTimer = 0,
  deliveryMethod = 'sms',
  onDeliveryMethodChange,
}) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    
    // Clear error when user starts typing
    if (codeError) {
      setCodeError(null);
    }
  }, [codeError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || code.trim().length === 0) {
      setCodeError('Please enter the verification code');
      return;
    }
    
    try {
      await onSubmit(code);
    } catch (error) {
      // Error is handled by parent component
    }
  }, [code, onSubmit]);

  return (
    <DeltaCard padding="none" shadow="none" className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6 px-3 pb-6">
        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <p className="text-error-700 text-sm">{error}</p>
          </div>
        )}

        {/* Verification Code Field */}
        <DeltaInput
          label="Verification code"
          value={code}
          onChange={handleCodeChange}
          error={codeError || undefined}
          placeholder="Enter Code"
          size="md"
          disabled={isLoading}
        />

        {/* Resend Timer */}
        <div className="text-center">
          <p className="text-sm text-text-tertiary">
            {resendTimer > 0 ? (
              `Resend verification in ${resendTimer}sec`
            ) : (
              onResend && (
                <button
                  type="button"
                  onClick={onResend}
                  className="text-primary-500 hover:text-primary-600 font-medium delta-transition"
                  disabled={isLoading}
                >
                  Resend code
                </button>
              )
            )}
          </p>
        </div>

        {/* Delivery Method Selection */}
        {onDeliveryMethodChange && (
          <div className="space-y-3">
            <DeltaRadio
              name="delivery"
              value="sms"
              checked={deliveryMethod === 'sms'}
              onChange={(e) => onDeliveryMethodChange(e.target.value as 'sms')}
              label="SMS"
              size="md"
              disabled={isLoading}
            />
            <DeltaRadio
              name="delivery"
              value="email"
              checked={deliveryMethod === 'email'}
              onChange={(e) => onDeliveryMethodChange(e.target.value as 'email')}
              label="Email"
              size="md"
              disabled={isLoading}
            />
          </div>
        )}

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Verifying...' : 'Send code'}
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
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign up with Google"
            aria-label="Sign up with Google"
          >
            <img src="/assets/icons/google.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign up with Apple"
            aria-label="Sign up with Apple"
          >
            <img src="/assets/icons/apple.svg" alt="Apple" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign up with GitHub"
            aria-label="Sign up with GitHub"
          >
            <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
            disabled={isLoading}
            title="Sign up with Facebook"
            aria-label="Sign up with Facebook"
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

export default VerificationCodeForm;

