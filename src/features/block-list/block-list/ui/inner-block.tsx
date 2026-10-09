import { useAppStore } from "@/shared/store/app-store";
import ColorBlockEdit from "../../../block-list/color-block/color-block-edit";
import GradientBlockSmall from "../../../block-list/gradient-block/gradient-block-small";
import ColorBlock from "../../../block-list/color-block/color-block-small-boxes";

type ColorBoxParams = {
    blockId: number
};

const InnerBlock = ({ blockId }: ColorBoxParams) => {
    const block = useAppStore(
        state => state.blocksById[blockId]
    );

    const isEditing = useAppStore(
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
