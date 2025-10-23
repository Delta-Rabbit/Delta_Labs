/**
 * Delta Labs Auth Form Components
 * Professional authentication forms with theme integration
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput, 
  DeltaCard, 
  DeltaSpinner 
} from '../../../components/theme/ThemeComponents';
import { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData,
  FormErrors 
} from '../types';
import { 
  validateForm, 
  hasErrors, 
  sanitizeFormData,
  calculatePasswordStrength,
  authValidationRules 
} from '../utils/validation';

// ============================================================================
// LOGIN FORM COMPONENT
// ============================================================================

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onSwitchToRegister,
  onSwitchToForgotPassword,
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
    <DeltaCard padding="lg" shadow="lg" className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-primary-bold text-text-primary mb-2">
            Welcome Back
          </h2>
          <p className="text-text-secondary">
            Sign in to your Delta Labs account
          </p>
        </div>

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
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-border-primary rounded focus:ring-primary-500"
              disabled={isLoading}
            />
            <span className="ml-2 text-sm text-text-secondary">Remember me</span>
          </label>
          
          {onSwitchToForgotPassword && (
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-sm text-primary-500 hover:text-primary-600 delta-transition"
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

        {/* Switch to Register */}
        {onSwitchToRegister && (
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary-500 hover:text-primary-600 font-medium delta-transition"
                disabled={isLoading}
              >
                Create one
              </button>
            </p>
          </div>
        )}
      </form>
    </DeltaCard>
  );
};

// ============================================================================
// REGISTER FORM COMPONENT
// ============================================================================

interface RegisterFormProps {
  onSubmit: (userData: RegisterData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = calculatePasswordStrength(formData.password);

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
    const validationErrors = validateForm(sanitizedData, authValidationRules);
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await onSubmit(sanitizedData as RegisterData);
    } catch (error) {
      // Error is handled by parent component
    }
  }, [formData, onSubmit]);

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'text-error-500';
      case 'fair': return 'text-warning-500';
      case 'good': return 'text-info-500';
      case 'strong': return 'text-success-500';
      default: return 'text-text-tertiary';
    }
  };

  return (
    <DeltaCard padding="lg" shadow="lg" className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-primary-bold text-text-primary mb-2">
            Create Account
          </h2>
          <p className="text-text-secondary">
            Join Delta Labs and start learning
          </p>
        </div>

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
            placeholder="John"
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
            placeholder="Doe"
            size="md"
            disabled={isLoading}
          />
        </div>

        {/* Email Field */}
        <DeltaInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email || undefined}
          placeholder="john.doe@example.com"
          size="md"
          disabled={isLoading}
        />

        {/* Username Field */}
        <DeltaInput
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username || undefined}
          placeholder="johndoe"
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
            placeholder="Create a strong password"
            size="md"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-text-tertiary hover:text-text-primary delta-transition"
            disabled={isLoading}
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

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Password strength:</span>
              <span className={`text-sm font-medium ${getPasswordStrengthColor(passwordStrength.strength)}`}>
                {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength.strength === 'weak' ? 'bg-error-500' :
                  passwordStrength.strength === 'fair' ? 'bg-warning-500' :
                  passwordStrength.strength === 'good' ? 'bg-info-500' :
                  'bg-success-500'
                }`}
                style={{ width: `${(passwordStrength.score / 7) * 100}%` }}
              />
            </div>
            {passwordStrength.feedback.length > 0 && (
              <div className="text-xs text-text-tertiary">
                {passwordStrength.feedback.join(', ')}
              </div>
            )}
          </div>
        )}

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

        {/* Terms and Marketing */}
        <div className="space-y-3">
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-border-primary rounded focus:ring-primary-500 mt-1"
              disabled={isLoading}
            />
            <span className="ml-2 text-sm text-text-secondary">
              I agree to the{' '}
              <a href="/terms" className="text-primary-500 hover:text-primary-600 delta-transition">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-500 hover:text-primary-600 delta-transition">
                Privacy Policy
              </a>
            </span>
          </label>
          
          {errors.agreeToTerms && (
            <p className="text-error-500 text-sm">{errors.agreeToTerms}</p>
          )}
          
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToMarketing"
              checked={formData.agreeToMarketing}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-border-primary rounded focus:ring-primary-500 mt-1"
              disabled={isLoading}
            />
            <span className="ml-2 text-sm text-text-secondary">
              I'd like to receive updates and marketing communications
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </DeltaButton>

        {/* Switch to Login */}
        {onSwitchToLogin && (
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              Already have an account?{' '}
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

// ============================================================================
// FORGOT PASSWORD FORM COMPONENT
// ============================================================================

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
  onSwitchToLogin?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  success = false,
  onSwitchToLogin,
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
    
    try {
      await onSubmit(sanitizedData as ForgotPasswordData);
    } catch (error) {
      // Error is handled by parent component
    }
  }, [formData, onSubmit]);

  if (success) {
    return (
      <DeltaCard padding="lg" shadow="lg" className="w-full max-w-md">
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

  return (
    <DeltaCard padding="lg" shadow="lg" className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-primary-bold text-text-primary mb-2">
            Reset Password
          </h2>
          <p className="text-text-secondary">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

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
          placeholder="Enter your email address"
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
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </DeltaButton>

        {/* Switch to Login */}
        {onSwitchToLogin && (
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              Remember your password?{' '}
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

// ============================================================================
// EXPORTS
// ============================================================================

export {
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
};
