/**
 * Delta Labs Auth Module - TypeScript Definitions
 * Enterprise-grade authentication types and interfaces
 */

// ============================================================================
// AUTH USER TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showLastSeen: boolean;
}

export type UserRole = 'student' | 'instructor' | 'admin' | 'super_admin';

// ============================================================================
// AUTH STATE TYPES
// ============================================================================

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

export interface AuthContextValue extends AuthState {
  // Authentication methods
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  
  // Social authentication
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  
  // Password management
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  
  // Email verification
  sendVerificationEmail: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  
  // User management
  updateProfile: (userData: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  // Utility methods
  clearError: () => void;
}

// ============================================================================
// AUTH FORM TYPES
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToMarketing?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DateOfBirthData {
  day: string;
  month: string;
  year: string;
}

// ============================================================================
// AUTH RESPONSE TYPES
// ============================================================================

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ApiError {
  message: string;
  code: string;
  field?: string;
  details?: Record<string, any>;
}

// ============================================================================
// AUTH MODAL TYPES
// ============================================================================

export type AuthModalType = 'login' | 'register' | 'forgot-password' | 'verify-code' | 'create-account' | 'create-password' | 'date-of-birth';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: AuthModalType;
  onSuccess?: (user: User) => void;
  redirectTo?: string;
}

// ============================================================================
// AUTH FORM VALIDATION TYPES
// ============================================================================

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormValidation {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string | null;
}

// ============================================================================
// AUTH PROVIDER TYPES
// ============================================================================

export interface SocialAuthProvider {
  name: string;
  icon: string;
  color: string;
  login: () => Promise<void>;
}

export interface AuthProviderConfig {
  google: {
    clientId: string;
    redirectUri: string;
  };
  apple: {
    clientId: string;
    redirectUri: string;
  };
  github: {
    clientId: string;
    redirectUri: string;
  };
  facebook: {
    appId: string;
    redirectUri: string;
  };
}

// ============================================================================
// AUTH HOOK TYPES
// ============================================================================

export interface UseAuthReturn extends AuthContextValue {}

export interface UseFormValidationReturn {
  errors: FormErrors;
  validate: (field: string, value: any) => string | null;
  validateAll: (data: Record<string, any>) => FormErrors;
  isValid: boolean;
  clearErrors: () => void;
}

// ============================================================================
// AUTH UTILITY TYPES
// ============================================================================

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthStorage {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  expiresAt: number | null;
}

// ============================================================================
// AUTH SCREEN TYPES
// ============================================================================

export interface AuthScreenProps {
  onSuccess?: (user: User) => void;
  redirectTo?: string;
  showBackButton?: boolean;
  title?: string;
  subtitle?: string;
}

// ============================================================================
// EXPORTS
// ============================================================================

// Types are already exported individually above


