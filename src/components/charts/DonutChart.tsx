import React, { useEffect, useRef } from 'react';

interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  thickness?: number;
  className?: string;
  showLegend?: boolean;
  animate?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 120,
  thickness = 20,
  className = '',
  showLegend = false,
  animate = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1; // Avoid division by zero

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Center of the circle
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 2; // 2px margin
    const innerRadius = radius - thickness;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.fillStyle = '#f1f3f4';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
    ctx.fill();

    let startAngle = -Math.PI / 2; // Start from the top

    if (animate) {
      // Animation setup
      let currentProgress = 0;
      const animationDuration = 1000; // ms
      const startTime = performance.now();

      const draw = (timestamp: number) => {
        // Calculate progress
        const elapsed = timestamp - startTime;
        currentProgress = Math.min(elapsed / animationDuration, 1);

        // Clear canvas for redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw background
        ctx.fillStyle = '#f1f3f4';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
        ctx.fill();

        // Draw data segments with animation
        let currentAngle = startAngle;
        
        data.forEach((item) => {
          const segmentAngle = (item.value / total) * Math.PI * 2 * currentProgress;
          
          ctx.fillStyle = item.color;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
          ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true);
          ctx.closePath();
          ctx.fill();
          
          currentAngle += segmentAngle;
        });

        if (currentProgress < 1) {
          requestAnimationFrame(draw);
        }
      };

      requestAnimationFrame(draw);
    } else {
      // Draw without animation
      data.forEach((item) => {
        const segmentAngle = (item.value / total) * Math.PI * 2;
        
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle);
        ctx.arc(centerX, centerY, innerRadius, startAngle + segmentAngle, startAngle, true);
        ctx.closePath();
        ctx.fill();
        
        startAngle += segmentAngle;
      });
    }
  }, [data, size, thickness, animate, total]);

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <canvas ref={canvasRef} width={size} height={size}></canvas>
      
      {showLegend && (
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-sm mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonutChart;