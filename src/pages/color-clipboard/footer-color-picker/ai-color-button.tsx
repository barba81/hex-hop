import { Astroid } from "lucide-react";
import { addNewColorToClipboard } from "../features/add-block";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { defaultButtonBackground } from "@/components/common/micro-button";

const AiColorButton = () => {
    const inputColor = useClipboardStore((state) => state.inputColor);

    return (
        <button
            className={`         
                ${defaultButtonBackground}
             w-6 h-6 overflow-hidden outline-1`}
            onClick={async () => {
                await addNewColorToClipboard(inputColor);
            }}
        >
            <Astroid size={16} />
        </button>
    );
};

export default AiColorButton;
