/**
 * Delta Labs Theme Utilities
 * Helper functions and utilities for theme management
 */

import type { ThemeConfig } from './themeConfig';

// ============================================================================
// THEME UTILITIES
// ============================================================================

/**
 * Get contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Lighten a color by a percentage
 */
export function lightenColor(color: string, percentage: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const { r, g, b } = rgb;
  const factor = percentage / 100;
  
  return rgbToHex(
    Math.min(255, Math.round(r + (255 - r) * factor)),
    Math.min(255, Math.round(g + (255 - g) * factor)),
    Math.min(255, Math.round(b + (255 - b) * factor))
  );
}

/**
 * Darken a color by a percentage
 */
export function darkenColor(color: string, percentage: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const { r, g, b } = rgb;
  const factor = percentage / 100;
  
  return rgbToHex(
    Math.max(0, Math.round(r * (1 - factor))),
    Math.max(0, Math.round(g * (1 - factor))),
    Math.max(0, Math.round(b * (1 - factor)))
  );
}

/**
 * Check if a color is light or dark
 */
export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color);
  if (!rgb) return false;
  
  const { r, g, b } = rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5;
}

/**
 * Get the best text color (black or white) for a background
 */
export function getBestTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
}

// ============================================================================
// THEME VALIDATION
// ============================================================================

/**
 * Validate theme configuration
 */
export function validateTheme(theme: ThemeConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required properties
  if (!theme.name) errors.push('Theme name is required');
  if (!theme.mode) errors.push('Theme mode is required');
  if (!theme.tokens) errors.push('Theme tokens are required');
  
  // Check color tokens
  if (theme.tokens.colors) {
    const { colors } = theme.tokens;
    
    // Check primary colors
    if (!colors.primary || !colors.primary[500]) {
      errors.push('Primary color palette is required');
    }
    
    // Check semantic colors
    const semanticColors = ['success', 'warning', 'error', 'info'];
    semanticColors.forEach(color => {
      if (!colors.semantic || !colors.semantic[color as keyof typeof colors.semantic]) {
        errors.push(`${color} semantic color is required`);
      }
    });
    
    // Check surface colors
    if (!colors.surface || !colors.surface.primary) {
      errors.push('Surface colors are required');
    }
    
    // Check text colors
    if (!colors.text || !colors.text.primary) {
      errors.push('Text colors are required');
    }
  }
  
  // Check typography tokens
  if (theme.tokens.typography) {
    const { typography } = theme.tokens;
    
    if (!typography.fontFamily || !typography.fontFamily.primary) {
      errors.push('Primary font family is required');
    }
    
    if (!typography.fontSize || !typography.fontSize.base) {
      errors.push('Base font size is required');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================================================
// THEME GENERATION
// ============================================================================

/**
 * Generate a theme variant (light/dark) from a base theme
 */
export function generateThemeVariant(
  baseTheme: ThemeConfig, 
  variant: 'light' | 'dark'
): ThemeConfig {
  const variantTheme = { ...baseTheme };
  
  if (variant === 'dark') {
    // Invert surface colors
    if (variantTheme.tokens.colors.surface) {
      variantTheme.tokens.colors.surface = {
        primary: '#0A0A0A',
        secondary: '#171717',
        tertiary: '#262626',
        elevated: '#404040',
        overlay: 'rgba(0, 0, 0, 0.8)',
        backdrop: 'rgba(23, 74, 95, 0.4)',
      };
    }
    
    // Invert text colors
    if (variantTheme.tokens.colors.text) {
      variantTheme.tokens.colors.text = {
        primary: '#FFFFFF',
        secondary: '#D4D4D4',
        tertiary: '#A3A3A3',
        disabled: '#737373',
        inverse: '#171717',
        link: '#66BDCF',
        linkHover: '#99D3DF',
      };
    }
    
    // Adjust border colors
    if (variantTheme.tokens.colors.border) {
      variantTheme.tokens.colors.border = {
        primary: '#404040',
        secondary: '#525252',
        focus: '#66BDCF',
        error: '#F87171',
        success: '#4ADE80',
        warning: '#FCD34D',
      };
    }
  }
  
  variantTheme.name = `${baseTheme.name}-${variant}`;
  variantTheme.mode = variant;
  
  return variantTheme;
}

/**
 * Generate CSS custom properties from theme
 */
export function generateCSSCustomProperties(theme: ThemeConfig): string {
  const properties: string[] = [];
  
  // Add custom properties
  if (theme.customProperties) {
    Object.entries(theme.customProperties).forEach(([key, value]) => {
      properties.push(`  ${key}: ${value};`);
    });
  }
  
  // Generate color properties
  if (theme.tokens.colors) {
    Object.entries(theme.tokens.colors).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === 'string') {
            properties.push(`  --color-${category}-${key}: ${value};`);
          } else if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              properties.push(`  --color-${category}-${key}-${subKey}: ${subValue};`);
            });
          }
        });
      }
    });
  }
  
  // Generate typography properties
  if (theme.tokens.typography) {
    Object.entries(theme.tokens.typography).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          if (typeof value === 'string') {
            properties.push(`  --font-${category}-${key}: ${value};`);
          } else if (Array.isArray(value)) {
            properties.push(`  --font-${category}-${key}: ${value.join(', ')};`);
          }
        });
      }
    });
  }
  
  // Generate spacing properties
  if (theme.tokens.spacing) {
    Object.entries(theme.tokens.spacing).forEach(([key, value]) => {
      properties.push(`  --spacing-${key}: ${value};`);
    });
  }
  
  // Generate border radius properties
  if (theme.tokens.borderRadius) {
    Object.entries(theme.tokens.borderRadius).forEach(([key, value]) => {
      properties.push(`  --radius-${key}: ${value};`);
    });
  }
  
  // Generate shadow properties
  if (theme.tokens.shadows) {
    Object.entries(theme.tokens.shadows).forEach(([key, value]) => {
      properties.push(`  --shadow-${key}: ${value};`);
    });
  }
  
  // Generate z-index properties
  if (theme.tokens.zIndex) {
    Object.entries(theme.tokens.zIndex).forEach(([key, value]) => {
      properties.push(`  --z-${key}: ${value};`);
    });
  }
  
  // Generate animation properties
  if (theme.tokens.animations) {
    Object.entries(theme.tokens.animations).forEach(([category, values]) => {
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).forEach(([key, value]) => {
          properties.push(`  --animation-${category}-${key}: ${value};`);
        });
      }
    });
  }
  
  return `:root {\n${properties.join('\n')}\n}`;
}

