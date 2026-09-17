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
    rounded-2xl
`;

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  iconSize?: number
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, iconSize = 15, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center cursor-pointer outline-1",
          "text-gray-900 dark:text-white",
          "hover:bg-secondary hover:outline-primary",
          "rounded-md w-6 h-6",
          "disabled:opacity-40",
          "disabled:cursor-not-allowed",
          "disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{ size?: number }>,
              { size: iconSize }
            )
          : children}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"