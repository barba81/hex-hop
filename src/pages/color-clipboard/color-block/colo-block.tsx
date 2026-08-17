import type { ColorEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import ColorBlockEdit from "./color-block-edit";
import ColorBlockView from "./color-block-view";

type ColorBoxParams = {
    blockId: number
};

const ColorBlock = ({ blockId }: ColorBoxParams) => {

    const isEditing = useClipboardStore(
        state => state.editBlockId === blockId
    );
    return (
        isEditing ? <ColorBlockEdit blockId={blockId} /> : <ColorBlockView blockId={blockId} />
    );
};

export default ColorBlock;
