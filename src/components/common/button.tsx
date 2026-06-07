import { buttonStyle } from "@/style/default-style";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <div
      className={`
        ${buttonStyle}      
        flex  
        items-center 
        justify-center
        dark:bg-foreground/10
        hover:bg-foreground/25
        bg-stone-100
        text-gray-900 
        dark:text-white 
      `}
    >
      {children}
    </div>
  );
};

export default Button;