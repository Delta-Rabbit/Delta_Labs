/**
 * Delta Labs Auth Modal
 * Professional authentication modal with complete flow management
 */

import React, { useState, useCallback } from 'react';
import { DeltaModal } from '../../../../components/theme/ThemeComponents';
import { 
  LoginForm, 
  RegisterForm, 
  ForgotPasswordForm 
} from '../forms/AuthForms';
import { 
  SocialAuthSection 
} from '../providers/SocialAuth';
import { 
  AuthModalType, 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData,
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
    clearError();
    onClose();
  }, [defaultType, onClose, clearError]);

  const switchToType = useCallback((type: AuthModalType) => {
    setCurrentType(type);
    setError(null);
    setForgotPasswordSuccess(false);
    clearError();
  }, [clearError]);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(credentials);
      onSuccess?.(credentials);
      handleClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [login, onSuccess, handleClose]);

  const handleRegister = useCallback(async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await register(userData);
      onSuccess?.(userData);
      handleClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, [register, onSuccess, handleClose]);

  const handleForgotPassword = useCallback(async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await forgotPassword(data.email);
      setForgotPasswordSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  }, [forgotPassword]);

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
          <div className="space-y-6">
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
              onSwitchToRegister={() => switchToType('register')}
              onSwitchToForgotPassword={() => switchToType('forgot-password')}
            />
            
            <SocialAuthSection
              onProviderClick={handleSocialAuth}
              disabled={isLoading}
              size="md"
              variant="default"
              showDivider={true}
              dividerText="Or continue with"
            />
          </div>
        );

      case 'register':
        return (
          <div className="space-y-6">
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isLoading}
              error={error}
              onSwitchToLogin={() => switchToType('login')}
            />
            
            <SocialAuthSection
              onProviderClick={handleSocialAuth}
              disabled={isLoading}
              size="md"
              variant="default"
              showDivider={true}
              dividerText="Or continue with"
            />
          </div>
        );

      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            isLoading={isLoading}
            error={error}
            success={forgotPasswordSuccess}
            onSwitchToLogin={() => switchToType('login')}
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
        return forgotPasswordSuccess ? 'Check Your Email' : 'Reset Password';
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
          : 'Enter your email to receive a password reset link.';
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
      size="md"
      closeOnOverlayClick={!isLoading}
    >
      <div className="space-y-6">
        {/* Subtitle */}
        {getModalSubtitle() && (
          <p className="text-text-secondary text-center">
            {getModalSubtitle()}
          </p>
        )}

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

export {
  AuthModal,
  AuthModalManager,
  useAuthModal,
};
