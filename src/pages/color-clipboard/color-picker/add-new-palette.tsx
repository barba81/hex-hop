import { Palette } from "lucide-react";
import { buttonStyle } from "@/style/default-style";
import { addNewPalette } from "../features/add-new-block";

export const AddNewPalette = () => {
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
             dark:text-white `}
        onClick={() => addNewPalette({})}
      >
        <Palette strokeWidth={2} size={17} />
      </div>
  );
};
