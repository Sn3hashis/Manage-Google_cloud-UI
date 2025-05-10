import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select option',
  className = '',
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1">
          {label}
        </label>
      )}
      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className={`w-full px-3 py-2 bg-white dark:bg-surface border rounded-md shadow-sm text-left
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            ${error ? 'border-error focus:ring-error focus:border-error' : 'border-border'}
            ${disabled ? 'bg-surface opacity-75 cursor-not-allowed' : ''}
          `}
          disabled={disabled}
        >
          <div className="flex items-center justify-between">
            <span className={!selectedOption ? 'text-text-secondary' : ''}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown 
              size={16} 
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-surface shadow-dropdown border border-border rounded-md py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2 cursor-pointer hover:bg-hover ${
                  option.value === value ? 'bg-hover font-medium' : ''
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default Select;