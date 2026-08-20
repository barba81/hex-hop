import { DragDropProvider } from "@dnd-kit/react";
import { rootBlockId, useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import EmptyClipboardPage from "../empty-clipboard-page";
import Block from "../color-block/block";
import React from "react";
import DroppableLine from "./droppable";
import { handleDragEnd } from "../features/darg-and-drop";


const ColorList = () => {
  const colorBlocks = useClipboardStore(state => state.blockIds[rootBlockId]);

  return (
    <>
      {colorBlocks.length === 0 ? <EmptyClipboardPage /> :
        <DragDropProvider  onDragEnd={(e) => handleDragEnd(e,colorBlocks)}
        >
          <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-2">
            <DroppableLine id={"drop:start"} blockId={-1} key='drop:start' palette={null} />
            {colorBlocks.map((blockId) =>

              <React.Fragment key={blockId}>
                {}
                <Block blockId={blockId} />
                <DroppableLine id={`drop:${blockId}`}  blockId={blockId}  palette={null} />
              </React.Fragment>
            )}
          </div>
        </DragDropProvider>
      }
    </>
  );
};

export default ColorList;
