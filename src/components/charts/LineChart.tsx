import React, { useEffect, useRef } from 'react';

interface LineChartProps {
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
  className?: string;
  showAxis?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  height = 60,
  color = 'rgba(26, 115, 232, 1)',
  className = '',
  showAxis = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawChart = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (data.length === 0) return;

      const padding = showAxis ? 20 : 0;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;

      // Find min and max values
      const max = Math.max(...data);
      const min = Math.min(...data);
      const range = max - min || 1; // Avoid division by zero

      // Draw axes if needed
      if (showAxis) {
        ctx.strokeStyle = 'rgba(218, 220, 224, 0.6)';
        ctx.lineWidth = 1;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
      }

      // Draw line
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const normalizedValue = (value - min) / range;
        const y = canvas.height - padding - normalizedValue * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Fill area under the line
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `${color.replace('1)', '0.3)')}`);
      gradient.addColorStop(1, `${color.replace('1)', '0.0)')}`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const normalizedValue = (value - min) / range;
        const y = canvas.height - padding - normalizedValue * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.lineTo(padding + chartWidth, canvas.height - padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.closePath();
      ctx.fill();
    };

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${height}px`;

    drawChart();

    // Redraw on resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.style.width = `${rect.width}px`;
      drawChart();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data, height, color, showAxis]);

  return (
    <div className={`w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: `${height}px` }}
      ></canvas>
      {labels && (
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          {labels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineChart;