import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helpText,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-text-secondary mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-3 py-2 bg-white dark:bg-surface border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            disabled:bg-surface disabled:text-text-secondary disabled:cursor-not-allowed
            ${error ? 'border-error focus:ring-error focus:border-error' : 'border-border'}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-secondary">
            {icon}
          </div>
        )}
      </div>
      {helpText && !error && (
        <p className="mt-1 text-xs text-text-secondary">{helpText}</p>
      )}
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default TextInput;