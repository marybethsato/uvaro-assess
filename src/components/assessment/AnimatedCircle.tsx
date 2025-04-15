import React, { useEffect, useState } from 'react';

interface AnimatedCircleProps {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
}

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
  percentage,
  size,
  strokeWidth,
  color,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const newOffset = circumference - (percentage / 100) * circumference;
    setOffset(newOffset);
  }, [percentage, circumference]);

  return (
    <svg width={size} height={size}>
      {/* Background Circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress Circle */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          transition: 'stroke-dashoffset 1s ease-out',
        }}
      />
      {/* Percent Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="14"
        fill={color}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default AnimatedCircle;
