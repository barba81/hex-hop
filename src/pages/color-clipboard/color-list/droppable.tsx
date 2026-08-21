import { useDroppable } from "@dnd-kit/react";
import { DraggableData } from "../features/darg-and-drop";

const  DroppableLine= ({ id, blockId, palette }: { blockId: number, id: string, palette: number | null }) => {
  const { isDropTarget, ref } = useDroppable<DraggableData>({
    id,
    data: {
      blockId: blockId,
      kind: "droppable",
      palette: palette
    }
  });

  return (
    <div
      ref={ref}
      className="h-1 w-full shrink-0"
    >
      {isDropTarget && (
        <div className="h-1 w-full rounded-full bg-primary" />
      )}
    </div>
  );
}

export default DroppableLine;