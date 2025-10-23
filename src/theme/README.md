# Delta Labs Theme System Documentation

## 🎨 **Overview**

The Delta Labs Theme System is an enterprise-grade theming solution designed to scale across 400+ screens. It provides a comprehensive design token system, dynamic theme switching, and consistent component styling.

## 🏗️ **Architecture**

### **Core Components**
- **Design Tokens** (`src/theme/designTokens.ts`) - Centralized design values
- **Theme Configuration** (`src/theme/themeConfig.ts`) - Theme definitions and utilities
- **Theme Context** (`src/contexts/Theme_Context.tsx`) - React context for theme management
- **Theme Components** (`src/components/theme/ThemeComponents.tsx`) - Reusable themed components
- **Tailwind Integration** (`tailwind.config.js`) - Design token integration with Tailwind CSS

## 🎯 **Design Tokens**

### **Color System**
```typescript
// Primary Brand Colors
primary: {
  50: '#E6F4F7',   // Lightest
  100: '#CCE9EF',
  200: '#99D3DF',
  300: '#66BDCF',
  400: '#33A7BF',
  500: '#174A5F',  // Main brand color
  600: '#133E4F',
  700: '#0F323F',
  800: '#0B262F',
  900: '#071A1F',  // Darkest
}

// Semantic Colors
semantic: {
  success: { 50-900 },
  warning: { 50-900 },
  error: { 50-900 },
  info: { 50-900 },
}

// Surface Colors
surface: {
  primary: '#FFFFFF',
  secondary: '#F9F9F9',
  tertiary: '#F5F5F5',
  elevated: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(23, 74, 95, 0.25)',
}
```

### **Typography System**
```typescript
fontFamily: {
  primary: ['Poppins', 'system-ui', 'sans-serif'],
  secondary: ['Nunito Sans', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}

fontSize: {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  // ... up to 9xl
}
```

### **Spacing System**
```typescript
spacing: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  // ... up to 96
}
```

## 🚀 **Usage**

### **1. Theme Provider Setup**
```tsx
import { ThemeProvider } from './contexts/Theme_Context';

function App() {
  return (
    <ThemeProvider 
      defaultTheme="light" 
      defaultMode="light"
      enableSystemTheme={true}
      enablePersistence={true}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### **2. Using Theme Hooks**
```tsx
import { useTheme, useThemeColors, useThemeMode } from './contexts/Theme_Context';

