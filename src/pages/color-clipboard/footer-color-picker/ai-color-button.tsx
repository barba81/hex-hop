import { buttonStyle } from "../../../style/default-style";
import { Astroid } from "lucide-react";
import { addNewColorToClipboard } from "../features/add-block";
import { useClipboardStore } from "@/store/use-clipboard-store";

const AiColorButton = () => {
  const isColorValid = useClipboardStore((state)=>state.isColorValid);
  const inputColor = useClipboardStore((state)=>state.inputColor);

    return (
        <div
            className={`
          ${buttonStyle}       
          flex  
          items-center 
          justify-center
          text-gray-900 
          dark:text-white 
          `}
            onClick={async () => {
                await addNewColorToClipboard(inputColor)
            }}
        >
            <Astroid size={16} />
        </div>
    );
};

export default AiColorButton;
