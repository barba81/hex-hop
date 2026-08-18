import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import EmptyClipboardPage from "../empty-clipboard-page";
import ColorBlock from "../color-block/colo-block";
import React from "react";

function Droppable({ id }: { id: string }) {
  const { isDropTarget, ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className="h-1 w-full shrink-0"
    >
      {isDropTarget && (
        <div className="h-1 w-full rounded-full bg-blue-500" />
      )}
    </div>
  );
}
const ColorList = () => {
  const colorBlocks = useClipboardStore(state => state.blockIds);
  const setBlockIds = useClipboardStore(state => state.setBlockIds);

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation, canceled } = event;

    if (canceled) return;

    const { source, target } = operation;
    if (!source) return;
    if (!target) return;


    const activeId = String(source.id);
    const overId = String(target.id);

    // Make sure we're dragging a block
    if (!activeId.startsWith("drag:")) return;

    // Make sure we're dropping on a drop zone
    if (!overId.startsWith("drop:")) return;

    const draggedId = parseInt(activeId.replace("drag:", ""));
    const targetId = parseInt(overId.replace("drop:", ""));

    // Don't drop an item onto its own drop zone
    if (draggedId === targetId) return;

    const oldIndex = colorBlocks.indexOf(draggedId);
    const targetIndex = colorBlocks.indexOf(targetId);

    if (oldIndex === -1 || targetIndex === -1) return;

    // Remove the dragged item
    const newBlocks = [...colorBlocks];

    newBlocks.splice(oldIndex, 1);

    // Find target again because the array changed
    const newTargetIndex = newBlocks.indexOf(targetId);
    newBlocks.splice(newTargetIndex + 1, 0, draggedId);

    setBlockIds(newBlocks);
    // Insert after target
  };

  return (
    <>
      {colorBlocks.length === 0 ? <EmptyClipboardPage /> :
        <DragDropProvider onDragEnd={(e) => handleDragEnd(e)}
        >
          <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-2">
            <Droppable id={"drop:start"} key='drop:start' />
            {colorBlocks.map((blockId) =>
              <React.Fragment key={blockId}>
                <ColorBlock blockId={blockId} />
                <Droppable id={`drop:${blockId}`} />
              </React.Fragment>
            )}
          </div>
        </DragDropProvider>
      }
    </>
  );
};

export default ColorList;
