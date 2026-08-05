import { buttonStyle } from "../../../style/default-style";
import { Check } from "lucide-react";
import { addNewColorToClipboard } from "../features/add-new-block";
import { useClipboardStore } from "@/store/use-clipboard-store";

const AddColorButton = () => {
  const isColorValid = useClipboardStore().isColorValid;
  const inputColor = useClipboardStore().inputColor;

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
        onClick={async () => {
          await addNewColorToClipboard(inputColor)
        }}
      >
        <Check strokeWidth={3} size={16} />
      </div>
  );
};

export default AddColorButton;
