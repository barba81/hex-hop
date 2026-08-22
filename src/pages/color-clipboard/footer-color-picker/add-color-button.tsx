import { Check } from "lucide-react";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { Button } from "@/components/common/micro-button";
import { addNewColorToClipboard } from "../features/add-block";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);
  

  return (
    <Button
      className={`
          flex  
          w-6 h-6 overflow-hidden outline-1    cursor-pointer
          items-center 
          justify-center
          text-gray-900 
          dark:text-white 
            ${isColorValid && "bg-green-400  dark:bg-green-600  hover:bg-green-400/50"} 
          `}
      onClick={async () => {
        addNewColorToClipboard(inputColor, null);
      }}
    >
      <Check strokeWidth={3.5} size={16} />
    </Button>
  );
};

export default AddColorButton;
