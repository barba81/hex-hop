import React from "react";

interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
}

export const GradientStepIcon = ({
  size = 24,                 
  color = "currentColor",
  strokeWidth = 1.07,         
  className = '',
  ...props 
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}            
      height={size}          
      viewBox="0 0 99 99"
      className={className}   
      {...props}
    >
      <defs>
        <linearGradient id="a">
          {/* Wire up 'color' to stopColor instead of hardcoded '#000' */}
          <stop offset={0} style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset={0.25} style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset={0.25} style={{ stopColor: color, stopOpacity: 0.75 }} />
          <stop offset={0.5} style={{ stopColor: color, stopOpacity: 0.75 }} />
          <stop offset={0.5} style={{ stopColor: color, stopOpacity: 0.5 }} />
          <stop offset={0.75} style={{ stopColor: color, stopOpacity: 0.5 }} />
          <stop offset={0.75} style={{ stopColor: color, stopOpacity: 0.01176471 }} />
        </linearGradient>
        <linearGradient
          xlinkHref="#a"
          id="b"
          x1={11.035}
          x2={108.965}
          y1={60}
          y2={60}
          gradientUnits="userSpaceOnUse"
        />
      </defs>
      <rect
        width={97.93}
        height={97.93}
        x={11.035}
        y={11.035}
        rx={10.756}
        style={{
          fill: "url(#b)",
          stroke: color,       
          strokeWidth: strokeWidth, 
          strokeLinejoin: "round",
          strokeDasharray: "none",
          strokeOpacity: 1,
        }}
        transform="translate(-10.5 -10.5)"
      />
    </svg>
  );
};