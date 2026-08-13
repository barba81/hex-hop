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
      </MicroButton>
  );
};

export default AddColorButton;
