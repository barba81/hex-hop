import { useColorStore } from "@/store/use-color-store";
import { buttonStyle } from "../../../style/default-style";
import { Check } from "lucide-react";
import { colorStringToData } from "../features/color-format-changer";
import { addNewColorToClipboard } from "../features/add-new-block";

const AddColorButton = () => {
  const isColorValid = useColorStore().isColorValid;
  const inputColor = useColorStore().inputColor;

  return (
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
          addNewColorToClipboard(colorStringToData(inputColor))
        }}
      >
        <Check strokeWidth={3} size={16} />
      </div>
  );
};

export default AddColorButton;
