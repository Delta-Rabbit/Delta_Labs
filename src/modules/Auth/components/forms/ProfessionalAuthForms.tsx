/**
 * Delta Labs Professional Auth Module - Enterprise Implementation
 * 100% Theme System Integration - Every Component Uses Design Tokens
 */

import React, { useState, useCallback } from 'react';
import { 
  DeltaButton, 
  DeltaInput, 
  DeltaCard, 
  DeltaSpinner,
  DeltaModal,
  DeltaBadge 
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
// PROFESSIONAL LOGIN FORM - 100% THEME INTEGRATION
// ============================================================================

interface ProfessionalLoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export const ProfessionalLoginForm: React.FC<ProfessionalLoginFormProps> = ({
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
    <DeltaCard 
      padding="lg" 
      shadow="xl" 
      className="w-full max-w-md mx-auto"
      hover={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-primary-bold text-text-primary">
            Login to Your Account
          </h2>
          <p className="text-text-secondary font-secondary-normal">
            Learn more and do more
          </p>
        </div>

        {/* Professional Error Display */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-error-700 font-secondary-medium text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Professional Email Field */}
        <div className="space-y-2">
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
        </div>

        {/* Professional Password Field */}
        <div className="space-y-2">
          <div className="relative">
            <DeltaInput
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password || undefined}
              placeholder="Enter your password"
              size="lg"
              disabled={isLoading}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-text-tertiary hover:text-text-primary delta-transition p-1"
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
        </div>

        {/* Professional Options Row */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-border-primary rounded focus:ring-primary-500 focus:ring-2 delta-transition"
              disabled={isLoading}
            />
            <span className="text-text-secondary font-secondary-normal text-sm group-hover:text-text-primary delta-transition">
              Remember me
            </span>
          </label>
          
          {onSwitchToForgotPassword && (
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-primary-500 hover:text-primary-600 font-secondary-medium text-sm delta-transition"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          )}
        </div>

        {/* Professional Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="xl"
          loading={isLoading}
          className="w-full font-primary-semibold"
        >
          {isLoading ? 'Signing In...' : 'Login'}
        </DeltaButton>

        {/* Professional Social Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-primary" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface-primary text-text-tertiary font-secondary-normal">
              Or Sign in with
            </span>
          </div>
        </div>

        {/* Professional Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 h-12 px-4 border border-border-primary rounded-lg bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
            <span className="text-text-primary font-secondary-medium text-sm">Google</span>
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 h-12 px-4 border border-border-primary rounded-lg bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/assets/icons/apple.svg" alt="Apple" className="w-5 h-5" />
            <span className="text-text-primary font-secondary-medium text-sm">Apple</span>
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 h-12 px-4 border border-border-primary rounded-lg bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" className="w-5 h-5" />
            <span className="text-text-primary font-secondary-medium text-sm">GitHub</span>
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 h-12 px-4 border border-border-primary rounded-lg bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
            <span className="text-text-primary font-secondary-medium text-sm">Facebook</span>
          </button>
        </div>

        {/* Professional Registration Link */}
        {onSwitchToRegister && (
          <div className="text-center pt-4 border-t border-border-primary">
            <p className="text-text-secondary font-secondary-normal text-sm">
              Not Registered Yet?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary-500 hover:text-primary-600 font-secondary-semibold delta-transition"
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
// PROFESSIONAL REGISTER FORM - 100% THEME INTEGRATION
// ============================================================================

interface ProfessionalRegisterFormProps {
  onSubmit: (userData: RegisterData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}

export const ProfessionalRegisterForm: React.FC<ProfessionalRegisterFormProps> = ({
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

  const getPasswordStrengthBg = (strength: string) => {
    switch (strength) {
      case 'weak': return 'bg-error-500';
      case 'fair': return 'bg-warning-500';
      case 'good': return 'bg-info-500';
      case 'strong': return 'bg-success-500';
      default: return 'bg-neutral-200';
    }
  };

  return (
    <DeltaCard 
      padding="lg" 
      shadow="xl" 
      className="w-full max-w-md mx-auto"
      hover={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-primary-bold text-text-primary">
            Create Your Account
          </h2>
          <p className="text-text-secondary font-secondary-normal">
            Learn More, Do More
          </p>
        </div>

        {/* Professional Error Display */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-error-700 font-secondary-medium text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Professional Name Fields */}
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

        {/* Professional Username Field */}
        <DeltaInput
          label="User Name"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username || undefined}
          placeholder="Enter User Name"
          size="lg"
          disabled={isLoading}
        />

        {/* Professional Password Field with Strength Indicator */}
        <div className="space-y-3">
          <div className="relative">
            <DeltaInput
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password || undefined}
              placeholder="Create a strong password"
              size="lg"
              disabled={isLoading}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-text-tertiary hover:text-text-primary delta-transition p-1"
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

          {/* Professional Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary font-secondary-normal text-sm">Password strength:</span>
                <DeltaBadge 
                  variant={passwordStrength.strength === 'strong' ? 'success' : 
                          passwordStrength.strength === 'good' ? 'info' :
                          passwordStrength.strength === 'fair' ? 'warning' : 'error'}
                  size="sm"
                >
                  {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                </DeltaBadge>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthBg(passwordStrength.strength)}`}
                  style={{ width: `${Math.min((passwordStrength.score / 7) * 100, 100)}%` }}
                />
              </div>
              {passwordStrength.feedback.length > 0 && (
                <div className="text-xs text-text-tertiary font-secondary-normal">
                  {passwordStrength.feedback.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professional Confirm Password Field */}
        <div className="relative">
          <DeltaInput
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword || undefined}
            placeholder="Confirm your password"
            size="lg"
            disabled={isLoading}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-10 text-text-tertiary hover:text-text-primary delta-transition p-1"
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

        {/* Professional Terms and Marketing */}
        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-border-primary rounded focus:ring-primary-500 focus:ring-2 mt-1 delta-transition"
              disabled={isLoading}
            />
            <span className="text-text-secondary font-secondary-normal text-sm group-hover:text-text-primary delta-transition">
              I agree to the{' '}
              <a href="/terms" className="text-primary-500 hover:text-primary-600 font-secondary-semibold delta-transition">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-500 hover:text-primary-600 font-secondary-semibold delta-transition">
                Privacy Policy
              </a>
            </span>
          </label>
          
          {errors.agreeToTerms && (
            <p className="text-error-500 font-secondary-medium text-sm">{errors.agreeToTerms}</p>
          )}
          
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agreeToMarketing"
              checked={formData.agreeToMarketing}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-border-primary rounded focus:ring-primary-500 focus:ring-2 mt-1 delta-transition"
              disabled={isLoading}
            />
            <span className="text-text-secondary font-secondary-normal text-sm group-hover:text-text-primary delta-transition">
              I'd like to receive updates and marketing communications
            </span>
          </label>
        </div>

        {/* Professional Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="xl"
          loading={isLoading}
          className="w-full font-primary-semibold"
        >
          {isLoading ? 'Creating Account...' : 'Next →'}
        </DeltaButton>

        {/* Professional Social Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-primary" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface-primary text-text-tertiary font-secondary-normal">
              Or Sign up with
            </span>
          </div>
        </div>

        {/* Professional Social Buttons */}
        <div className="flex justify-center space-x-3">
          <button
            type="button"
            disabled={isLoading}
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with Google"
          >
            <img src="/assets/icons/google.svg" alt="Google" className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with Apple"
          >
            <img src="/assets/icons/apple.svg" alt="Apple" className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with GitHub"
          >
            <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            disabled={isLoading}
            className="w-12 h-12 flex items-center justify-center border border-border-primary rounded-full bg-surface-primary hover:bg-surface-secondary delta-transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign up with Facebook"
          >
            <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* Professional Login Link */}
        {onSwitchToLogin && (
          <div className="text-center pt-4 border-t border-border-primary">
            <p className="text-text-secondary font-secondary-normal text-sm">
              Already Registered?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary-500 hover:text-primary-600 font-secondary-semibold delta-transition"
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
  ProfessionalLoginForm,
  ProfessionalRegisterForm,
};
