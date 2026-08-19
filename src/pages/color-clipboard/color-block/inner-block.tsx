import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import ColorBlockEdit from "./color-block-edit";
import ColorBlock from "./color-block";
import GradientBlock from "./gradient-block";

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
                isEditing ? <ColorBlockEdit colorEntity={block} /> : <ColorBlock  colorEntity={block} />
            );

        case "gradient":
            return (
                <GradientBlock
                    gradientEntity={block}
                />
            );

        default:
            return null;
    }

};

export default InnerBlock;
