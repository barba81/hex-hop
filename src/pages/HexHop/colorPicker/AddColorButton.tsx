import { useColorStore } from "@/store/useColorStore";
import { buttonStyle } from "./DefaultStyle";
import { Check } from "lucide-react";
import { ColorPallet } from "@/service/colorPallet";

const AddColorButton = () => {
  const isColorValid = useColorStore().isColorValid;
  const currentColor = useColorStore().inputColor;

  return (
    <>
      <div
        className={`${buttonStyle}       
          flex  
          items-center 
          justify-center
      ${isColorValid && "bg-green-400/60 hover:bg-green-400/40"} text-gray-900 dark:text-white `}
        onClick={() => ColorPallet.AddColor(currentColor)}
      >
        <Check strokeWidth={3} size={16} />
      </div>
    </>
  );
};

export default AddColorButton;
