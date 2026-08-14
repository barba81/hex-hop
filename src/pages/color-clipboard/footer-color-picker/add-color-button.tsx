import { Check } from "lucide-react";
import { addNewColorToClipboard } from "../features/add-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { MicroButton } from "@/components/common/micro-button";
import toast from "react-hot-toast";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);

  return (
    <MicroButton
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
        toast.promise(
          addNewColorToClipboard(inputColor),
          {
            loading: 'Saving...',
            success: <b>Color added!</b>,
            error: <b>Could not save color.</b>,
          }
        );
      }}
    >
      <Check strokeWidth={3.5} size={16} />
    </MicroButton>
  );
};

export default AddColorButton;
