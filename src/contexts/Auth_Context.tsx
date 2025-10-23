/**
 * Delta Labs Auth Context - Legacy Compatibility
 * This file maintains compatibility with existing code while using the new Auth module
 */

// Re-export everything from the new Auth module for backward compatibility
export {
  AuthProvider,
  useAuth,
  DeltaAuthProvider,
  useDeltaAuth,
} from '../modules/Auth/context/AuthContext';

// Re-export types
export type {
  User,
  AuthState,
  AuthContextValue,
  LoginCredentials,
  RegisterData,
} from '../modules/Auth/types';

// Default export for backward compatibility
export { default } from '../modules/Auth/context/AuthContext';
