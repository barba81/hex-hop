import { Check } from "lucide-react";
import { addNewColorToClipboard, AddNewColorToClipboardCommand } from "../features/add-block";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { MicroButton } from "@/components/common/micro-button";
import { useCommandManager } from "@/infrastructure/command/command-manager-context";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);
  const commandManager = useCommandManager();

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
        await commandManager.execute(
          new AddNewColorToClipboardCommand(
            inputColor,
            null
          ));

      }}
    >
      <Check strokeWidth={3.5} size={16} />
    </MicroButton>
  );
};

export default AddColorButton;
