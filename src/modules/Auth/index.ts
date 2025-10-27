/**
 * Delta Labs Auth Module - Main Index
 * Professional authentication module exports
 */

// ============================================================================
// CONTEXT EXPORTS
// ============================================================================

export { 
  AuthProvider, 
  useAuth,
  DeltaAuthProvider,
  useDeltaAuth 
} from './context/AuthContext';

// ============================================================================
// COMPONENT EXPORTS
// ============================================================================

// Forms
export {
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
} from './components/forms';

// Modals
export {
  AuthModal,
  AuthModalManager,
  useAuthModal,
} from './components/modals/AuthModal';


// Social Auth
export {
  socialAuthProviders,
  SocialAuthButton,
  SocialAuthGrid,
  SocialAuthDivider,
  SocialAuthSection,
  SocialAuthModal,
} from './components/providers/SocialAuth';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  User,
  UserPreferences,
  NotificationSettings,
  PrivacySettings,
  UserRole,
  AuthState,
  AuthContextValue,
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  AuthResponse,
  ApiError,
  AuthModalType,
  AuthModalProps,
  ValidationRule,
  FormValidation,
  FormErrors,
  SocialAuthProvider,
  AuthProviderConfig,
  UseAuthReturn,
  UseFormValidationReturn,
  TokenPayload,
  AuthStorage,
  AuthScreenProps,
} from './types';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export {
  validateField,
  validateForm,
  hasErrors,
  getFirstError,
  sanitizeFormData,
  createFormData,
  calculatePasswordStrength,
  isValidEmail,
  normalizeEmail,
  isValidUsername,
  generateUsernameSuggestion,
  authValidationRules,
} from './utils/validation';

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

// All exports are available as named exports above