function MyComponent() {
  const { currentTheme, setTheme, toggleMode } = useTheme();
  const colors = useThemeColors();
  const { isDark, isLight, mode } = useThemeMode();
  
  return (
    <div style={{ backgroundColor: colors.surface.primary }}>
      <button onClick={toggleMode}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

### **3. Using Theme Components**
```tsx
import { 
  DeltaButton, 
  DeltaInput, 
  DeltaCard, 
  DeltaModal,
  DeltaThemeToggle 
} from './components/theme/ThemeComponents';

function Example() {
  return (
    <DeltaCard padding="lg" shadow="md" hover>
      <DeltaInput 
        label="Email"
        placeholder="Enter your email"
        size="md"
      />
      <DeltaButton 
        variant="primary" 
        size="md"
        leftIcon={<Icon />}
      >
        Submit
      </DeltaButton>
      <DeltaThemeToggle />
    </DeltaCard>
  );
}
```

### **4. Using Tailwind Classes**
```tsx
// With design tokens integrated into Tailwind
<div className="bg-primary-500 text-white p-4 rounded-lg shadow-md">
  <h1 className="font-primary-bold text-2xl">Title</h1>
  <p className="font-secondary-normal text-text-secondary">
    Description
  </p>
</div>
```

## 🎨 **Theme Modes**

### **Supported Modes**
- **Light Mode** - Default light theme
- **Dark Mode** - Dark theme variant
- **Auto Mode** - Follows system preference

### **Theme Switching**
```tsx
const { mode, setMode, toggleMode } = useThemeMode();

// Switch to specific mode
setMode('dark');

// Toggle between light/dark
toggleMode();

// Set to auto (follows system)
setMode('auto');
```

## 🧩 **Component Variants**

### **Button Variants**
- `primary` - Main action button
- `secondary` - Secondary action
- `outline` - Outlined button
- `ghost` - Transparent button
- `danger` - Destructive action

### **Button Sizes**
- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)
- `xl` - Extra large (56px height)

### **Input Sizes**
- `sm` - Small (32px height)
- `md` - Medium (40px height)
- `lg` - Large (48px height)

### **Card Padding**
- `sm` - Small padding (16px)
- `md` - Medium padding (24px)
- `lg` - Large padding (32px)

### **Card Shadows**
- `none` - No shadow
- `sm` - Small shadow
- `base` - Default shadow
- `md` - Medium shadow
- `lg` - Large shadow
- `xl` - Extra large shadow

## 🎯 **Customization**

### **Adding New Themes**
```typescript
// In themeConfig.ts
export const customTheme: ThemeConfig = {
  name: 'custom',
  mode: 'light',
  tokens: {
    colors: {
      primary: {
        // Custom color palette
      },
      // ... other tokens
    },
    // ... other design tokens
  },
};

// Add to theme registry
export const themeRegistry = {
  light: lightTheme,
  dark: darkTheme,
  custom: customTheme, // Add your custom theme
} as const;
```

### **Extending Design Tokens**
```typescript
// Add new token categories
export const customTokens = {
  // ... existing tokens
  gradients: {
    primary: 'linear-gradient(135deg, #174A5F 0%, #0EA5E9 100%)',
    secondary: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  effects: {
    blur: 'blur(8px)',
    glow: '0 0 20px rgba(23, 74, 95, 0.3)',
  },
};
```

## 🔧 **Advanced Features**

### **CSS Variables**
The theme system automatically generates CSS variables:
```css
:root {
  --color-primary-500: #174A5F;
  --color-surface-primary: #FFFFFF;
  --spacing-4: 1rem;
  --font-size-lg: 1.125rem;
  /* ... all design tokens as CSS variables */
}
```

### **Theme Persistence**
User theme preferences are automatically saved to localStorage:
```typescript
// Automatically saved
localStorage.setItem('delta-labs-theme-name', 'dark');
localStorage.setItem('delta-labs-theme-mode', 'dark');
```

### **System Theme Detection**
```typescript
// Automatically detects system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Theme automatically updates when system theme changes
});
```

## 📱 **Responsive Design**

### **Breakpoints**
```typescript
breakpoints: {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

### **Responsive Usage**
```tsx
// Tailwind responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">
  <DeltaCard className="p-4 md:p-6 lg:p-8">
    Content
  </DeltaCard>
</div>
```

## 🎨 **Design Guidelines**

### **Color Usage**
- **Primary Colors**: Use for main actions, links, and brand elements
- **Secondary Colors**: Use for supporting elements and accents
- **Semantic Colors**: Use for status indicators (success, warning, error, info)
- **Surface Colors**: Use for backgrounds and containers
- **Text Colors**: Use for content hierarchy

### **Typography Hierarchy**
- **Headings**: Use `font-primary-bold` with appropriate sizes
- **Body Text**: Use `font-secondary-normal` with `text-text-primary`
- **Captions**: Use `font-secondary-normal` with `text-text-secondary`
- **Code**: Use `font-mono` for code blocks

### **Spacing Guidelines**
- **Component Padding**: Use 4, 6, or 8 spacing units
- **Section Margins**: Use 8, 12, or 16 spacing units
- **Grid Gaps**: Use 2, 4, or 6 spacing units

## 🚀 **Performance**

### **Optimizations**
- CSS variables are injected only once per theme change
- Theme context uses React.memo for performance
- Design tokens are statically defined (no runtime computation)
- Tailwind classes are purged for optimal bundle size

### **Bundle Size**
- Core theme system: ~15KB gzipped
- Theme components: ~25KB gzipped
- Tailwind integration: ~50KB gzipped (with purging)

## 🔍 **Debugging**

### **Theme Inspector**
```tsx
import { useTheme } from './contexts/Theme_Context';

function ThemeInspector() {
  const { currentTheme, cssVariables } = useTheme();
  
  return (
    <pre className="p-4 bg-surface-secondary rounded">
      {JSON.stringify(currentTheme, null, 2)}
    </pre>
  );
}
```

### **CSS Variables Debug**
```css
/* Check applied CSS variables in DevTools */
:root {
  /* All design tokens as CSS variables */
}
```

## 📚 **Examples**

### **Complete Component Example**
```tsx
import React, { useState } from 'react';
import { 
  DeltaButton, 
  DeltaInput, 
  DeltaCard, 
  DeltaModal,
  DeltaThemeToggle,
  useTheme 
} from './components/theme/ThemeComponents';

function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();
  
  return (
    <DeltaCard padding="lg" shadow="md" hover>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-primary-bold text-text-primary">
          User Profile
        </h2>
        <DeltaThemeToggle />
      </div>
      
      <div className="space-y-4">
        <DeltaInput 
          label="Full Name"
          placeholder="Enter your full name"
          size="md"
        />
        <DeltaInput 
          label="Email"
          placeholder="Enter your email"
          type="email"
          size="md"
        />
        
        <div className="flex gap-3">
          <DeltaButton 
            variant="primary" 
            size="md"
            onClick={() => setIsModalOpen(true)}
          >
            Save Changes
          </DeltaButton>
          <DeltaButton 
            variant="outline" 
            size="md"
          >
            Cancel
          </DeltaButton>
        </div>
      </div>
      
      <DeltaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Changes"
        size="md"
      >
        <p className="text-text-secondary mb-4">
          Are you sure you want to save these changes?
        </p>
        <div className="flex gap-3 justify-end">
          <DeltaButton 
            variant="secondary" 
            size="md"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </DeltaButton>
          <DeltaButton 
            variant="primary" 
            size="md"
            onClick={() => setIsModalOpen(false)}
          >
            Confirm
          </DeltaButton>
        </div>
      </DeltaModal>
    </DeltaCard>
  );
}
```

## 🎯 **Best Practices**

### **1. Consistent Usage**
- Always use design tokens instead of hardcoded values
- Use theme components for consistency
- Follow the established color and spacing patterns

### **2. Performance**
- Use CSS variables for dynamic theming
- Avoid inline styles when theme classes are available
- Leverage Tailwind's purging for optimal bundle size

### **3. Accessibility**
- Ensure sufficient color contrast ratios
- Use semantic colors for status indicators
- Provide alternative text for icons and images

### **4. Maintainability**
- Keep design tokens centralized
- Use TypeScript for type safety
- Document custom theme extensions

## 🔄 **Migration Guide**

### **From Existing Styles**
1. Replace hardcoded colors with design tokens
2. Update component classes to use theme components
3. Remove custom CSS in favor of Tailwind classes
4. Test theme switching functionality

### **Adding New Components**
1. Use theme hooks for dynamic values
2. Follow the established component patterns
3. Include proper TypeScript types
4. Add to the component library

---

## 📞 **Support**

For questions or issues with the theme system:
1. Check this documentation first
2. Review the example components
3. Test with the theme inspector
4. Contact the design system team

**Happy Theming! 🎨**
