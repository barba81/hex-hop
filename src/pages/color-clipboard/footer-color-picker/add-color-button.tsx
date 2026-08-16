import { Check } from "lucide-react";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { MicroButton } from "@/components/common/micro-button";
import { AddNewColorToClipboardCommand } from "../commands/add-block-command";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);
  const execute = useColorListCommands((state)=> state.execute);
  

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
        await execute(
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
