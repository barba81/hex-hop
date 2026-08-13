import { Check } from "lucide-react";
import { addNewColorToClipboard } from "../features/add-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { MicroButton } from "@/components/common/micro-button";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state)=>state.isColorValid);
  const inputColor = useClipboardStore((state)=>state.inputColor);

  return (
    <MicroButton
        className={`
          flex  
          w-7 h-7 overflow-hidden outline-1    cursor-pointer
          items-center 
          justify-center
          text-gray-900 
          dark:text-white 
            ${isColorValid && "bg-green-400  hover:bg-green-400/50"} 
          `}
        onClick={async () => {
          await addNewColorToClipboard(inputColor)
        }}
      >
        <Check strokeWidth={3.5} size={16} />
      </MicroButton>
  );
};

export default AddColorButton;
