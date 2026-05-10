import { useColorStore } from "@/store/useColorStore";
import { buttonStyle } from "./DefaultStyle";
import { Check } from "lucide-react";
import { ColorPallet } from "@/service/colorPallet";
import AcceptedUx from "./AcceptedUx";
import { useState } from "react";

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
          ColorPallet.AddColor(inputColor);
        }}
      >
        <Check strokeWidth={3} size={16} />
        {coords && <AcceptedUx anchorRect={coords} />}
      </div>
    </>
  );
};

export default AddColorButton;
