export const MicroButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    type={props.type || "button"}
    className={`${baseButtonClass} ${props.className || ''}`}
  />
);


const baseButtonClass = `
  /* Appearance & Reset */
  appearance-none outline-none cursor-pointer select-none
  
  /* Alignment & Sizing */
  inline-flex items-center justify-center h-7 px-2.5 text-xs font-medium leading-none
  
  /* Colors & Borders */
  bg-primary text-primary-foreground border-0 rounded-md
  
  /* Interactive States */
  hover:bg-primary/90 active:scale-95
  focus-visible:ring-2 focus-visible:ring-ring
  
  /* Behavior */
  transition-all shrink-0
`;
