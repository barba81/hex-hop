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
    const colorEntity = useClipboardStore(
        state => state.blocksById[blockId]
    ) as ColorEntity;

    return (
        isEditing ? <ColorBlockEdit colorEntity={colorEntity} /> : <ColorBlockView colorEntity={colorEntity} />
    );
};

export default ColorBlock;
