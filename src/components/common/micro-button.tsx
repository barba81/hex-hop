import React from "react";

export const defaultButtonBackground = `
    flex items-center justify-center
    bg-zinc-200
    hover:bg-zinc-300
    dark:bg-foreground/10
    dark:hover:bg-foreground/15
    rounded-md 
    cursor-pointer
    text-gray-900 
    dark:text-white
`;


export const buttonStyle = `
flex items-center justify-center
 cursor-pointer shrink-0 outline-0 rounded-md`;

export const MicroButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    type={props.type || "button"}
    className={`${buttonStyle} ${props.className || ""}`}
  />
);

type IconComponent = React.ComponentType<{ size?: number | string; className?: string }>;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconComponent;
  iconSize?: number | string;
  iconClassName?: string;
}

export const IconButton = ({
  icon: Icon,
  iconSize = 16,
  iconClassName,
  className,
  ...props
}: IconButtonProps) => (
  <MicroButton
    {...props}
    className={`text-gray-900 dark:text-white ${className || ""}`}
  >
    <Icon size={iconSize} className={iconClassName} />
  </MicroButton>
);