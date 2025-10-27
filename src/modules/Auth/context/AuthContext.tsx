/**
 * Delta Labs Auth Context
 * Enterprise-grade authentication state management
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { 
  AuthState, 
  User, 
  LoginCredentials, 
  RegisterData
} from '../types';

// ============================================================================
// AUTH ACTIONS
// ============================================================================

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string; refreshToken: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_UPDATE_USER'; payload: Partial<User> }
  | { type: 'AUTH_SET_LOADING'; payload: boolean };

// ============================================================================
// AUTH REDUCER
// ============================================================================

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    
    case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    
    case 'AUTH_SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    default:
      return state;
  }
};

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  refreshToken: null,
};

// ============================================================================
// AUTH CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ============================================================================
// AUTH PROVIDER PROPS
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ============================================================================
  // STORAGE UTILITIES
  // ============================================================================

  const saveToStorage = (data: { user: User; token: string; refreshToken: string }) => {
    try {
      localStorage.setItem('delta-auth-token', data.token);
      localStorage.setItem('delta-auth-refresh-token', data.refreshToken);
      localStorage.setItem('delta-auth-user', JSON.stringify(data.user));
    } catch (error) {
      console.warn('Failed to save auth data to localStorage:', error);
    }
  };

  const loadFromStorage = () => {
    try {
      const token = localStorage.getItem('delta-auth-token');
      const refreshToken = localStorage.getItem('delta-auth-refresh-token');
      const userStr = localStorage.getItem('delta-auth-user');
      
      if (token && refreshToken && userStr) {
        const user = JSON.parse(userStr);
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, token, refreshToken }
        });
        return true;
      }
    } catch (error) {
      console.warn('Failed to load auth data from localStorage:', error);
      clearStorage();
    }
    return false;
  };

  const clearStorage = () => {
    try {
      localStorage.removeItem('delta-auth-token');
      localStorage.removeItem('delta-auth-refresh-token');
      localStorage.removeItem('delta-auth-user');
    } catch (error) {
      console.warn('Failed to clear auth data from localStorage:', error);
    }
  };

  // ============================================================================
  // API UTILITIES
  // ============================================================================

  const handleApiError = (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const makeApiRequest = async (url: string, options: RequestInit = {}) => {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(state.token && { Authorization: `Bearer ${state.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  };

  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await makeApiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const authData: AuthResponse = response;
      saveToStorage({
        user: authData.user,
        token: authData.token,
        refreshToken: authData.refreshToken,
      });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: authData.user,
          token: authData.token,
          refreshToken: authData.refreshToken,
        },
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await makeApiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const authData: AuthResponse = response;
      saveToStorage({
        user: authData.user,
        token: authData.token,
        refreshToken: authData.refreshToken,
      });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: authData.user,
          token: authData.token,
          refreshToken: authData.refreshToken,
        },
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout API if token exists
      if (state.token) {
        await makeApiRequest('/api/auth/logout', {
          method: 'POST',
        });
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      clearStorage();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const refreshAuth = async (): Promise<void> => {
    if (!state.refreshToken) {
      dispatch({ type: 'AUTH_LOGOUT' });
      return;
    }

    try {
      const response = await makeApiRequest('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: state.refreshToken }),
      });

      const authData: AuthResponse = response;
      saveToStorage({
        user: authData.user,
        token: authData.token,
        refreshToken: authData.refreshToken,
      });

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: authData.user,
          token: authData.token,
          refreshToken: authData.refreshToken,
        },
      });
    } catch (error) {
      clearStorage();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // ============================================================================
  // SOCIAL AUTHENTICATION
  // ============================================================================

  const loginWithGoogle = async (): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Implement Google OAuth flow
      // This is a placeholder - implement actual Google OAuth
      throw new Error('Google OAuth not implemented yet');
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const loginWithApple = async (): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Implement Apple OAuth flow
      throw new Error('Apple OAuth not implemented yet');
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const loginWithGitHub = async (): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Implement GitHub OAuth flow
      throw new Error('GitHub OAuth not implemented yet');
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const loginWithFacebook = async (): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Implement Facebook OAuth flow
      throw new Error('Facebook OAuth not implemented yet');
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  // ============================================================================
  // PASSWORD MANAGEMENT
  // ============================================================================

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await makeApiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      await makeApiRequest('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password: newPassword }),
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await makeApiRequest('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  // ============================================================================
  // EMAIL VERIFICATION
  // ============================================================================

  const sendVerificationEmail = async (): Promise<void> => {
    try {
      await makeApiRequest('/api/auth/send-verification-email', {
        method: 'POST',
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  const verifyEmail = async (token: string): Promise<void> => {
    try {
      await makeApiRequest('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
      
      // Update user's email verification status
      if (state.user) {
        dispatch({
          type: 'AUTH_UPDATE_USER',
          payload: { isEmailVerified: true },
        });
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  // ============================================================================
  // USER MANAGEMENT
  // ============================================================================

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      const response = await makeApiRequest('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData),
      });

      dispatch({
        type: 'AUTH_UPDATE_USER',
        payload: response.user,
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      await makeApiRequest('/api/auth/account', {
        method: 'DELETE',
      });
      
      clearStorage();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  };

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  const clearError = () => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Load auth state from storage on app start
    loadFromStorage();
  }, []);

  useEffect(() => {
    // Set up token refresh interval
    if (state.token && state.refreshToken) {
      const interval = setInterval(() => {
        refreshAuth();
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => clearInterval(interval);
    }
  }, [state.token, state.refreshToken]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    refreshAuth,
    loginWithGoogle,
    loginWithApple,
    loginWithGitHub,
    loginWithFacebook,
    forgotPassword,
    resetPassword,
    changePassword,
    sendVerificationEmail,
    verifyEmail,
    updateProfile,
    deleteAccount,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// AUTH HOOK
// ============================================================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default AuthContext;
export { AuthProvider as DeltaAuthProvider };
export { useAuth as useDeltaAuth };
