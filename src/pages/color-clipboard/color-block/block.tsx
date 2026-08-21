import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import ColorBlockEdit from "./color-block-edit";
import ColorBlock from "./color-block";
import PaletteBlock from "./palette-block";
import GradientBlock from "./gradient-block";
import ColorBlockOutline from "./color-block-outline";
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
