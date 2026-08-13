import { Astroid } from "lucide-react";
import { addNewColorToClipboard } from "../features/add-block";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { IconButton } from "@/components/common/micro-button";

const AiColorButton = () => {
    const inputColor = useClipboardStore((state) => state.inputColor);

    return (
        <IconButton
            icon={Astroid}
            onClick={async () => {
                await addNewColorToClipboard(inputColor);
            }}
        />
    );
};

export default AiColorButton;
