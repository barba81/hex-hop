import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";
import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import EmptyClipboardPage from "../empty-clipboard-page";
import ColorBlock from "../color-block/colo-block";

const ColorList = () => {
  const colorBlocks = useClipboardStore(x => x.blockIds);

  const handleDragEnd = ({ }: DragEndEvent) => {
    debugger
  };

  return (
    <>
      {colorBlocks.length === 0 ? <EmptyClipboardPage /> :
        <DragDropProvider onDragEnd={handleDragEnd}
        >
          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-2">
            {colorBlocks.map((blockId) =>
              <ColorBlock
                key={blockId}
                blockId={blockId}
              />
            )}
          </div>
        </DragDropProvider>
      }
    </>
  );
};

export default ColorList;
