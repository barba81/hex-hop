import { useDraggable, useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

import type {
    ColorEntity,
    GradientEntity,
    PaletteEntity,
} from "@/infrastructure/models/entity";
import { distanceDetector } from "./distance-detector";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";
import { DragDots } from "./drag-dots";

type Block = GradientEntity | ColorEntity | PaletteEntity;

type BaseOutlineBlockProps = {
    block?: Block;
    children: ReactNode;
};

const getDndData = (block: Block): DraggableData => ({
    blockId: block.blockId,
    kind: block.kind === "palette" ? "palette" : "block",
    palette: block.kind === "palette"
        ? block.id
        : block.parentPaletteId,
});

const isDropDisabled = (block: Block) => {
    return block.kind === "palette"
        ? false
        : block.parentPaletteId !== null;
};

export const BaseOutlineDndBlock = ({
    block,
    children,
}: BaseOutlineBlockProps) => {
    const enabled = block !== undefined;

    const dndData = block ? getDndData(block) : undefined;

    const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
        id: block ? `drag:${block.blockId}` : "drag:empty",
        disabled: !enabled,
        data: dndData,
    });

    const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
        id: block ? `drop:${block.blockId}` : "drop:empty",
        collisionDetector: distanceDetector,
        disabled: !enabled || isDropDisabled(block),
        data: dndData,
    });

    const setCombinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
    };

    return (
        <div
            ref={setCombinedRef}
            className={[
                "h-10 w-full shrink-0 relative flex flex-row items-stretch",
                "rounded-md outline-1 overflow-hidden",
                isDropTarget && "outline-5 outline-blue-500",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div
                ref={enabled ? handleRef : undefined}
                className="flex items-center justify-center shrink-0 cursor-pointer bg-background"
            >
                <DragDots />
            </div>

            {children}
        </div>
    );
};
