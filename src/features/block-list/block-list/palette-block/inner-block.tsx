import ColorBlockEdit from "@/features/block-list/block-list/color-block/color-block-edit";
import GradientBlockSmall from "@/features/block-list/block-list/gradient-block/gradient-block-small";
import { useAppStore } from "@/shared/store/app-store";

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
