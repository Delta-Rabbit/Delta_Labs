/**
 * Delta Labs Professional Auth Modal - Enterprise Implementation
 * 100% Theme System Integration - Perfect Professional Organization
 */

import React, { useState, useCallback } from 'react';
import { DeltaModal } from '../../../../components/theme/ThemeComponents';
import { 
  ProfessionalLoginForm, 
  ProfessionalRegisterForm 
} from '../forms/ProfessionalAuthForms';
import { 
  AuthModalType, 
  LoginCredentials, 
  RegisterData,
  SocialAuthProvider 
} from '../../types';
import { useAuth } from '../../context/AuthContext';

// ============================================================================
// PROFESSIONAL AUTH MODAL PROPS
// ============================================================================

interface ProfessionalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: AuthModalType;
  onSuccess?: (user: any) => void;
  redirectTo?: string;
}

// ============================================================================
// PROFESSIONAL AUTH MODAL COMPONENT
// ============================================================================

export const ProfessionalAuthModal: React.FC<ProfessionalAuthModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'login',
  onSuccess,
  redirectTo,
}) => {
  const [currentType, setCurrentType] = useState<AuthModalType>(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { 
    login, 
    register, 
    loginWithGoogle,
    loginWithApple,
    loginWithGitHub,
    loginWithFacebook,
    clearError 
  } = useAuth();

  // ============================================================================
  // PROFESSIONAL MODAL MANAGEMENT
  // ============================================================================

  const handleClose = useCallback(() => {
    setCurrentType(defaultType);
    setError(null);
    clearError();
    onClose();
  }, [defaultType, onClose, clearError]);

  const switchToType = useCallback((type: AuthModalType) => {
    setCurrentType(type);
    setError(null);
    clearError();
  }, [clearError]);

  // ============================================================================
  // PROFESSIONAL FORM HANDLERS
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

  // ============================================================================
  // PROFESSIONAL SOCIAL AUTH HANDLERS
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
  // PROFESSIONAL MODAL CONTENT RENDERER
  // ============================================================================

  const renderModalContent = () => {
    switch (currentType) {
      case 'login':
        return (
          <ProfessionalLoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
            onSwitchToRegister={() => switchToType('register')}
            onSwitchToForgotPassword={() => switchToType('forgot-password')}
          />
        );

      case 'register':
        return (
          <ProfessionalRegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            error={error}
            onSwitchToLogin={() => switchToType('login')}
          />
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // PROFESSIONAL MODAL TITLES
  // ============================================================================

  const getModalTitle = () => {
    switch (currentType) {
      case 'login':
        return 'Login to Your Account';
      case 'register':
        return 'Create Your Account';
      default:
        return 'Authentication';
    }
  };

  const getModalSubtitle = () => {
    switch (currentType) {
      case 'login':
        return 'Learn more and do more';
      case 'register':
        return 'Learn More, Do More';
      default:
        return '';
    }
  };

  // ============================================================================
  // PROFESSIONAL RENDER
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
        {/* Professional Subtitle */}
        {getModalSubtitle() && (
          <div className="text-center">
            <p className="text-text-secondary font-secondary-normal">
              {getModalSubtitle()}
            </p>
          </div>
        )}

        {/* Professional Modal Content */}
        {renderModalContent()}

        {/* Professional Back Button for Forgot Password */}
        {currentType === 'forgot-password' && (
          <div className="text-center">
            <button
              onClick={() => switchToType('login')}
              className="text-text-tertiary hover:text-text-primary font-secondary-normal text-sm delta-transition flex items-center space-x-1 mx-auto"
              disabled={isLoading}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Sign In</span>
            </button>
          </div>
        )}
      </div>
    </DeltaModal>
  );
};

// ============================================================================
// PROFESSIONAL AUTH MODAL MANAGER
// ============================================================================

interface ProfessionalAuthModalManagerProps {
  children?: React.ReactNode;
  onAuthSuccess?: (user: any) => void;
  redirectTo?: string;
}

export const ProfessionalAuthModalManager: React.FC<ProfessionalAuthModalManagerProps> = ({
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
  // PROFESSIONAL CONTEXT VALUE
  // ============================================================================

  const contextValue = {
    openModal,
    closeModal,
    openLogin: () => openModal('login'),
    openRegister: () => openModal('register'),
    openForgotPassword: () => openModal('forgot-password'),
  };

  return (
    <ProfessionalAuthModalContext.Provider value={contextValue}>
      {children}
      <ProfessionalAuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultType={modalType}
        onSuccess={handleAuthSuccess}
        redirectTo={redirectTo}
      />
    </ProfessionalAuthModalContext.Provider>
  );
};

// ============================================================================
// PROFESSIONAL AUTH MODAL CONTEXT
// ============================================================================

interface ProfessionalAuthModalContextValue {
  openModal: (type?: AuthModalType) => void;
  closeModal: () => void;
  openLogin: () => void;
  openRegister: () => void;
  openForgotPassword: () => void;
}

const ProfessionalAuthModalContext = React.createContext<ProfessionalAuthModalContextValue | undefined>(undefined);

export const useProfessionalAuthModal = (): ProfessionalAuthModalContextValue => {
  const context = React.useContext(ProfessionalAuthModalContext);
  
  if (context === undefined) {
    throw new Error('useProfessionalAuthModal must be used within a ProfessionalAuthModalManager');
  }
  
  return context;
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ProfessionalAuthModal,
  ProfessionalAuthModalManager,
  useProfessionalAuthModal,
};
