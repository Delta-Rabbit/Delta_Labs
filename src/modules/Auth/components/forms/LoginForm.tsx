/**
 * Delta Labs Login Form Component
 * Enterprise-grade sign-in form with theme integration
 * Part of the authentication flow for Delta Labs platform
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput,
  DeltaCard,
  DeltaCheckbox
} from '../../../../components/theme';
import type { 
  LoginCredentials, 
  FormErrors 
} from '../../types';
import { 
  validateForm, 
  hasErrors, 
  sanitizeFormData,
  authValidationRules 
} from '../../utils/validation';

// ============================================================================
// LOGIN FORM INTERFACES
// ============================================================================

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
  onSocialAuth?: (provider: string) => void;
}

// ============================================================================
// LOGIN FORM COMPONENT
// ============================================================================

/**
 * LoginForm Component
 * 
 * @description Professional sign-in form with email/password authentication
 * 
 * @features
 * - Email and password validation
 * - Remember me functionality
 * - Password visibility toggle
 * - Error handling and display
 * - Loading states
 * - Theme-aware styling
 * - Accessibility support
 * 
 * @usage
 * ```tsx
 * <LoginForm
 *   onSubmit={handleLogin}
 *   isLoading={isLoading}
 *   error={error}
 *   onSwitchToRegister={() => setShowRegister(true)}
 *   onSwitchToForgotPassword={() => setShowForgotPassword(true)}
 * />
 * ```
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onSwitchToRegister,
  onSwitchToForgotPassword,
  onSocialAuth,
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      password: authValidationRules.password,
    });
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await onSubmit(sanitizedData as LoginCredentials);
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

        {/* Email Field */}
        <DeltaInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email || undefined}
          placeholder="Enter your email"
          size="md"
          disabled={isLoading}
        />

        {/* Password Field */}
        <div className="relative">
          <DeltaInput
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password || undefined}
            placeholder="Enter your password"
            size="md"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-text-tertiary hover:text-text-primary delta-transition"
            disabled={isLoading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <DeltaCheckbox
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            label="Remember me"
            size="md"
            disabled={isLoading}
          />
          
          {onSwitchToForgotPassword && (
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-sm text-primary-500 hover:text-primary-600 delta-transition whitespace-nowrap"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          )}
        </div>

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </DeltaButton>

        {/* Divider */}
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
          {onSocialAuth && (
            <>
              <button
                type="button"
                onClick={() => onSocialAuth('Google')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign in with Google"
                aria-label="Sign in with Google"
              >
                <img src="/assets/icons/google.svg" alt="Google" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => onSocialAuth('Apple')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign in with Apple"
                aria-label="Sign in with Apple"
              >
                <img src="/assets/icons/apple.svg" alt="Apple" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => onSocialAuth('GitHub')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign in with GitHub"
                aria-label="Sign in with GitHub"
              >
                <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => onSocialAuth('Facebook')}
                className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full hover:bg-surface-secondary transition-colors"
                disabled={isLoading}
                title="Sign in with Facebook"
                aria-label="Sign in with Facebook"
              >
                <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Switch to Register */}
        {onSwitchToRegister && (
          <div className="text-center pt-4 border-t border-border-primary">
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
        )}
      </form>
    </DeltaCard>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default LoginForm;

