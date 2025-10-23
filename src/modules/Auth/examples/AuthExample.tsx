/**
 * Delta Labs Auth Module - Example Implementation
 * Professional demonstration of the authentication system
 */

import React from 'react';
import { 
  AuthProvider, 
  AuthModalManager, 
  useAuthModal,
  useAuth 
} from '../modules/Auth';
import { ThemeProvider } from '../../contexts/Theme_Context';
import { DeltaButton, DeltaCard } from '../../components/theme/ThemeComponents';

// ============================================================================
// EXAMPLE AUTH BUTTONS COMPONENT
// ============================================================================

const AuthButtons: React.FC = () => {
  const { openLogin, openRegister, openForgotPassword } = useAuthModal();
  const { user, isAuthenticated, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <DeltaCard padding="md" shadow="md" className="max-w-md">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-lg font-primary-semibold text-text-primary">
              Welcome, {user.firstName}!
            </h3>
            <p className="text-text-secondary text-sm">
              {user.email} • {user.role}
            </p>
          </div>
          
          <div className="flex gap-3">
            <DeltaButton
              variant="outline"
              size="md"
              onClick={logout}
              className="flex-1"
            >
              Sign Out
            </DeltaButton>
          </div>
        </div>
      </DeltaCard>
    );
  }

  return (
    <DeltaCard padding="md" shadow="md" className="max-w-md">
      <div className="text-center space-y-4">
        <div>
          <h3 className="text-lg font-primary-semibold text-text-primary">
            Authentication Demo
          </h3>
          <p className="text-text-secondary text-sm">
            Try the professional auth system
          </p>
        </div>
        
        <div className="space-y-3">
          <DeltaButton
            variant="primary"
            size="md"
            onClick={openLogin}
            className="w-full"
          >
            Sign In
          </DeltaButton>
          
          <DeltaButton
            variant="outline"
            size="md"
            onClick={openRegister}
            className="w-full"
          >
            Create Account
          </DeltaButton>
          
          <DeltaButton
            variant="ghost"
            size="sm"
            onClick={openForgotPassword}
            className="w-full"
          >
            Forgot Password?
          </DeltaButton>
        </div>
      </div>
    </DeltaCard>
  );
};

// ============================================================================
// EXAMPLE AUTH DEMO COMPONENT
// ============================================================================

const AuthDemo: React.FC = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="bg-primary-500 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-primary-bold">Delta Labs Auth System</h1>
            <p className="text-primary-100 mt-2">Professional authentication demonstration</p>
          </div>
          <div className="flex items-center gap-4">
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            )}
            {error && (
              <div className="bg-error-500 text-white px-3 py-1 rounded text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Auth Status */}
          <DeltaCard padding="lg" shadow="md">
            <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
              Authentication Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isAuthenticated 
                    ? 'bg-success-100 text-success-800' 
                    : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </span>
              </div>
              
              {user && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">User ID:</span>
                    <span className="text-text-primary font-mono text-sm">{user.id}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Name:</span>
                    <span className="text-text-primary">{user.firstName} {user.lastName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Email:</span>
                    <span className="text-text-primary">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Role:</span>
                    <span className="text-text-primary capitalize">{user.role}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Email Verified:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.isEmailVerified 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {user.isEmailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Member Since:</span>
                    <span className="text-text-primary">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </DeltaCard>

          {/* Auth Actions */}
          <div className="space-y-6">
            <AuthButtons />
            
            {/* Features List */}
            <DeltaCard padding="lg" shadow="md">
              <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
                Auth Features
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Professional form validation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Social authentication (Google, Apple, GitHub, Facebook)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Password strength indicator</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Email verification flow</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Forgot password functionality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Theme integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">TypeScript support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-primary">Enterprise-grade security</span>
                </div>
              </div>
            </DeltaCard>
          </div>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// MAIN APP WITH AUTH PROVIDER
// ============================================================================

const App: React.FC = () => {
  return (
    <ThemeProvider 
      defaultTheme="light" 
      defaultMode="light"
      enableSystemTheme={true}
      enablePersistence={true}
    >
      <AuthProvider>
        <AuthModalManager>
          <AuthDemo />
        </AuthModalManager>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
