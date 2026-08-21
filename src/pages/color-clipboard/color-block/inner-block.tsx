import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import ColorBlockEdit from "./color-block-edit";
import ColorBlock from "./color-block";
import GradientBlock from "./gradient-block";
import ColorBlockSmall from "./color-block-small-boxes";
import GradientBlockSmall from "./gradient-block-small";

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
                isEditing ? <ColorBlockEdit colorEntity={block} /> : <ColorBlockSmall  colorEntity={block} />
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
