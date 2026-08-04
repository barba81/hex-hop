import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";
import EmptyDisplay from "./empty-display";
import ColorBlock from "./color-box/color-block";
import { PaletteBox } from "./palette-box/palette-box";
import React from "react";
import DropLine from "./drop-line";
import { useClipboardStore } from "@/store/use-clipboard-store";

const ColorList = () => {
  const colorBlocks = useClipboardStore().blocks;

  const handleDragEnd = ({}: DragEndEvent) => {

  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd} 
    >
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1 p-2">
        {colorBlocks.length === 0 && <EmptyDisplay />}

        {colorBlocks
          .map((block, ix) => {
            
            const renderBlock = () => {
              if (block.kind === "color") {
                return <ColorBlock key={block.blockId} color={block} />;
              } else if (block.kind === "palette") {
                return <PaletteBox key={block.blockId} palette={block} />;
              }
              return null;
            };

            return (
              <React.Fragment key={block.blockId}>
                {renderBlock()}
                {ix === colorBlocks.length - 1 && (
                  <DropLine
                    id={`after-${block.blockId}`}
                    order={ix + 1}
                    parentId={undefined}
                  />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </DragDropProvider>
  );
};

export default ColorList;
