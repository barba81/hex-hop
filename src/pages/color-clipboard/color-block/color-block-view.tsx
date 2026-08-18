import type { ColorEntity } from "@/infrastructure/models/entity";
import { coloBackground } from "../../../infrastructure/utils/color-format-changer";
import { DragDots } from "@/components/common/drag-dots";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { duplicateBlock } from "../features/duplicate-block";
import { deleteColorBlock } from "../features/delete-block";
import { useClipboardStore } from "../store/use-clipboard-store";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { DraggableData } from "../features/darg-and-drop";

type ColorBlockViewParams = {
    blockId: number
};

const ColorBlockView = ({ blockId }: ColorBlockViewParams) => {
    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${blockId}`,
        data: {
            blockId: blockId,
            kind: "block",
            palette: null
        }
    });

    const colorEntity = useClipboardStore(
        state => state.blocksById[blockId]
    ) as ColorEntity;

    const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
        id: `drag:${blockId}`,
        data: {
            blockId: colorEntity.blockId,
            kind: "block",
            palette: colorEntity.parentPaletteId
        }
    });

    const backgroundCss = coloBackground(colorEntity);
    const setEditBox = useClipboardStore(x => x.setEditBlock);

    const setCombinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
    };

    return <ContextMenu>
        <ContextMenuTrigger>

            <div ref={setCombinedRef} className={ `${isDropTarget && 'outline-2 outline-accent'} h-15 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden `}>
                <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer`}>
                    <DragDots />
                </div>
                <div className={`w-full flex flex-col justify-between overflow-hidden bg-background  `}>
                    <div className={`flex-1 bg-checkerboard`}>
                        <div className="w-full h-full" style={{
                            backgroundColor: backgroundCss
                        }} />
                    </div>
                    <div className="p-0.5 flex flex-row justify-between pr-2">
                        <div className="flex">
                            {/* <CopyLogo color={colorEntity} fontClass={"white"} />  */}
                        </div>
                        <div className="flex gap-2 h-full items-center ">
                            {colorEntity.name}
                        </div>
                    </div>
                </div>
            </div>



        </ContextMenuTrigger>
        <ContextMenuContent className="w-20">
            <ContextMenuItem className="gap-2" onClick={() => setEditBox(colorEntity.blockId)}>
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

export default ColorBlockView;

