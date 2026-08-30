import { DragDots } from "@/components/common/drag-dots";
import type { GradientEntity } from "@/infrastructure/models/entity";
import { gradientToCssString } from "../../../infrastructure/utils/gradient-to-css-string";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { deleteGradientBlock } from "../features/delete-block";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import type { DraggableData } from "../features/darg-and-drop";
import { useClipboardStore } from "../store/use-clipboard-store";
import { distanceDetector } from "./color-block-small-boxes";

type GradientBoxParams = {
    gradientEntity: GradientEntity
};

export const GradientBlockSmall = ({ gradientEntity: gradientEntity }: GradientBoxParams) => {
    const setEditBox = useClipboardStore(state => state.setEditBlock);

    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${gradientEntity.blockId}`,
            collisionDetector: distanceDetector,
        
        data: {
            blockId: gradientEntity.blockId,
            kind: "block",
            palette: gradientEntity.parentPaletteId
        }
    });

    const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
        id: `drag:${gradientEntity.blockId}`,
        data: {
            blockId: gradientEntity.blockId,
            kind: "block",
            palette: gradientEntity.parentPaletteId
        }
    });


    const setCombinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
    };

    const gradientBackground = gradientToCssString(gradientEntity);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div ref={setCombinedRef}
                    className={`${isDropTarget && 'outline-2 outline-accent'} h-10 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
                >
                    <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer`}>
                        <DragDots />
                    </div>

                    <div className={`w-full  flex justify-between overflow-hidden bg-background  `}>
                        <div className={` w-9  bg-checkerboard`}>
                            <div className="w-full h-full" style={{
                                backgroundImage: gradientBackground,
                            }} />
                        </div>
                        <div className="p-0.5 flex-1 flex flex-row justify-between pr-2">
                            <div className="flex">
                            </div>
                            <div className="flex gap-2 h-full items-center ">
                                {gradientEntity.name}
                            </div>
                        </div>

                    </div>

                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem className="gap-2" onClick={() => setEditBox(gradientEntity.blockId)}>
                    <Pen className="size-4" />
                    Edit
                </ContextMenuItem>

                <ContextMenuItem className="gap-2">
                    <Copy className="size-4" />
                    Copy
                </ContextMenuItem>

                <ContextMenuSeparator />

                <ContextMenuItem
                    variant="destructive"
                    className="gap-2"
                    onClick={() => deleteGradientBlock(gradientEntity.blockId, gradientEntity.id, gradientEntity.parentPaletteId)}
                >
                    <Trash2 className="size-4" />
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
export default GradientBlockSmall;