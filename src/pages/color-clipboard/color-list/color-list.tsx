import EmptyDisplay from "./empty-display";
import ColorBlock from "./color-box/color-block";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { PaletteBox } from "./palette-box/palette-box";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import React from "react";
import DropLine from "./drop-line";
import { updateInsertToNewPosition } from "@/features/common/update-order";

const ColorList = () => {
  const colorBlocks = useHexHopStore().colorBlocks;

  const handleDragEnd = ({ operation, canceled }: DragEndEvent) => {
    if (canceled || !operation.target || !operation.source?.id) return;

    const sourceNum = operation.source.id as number; 
    const targetParentId = operation.target.data?.parentId;
    const targetOrder: number = operation.target.data?.order;

    updateInsertToNewPosition(sourceNum, targetParentId, targetOrder);
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1 p-2">
        {colorBlocks.length === 0 && <EmptyDisplay />}

        {colorBlocks
          .sort((a, b) => a.order - b.order)
          .map((block, ix) => {
            const renderBlock = () => {
              if (block.kind === "color") {
                return <ColorBlock key={block.id} color={block} />;
              } else if (block.kind === "palette") {
                return <PaletteBox key={block.id} palette={block} />;
              }
              return null;
            };

            return (
              <React.Fragment key={block.id}>
                <DropLine
                  id={`before-${block.id}`}
                  order={ix}
                  parentId={undefined}
                />
                {renderBlock()}
                {ix === colorBlocks.length - 1 && (
                  <DropLine
                    id={`after-${block.id}`}
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
