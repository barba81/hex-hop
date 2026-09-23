import { Astroid } from "lucide-react";
import { useHexHopStore } from "@/store/hex-hop-store";
import { addNewColorToClipboard } from "../../features/add-block";
import { Button } from "@/components/ui/button";
import { useClipboardStore } from "../../store/clipboard-store";

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
