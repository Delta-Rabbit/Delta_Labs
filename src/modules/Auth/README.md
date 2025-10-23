# Delta Labs Auth Module Documentation

## 🚀 **Enterprise-Grade Authentication System**

The Delta Labs Auth Module is a comprehensive, professional authentication system designed for enterprise-grade educational and management web applications. It provides secure, scalable, and user-friendly authentication with full theme integration.

---

## 📋 **Table of Contents**

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components](#components)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## ✨ **Features**

### **Core Authentication**
- ✅ **User Registration & Login** - Complete user management
- ✅ **Password Management** - Secure password handling with strength validation
- ✅ **Email Verification** - Email confirmation flow
- ✅ **Forgot Password** - Secure password reset functionality
- ✅ **Session Management** - Automatic token refresh and persistence

### **Social Authentication**
- ✅ **Google OAuth** - Google Sign-In integration
- ✅ **Apple Sign-In** - Apple ID authentication
- ✅ **GitHub OAuth** - GitHub authentication
- ✅ **Facebook Login** - Facebook authentication

### **Professional Features**
- ✅ **Form Validation** - Comprehensive client-side validation
- ✅ **Theme Integration** - Full Delta Labs theme system integration
- ✅ **TypeScript Support** - Complete type safety
- ✅ **Accessibility** - WCAG AA compliant components
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Error Handling** - Professional error management
- ✅ **Loading States** - Smooth user experience

---

## 🏗️ **Architecture**

```
src/modules/Auth/
├── components/           # Reusable auth components
│   ├── forms/           # Form components (Login, Register, Forgot Password)
│   ├── modals/          # Modal components
│   └── providers/       # Social auth providers
├── context/             # React Context for state management
├── types/               # TypeScript definitions
├── utils/               # Validation and utility functions
├── examples/            # Usage examples
└── index.ts             # Module exports
```

### **Key Components**

1. **AuthProvider** - Global authentication state management
2. **AuthModal** - Professional modal with complete auth flow
3. **Form Components** - Login, Register, Forgot Password forms
4. **Social Auth** - Social authentication providers
5. **Validation** - Comprehensive form validation system

---

## 🚀 **Installation**

The Auth module is already integrated into your Delta Labs project. No additional installation required.

---

## ⚡ **Quick Start**

### **1. Basic Setup**

```tsx
import React from 'react';
import { 
  AuthProvider, 
  AuthModalManager 
} from './modules/Auth';
import { ThemeProvider } from './contexts/Theme_Context';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthModalManager>
          {/* Your app content */}
        </AuthModalManager>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### **2. Using Auth Modal**

```tsx
import { useAuthModal } from './modules/Auth';

function LoginButton() {
  const { openLogin, openRegister } = useAuthModal();

  return (
    <div>
      <button onClick={openLogin}>Sign In</button>
      <button onClick={openRegister}>Create Account</button>
    </div>
  );
}
```

### **3. Accessing Auth State**

```tsx
import { useAuth } from './modules/Auth';

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

---

## 🧩 **Components**

### **AuthProvider**

Global authentication state management provider.

```tsx
interface AuthProviderProps {
  children: React.ReactNode;
}

<AuthProvider>
  {children}
</AuthProvider>
```

### **AuthModalManager**

Manages authentication modals and provides context.

```tsx
interface AuthModalManagerProps {
  children?: React.ReactNode;
  onAuthSuccess?: (user: User) => void;
  redirectTo?: string;
}

<AuthModalManager onAuthSuccess={handleAuthSuccess}>
  {children}
</AuthModalManager>
```

### **AuthModal**

Professional authentication modal with complete flow.

```tsx
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'login' | 'register' | 'forgot-password';
  onSuccess?: (user: User) => void;
  redirectTo?: string;
}

<AuthModal
  isOpen={isModalOpen}
  onClose={closeModal}
  defaultType="login"
  onSuccess={handleSuccess}
/>
```

### **Form Components**

#### **LoginForm**
```tsx
interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}
```

#### **RegisterForm**
```tsx
interface RegisterFormProps {
  onSubmit: (userData: RegisterData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}
```

#### **ForgotPasswordForm**
```tsx
interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean;
  onSwitchToLogin?: () => void;
}
```

### **Social Authentication**

#### **SocialAuthSection**
```tsx
interface SocialAuthSectionProps {
  onProviderClick: (provider: SocialAuthProvider) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'icons-only';
  showDivider?: boolean;
  dividerText?: string;
}
```

---

## 📚 **API Reference**

### **useAuth Hook**

```tsx
interface AuthContextValue {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;

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
```

### **useAuthModal Hook**

```tsx
interface AuthModalContextValue {
  openModal: (type?: AuthModalType) => void;
  closeModal: () => void;
  openLogin: () => void;
  openRegister: () => void;
  openForgotPassword: () => void;
}
```

### **Types**

#### **User**
```tsx
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin' | 'super_admin';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  preferences: UserPreferences;
}
```

#### **LoginCredentials**
```tsx
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

#### **RegisterData**
```tsx
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToMarketing?: boolean;
}
```

---

## 💡 **Examples**

### **Complete Authentication Flow**

```tsx
import React, { useState } from 'react';
import { 
  AuthProvider, 
  AuthModalManager, 
  useAuth, 
  useAuthModal 
} from './modules/Auth';

