import { useDraggable, useDroppable } from "@dnd-kit/react";
import type { ColorEntity, GradientEntity, PaletteEntity } from "@/infrastructure/models/entity";
import type { ReactNode } from "react";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";
import { distanceDetector } from "./distance-detector";
import { DragDots } from "./drag-dots";
import { useHexHopStore } from "@/store/store";


type BaseOutlineBlockParams = {
    block: GradientEntity | ColorEntity | PaletteEntity,
    children: ReactNode;
};

export const BaseDraggableOutlineBlock = ({ block, children }: BaseOutlineBlockParams) => {
    const sourceDnd = useHexHopStore(state => state.sourceDnd);
   
    const disabledLogic = () => {
        // cannot drop on same blok
        if (block.blockId === sourceDnd?.blockId) {return true;}
        // cannot drop palette in block
        if (block.kind != 'palette' && sourceDnd?.kind === 'palette') return true; 
        // cannot drop palette in palette
        if (block.kind === 'palette' && sourceDnd?.kind === 'palette') return true;
        // cannot drop block in parent palette
        if (block.kind === 'palette' && block.id === sourceDnd?.palette) return true; 

        return block.kind === 'palette' ? false : block.parentPaletteId !== null;
    }

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
        disabled: disabledLogic(),
        data: {
            blockId: block.blockId,
            kind: block.kind === 'palette' ? 'palette' : "block",
            palette: block.kind === 'palette' ? block.id : block.parentPaletteId
        }
    });

    const setCombinedRef = (node: HTMLDivElement | null) => { dragRef(node); dropRef(node); };

    return <div ref={setCombinedRef}
        className={`${isDropTarget   && 'outline-1 outline-blue-500'} h-10 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
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
