import { useDraggable, useDroppable } from "@dnd-kit/react";
import type { ColorEntity, GradientEntity, PaletteEntity } from "@/infrastructure/models/entity";
import type { ReactNode } from "react";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";
import { distanceDetector } from "./distance-detector";
import { DragDots } from "./drag-dots";


type BaseOutlineBlockParams = {
    block: GradientEntity | ColorEntity | PaletteEntity,
    children: ReactNode;
};
const disabledLogic = (block: GradientEntity | ColorEntity | PaletteEntity) => {
    return block.kind === 'palette' ? false : block.parentPaletteId !== null;
}

export const BaseDraggableOutlineBlock = ({ block, children }: BaseOutlineBlockParams) => {
    const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
        id: `drag:${block.blockId}`,
        data: {
            blockId: block.blockId,
            kind: block.kind === 'palette' ? 'palette' : "block",
            palette: block.kind === 'palette' ? block.id : block.parentPaletteId
        }
    });

    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${block.blockId}`,
        collisionDetector: distanceDetector,
        disabled: disabledLogic(block),
        data: {
            blockId: block.blockId,
            kind: block.kind === 'palette' ? 'palette' : "block",
            palette: block.kind === 'palette' ? block.id : block.parentPaletteId
        }
    });

    const setCombinedRef = (node: HTMLDivElement | null) => { dragRef(node); dropRef(node); };

    return <div ref={setCombinedRef}
        className={`${isDropTarget && 'outline-5 outline-blue-500'} h-10 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
    >
        <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer bg-background`}>
            <DragDots />
        </div>

        {children}
    </div>
}

type BaseOutlineBlockEmptyParams = {
    children: ReactNode;
};
export const BaseOutlineBlock = ({ children }: BaseOutlineBlockEmptyParams) => {
    return <div
        className={`h-10 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
    >
        <div className={`flex items-center justify-center shrink-0 cursor-pointer bg-background`}>
            <DragDots />
        </div>
        {children}
    </div>
}
