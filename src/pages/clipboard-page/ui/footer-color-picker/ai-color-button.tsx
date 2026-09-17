import { Astroid } from "lucide-react";
import { useClipboardStore } from "@/store/clipboard-store";
import { IconButton } from "@/components/custom/icon-button";
import { addNewColorToClipboard } from "../../features/add-block";

const AiColorButton = () => {
    const inputColor = useClipboardStore((state) => state.inputColor);

    return (
        <IconButton
            onClick={async () => { await addNewColorToClipboard(inputColor, null); }}
        >
            <Astroid  />
        </IconButton>
    );
};

export default AiColorButton;
