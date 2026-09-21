import { useDraggable, useDroppable } from "@dnd-kit/react";
import { distanceDetector, DraggableData } from "../../features/darg-and-drop";
import { ColorEntity, GradientEntity } from "@/infrastructure/models/entity";
import { DragDots } from "@/components/custom/drag-and-drop/drag-dots";
import { ReactNode } from "react";

type BaseOutlineBlockParams = {
    block: GradientEntity | ColorEntity,
    children: ReactNode;
};

export const BaseOutlineBlock = ({ block, children }: BaseOutlineBlockParams) => {
    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: `darg:${block.blockId}`,
        collisionDetector: distanceDetector,

        data: {
            blockId: block.blockId,
            kind: "block",
            palette: block.parentPaletteId
        }
    });

    const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
        id: `drag:${block.blockId}`,
        data: {
            blockId: block.blockId,
            kind: "block",
            palette: block.parentPaletteId
        }
    });


    const setCombinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
    };

    return <>

        <div ref={setCombinedRef}
            className={`${isDropTarget && 'outline-2 outline-accent'} h-10 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-1 overflow-hidden`}
        >
            <div ref={handleRef} className={`flex items-center justify-center shrink-0 cursor-pointer`}>
                <DragDots />
            </div>
            {children}
        </div>
    </>
}