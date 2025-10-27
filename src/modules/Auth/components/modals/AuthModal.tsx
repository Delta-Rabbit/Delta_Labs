/**
 * Delta Labs Auth Modal
 * Professional authentication modal with complete flow management
 */

import React, { useState, useCallback } from 'react';
import { DeltaModal, DeltaErrorBanner } from '../../../../components/theme';
import { 
  LoginForm, 
  RegisterForm, 
  ForgotPasswordForm,
  CreateAccountForm,
  CreatePasswordForm
} from '../forms';
import { DateOfBirthForm } from '../forms/DateOfBirthForm';
import { VerificationCodeForm } from '../forms/VerificationCodeForm';
import { 
  SocialAuthSection 
} from '../providers/SocialAuth';
import type { 
  AuthModalType, 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData,
  DateOfBirthData,
  SocialAuthProvider 
} from '../../types';
import { useAuth } from '../../context/AuthContext';

// ============================================================================
// AUTH MODAL PROPS
// ============================================================================

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: AuthModalType;
  onSuccess?: (user: any) => void;
  redirectTo?: string;
}

// ============================================================================
// AUTH MODAL COMPONENT
// ============================================================================

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'login',
  onSuccess,
  redirectTo,
}) => {
  const [currentType, setCurrentType] = useState<AuthModalType>(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  
  // Forgot password flow state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [resendTimer, setResendTimer] = useState(40);
  const [deliveryMethod, setDeliveryMethod] = useState<'sms' | 'email'>('sms');

  const { 
    login, 
    register, 
    forgotPassword,
    loginWithGoogle,
    loginWithApple,
    loginWithGitHub,
    loginWithFacebook,
    clearError 
  } = useAuth();

  // ============================================================================
  // MODAL MANAGEMENT
  // ============================================================================

  const handleClose = useCallback(() => {
    setCurrentType(defaultType);
    setError(null);
    setForgotPasswordSuccess(false);
    setShowBackButton(false);
    clearError();
    onClose();
  }, [defaultType, onClose, clearError]);

  const switchToType = useCallback((type: AuthModalType) => {
    setCurrentType(type);
    setError(null);
    setForgotPasswordSuccess(false);
    setShowBackButton(false);
    clearError();
  }, [clearError]);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    setShowBackButton(false);
    
    try {
      await login(credentials);
      onSuccess?.(credentials);
      handleClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'user name or password is incorrect';
      setError(errorMessage);
      setShowBackButton(true);
    } finally {
      setIsLoading(false);
    }
  }, [login, onSuccess, handleClose]);

  const handleRegister = useCallback(async (userData: any) => {
    setIsLoading(true);
    setError(null);
    setShowBackButton(false);
    
    try {
      // For UI testing: navigate to date-of-birth
      setCurrentType('date-of-birth');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      setShowBackButton(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateAccount = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For UI testing: navigate to verify-code
      setCurrentType('verify-code');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreatePassword = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success - close modal and go to login
      handleClose();
      setTimeout(() => setCurrentType('login'), 500);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create password');
    } finally {
      setIsLoading(false);
    }
  }, [handleClose]);

  const handleForgotPassword = useCallback(async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For UI testing, just navigate to verify-code modal
      setForgotPasswordEmail(data.email);
      setCurrentType('verify-code');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVerificationCode = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setVerificationCode(code);
      // For UI testing, navigate to create-password
      setCurrentType('create-password');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleResetPassword = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success - close modal and go to login
      handleClose();
      setTimeout(() => setCurrentType('login'), 500);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  }, [handleClose]);

  const handleDateOfBirth = useCallback(async (data: DateOfBirthData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For UI testing: navigate to create-account
      setCurrentType('create-account');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save date of birth');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // SOCIAL AUTH HANDLERS
  // ============================================================================

  const handleSocialAuth = useCallback(async (provider: SocialAuthProvider) => {
    setIsLoading(true);
    setError(null);
    
    try {
      switch (provider.name) {
        case 'Google':
          await loginWithGoogle();
          break;
        case 'Apple':
          await loginWithApple();
          break;
        case 'GitHub':
          await loginWithGitHub();
          break;
        case 'Facebook':
          await loginWithFacebook();
          break;
        default:
          throw new Error(`Unsupported provider: ${provider.name}`);
      }
      
      onSuccess?.(provider);
      handleClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : `${provider.name} login failed`);
    } finally {
      setIsLoading(false);
    }
  }, [loginWithGoogle, loginWithApple, loginWithGitHub, loginWithFacebook, onSuccess, handleClose]);

  // ============================================================================
  // MODAL CONTENT RENDERER
  // ============================================================================

  const renderModalContent = () => {
    switch (currentType) {
      case 'login':
        return (
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
            onSwitchToRegister={() => switchToType('register')}
            onSwitchToForgotPassword={() => switchToType('forgot-password')}
            onSocialAuth={(provider) => handleSocialAuth(provider as any)}
          />
        );

      case 'register':
        return (
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error}
            onSwitchToLogin={() => switchToType('login')}
            onSocialAuth={(provider) => handleSocialAuth(provider as any)}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            isLoading={isLoading}
            error={error}
            success={forgotPasswordSuccess}
            onSwitchToLogin={() => switchToType('login')}
            onSwitchToRegister={() => switchToType('register')}
            onClose={handleClose}
          />
        );

      case 'date-of-birth':
        return (
          <div className="space-y-6">
            <DateOfBirthForm
              onSubmit={handleDateOfBirth}
              isLoading={isLoading}
              error={error}
              onSwitchToLogin={() => switchToType('login')}
            />
            
            <SocialAuthSection
              onProviderClick={handleSocialAuth}
              disabled={isLoading}
              size="md"
              variant="icons-only"
              showDivider={true}
              dividerText="Or Sign up with"
            />
          </div>
        );

      case 'verify-code':
        return (
          <VerificationCodeForm
            onSubmit={handleVerificationCode}
            isLoading={isLoading}
            error={error}
            resendTimer={0}
            deliveryMethod={deliveryMethod}
            onDeliveryMethodChange={setDeliveryMethod}
          />
        );

      case 'create-account':
        return (
          <CreateAccountForm
            onSubmit={handleCreateAccount}
            isLoading={isLoading}
            error={error}
            onSwitchToLogin={() => switchToType('login')}
            onSocialAuth={(provider) => handleSocialAuth(provider as any)}
          />
        );

      case 'create-password':
        return (
          <CreatePasswordForm
            onSubmit={handleCreatePassword}
            isLoading={isLoading}
            error={error}
          />
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // MODAL TITLES
  // ============================================================================

  const getModalTitle = () => {
    switch (currentType) {
      case 'login':
        return 'Sign In to Delta Labs';
      case 'register':
        return 'Create Your Account';
      case 'forgot-password':
        return 'Recover your account';
      case 'verify-code':
        return 'Insert verification code';
      case 'create-account':
        return 'Create Your Account';
      case 'create-password':
        return 'Create your account';
      case 'date-of-birth':
        return 'Enter your Date of birth';
      default:
        return 'Authentication';
    }
  };

  const getModalSubtitle = () => {
    switch (currentType) {
      case 'login':
        return 'Welcome back! Please sign in to continue.';
      case 'register':
        return 'Join Delta Labs and start your learning journey.';
      case 'forgot-password':
        return forgotPasswordSuccess 
          ? 'We\'ve sent you a password reset link.'
          : 'Learn more and do more';
      case 'verify-code':
        return 'Learn more and do more';
      case 'create-account':
        return 'Learn more and do more';
      case 'create-password':
        return 'Learn more and do more';
      case 'date-of-birth':
        return 'Learn more and do more';
      default:
        return '';
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={handleClose}
      title={getModalTitle()}
      subtitle={getModalSubtitle()}
      size="md"
      closeOnOverlayClick={!isLoading}
      showBackButton={showBackButton}
      errorBanner={error ? {
        message: error,
        type: 'error',
        onClose: () => {
          setError(null);
          setShowBackButton(false);
        }
      } : undefined}
    >
      <div className="space-y-6">
        {/* Modal Content */}
        {renderModalContent()}

        {/* Back Button for Forgot Password */}
        {currentType === 'forgot-password' && !forgotPasswordSuccess && (
          <div className="text-center">
            <button
              onClick={() => switchToType('login')}
              className="text-sm text-text-tertiary hover:text-text-primary delta-transition"
              disabled={isLoading}
            >
              ← Back to Sign In
            </button>
          </div>
        )}
      </div>
    </DeltaModal>
  );
};

// ============================================================================
// AUTH MODAL MANAGER COMPONENT
// ============================================================================

interface AuthModalManagerProps {
  children?: React.ReactNode;
  onAuthSuccess?: (user: any) => void;
  redirectTo?: string;
}

export const AuthModalManager: React.FC<AuthModalManagerProps> = ({
  children,
  onAuthSuccess,
  redirectTo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<AuthModalType>('login');

  const openModal = useCallback((type: AuthModalType = 'login') => {
    setModalType(type);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAuthSuccess = useCallback((user: any) => {
    onAuthSuccess?.(user);
    closeModal();
  }, [onAuthSuccess, closeModal]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue = {
    openModal,
    closeModal,
    openLogin: () => openModal('login'),
    openRegister: () => openModal('register'),
    openForgotPassword: () => openModal('forgot-password'),
  };

  return (
    <AuthModalContext.Provider value={contextValue}>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultType={modalType}
        onSuccess={handleAuthSuccess}
        redirectTo={redirectTo}
      />
    </AuthModalContext.Provider>
  );
};

// ============================================================================
// AUTH MODAL CONTEXT
// ============================================================================

interface AuthModalContextValue {
  openModal: (type?: AuthModalType) => void;
  closeModal: () => void;
  openLogin: () => void;
  openRegister: () => void;
  openForgotPassword: () => void;
}

const AuthModalContext = React.createContext<AuthModalContextValue | undefined>(undefined);

export const useAuthModal = (): AuthModalContextValue => {
  const context = React.useContext(AuthModalContext);
  
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalManager');
  }
  
  return context;
};

// ============================================================================
// EXPORTS
// ============================================================================

// Components are already exported individually above
