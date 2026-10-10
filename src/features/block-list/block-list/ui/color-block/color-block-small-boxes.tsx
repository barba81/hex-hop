import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/shared/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { BlenderIcon, CSSIcon, TailwindIcon } from "@/shared/components/icons/custom-icon";
import { BaseDraggableOutlineBlock } from "@/shared/components/drag-and-drop/base-outline-dnd-block";
import { ColorEntity } from "@/shared/types/entity";
import { coloBackground } from "@/features/block-list/utils/color-format-changer";
import { useColorBlock } from "@/features/block-list/block-list/ui/color-block/hooks/use-color-block";

type ColorBlockViewParams = {
    colorEntity: ColorEntity
};

const ColorBlock = ({ colorEntity }: ColorBlockViewParams) => {
    const {setEditBlock, deleteColorBlock} = useColorBlock();
    const backgroundCss = coloBackground(colorEntity);

    return <ContextMenu>
        <ContextMenuTrigger>
            <BaseDraggableOutlineBlock block={colorEntity}>

                <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>
                    <div className={` w-9  bg-checkerboard`}>
                        <div className="w-full h-full" style={{
                            backgroundColor: backgroundCss
                        }} />
                    </div>
                    <div className="p-0.5 flex-1 flex flex-row justify-between pr-2">
                        <div className="flex w-5 gap-1">
                            <CSSIcon size={5} />
                            <BlenderIcon size={5} />
                            <TailwindIcon size={5} />
                        </div>
                        <div className="flex gap-2 h-full items-center ">
                            {colorEntity.name}
                        </div>
                    </div>

                </div>

            </BaseDraggableOutlineBlock>

        </ContextMenuTrigger>
        <ContextMenuContent className="w-20">
            <ContextMenuItem className="gap-2" onClick={() => setEditBlock(colorEntity.blockId)}>
                <Pen className="size-4" />
                Edit
            </ContextMenuItem>

            <ContextMenuItem className="gap-2"
                onClick={() =>{}}>
                <Copy className="size-4" />
                Copy
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem
                variant="destructive"
                className="gap-2"
                onClick={() => deleteColorBlock(colorEntity.blockId, colorEntity.id, colorEntity.parentPaletteId)}
            >
                <Trash2 className="size-4" />
                Delete
            </ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>


}

export default ColorBlock;

