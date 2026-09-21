import { Astroid } from "lucide-react";
import { useClipboardStore } from "@/store/clipboard-store";
import { addNewColorToClipboard } from "../../features/add-block";
import { Button } from "@/components/ui/button";

const AiColorButton = () => {
    const inputColor = useClipboardStore((state) => state.inputColor);

    return (
        <Button size='icon-sm' variant='outline'
            onClick={async () => { await addNewColorToClipboard(inputColor, null); }}
        >
            <Astroid />
        </Button>
    );
};

export default AiColorButton;
