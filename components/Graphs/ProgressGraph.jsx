import React from "react";

const ProgressChart = ({ value, maxValue }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / maxValue, 1);
  const offset = circumference * (1 - progress);

  return (
    <div style={{height: "28px" }} className="mt-1" >
      <svg
        width="28"
        height="28"
        viewBox="0 0 120 120"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke={`${value < maxValue - value ? '#B91C1C' : '#15803D'}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            stroke: `${value < maxValue - value ? '#B91C1C' : '#15803D'}`,
            transform: "rotate(360deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
    
    </div>
  );
};

export default ProgressChart;
