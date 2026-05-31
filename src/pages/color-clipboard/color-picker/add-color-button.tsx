import { useColorStore } from "@/store/use-color-store";
import { buttonStyle } from "../../../style/default-style";
import { Check } from "lucide-react";
import { useState } from "react";
import { addNewColor } from "@/features/color/add-new-color";
import { colorStringToData } from "@/features/color/color-format-changer";

const AddColorButton = () => {
  const isColorValid = useColorStore().isColorValid;
  const inputColor = useColorStore().inputColor;
  const [, setCoords] = useState<DOMRect | null>(null);

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
          addNewColor(colorStringToData(inputColor));
        }}
      >
        <Check strokeWidth={3} size={16} />
      </div>
    </>
  );
};

export default AddColorButton;
