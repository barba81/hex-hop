import { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground } from "@/infrastructure/utils/color-format-changer";
import { BlockView } from "./block-view";
import { duplicateBlock } from "../../features/duplicate-block";
import { deleteColorBlock } from "../../features/delete-block";
import { ColorBlockCopyList } from "./color-block-copy-list";

type ColorBlockViewParams = {
    colorEntity: ColorEntity;
};

const ColorBlock = ({ colorEntity }: ColorBlockViewParams) => {

    const backgroundCss = coloBackground(colorEntity);

    return (
        <BlockView
            blockId={colorEntity.blockId}
            entityId={colorEntity.id}
            paletteId={colorEntity.parentPaletteId}
            name={colorEntity.name}

            preview={
                <div
                    className="w-full h-full"
                    style={{
                        backgroundColor: backgroundCss,
                    }}
                />
            }

            onCopy={() => duplicateBlock(colorEntity)}

            onDelete={() =>
                deleteColorBlock(
                    colorEntity.blockId,
                    colorEntity.id,
                    colorEntity.parentPaletteId
                )
            }
        >
            <ColorBlockCopyList colorEntity={colorEntity} />
        </BlockView>
    );
};

export default ColorBlock;

