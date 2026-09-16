import { Astroid } from "lucide-react";
import { useClipboardStore } from "@/store/clipboard-store";
import { defaultButtonBackground } from "@/components/custom/custom-button";
import { addNewColorToClipboard } from "../../features/add-block";

const AiColorButton = () => {
    const inputColor = useClipboardStore((state) => state.inputColor);

    return (
        <button
            className={`         
                ${defaultButtonBackground}
             w-6 h-6 overflow-hidden outline-1`}
            onClick={async () => {
                await addNewColorToClipboard(inputColor, null);
            }}
        >
            <Astroid size={16} />
        </button>
    );
};

export default AiColorButton;
