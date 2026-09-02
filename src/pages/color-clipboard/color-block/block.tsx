import { useClipboardStore } from "@/pages/color-clipboard/store/clipboard-store";
import ColorBlockEdit from "./color-block-edit";
import PaletteBlock from "./palette-block";
import ColorBlockSmallBoxes from "./color-block-small-boxes";
import PaletteBlockEdit from "./palette-block-edit";
import GradientBlockEdit from "./gradient-block-edit";
import GradientBlockSmall from "./gradient-block-small";

type ColorBoxParams = {
    blockId: number
};

const Block = ({ blockId }: ColorBoxParams) => {
    const block = useClipboardStore(
        state => state.blocksById[blockId]
    );

    const isEditing = useClipboardStore(
        state => state.editBlockId === blockId
    );

    switch (block.kind) {
        case "color":
            return (
                isEditing ? <ColorBlockEdit colorEntity={block} /> : <ColorBlockSmallBoxes colorEntity={block} />
            );

        case "palette":
            return (
                isEditing ? <PaletteBlockEdit paletteEntity={block} /> : <PaletteBlock paletteEntity={block} />
            );

        case "gradient":
            return (
                isEditing ? <GradientBlockEdit gradientEntity={block} /> : <GradientBlockSmall gradientEntity={block} />
            );

        default:
            return null;
    }

};

export default Block;
