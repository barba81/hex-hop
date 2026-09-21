import { useDraggable, useDroppable } from "@dnd-kit/react";
import type { DraggableData } from "../../features/darg-and-drop";
import { distanceDetector } from "../../features/darg-and-drop";
import type { ColorEntity, GradientEntity, PaletteEntity } from "@/infrastructure/models/entity";
import { DragDots } from "@/components/custom/drag-and-drop/drag-dots";
import type { ReactNode } from "react";
import { GripVertical } from "lucide-react";

type BaseOutlineBlockParams = {
    block: GradientEntity | ColorEntity | PaletteEntity,
    children: ReactNode;
};

export const BaseOutlineBlock = ({ block, children }: BaseOutlineBlockParams) => {
    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${block.blockId}`,
        collisionDetector: distanceDetector,

        data: {
            blockId: block.blockId,
            kind: block.kind === 'palette' ? 'palette': "block", 
            palette: block.kind === 'palette' ? block.id : block.parentPaletteId 
        }
    });

    const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
        id: `drag:${block.blockId}`,
        data: {
            blockId: block.blockId,
            kind: block.kind === 'palette' ? 'palette': "block", 
            palette: block.kind === 'palette' ? block.id : block.parentPaletteId 
        }
    });


    const setCombinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
    };

    return <div ref={setCombinedRef}
            className={`${isDropTarget && 'outline-2 outline-accent'} h-10 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
        >
            <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer bg-background`}>
                <DragDots/>
            </div>
            {children}
        </div>
}