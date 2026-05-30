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
  const actions = useHexHopStore().actions;

  // need some way to update odrder
  //
  const handleDragEnd = ({ operation, canceled }: DragEndEvent) => {
    if (canceled || !operation.target) return;

    if(!operation.source?.id) return;
    
    updateInsertToNewPosition(
      operation.source?.id as number ,
      operation.target.data?.parentId,
      operation.target.id  as number)
    
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
                return <ColorBlock key={block.id || ix} color={block} />;
              } else if (block.kind === "palette") {
                return <PaletteBox key={block.id || ix} palette={block} />;
              }
              return null;
            };

            return (
              <React.Fragment key={block.id || ix}>
                <DropLine id={ix} parentId={undefined} />
                {block.order}
                {renderBlock()}
                {ix === colorBlocks.length - 1 && (
                  <DropLine id={ix + 1} parentId={undefined} />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </DragDropProvider>
  );
};

export default ColorList;
