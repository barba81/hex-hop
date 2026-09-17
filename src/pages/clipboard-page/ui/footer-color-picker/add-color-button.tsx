import { Check } from "lucide-react";
import { useClipboardStore } from "@/store/clipboard-store";
import { IconButton } from "@/components/custom/icon-button";
import { addNewColorToClipboard } from "../../features/add-block";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);
  

  return (
    <IconButton
      className={`
            ${isColorValid && "bg-green-400  dark:bg-green-600  hover:bg-green-400/50"} 
          `}
      onClick={async () => {
        addNewColorToClipboard(inputColor, null);
      }}
    >
      <Check strokeWidth={3.5} size={16} />
    </IconButton>
  );
};

export default AddColorButton;
