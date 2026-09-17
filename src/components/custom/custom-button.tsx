import { cn } from "@/lib/utils";
import React from "react";

export const defaultButtonBackground = `
    flex items-center justify-center
    hover:bg-secondary
    hover:outline-primary
    dark:bg-secondary/60
    rounded-md 
    cursor-pointer
    text-gray-900 
    dark:text-white
    roundend-2xl
`;


export const buttonStyle = `
flex items-center justify-center
 cursor-pointer shrink-0 outline-0 rounded-md`;

export const CustomButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    type={props.type || "button"}
    className={`${buttonStyle} ${props.className || ""}`}
  />
);

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center cursor-pointer outline-1",
          "text-gray-900 dark:text-white",
          "hover:bg-secondary hover:outline-primary",
          "rounded-md p-0.5",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"