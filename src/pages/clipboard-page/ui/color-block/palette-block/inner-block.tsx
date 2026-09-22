import { useClipboardStore } from "@/store/clipboard-store";
import ColorBlockEdit from "../color-block/color-block-edit";
import GradientBlockSmall from "../gradient-block/gradient-block-small";
import ColorBlock from "../color-block/color-block-small-boxes";

type ColorBoxParams = {
    blockId: number
};

const InnerBlock = ({ blockId }: ColorBoxParams) => {
    const block = useClipboardStore(
        state => state.blocksById[blockId]
    );

    const isEditing = useClipboardStore(
        state => state.editBlockId === blockId
    );

    switch (block.kind) {
        case "color":
            return (
                isEditing ? <ColorBlockEdit key={block.blockId} colorEntity={block} /> : <ColorBlock  colorEntity={block} />
            );

        case "gradient":
            return (
                <GradientBlockSmall 
                    gradientEntity={block}
                />
            );

        default:
            return null;
    }

};

export default InnerBlock;
