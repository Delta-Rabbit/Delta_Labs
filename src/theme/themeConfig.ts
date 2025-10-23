/**
 * Delta Labs Theme Configuration
 * Centralized theme management with support for multiple themes and modes
 */

import { DesignTokens, ThemeMode } from './designTokens';

// ============================================================================
// THEME CONFIGURATIONS
// ============================================================================

export interface ThemeConfig {
  name: string;
  mode: ThemeMode;
  tokens: DesignTokens;
  customProperties?: Record<string, string>;
}

// Light Theme Configuration
export const lightTheme: ThemeConfig = {
  name: 'light',
  mode: 'light',
  tokens: {
    colors: {
      primary: {
        50: '#E6F4F7',
        100: '#CCE9EF',
        200: '#99D3DF',
        300: '#66BDCF',
        400: '#33A7BF',
        500: '#174A5F',
        600: '#133E4F',
        700: '#0F323F',
        800: '#0B262F',
        900: '#071A1F',
      },
      secondary: {
        50: '#F8FAFB',
        100: '#F1F4F6',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#DCE5E9', // Main secondary color from Figma
        600: '#64748B',
        700: '#475569',
        800: '#334155',
        900: '#1E293B',
      },
      neutral: {
        0: '#FFFFFF',
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0A0A0A',
      },
      semantic: {
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        info: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      surface: {
        primary: '#FFFFFF',
        secondary: '#F9F9F9',
        tertiary: '#F5F5F5',
        elevated: '#FFFFFF',
        overlay: 'rgba(0, 0, 0, 0.5)',
        backdrop: 'rgba(23, 74, 95, 0.25)',
      },
      text: {
        primary: '#171717',
        secondary: '#525252',
        tertiary: '#737373',
        disabled: '#A3A3A3',
        inverse: '#FFFFFF',
        link: '#174A5F',
        linkHover: '#133E4F',
      },
      border: {
        primary: '#E5E5E5',
        secondary: '#D4D4D4',
        focus: '#174A5F',
        error: '#EF4444',
        success: '#22C55E',
        warning: '#F59E0B',
      },
    },
    typography: {
      fontFamily: {
        primary: ['Poppins', 'system-ui', 'sans-serif'],
        secondary: ['Nunito Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
    },
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    },
    breakpoints: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    zIndex: {
      hide: -1,
      auto: 'auto',
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800,
    },
    animations: {
      duration: {
        instant: '0ms',
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        slower: '1000ms',
      },
      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
    components: {
      button: {
        height: {
          sm: '2rem',
          md: '2.5rem',
          lg: '3rem',
          xl: '3.5rem',
        },
        padding: {
          sm: '0.5rem 1rem',
          md: '0.75rem 1.5rem',
          lg: '1rem 2rem',
          xl: '1.25rem 2.5rem',
        },
      },
      input: {
        height: {
          sm: '2rem',
          md: '2.5rem',
          lg: '3rem',
        },
        padding: {
          sm: '0.5rem 0.75rem',
          md: '0.75rem 1rem',
          lg: '1rem 1.25rem',
        },
      },
      card: {
        padding: {
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  customProperties: {
    '--delta-header-height': '70px',
    '--delta-sidebar-width': '320px',
    '--delta-sidebar-right-width': '256px',
  },
};

// Dark Theme Configuration
export const darkTheme: ThemeConfig = {
  name: 'dark',
  mode: 'dark',
  tokens: {
    ...lightTheme.tokens,
    colors: {
      ...lightTheme.tokens.colors,
      surface: {
        primary: '#0A0A0A',
        secondary: '#171717',
        tertiary: '#262626',
        elevated: '#404040',
        overlay: 'rgba(0, 0, 0, 0.8)',
        backdrop: 'rgba(23, 74, 95, 0.4)',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#D4D4D4',
        tertiary: '#A3A3A3',
        disabled: '#737373',
        inverse: '#171717',
        link: '#66BDCF',
        linkHover: '#99D3DF',
      },
      border: {
        primary: '#404040',
        secondary: '#525252',
        focus: '#66BDCF',
        error: '#F87171',
        success: '#4ADE80',
        warning: '#FCD34D',
      },
    },
  },
  customProperties: {
    ...lightTheme.customProperties,
  },
};

// ============================================================================
// THEME REGISTRY
// ============================================================================

export const themeRegistry = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themeRegistry;

// ============================================================================
// THEME UTILITIES
// ============================================================================

export const getTheme = (name: ThemeName): ThemeConfig => {
  return themeRegistry[name];
};

export const getAllThemes = (): ThemeConfig[] => {
  return Object.values(themeRegistry);
};

export const getThemeNames = (): ThemeName[] => {
  return Object.keys(themeRegistry) as ThemeName[];
};

// ============================================================================
// CSS CUSTOM PROPERTIES GENERATOR
// ============================================================================

export const generateCSSVariables = (theme: ThemeConfig): Record<string, string> => {
  const variables: Record<string, string> = {};

  // Add custom properties
  if (theme.customProperties) {
    Object.assign(variables, theme.customProperties);
  }

  // Generate color variables
  Object.entries(theme.tokens.colors).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'string') {
          variables[`--color-${category}-${key}`] = value;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            variables[`--color-${category}-${key}-${subKey}`] = subValue as string;
          });
        }
      });
    }
  });

  // Generate typography variables
  Object.entries(theme.tokens.typography).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'string') {
          variables[`--font-${category}-${key}`] = value;
        } else if (Array.isArray(value)) {
          variables[`--font-${category}-${key}`] = value.join(', ');
        }
      });
    }
  });

  // Generate spacing variables
  Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });

  // Generate border radius variables
  Object.entries(theme.tokens.borderRadius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });

  // Generate shadow variables
  Object.entries(theme.tokens.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });

  // Generate z-index variables
  Object.entries(theme.tokens.zIndex).forEach(([key, value]) => {
    variables[`--z-${key}`] = value;
  });

  // Generate animation variables
  Object.entries(theme.tokens.animations).forEach(([category, values]) => {
    if (typeof values === 'object' && values !== null) {
      Object.entries(values).forEach(([key, value]) => {
        variables[`--animation-${category}-${key}`] = value;
      });
    }
  });

  return variables;
};
