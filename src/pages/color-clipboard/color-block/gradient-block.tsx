import { DragDots } from "@/components/common/drag-dots";
import type { GradientEntity } from "@/infrastructure/models/entity";
import { gradientToCssString } from "../../../infrastructure/utils/gradient-to-css-string";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Copy, Pen, Trash2 } from "lucide-react";
import { deleteGradientBlock } from "../features/delete-block";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { DraggableData } from "../features/darg-and-drop";

type GradientBoxParams = {
    gradientEntity: GradientEntity
};

export const GradientBlock = ({ gradientEntity: gradientEntity }: GradientBoxParams) => {
    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${gradientEntity.blockId}`,
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
                    className={`${isDropTarget && 'outline-2 outline-accent'} h-15 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
                >
                    <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer`}>
                        <DragDots />
                    </div>

                    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-background">
                        <div className="w-full h-5 flex-1   bg-checkerboard">
                            <div
                                className="w-full h-full  flex-1 "
                                style={{
                                    backgroundImage: gradientBackground,
                                }}
                            />
                        </div>

                        <div className="w-full h-7 flex flex-row justify-between pr-2">
                            <div className="flex">
                                CSS, SOME OTHER
                            </div>
                            <div className="flex gap-2 h-full items-center font-mono text-md">
                                {gradientEntity.name}
                            </div>
                        </div>
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
                <ContextMenuItem className="gap-2">
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
export default GradientBlock;