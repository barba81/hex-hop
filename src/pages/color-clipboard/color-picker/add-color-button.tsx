import { useColorStore } from "@/store/use-color-store";
import { buttonStyle } from "./default-style";
import { Check } from "lucide-react";
import AcceptedUx from "./accepted-ux";
import { useState } from "react";
import { addNewColor } from "@/features/colors/add-new-color";
import { colorStringToData } from "@/features/colors/color-format-changer";

const AddColorButton = () => {
  const isColorValid = useColorStore().isColorValid;
  const inputColor = useColorStore().inputColor;
  const [coords, setCoords] = useState<DOMRect | null>(null);

  return (
    <>
      <div
        className={`
          ${buttonStyle}       
          flex  
          items-center 
          justify-center
          text-gray-900 
          dark:text-white 
            ${isColorValid && "bg-green-400/60 hover:bg-green-400/40"} 
          `}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords(rect);
          setTimeout(() => {
            setCoords(null);
          }, 600);
          debugger;
          addNewColor(colorStringToData(inputColor));
        }}
      >
        <Check strokeWidth={3} size={16} />
        {coords && <AcceptedUx anchorRect={coords} />}
      </div>
    </>
  );
};

export default AddColorButton;
