/**
 * Delta Labs Theme Context
 * Enterprise-grade theme management with React Context API
 * Supports multiple themes, modes, and dynamic theme switching
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { ThemeConfig, ThemeName } from '../theme/themeConfig';
import { getTheme, generateCSSVariables } from '../theme/themeConfig';
import type { ThemeMode } from '../theme/designTokens';

// ============================================================================
// THEME CONTEXT INTERFACE
// ============================================================================

export interface ThemeContextValue {
  // Current theme state
  currentTheme: ThemeConfig;
  themeName: ThemeName;
  mode: ThemeMode;
  
  // Theme management functions
  setTheme: (name: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  
  // Theme utilities
  isDark: boolean;
  isLight: boolean;
  isAuto: boolean;
  
  // CSS variables for styling
  cssVariables: Record<string, string>;
  
  // Theme loading state
  isLoading: boolean;
}

// ============================================================================
// THEME CONTEXT CREATION
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// THEME PROVIDER PROPS
// ============================================================================

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: ThemeMode;
  storageKey?: string;
  enableSystemTheme?: boolean;
  enablePersistence?: boolean;
}

// ============================================================================
// THEME PROVIDER COMPONENT
// ============================================================================

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  defaultMode = 'light',
  storageKey = 'delta-labs-theme',
  enableSystemTheme = true,
  enablePersistence = true,
}: ThemeProviderProps) {
  // State management
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(true);

  // Get current theme configuration
  const currentTheme = getTheme(themeName);

  // Generate CSS variables
  const cssVariables = generateCSSVariables(currentTheme);

  // Computed properties
  const isDark = mode === 'dark' || (mode === 'auto' && isSystemDark());
  const isLight = mode === 'light' || (mode === 'auto' && !isSystemDark());
  const isAuto = mode === 'auto';

  // ============================================================================
  // SYSTEM THEME DETECTION
  // ============================================================================

  function isSystemDark(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // ============================================================================
  // THEME MANAGEMENT FUNCTIONS
  // ============================================================================

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    if (enablePersistence) {
      localStorage.setItem(`${storageKey}-name`, name);
    }
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    if (enablePersistence) {
      localStorage.setItem(`${storageKey}-mode`, newMode);
    }
  };

  const toggleMode = () => {
    const newMode = isDark ? 'light' : 'dark';
    setMode(newMode);
  };

  // ============================================================================
  // CSS VARIABLES INJECTION
  // ============================================================================

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply CSS variables to root element
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply theme class for additional styling
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${themeName}`);
    root.classList.add(`mode-${mode}`);

    // Apply data attributes for CSS selectors
    root.setAttribute('data-theme', themeName);
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-dark', isDark.toString());

  }, [cssVariables, themeName, mode, isDark]);

  // ============================================================================
  // PERSISTENCE AND INITIALIZATION
  // ============================================================================

  useEffect(() => {
    if (!enablePersistence) {
      setIsLoading(false);
      return;
    }

    try {
      // Load saved theme preferences
      const savedThemeName = localStorage.getItem(`${storageKey}-name`) as ThemeName;
      const savedMode = localStorage.getItem(`${storageKey}-mode`) as ThemeMode;

      if (savedThemeName && Object.keys(getTheme).includes(savedThemeName)) {
        setThemeName(savedThemeName);
      }

      if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
        setModeState(savedMode);
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, [enablePersistence, storageKey]);

  // ============================================================================
  // SYSTEM THEME CHANGE LISTENER
  // ============================================================================

  useEffect(() => {
    if (!enableSystemTheme || mode !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Trigger re-render when system theme changes
      setModeState('auto');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystemTheme, mode]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: ThemeContextValue = {
    currentTheme,
    themeName,
    mode,
    setTheme,
    setMode,
    toggleMode,
    isDark,
    isLight,
    isAuto,
    cssVariables,
    isLoading,
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// THEME HOOK
// ============================================================================

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// ============================================================================
// THEME UTILITY HOOKS
// ============================================================================

export function useThemeMode() {
  const { mode, setMode, toggleMode, isDark, isLight, isAuto } = useTheme();
  return { mode, setMode, toggleMode, isDark, isLight, isAuto };
}

export function useThemeColors() {
  const { currentTheme } = useTheme();
  return currentTheme.tokens.colors;
}

export function useThemeTypography() {
  const { currentTheme } = useTheme();
  return currentTheme.tokens.typography;
}

export function useThemeSpacing() {
  const { currentTheme } = useTheme();
  return currentTheme.tokens.spacing;
}

export function useCSSVariable(variable: string): string {
  const { cssVariables } = useTheme();
  return cssVariables[variable] || '';
}

// ============================================================================
// THEME COMPONENT WRAPPER
// ============================================================================

export interface ThemeWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ThemeWrapper({ children, className }: ThemeWrapperProps) {
  const { isDark, themeName, mode } = useTheme();
  
  return (
    <div 
      className={`theme-wrapper theme-${themeName} mode-${mode} ${isDark ? 'dark' : 'light'} ${className || ''}`}
      data-theme={themeName}
      data-mode={mode}
      data-dark={isDark.toString()}
    >
      {children}
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default ThemeContext;
export { ThemeProvider as DeltaThemeProvider };
export { useTheme as useDeltaTheme };
