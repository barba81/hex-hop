import { DragDropProvider } from "@dnd-kit/react";
import { rootBlockId, useClipboardStore } from "@/store/clipboard-store";
import EmptyClipboardPage from "../empty-clipboard-page";
import React from "react";
import { handleDragEnd } from "../../features/darg-and-drop";
import ColorBlockEdit from "./color-block/color-block-edit";
import PaletteBlockEdit from "./palett-block/palette-block-edit";
import GradientBlockEdit from "./gradient-block/gradient-block-edit";
import ColorBlockSmallBoxes from "./color-block/color-block-small-boxes";
import PaletteBlock from "./palett-block/palette-block";
import GradientBlockSmall from "./gradient-block/gradient-block-small";
import DroppableLine from "@/components/drag-and-drop/drop-line";


type ColorBoxParams = {
    blockId: number
};

const Block = ({ blockId }: ColorBoxParams) => {

    
    const block = useClipboardStore(
        state => state.blocksById[blockId]
    );

    const isEditing = useClipboardStore(
        state => state.editBlockId === blockId
    );

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
  const colorBlocks = useClipboardStore(state => state.blockIds[rootBlockId]);

  return (
    <>
      {colorBlocks.length === 0 ? <EmptyClipboardPage /> :
        <DragDropProvider  onDragEnd={(e) => handleDragEnd(e)}
        >
          <div className="flex-1 overflow-y-scroll flex flex-col px-1  ">
            <DroppableLine id={"drop:start"} blockId={-1} key='drop:start' palette={null} />
            {colorBlocks.map((blockId) =>

              <React.Fragment key={blockId}>
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
