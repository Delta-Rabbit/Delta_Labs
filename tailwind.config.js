/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      // ============================================================================
      // DELTA LABS DESIGN TOKENS INTEGRATION
      // ============================================================================
      
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#E6F4F7',
          100: '#CCE9EF',
          200: '#99D3DF',
          300: '#66BDCF',
          400: '#33A7BF',
          500: '#174A5F', // Main brand color
          600: '#133E4F',
          700: '#0F323F',
          800: '#0B262F',
          900: '#071A1F',
        },
        
        // Secondary Colors
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        
        // Semantic Colors
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
        
        // Surface Colors
        surface: {
          primary: '#FFFFFF',
          secondary: '#F9F9F9',
          tertiary: '#F5F5F5',
          elevated: '#FFFFFF',
          overlay: 'rgba(0, 0, 0, 0.5)',
          backdrop: 'rgba(23, 74, 95, 0.25)',
        },
        
        // Text Colors
        text: {
          primary: '#171717',
          secondary: '#525252',
          tertiary: '#737373',
          disabled: '#A3A3A3',
          inverse: '#FFFFFF',
          link: '#174A5F',
          'link-hover': '#133E4F',
        },
        
        // Border Colors
        border: {
          primary: '#E5E5E5',
          secondary: '#D4D4D4',
          focus: '#174A5F',
          error: '#EF4444',
          success: '#22C55E',
          warning: '#F59E0B',
        },
      },
      
      fontFamily: {
        'primary': ['Poppins', 'system-ui', 'sans-serif'],
        'secondary': ['Nunito Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
        '8xl': '6rem',      // 96px
        '9xl': '8rem',      // 128px
      },
      
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '7': '1.75rem',   // 28px
        '8': '2rem',      // 32px
        '9': '2.25rem',   // 36px
        '10': '2.5rem',   // 40px
        '11': '2.75rem',  // 44px
        '12': '3rem',     // 48px
        '14': '3.5rem',   // 56px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '28': '7rem',     // 112px
        '32': '8rem',     // 128px
        '36': '9rem',     // 144px
        '40': '10rem',    // 160px
        '44': '11rem',    // 176px
        '48': '12rem',    // 192px
        '52': '13rem',    // 208px
        '56': '14rem',    // 224px
        '60': '15rem',    // 240px
        '64': '16rem',    // 256px
        '72': '18rem',    // 288px
        '80': '20rem',    // 320px
        '96': '24rem',    // 384px
      },
      
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',   // 2px
        'base': '0.25rem',  // 4px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
        'full': '9999px',
      },
      
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      
      zIndex: {
        'hide': '-1',
        'auto': 'auto',
        'base': '0',
        'docked': '10',
        'dropdown': '1000',
        'sticky': '1100',
        'banner': '1200',
        'overlay': '1300',
        'modal': '1400',
        'popover': '1500',
        'skipLink': '1600',
        'toast': '1700',
        'tooltip': '1800',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      // ============================================================================
      // DELTA LABS SPECIFIC UTILITIES
      // ============================================================================
      
      screens: {
        'xs': '0px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      // Custom component sizes
      height: {
        'header': '70px',
        'sidebar': '100vh',
        'sidebar-sm': '320px',
        'sidebar-lg': '384px',
      },
      
      width: {
        'sidebar': '320px',
        'sidebar-sm': '256px',
        'sidebar-lg': '384px',
      },
      
      // Custom spacing for Delta Labs components
      spacing: {
        'header': '70px',
        'sidebar': '320px',
        'sidebar-sm': '256px',
        'sidebar-lg': '384px',
      },
    },
  },
  plugins: [
    // Custom plugin for Delta Labs utilities
    function({ addUtilities, addComponents, theme }) {
      // Add custom utilities
      addUtilities({
        '.delta-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.neutral.200'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.primary.500'),
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme('colors.primary.600'),
          },
        },
        '.delta-scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.neutral.200'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.primary.500'),
            borderRadius: '2px',
          },
        },
        '.delta-focus': {
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.border.focus')}`,
          },
        },
        '.delta-transition': {
          transition: 'all 0.3s ease-in-out',
        },
        '.delta-hover-lift': {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      });
      
      // Add custom components
      addComponents({
        '.delta-button': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease-in-out',
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.border.focus')}`,
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.delta-button-primary': {
          backgroundColor: theme('colors.primary.500'),
          color: theme('colors.text.inverse'),
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
          },
          '&:active': {
            backgroundColor: theme('colors.primary.700'),
          },
        },
        '.delta-button-secondary': {
          backgroundColor: theme('colors.surface.secondary'),
          color: theme('colors.text.primary'),
          border: `1px solid ${theme('colors.border.primary')}`,
          '&:hover': {
            backgroundColor: theme('colors.surface.tertiary'),
          },
        },
        '.delta-card': {
          backgroundColor: theme('colors.surface.primary'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.base'),
          padding: theme('spacing.6'),
        },
        '.delta-input': {
          width: '100%',
          padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
          border: `1px solid ${theme('colors.border.primary')}`,
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          transition: 'border-color 0.2s ease-in-out',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.border.focus'),
            boxShadow: `0 0 0 1px ${theme('colors.border.focus')}`,
          },
          '&::placeholder': {
            color: theme('colors.text.disabled'),
          },
        },
      });
    },
  ],
}
