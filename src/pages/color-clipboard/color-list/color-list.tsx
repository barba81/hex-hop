import type { DragEndEvent } from "@dnd-kit/react";
import { DragDropProvider } from "@dnd-kit/react";
import { useClipboardStore } from "@/store/use-clipboard-store";
import PaletteBlock from "./palette-block";
import GradientBlock from "./gradient-block";
import EmptyClipboardPage from "../empty-clipboard-page";
import ColorBlock from "../color-block/colo-block";

const ColorList = () => {
  const colorBlocks = useClipboardStore(x => x.blocks);
  const editBoxId = useClipboardStore(x => x.editBlockId);

  const handleDragEnd = ({}: DragEndEvent) => {

  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}
    >
      {colorBlocks.length === 0 && <EmptyClipboardPage />}

      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-2">
        {colorBlocks.map((block) => {
          switch (block.kind) {
            case "color":
              return (
                <ColorBlock
                  key={block.blockId}
                  colorEntity={block}
                  edit={editBoxId === block.blockId}
                />
              );
            case "palette":
              return (
                <PaletteBlock
                  key={block.blockId}
                  paletteEntity={block}
                />
              );
            case "gradient":
              return (
                <GradientBlock
                  key={block.blockId}
                  gradientEntity={block}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </DragDropProvider>
  );
};

export default ColorList;
