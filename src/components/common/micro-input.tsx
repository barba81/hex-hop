export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`${baseInputClass} ${props.className || ''}`}
  />
);

const baseInputClass = `
  /* Appearance & Reset */
  appearance-none outline-none
  
  /* Sizing & Typography */
  h-6 px-2 text-xs font-mono leading-none
  
  /* Colors & Borders */
  bg-muted text-foreground border border-input rounded-md
  
  /* Focus States (Replaces OS focus rings everywhere) */
  focus:border-ring focus:ring-1 focus:ring-ring focus:bg-background
  
  /* Behavior */
  transition-colors select-text truncate
`;