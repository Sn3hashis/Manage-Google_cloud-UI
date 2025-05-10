import React from 'react';
import Card from '../ui/Card';
import LineChart from '../charts/LineChart';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  chartData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  chartData,
  icon,
  className = '',
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-text-secondary text-sm font-medium">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <span 
                className={`ml-2 text-xs font-medium ${
                  change.direction === 'up' 
                    ? 'text-success' 
                    : change.direction === 'down' 
                    ? 'text-error' 
                    : 'text-text-secondary'
                }`}
              >
                {change.direction === 'up' ? '↑' : change.direction === 'down' ? '↓' : '→'}
                {Math.abs(change.value)}%
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        )}
      </div>
      
      {chartData && chartData.length > 0 && (
        <div className="mt-4">
          <LineChart 
            data={chartData} 
            height={40}
            color="rgba(26, 115, 232, 0.7)"
          />
        </div>
      )}
    </Card>
  );
};

export default StatCard;