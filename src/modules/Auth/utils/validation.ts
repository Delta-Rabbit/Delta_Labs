/**
 * Delta Labs Auth Form Validation
 * Enterprise-grade form validation utilities
 */

import { ValidationRule, FormValidation, FormErrors } from '../types';

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const authValidationRules: FormValidation = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    },
  },
  
  password: {
    required: true,
    minLength: 8,
    custom: (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters long';
      if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
      if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must contain at least one special character';
      return null;
    },
  },
  
  confirmPassword: {
    required: true,
    custom: (value: string, formData?: Record<string, any>) => {
      if (!value) return 'Please confirm your password';
      if (formData?.password && value !== formData.password) {
        return 'Passwords do not match';
      }
      return null;
    },
  },
  
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    custom: (value: string) => {
      if (!value) return 'First name is required';
      if (value.length < 2) return 'First name must be at least 2 characters long';
      if (value.length > 50) return 'First name must be less than 50 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return 'First name can only contain letters, spaces, hyphens, and apostrophes';
      }
      return null;
    },
  },
  
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    custom: (value: string) => {
      if (!value) return 'Last name is required';
      if (value.length < 2) return 'Last name must be at least 2 characters long';
      if (value.length > 50) return 'Last name must be less than 50 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
      }
      return null;
    },
  },
  
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_-]+$/,
    custom: (value: string) => {
      if (!value) return 'Username is required';
      if (value.length < 3) return 'Username must be at least 3 characters long';
      if (value.length > 30) return 'Username must be less than 30 characters';
      if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        return 'Username can only contain letters, numbers, underscores, and hyphens';
      }
      if (value.startsWith('-') || value.endsWith('-')) {
        return 'Username cannot start or end with a hyphen';
      }
      return null;
    },
  },
  
  agreeToTerms: {
    required: true,
    custom: (value: boolean) => {
      if (!value) return 'You must agree to the Terms of Service';
      return null;
    },
  },
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export const validateField = (
  fieldName: string,
  value: any,
  rules: ValidationRule,
  formData?: Record<string, any>
): string | null => {
  // Required validation
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${fieldName} is required`;
  }
  
  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  
  // Min length validation
  if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters long`;
  }
  
  // Max length validation
  if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
    return `${fieldName} must be less than ${rules.maxLength} characters`;
  }
  
  // Pattern validation
  if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }
  
  // Custom validation
  if (rules.custom) {
    return rules.custom(value, formData);
  }
  
  return null;
};

export const validateForm = (
  data: Record<string, any>,
  validationRules: FormValidation = authValidationRules
): FormErrors => {
  const errors: FormErrors = {};
  
  Object.keys(validationRules).forEach(fieldName => {
    const value = data[fieldName];
    const rules = validationRules[fieldName];
    
    const error = validateField(fieldName, value, rules, data);
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== null);
};

export const getFirstError = (errors: FormErrors): string | null => {
  const firstError = Object.values(errors).find(error => error !== null);
  return firstError || null;
};

// ============================================================================
// FORM UTILITIES
// ============================================================================

export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    if (typeof value === 'string') {
      // Trim whitespace
      sanitized[key] = value.trim();
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};

export const createFormData = (form: HTMLFormElement): Record<string, any> => {
  const formData = new FormData(form);
  const data: Record<string, any> = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  return sanitizeFormData(data);
};

// ============================================================================
// PASSWORD STRENGTH UTILITIES
// ============================================================================

export interface PasswordStrength {
  score: number;
  feedback: string[];
  strength: 'weak' | 'fair' | 'good' | 'strong';
}

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;
  
  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }
  
  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }
  
  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }
  
  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }
  
  // Special character check
  if (/[@$!%*?&]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add special characters');
  }
  
  // Length bonus
  if (password.length >= 12) {
    score += 1;
  }
  
  // Complexity bonus
  if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) {
    score += 1;
  }
  
  let strength: 'weak' | 'fair' | 'good' | 'strong';
  if (score <= 2) {
    strength = 'weak';
  } else if (score <= 4) {
    strength = 'fair';
  } else if (score <= 6) {
    strength = 'good';
  } else {
    strength = 'strong';
  }
  
  return {
    score,
    feedback,
    strength,
  };
};

// ============================================================================
// EMAIL UTILITIES
// ============================================================================

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

// ============================================================================
// USERNAME UTILITIES
// ============================================================================

export const isValidUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9_-]+$/.test(username) && 
         username.length >= 3 && 
         username.length <= 30 &&
         !username.startsWith('-') &&
         !username.endsWith('-');
};

export const generateUsernameSuggestion = (firstName: string, lastName: string): string[] => {
  const suggestions: string[] = [];
  const first = firstName.toLowerCase();
  const last = lastName.toLowerCase();
  
  // Basic combinations
  suggestions.push(`${first}${last}`);
  suggestions.push(`${first}.${last}`);
  suggestions.push(`${first}_${last}`);
  suggestions.push(`${first}${last}${Math.floor(Math.random() * 100)}`);
  
  // With numbers
  for (let i = 1; i <= 3; i++) {
    suggestions.push(`${first}${last}${i}`);
  }
  
  return suggestions.filter(suggestion => isValidUsername(suggestion));
};

// ============================================================================
// EXPORTS
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
};