// ============================================================================
// THEME ANALYSIS
// ============================================================================

/**
 * Analyze theme for accessibility compliance
 */
export function analyzeThemeAccessibility(theme: ThemeConfig): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;
  
  if (theme.tokens.colors) {
    const { colors } = theme.tokens;
    
    // Check primary color contrast
    if (colors.primary && colors.surface && colors.text) {
      const primaryColor = colors.primary[500];
      const surfaceColor = colors.surface.primary;
      const textColor = colors.text.primary;
      
      if (primaryColor && surfaceColor && textColor) {
        const contrastRatio = getContrastRatio(primaryColor, textColor);
        
        if (contrastRatio < 4.5) {
          score -= 20;
          issues.push(`Primary color contrast ratio (${contrastRatio.toFixed(2)}) is below WCAG AA standard (4.5)`);
          recommendations.push('Consider using a darker primary color or lighter text color');
        }
      }
    }
    
    // Check semantic color contrast
    if (colors.semantic && colors.surface) {
      const surfaceColor = colors.surface.primary;
      
      Object.entries(colors.semantic).forEach(([name, colorPalette]) => {
        if (typeof colorPalette === 'object' && colorPalette[500] && surfaceColor) {
          const contrastRatio = getContrastRatio(colorPalette[500], surfaceColor);
          
          if (contrastRatio < 3) {
            score -= 10;
            issues.push(`${name} color contrast ratio (${contrastRatio.toFixed(2)}) is below minimum standard (3)`);
            recommendations.push(`Consider adjusting ${name} color for better visibility`);
          }
        }
      });
    }
  }
  
  // Check font sizes
  if (theme.tokens.typography && theme.tokens.typography.fontSize) {
    const baseFontSize = parseFloat(theme.tokens.typography.fontSize.base || '16px');
    
    if (baseFontSize < 16) {
      score -= 15;
      issues.push(`Base font size (${baseFontSize}px) is below recommended minimum (16px)`);
      recommendations.push('Consider increasing base font size for better readability');
    }
  }
  
  return {
    score: Math.max(0, score),
    issues,
    recommendations
  };
}

// ============================================================================
// THEME EXPORT
// ============================================================================

/**
 * Export theme as CSS file content
 */
export function exportThemeAsCSS(theme: ThemeConfig): string {
  const cssProperties = generateCSSCustomProperties(theme);
  const themeClass = `.theme-${theme.name}`;
  
  return `${cssProperties}\n\n${themeClass} {\n  /* Theme-specific styles */\n}`;
}

/**
 * Export theme as JSON
 */
export function exportThemeAsJSON(theme: ThemeConfig): string {
  return JSON.stringify(theme, null, 2);
}

// ============================================================================
// THEME COMPARISON
// ============================================================================

/**
 * Compare two themes and return differences
 */
export function compareThemes(theme1: ThemeConfig, theme2: ThemeConfig): {
  differences: string[];
  similarity: number;
} {
  const differences: string[] = [];
  let totalProperties = 0;
  let matchingProperties = 0;
  
  // Compare basic properties
  const basicProps = ['name', 'mode'];
  basicProps.forEach(prop => {
    totalProperties++;
    if (theme1[prop as keyof ThemeConfig] !== theme2[prop as keyof ThemeConfig]) {
      differences.push(`${prop}: "${theme1[prop as keyof ThemeConfig]}" vs "${theme2[prop as keyof ThemeConfig]}"`);
    } else {
      matchingProperties++;
    }
  });
  
  // Compare tokens (simplified comparison)
  if (theme1.tokens && theme2.tokens) {
    const tokenKeys = Object.keys(theme1.tokens);
    tokenKeys.forEach(key => {
      totalProperties++;
      if (JSON.stringify(theme1.tokens[key as keyof typeof theme1.tokens]) === 
          JSON.stringify(theme2.tokens[key as keyof typeof theme2.tokens])) {
        matchingProperties++;
      } else {
        differences.push(`tokens.${key}: Different values`);
      }
    });
  }
  
  const similarity = totalProperties > 0 ? (matchingProperties / totalProperties) * 100 : 100;
  
  return {
    differences,
    similarity
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

// Functions are already exported individually above
