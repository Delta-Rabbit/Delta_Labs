/**
 * Delta Labs Date of Birth Dropdown Component
 * Professional date selection with Day, Month, Year dropdowns
 */

import React, { useState, useCallback } from 'react';
import { DeltaCard, DeltaButton } from '../../../../components/theme';
import type { DateOfBirthData } from '../../types';

// ============================================================================
// DATE DROPDOWN PROPS INTERFACE
// ============================================================================

interface DateDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  error?: string;
  disabled?: boolean;
}

// ============================================================================
// DATE DROPDOWN COMPONENT
// ============================================================================

export const DateDropdown: React.FC<DateDropdownProps> = ({
  value,
  onChange,
  placeholder,
  options,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-left border rounded-lg transition-all duration-200
          ${error 
            ? 'border-error-400 bg-error-50' 
            : 'border-border-primary bg-surface-primary hover:border-border-secondary'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed bg-surface-secondary' 
            : 'cursor-pointer'
          }
        `}
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${value ? 'text-text-primary' : 'text-text-tertiary'}`}>
            {value ? options.find(opt => opt.value === value)?.label || value : placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-text-tertiary transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-20 w-full mt-1 bg-surface-primary border border-border-primary rounded-lg shadow-lg max-h-48 overflow-y-auto overflow-x-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-3 text-left transition-colors duration-150 text-sm font-medium whitespace-nowrap
                ${value === option.value 
                  ? 'bg-primary-500 text-text-inverse rounded-lg mx-1 my-1' 
                  : 'text-text-primary hover:bg-surface-secondary'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-error-600 font-medium">{error}</p>
      )}
    </div>
  );
};

// ============================================================================
// DATE OF BIRTH FORM PROPS INTERFACE
// ============================================================================

interface DateOfBirthFormProps {
  onSubmit: (data: DateOfBirthData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}

// ============================================================================
// DATE OF BIRTH FORM COMPONENT
// ============================================================================

export const DateOfBirthForm: React.FC<DateOfBirthFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState<DateOfBirthData>({
    day: '',
    month: '',
    year: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = useCallback((field: keyof DateOfBirthData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.day) {
      newErrors.day = 'Day is required';
    }
    if (!formData.month) {
      newErrors.month = 'Month is required';
    }
    if (!formData.year) {
      newErrors.year = 'Year is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error is handled by parent component
    }
  }, [formData, onSubmit]);

  // Generate day options (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, '0'),
    label: (i + 1).toString().padStart(2, '0'),
  }));

  // Month options
  const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Generate year options (current year - 100 to current year - 13)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 87 }, (_, i) => {
    const year = currentYear - 13 - i;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  });

  return (
    <DeltaCard padding="none" shadow="none" className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6 px-3 pb-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Date of Birth Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {/* Day Dropdown */}
            <div>
              <DateDropdown
                value={formData.day}
                onChange={(value) => handleInputChange('day', value)}
                placeholder="Day"
                options={dayOptions}
                error={errors.day}
                disabled={isLoading}
              />
            </div>

            {/* Month Dropdown */}
            <div>
              <DateDropdown
                value={formData.month}
                onChange={(value) => handleInputChange('month', value)}
                placeholder="Month"
                options={monthOptions}
                error={errors.month}
                disabled={isLoading}
              />
            </div>

            {/* Year Dropdown */}
            <div>
              <DateDropdown
                value={formData.year}
                onChange={(value) => handleInputChange('year', value)}
                placeholder="Year"
                options={yearOptions}
                error={errors.year}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <DeltaButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </DeltaButton>
      </form>
    </DeltaCard>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default DateOfBirthForm;
