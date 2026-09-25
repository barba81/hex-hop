import { useDroppable } from "@dnd-kit/react";
import { distanceDetector } from "./distance-detector";
import { DraggableData } from "@/pages/clipboard-page/features/darg-and-drop";
import { useAppStore } from "@/store/store";

const DroppableLine = ({
  id,
  blockId,
  palette,
}: {
  blockId: number;
  id: string;
  palette: number | null;
}) => {
  const sourceDnd = useAppStore(state => state.sourceDnd);
     const disabledLogic = () => {
        // cannot drop pallet in droppable palette
        if (palette != null && sourceDnd?.kind==='palette') return true;
        return false; 
    }
 
  const { isDropTarget, ref } = useDroppable<DraggableData>({

    id,
    collisionDetector: distanceDetector,
    disabled: disabledLogic(),
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
      {isDropTarget ? <>
          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary" />

          <div className="h-1 w-full rounded-full bg-primary" />
        </> : null}
    </div>
  );
};

export default DroppableLine;