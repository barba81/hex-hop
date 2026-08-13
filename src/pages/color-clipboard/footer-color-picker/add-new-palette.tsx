import { Palette } from "lucide-react";
import { addNewPalette } from "../features/add-block";

export const AddNewPalette = () => {
  return (
    <div
        className={`
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
