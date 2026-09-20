import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  iconSize?: number
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, iconSize = 15, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "rounded-md w-7 h-7",
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
      </Button>
    )
  }
)

IconButton.displayName = "IconButton"