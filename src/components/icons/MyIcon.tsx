import React from 'react';

const MyCustomIcon = ({ 
  color = "currentColor", 
  size = 24, 
  strokeWidth = 2, 
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100" // Use your original SVG's coordinate system
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient
          id="linearGradient2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="black" stopOpacity="0" />
          <stop offset="0.2525" stopColor="black" stopOpacity="0" />
          <stop offset="0.2525" stopColor="black" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="black" stopOpacity="0.33" />
          <stop offset="0.5" stopColor="black" stopOpacity="0.5" />
          <stop offset="0.75" stopColor="black" stopOpacity="0.66" />
          <stop offset="0.75" stopColor="black" stopOpacity="1" />
          <stop offset="1" stopColor="black" stopOpacity="1" />
        </linearGradient>
        
        <linearGradient
          id="linearGradient3"
          x1="50.42"
          y1="94.22"
          x2="159.36"
          y2="94.22"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0.9014, 0, 0, 0.9014, 9.6, 11.4)"
          href="#linearGradient2"
        />
      </defs>

      <g transform="translate(-54.15, -46.37)">
        <rect
          style={{
            fill: "url(#linearGradient3)",
            stroke: color, // Linked to your prop!
            strokeWidth: strokeWidth, // Linked to your prop!
            strokeLinejoin: "round",
          }}
          width="98.19"
          height="98.19"
          x="55.05"
          y="47.27"
          ry="3.07"
        />
      </g>
    </svg>
  );
};

export default MyCustomIcon;