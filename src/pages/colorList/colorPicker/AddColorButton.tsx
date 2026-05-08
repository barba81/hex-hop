import { useColorStore } from "@/store/useColorStore";
import { buttonStyle } from "./DefaultStyle";
import { Check } from "lucide-react";
import { ColorPallet } from "@/service/colorPallet";

const AddColorButton = () => {
  const isColorValid = useColorStore().isColorValid;
  const inputColor = useColorStore().inputColor;

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
            ${isColorValid && 
            "bg-green-400/60 hover:bg-green-400/40"
            } 
          `}
        onClick={() => ColorPallet.AddColor(inputColor)}
      >
        <Check strokeWidth={3} size={16} />
      </div>
    </>
  );
};

export default AddColorButton;
