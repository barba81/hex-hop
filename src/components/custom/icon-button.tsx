import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  iconSize?: number
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        size="icon-sm"
        variant="secondary"
        ref={ref}
        className={cn(
          className,
        )}
        {...props}
      >
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{ size?: number }>,
            )
          : children}
      </Button>
    )
  }
)

IconButton.displayName = "IconButton"