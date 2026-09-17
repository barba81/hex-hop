import { cn } from "@/lib/utils";

export const CustomInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => (
  <input
    {...props}
    className={cn(
      `
        h-6 px-2 text-xs font-mono leading-none
        bg-muted text-foreground
        outline-1    hover:outline-primary
        rounded-md
        focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background
        transition-colors select-text truncate
        appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
      `,
      props.className
    )}
  />
);