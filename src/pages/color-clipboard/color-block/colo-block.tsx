import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import ColorBlockEdit from "./color-block-edit";
import ColorBlockView from "./color-block-view";
import PaletteBlock from "../color-list/palette-block";
import GradientBlock from "../color-list/gradient-block";

type ColorBoxParams = {
    blockId: number
};

const ColorBlock = ({ blockId }: ColorBoxParams) => {
    const block = useClipboardStore(
        state => state.blocksById[blockId]
    );

    const isEditing = useClipboardStore(
        state => state.editBlockId === blockId
    );

    switch (block.kind) {
        case "color":
            return (
                isEditing ? <ColorBlockEdit colorEntity={block} /> : <ColorBlockView blockId={blockId} colorEntity={block} />
            );

        case "palette":
            return (
                <PaletteBlock
                    paletteEntity={block}
                />
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

export default ColorBlock;
