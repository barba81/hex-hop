import { DragDropProvider } from "@dnd-kit/react";
import { useAppStore } from "@/shared/store/app-store";
import EmptyClipboardPage from "./empty-clipboard-page";
import React from "react";
import { handleDragEnd } from "../service/darg-and-drop";
import ColorBlockEdit from "./color-block/color-block-edit";
import PaletteBlockEdit from "./palette-block/palette-block-edit";
import GradientBlockEdit from "./gradient-block/gradient-block-edit";
import ColorBlockSmallBoxes from "./color-block/color-block-small-boxes";
import GradientBlockSmall from "./gradient-block/gradient-block-small";
import DroppableLine from "@/shared/components/drag-and-drop/drop-line";
import { rootBlockId } from "@/shared/data/const-data";
import PaletteBlock from "@/features/block-list/block-list/ui/palette-block/palette-block";


type ColorBoxParams = {
  blockId: number
};

const Block = ({ blockId }: ColorBoxParams) => {
  const block = useAppStore(
    state => state.blocksById[blockId]
  );

  const isEditing = false

  switch (block.kind) {
    case "color":
      return (
        isEditing ? <ColorBlockEdit colorEntity={block} /> : <ColorBlockSmallBoxes colorEntity={block} />
      );

    case "palette":
      return (
        isEditing ? <PaletteBlockEdit paletteEntity={block} /> : <PaletteBlock paletteEntity={block} />
      );

    case "gradient":
      return (
        isEditing ? <GradientBlockEdit gradientEntity={block} /> : <GradientBlockSmall gradientEntity={block} />
      );

    default:
      return null;
  }

};


const ColorList = () => {
  const colorBlocks = useAppStore(state => state.blockIds[rootBlockId]);

  return (
    <>
      {colorBlocks.length === 0 ? <EmptyClipboardPage /> :
        <DragDropProvider onDragEnd={(e) => {
          handleDragEnd(e);
        }}
          onDragStart={(event) => {
            if (event.operation.source){
            }
          }}
        >
          <div className="flex-1 overflow-y-scroll flex flex-col px-1  ">
            <DroppableLine id={"drop:start"} blockId={-1} key='drop:start' palette={null} />
            {colorBlocks.map((blockId) =>

              <React.Fragment key={blockId}>
                <Block blockId={blockId} />
                <DroppableLine id={`drop:${blockId}`} blockId={blockId} palette={null} />
              </React.Fragment>
            )}
          </div>
        </DragDropProvider>
      }
    </>
  );
};

export default ColorList;
