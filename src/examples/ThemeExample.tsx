/**
 * Delta Labs Theme System - Example Implementation
 * Demonstrates how to use the theme system in practice
 */

import React, { useState } from 'react';
import { 
  ThemeProvider, 
  useTheme, 
  useThemeMode, 
  useThemeColors,
  ThemeWrapper 
} from '../contexts/Theme_Context';
import { 
  DeltaButton, 
  DeltaInput, 
  DeltaCard, 
  DeltaModal,
  DeltaBadge,
  DeltaSpinner,
  DeltaThemeToggle 
} from '../components/theme';

// ============================================================================
// EXAMPLE COMPONENT - THEME DEMONSTRATION
// ============================================================================

function ThemeDemo() {
  const { currentTheme, themeName, setTheme } = useTheme();
  const { mode, setMode, toggleMode, isDark } = useThemeMode();
  const colors = useThemeColors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <header className="bg-primary-500 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-primary-bold">Delta Labs Theme System</h1>
            <p className="text-primary-100 mt-2">Enterprise-grade theming demonstration</p>
          </div>
          <div className="flex items-center gap-4">
            <DeltaThemeToggle />
            <DeltaBadge variant="info" size="md">
              {themeName} mode
            </DeltaBadge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Theme Controls */}
        <DeltaCard padding="lg" shadow="md">
          <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
            Theme Controls
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Mode Selection
              </h3>
              <div className="space-y-2">
                <DeltaButton 
                  variant={mode === 'light' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setMode('light')}
                >
                  Light Mode
                </DeltaButton>
                <DeltaButton 
                  variant={mode === 'dark' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setMode('dark')}
                >
                  Dark Mode
                </DeltaButton>
                <DeltaButton 
                  variant={mode === 'auto' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setMode('auto')}
                >
                  Auto Mode
                </DeltaButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <DeltaButton 
                  variant="secondary"
                  size="sm"
                  onClick={toggleMode}
                >
                  Toggle Mode
                </DeltaButton>
                <DeltaButton 
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Modal
                </DeltaButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Status
              </h3>
              <div className="space-y-2">
                <DeltaBadge variant="success" size="sm">
                  Theme Active
                </DeltaBadge>
                <DeltaBadge variant={isDark ? 'info' : 'warning'} size="sm">
                  {isDark ? 'Dark' : 'Light'} Theme
                </DeltaBadge>
              </div>
            </div>
          </div>
        </DeltaCard>

        {/* Form Example */}
        <DeltaCard padding="lg" shadow="md">
          <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
            Contact Form
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DeltaInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                size="md"
              />
              <DeltaInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                size="md"
              />
            </div>
            
            <DeltaInput
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message"
              size="md"
            />
            
            <div className="flex gap-3">
              <DeltaButton 
                variant="primary" 
                size="md"
                type="submit"
              >
                Send Message
              </DeltaButton>
              <DeltaButton 
                variant="outline" 
                size="md"
                type="button"
              >
                Clear Form
              </DeltaButton>
            </div>
          </form>
        </DeltaCard>

        {/* Color Palette Display */}
        <DeltaCard padding="lg" shadow="md">
          <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
            Color Palette
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(colors.primary).map(([shade, color]) => (
              <div key={shade} className="text-center">
                <div 
                  className="w-full h-16 rounded-lg shadow-sm border border-border-primary"
                  style={{ backgroundColor: color } as React.CSSProperties}
                />
                <p className="text-sm text-text-secondary mt-2">
                  {shade}
                </p>
                <p className="text-xs text-text-tertiary font-mono">
                  {color}
                </p>
              </div>
            ))}
          </div>
        </DeltaCard>

        {/* Component Showcase */}
        <DeltaCard padding="lg" shadow="md">
          <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
            Component Showcase
          </h2>
          
          <div className="space-y-6">
            {/* Buttons */}
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Button Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <DeltaButton variant="primary" size="md">Primary</DeltaButton>
                <DeltaButton variant="secondary" size="md">Secondary</DeltaButton>
                <DeltaButton variant="outline" size="md">Outline</DeltaButton>
                <DeltaButton variant="ghost" size="md">Ghost</DeltaButton>
                <DeltaButton variant="danger" size="md">Danger</DeltaButton>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Button Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <DeltaButton variant="primary" size="sm">Small</DeltaButton>
                <DeltaButton variant="primary" size="md">Medium</DeltaButton>
                <DeltaButton variant="primary" size="lg">Large</DeltaButton>
                <DeltaButton variant="primary" size="xl">Extra Large</DeltaButton>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Badge Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <DeltaBadge variant="default" size="md">Default</DeltaBadge>
                <DeltaBadge variant="success" size="md">Success</DeltaBadge>
                <DeltaBadge variant="warning" size="md">Warning</DeltaBadge>
                <DeltaBadge variant="error" size="md">Error</DeltaBadge>
                <DeltaBadge variant="info" size="md">Info</DeltaBadge>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Loading States
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <DeltaSpinner size="sm" color="primary" />
                <DeltaSpinner size="md" color="secondary" />
                <DeltaSpinner size="lg" color="primary" />
                <DeltaButton variant="primary" size="md" loading>
                  Loading Button
                </DeltaButton>
              </div>
            </div>
          </div>
        </DeltaCard>

        {/* Theme Information */}
        <DeltaCard padding="lg" shadow="md">
          <h2 className="text-2xl font-primary-semibold text-text-primary mb-6">
            Theme Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                Current Theme
              </h3>
              <div className="space-y-2">
                <p className="text-text-primary">
                  <span className="font-medium">Name:</span> {currentTheme.name}
                </p>
                <p className="text-text-primary">
                  <span className="font-medium">Mode:</span> {currentTheme.mode}
                </p>
                <p className="text-text-primary">
                  <span className="font-medium">Is Dark:</span> {isDark ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-primary-medium text-text-secondary mb-3">
                CSS Variables
              </h3>
              <p className="text-text-tertiary text-sm">
                {Object.keys(currentTheme.tokens.colors).length} color categories
              </p>
              <p className="text-text-tertiary text-sm">
                {Object.keys(currentTheme.tokens.typography).length} typography properties
              </p>
              <p className="text-text-tertiary text-sm">
                {Object.keys(currentTheme.tokens.spacing).length} spacing values
              </p>
            </div>
          </div>
        </DeltaCard>
      </main>

      {/* Modal Example */}
      <DeltaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Theme System Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            This modal demonstrates the theme system in action. Notice how all colors,
            typography, and spacing automatically adapt to the current theme.
          </p>
          
          <div className="flex gap-3">
            <DeltaButton 
              variant="primary" 
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Close Modal
            </DeltaButton>
            <DeltaButton 
              variant="outline" 
              size="md"
              onClick={toggleMode}
            >
              Toggle Theme
            </DeltaButton>
          </div>
        </div>
      </DeltaModal>
    </div>
  );
}

// ============================================================================
// MAIN APP WITH THEME PROVIDER
// ============================================================================

function App() {
  return (
    <ThemeProvider 
      defaultTheme="light" 
      defaultMode="light"
      enableSystemTheme={true}
      enablePersistence={true}
    >
      <ThemeWrapper>
        <ThemeDemo />
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;
