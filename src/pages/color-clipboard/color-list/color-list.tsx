import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";
import EmptyDisplay from "../empty-display";
import ColorBlock from "./color-box/color-block";
import { PaletteBox } from "./palette-box/palette-box";
import React from "react";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { GradientBox } from "./gradient-box/gradient-box";
import { ColorBlock2 } from "./colo-blox-2";
import { GradientBlock2 } from "./gradient-box-2";

const ColorList = () => {
  const colorBlocks = useClipboardStore().blocks;

  const handleDragEnd = ({ }: DragEndEvent) => {

  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}
    >
      {colorBlocks.length === 0 && <EmptyDisplay />}

      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-1 p-2">
        {colorBlocks
          .map((block) => {

            const renderBlock = () => {
              if (block.kind === "color") {
                return <ColorBlock2 key={block.blockId} color={block} />;
              } else if (block.kind === "palette") {
                return <PaletteBox key={block.blockId}  />;
              } else if (block.kind === 'gradient') {
                return <GradientBlock2 key={block.blockId} gradientEntity={block}  />;
              }
              return null;
            };

            return (
              <React.Fragment key={block.blockId}>
                {renderBlock()}
              </React.Fragment>
            );
          })}
      </div>
    </DragDropProvider>
  );
};

export default ColorList;
