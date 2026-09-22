import type { ColorEntity } from "@/infrastructure/models/entity";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { coloBackground } from "@/infrastructure/utils/color-format-changer";
import { setEditBlock } from "../../../features/clipboard-store-actions";
import { duplicateBlock } from "../../../features/duplicate-block";
import { deleteColorBlock } from "../../../features/delete-block";
import { BlenderIcon, CSSIcon, TailwindIcon } from "@/components/icons/custom-icon";
import { BaseOutlineDndBlock } from "../../../../../components/custom/drag-and-drop/base-outline-dnd-block";

type ColorBlockViewParams = {
    colorEntity: ColorEntity
};

const ColorBlock = ({ colorEntity }: ColorBlockViewParams) => {

    const backgroundCss = coloBackground(colorEntity);

    return <ContextMenu>
        <ContextMenuTrigger>
            <BaseOutlineDndBlock block={colorEntity}>

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

            </BaseOutlineDndBlock>


        </ContextMenuTrigger>
        <ContextMenuContent className="w-20">
            <ContextMenuItem className="gap-2" onClick={() => setEditBlock(colorEntity.blockId)}>
                <Pen className="size-4" />
                Edit
            </ContextMenuItem>

            <ContextMenuItem className="gap-2"
                onClick={() => duplicateBlock(colorEntity)}>
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

