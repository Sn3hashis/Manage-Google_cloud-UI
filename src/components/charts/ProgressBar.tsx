import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  className?: string;
  showLabel?: boolean;
  labelPosition?: 'top' | 'right';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'primary',
  height = 8,
  className = '',
  showLabel = false,
  labelPosition = 'right',
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };
  
  const bgColor = colorClasses[color as keyof typeof colorClasses] || color;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>{value} / {max}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      
      <div className="flex items-center">
        <div 
          className="flex-grow rounded-full bg-border overflow-hidden"
          style={{ height: `${height}px` }}
        >
          <div
            className={`h-full rounded-full ${bgColor}`}
            style={{ width: `${percentage}%`, transition: 'width 0.4s ease-in-out' }}
          ></div>
        </div>
        
        {showLabel && labelPosition === 'right' && (
          <span className="ml-2 text-xs text-text-secondary whitespace-nowrap">
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;