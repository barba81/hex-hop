import type { ColorEntity } from "@/infrastructure/models/entity";
import { DragDots } from "@/components/custom/drag-and-drop/drag-dots";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { distanceDetector, type DraggableData } from "../../../features/darg-and-drop";
import { coloBackground } from "@/infrastructure/utils/color-format-changer";
import { setEditBlock } from "../../../features/clipboard-store-actions";
import { duplicateBlock } from "../../../features/duplicate-block";
import { deleteColorBlock } from "../../../features/delete-block";
import { BlenderIcon, CSSIcon, TailwindIcon } from "@/components/icons/css-icon";

type ColorBlockViewParams = {
    colorEntity: ColorEntity
};

const ColorBlock = ({ colorEntity }: ColorBlockViewParams) => {

    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${colorEntity.blockId}`,
        collisionDetector: distanceDetector,
        data: {
            blockId: colorEntity.blockId,
            kind: "block",
            palette: colorEntity.parentPaletteId
        }
    });

    const { ref: dragRef, handleRef, isDragging } = useDraggable<DraggableData>({
        id: `drag:${colorEntity.blockId}`,
        data: {
            blockId: colorEntity.blockId,
            kind: "block",
            palette: colorEntity.parentPaletteId
        }
    });

    const backgroundCss = coloBackground(colorEntity);

    const setCombinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
    };


    return <ContextMenu>
        <ContextMenuTrigger>

            <div ref={setCombinedRef} className={`${isDropTarget && !isDragging&& 'outline-2 outline-primary'} ${isDragging && 'opacity-50'}  h-10 rounded-md w-full  shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden `}>
                <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer `}>
                    <DragDots />
                </div>
                <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>
                    <div className={` w-9  bg-checkerboard`}>
                        <div className="w-full h-full" style={{
                            backgroundColor: backgroundCss
                        }} />
                    </div>
                    <div className="p-0.5 flex-1 flex flex-row justify-between pr-2">
                        <div className="flex w-5 gap-1">
                          <CSSIcon size={5}/>
                          <BlenderIcon size={5}/>
                          <TailwindIcon size={5}/>
                        </div>
                        <div className="flex gap-2 h-full items-center ">
                            {colorEntity.name}
                        </div>
                    </div>
                    
                </div>
            </div>



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

