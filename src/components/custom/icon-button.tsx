import { cn } from "@/lib/utils";
import React from "react";

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
          "bg-muted",
          "flex items-center justify-center cursor-pointer outline-1",
          "text-gray-900 dark:text-white",
          "hover:bg-secondary hover:outline-primary",
          "rounded-md w-6 h-6",
          "disabled:opacity-40",
          "disabled:cursor-not-allowed",
          "disabled:pointer-events-none",
          className,
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