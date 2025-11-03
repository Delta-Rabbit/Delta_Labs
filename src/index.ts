/**
 * Delta Labs Main Index
 * Central export point for the application
 */

// ============================================================================
// CONTEXTS
// ============================================================================
export { ThemeProvider, useTheme } from './contexts/Theme_Context';
export { AuthProvider, useAuth } from './contexts/Auth_Context';
export { useAI } from './contexts/AI_Context';
export { TabProvider, useTab } from './contexts/TabContext';

// ============================================================================
// TYPES
// ============================================================================
export type { Tab, TabModule } from './types/navigation';

// ============================================================================
// COMPONENTS
// ============================================================================
export { NavigationLayout } from './components/NavigationLayout';
export { NavigationTabBar } from './components/navigation/NavigationTabBar';
export { TabContentRouter } from './components/TabContentRouter';
export { CourseModuleButton } from './components/CourseModuleButton';

// ============================================================================
// MODULES
// ============================================================================
export * from './modules/Auth';
export * from './modules/Course';