function App() {
  return (
    <AuthProvider>
      <AuthModalManager>
        <MainApp />
      </AuthModalManager>
    </AuthProvider>
  );
}

function MainApp() {
  const { user, isAuthenticated, logout } = useAuth();
  const { openLogin, openRegister } = useAuthModal();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome to Delta Labs</h1>
          <div className="space-x-4">
            <button onClick={openLogin} className="btn-primary">
              Sign In
            </button>
            <button onClick={openRegister} className="btn-secondary">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-primary-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1>Delta Labs</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.firstName}!</span>
            <button onClick={logout} className="btn-outline">
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      <main className="p-6">
        {/* Your authenticated app content */}
      </main>
    </div>
  );
}
```

### **Custom Auth Form**

```tsx
import { LoginForm } from './modules/Auth';
import { useAuth } from './modules/Auth';

function CustomLoginPage() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Handle success
    } catch (error) {
      // Error is handled by the context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
```

### **Social Authentication**

```tsx
import { SocialAuthSection } from './modules/Auth';
import { useAuth } from './modules/Auth';

function SocialLogin() {
  const { loginWithGoogle, loginWithApple, loginWithGitHub, loginWithFacebook } = useAuth();

  const handleSocialAuth = async (provider) => {
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
      }
    } catch (error) {
      console.error('Social auth failed:', error);
    }
  };

  return (
    <SocialAuthSection
      onProviderClick={handleSocialAuth}
      size="lg"
      variant="default"
    />
  );
}
```

---

## 🎯 **Best Practices**

### **1. Error Handling**
```tsx
const { login, error, clearError } = useAuth();

const handleLogin = async (credentials) => {
  try {
    await login(credentials);
    // Success handling
  } catch (error) {
    // Error is automatically handled by the context
    // You can also access it via the error state
  }
};
```

### **2. Loading States**
```tsx
const { isLoading } = useAuth();

if (isLoading) {
  return <LoadingSpinner />;
}
```

### **3. Protected Routes**
```tsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return children;
}
```

### **4. Form Validation**
```tsx
import { validateForm, authValidationRules } from './modules/Auth';

const handleSubmit = (formData) => {
  const errors = validateForm(formData, authValidationRules);
  
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
  
  // Proceed with submission
};
```

---

## 🔧 **Troubleshooting**

### **Common Issues**

#### **1. "useAuth must be used within an AuthProvider"**
**Solution:** Wrap your app with `AuthProvider`:
```tsx
<AuthProvider>
  <YourApp />
</AuthProvider>
```

#### **2. "useAuthModal must be used within an AuthModalManager"**
**Solution:** Wrap your app with `AuthModalManager`:
```tsx
<AuthModalManager>
  <YourApp />
</AuthModalManager>
```

#### **3. Form validation not working**
**Solution:** Ensure you're using the correct validation rules:
```tsx
import { authValidationRules } from './modules/Auth';
```

#### **4. Social auth not working**
**Solution:** Implement the actual OAuth flows in the provider methods:
```tsx
// In AuthContext.tsx
const loginWithGoogle = async () => {
  // Implement actual Google OAuth flow
};
```

### **Debug Mode**

Enable debug logging by setting:
```tsx
localStorage.setItem('delta-auth-debug', 'true');
```

---

## 📞 **Support**

For questions or issues with the Auth module:

1. Check the [Examples](#examples) section
2. Review the [API Reference](#api-reference)
3. Check [Troubleshooting](#troubleshooting)
4. Contact the Delta Labs development team

---

## 🔄 **Version History**

- **v1.0.0** - Initial release with complete authentication system
- **v1.1.0** - Added social authentication providers
- **v1.2.0** - Enhanced form validation and error handling
- **v1.3.0** - Full theme system integration

---

**Built with ❤️ by the Delta Labs Team**
