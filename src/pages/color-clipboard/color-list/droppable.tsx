import { useDroppable } from "@dnd-kit/react";
import type { DraggableData } from "../features/darg-and-drop";
import { closestCenter } from "@dnd-kit/collision";
import { distanceDetector } from "../color-block/color-block-small-boxes";

const DroppableLine = ({
  id,
  blockId,
  palette,
}: {
  blockId: number;
  id: string;
  palette: number | null;
}) => {
  const { isDropTarget, ref } = useDroppable<DraggableData>({
    id,
    collisionDetector: distanceDetector,
    data: {
      blockId,
      kind: "droppable",
      palette,
    },
  });

  return (
    <div
      ref={ref}
      className="relative h-1 w-full shrink-0"
    >
      {isDropTarget && (
        <>
          {/* Dot at the beginning */}
          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />

          {/* Drop line */}
          <div className="h-1 w-full rounded-full bg-primary" />
        </>
      )}
    </div>
  );
};

export default DroppableLine;