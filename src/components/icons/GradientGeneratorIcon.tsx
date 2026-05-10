  const GradientGeneratorIcon = ({
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
        // Adjusted viewBox to wrap around your rect coordinates
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <defs>
          <linearGradient id="a">
            <stop offset="0" stop-color="currentColor" />
            <stop offset=".249" stop-color="currentColor" stop-opacity=".586" />
            <stop offset=".249" stop-color="currentColor" stop-opacity=".569" />
            <stop offset=".501" stop-color="currentColor" stop-opacity=".437" />
            <stop offset=".501" stop-color="currentColor" stop-opacity=".405" />
            <stop offset=".748" stop-color="currentColor" stop-opacity=".256" />
            <stop offset=".748" stop-color="currentColor" stop-opacity=".288" />
            <stop offset="1" stop-color="currentColor" stop-opacity=".335" />
          </linearGradient>
          <linearGradient
            xlinkHref="#a"
            id="b"
            x1=".435"
            x2="23.565"
            y1="12"
            y2="12"
            gradientTransform="translate(-41.41 -17.443)"
            gradientUnits="userSpaceOnUse"
          />
        </defs>
        <rect
          width="21.129"
          height="21.129"
          x="-39.974"
          y="-16.007"
          fill="url(#b)"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="2"
          ry="1.766"
          transform="translate(40.974 17.007)"
        />
      </svg>
    );
  };

  export default GradientGeneratorIcon;
