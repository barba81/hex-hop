import { Astroid } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { addNewColorToClipboard } from "../../features/add-block";
import { Button } from "@/components/ui/button";

const AiColorButton = () => {
    const inputColor = useAppStore((state) => state.inputColor);

    return (
        <Button size='icon-sm' variant='outline'
            onClick={async () => { await addNewColorToClipboard(inputColor, null); }}
        >
            <Astroid />
        </Button>
    );
};

export default AiColorButton;
