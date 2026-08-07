import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";
import React from "react";
import { useClipboardStore } from "@/store/use-clipboard-store";
import ColorBlock from "./colo-block";
import PaletteBlock from "./palette-block";
import GradientBlock from "./gradient-block";
import EmptyClipboardPage from "../empty-clipboard-page";

const ColorList = () => {
  const colorBlocks = useClipboardStore().blocks;

  const handleDragEnd = ({ }: DragEndEvent) => {

  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}
    >
      {colorBlocks.length === 0 && <EmptyClipboardPage />}

      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2.5 p-2">
        {colorBlocks
          .map((block) => {

            const renderBlock = () => {
              if (block.kind === "color") {
                return <ColorBlock key={block.blockId} colorEntity={block} />;
              } else if (block.kind === "palette") {
                return <PaletteBlock  key={block.blockId} paletteEntity={block} />;
              } else if (block.kind === 'gradient') {
                return <GradientBlock key={block.blockId} gradientEntity={block}  />;
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
