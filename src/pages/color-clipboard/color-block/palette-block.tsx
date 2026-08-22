import { DragDots } from "@/components/common/drag-dots";
import type { PaletteEntity } from "@/infrastructure/models/entity";

import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { ChevronDown, Pen, Trash2 } from "lucide-react";
import type { DraggableData } from "../features/darg-and-drop";
import { coloBackground } from "@/infrastructure/utils/color-format-changer";
import { gradientToCssString } from "@/infrastructure/utils/gradient-to-css-string";
import InnerBlock from "./inner-block";
import DroppableLine from "../color-list/droppable";
import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";

type PaletteBoxParams = {
  paletteEntity: PaletteEntity
};

const PaletteTopBar = ({ blockId }: { blockId: number }) => {
  const block = useClipboardStore(
    state => state.blocksById[blockId]
  );

  switch (block.kind) {
    case "color":
      return (
        <div
          key={blockId}
          className="w-full h-full"
          style={{ backgroundColor: coloBackground(block) }}
        />
      );

    case "gradient":
      return (
        <div
          key={blockId}
          className="w-full h-full"
          style={{ backgroundImage: gradientToCssString(block) }}
        />
      );

    default:
      return null;
  }
}


const PaletteBlock = ({ paletteEntity }: PaletteBoxParams) => {
  const colorBlocksId = useClipboardStore(state => state.blockIds[paletteEntity.id]) ?? [];

  const isOpen = useClipboardStore((state) => !!state.openPalette[paletteEntity.blockId]);
  const togglePalette = useClipboardStore((state) => state.togglePalette);
  const setEditBox = useClipboardStore(x => x.setEditBlock);

  const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
    id: `darg:${paletteEntity.blockId}`,
    data: {
      blockId: paletteEntity.blockId,
      kind: "palette",
      palette: paletteEntity.id
    }
  });

  const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
    id: `drag:${paletteEntity.blockId}`,
    data: {
      blockId: paletteEntity.blockId,
      kind: "palette",
      palette: paletteEntity.id
    }
  });


  const setCombinedRef = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  return <ContextMenu>
    <ContextMenuTrigger>


      <div ref={setCombinedRef}>
        <div
          className={`${isDropTarget && 'outline-2 outline-accent'} h-13 w-full shrink-0 relative flex flex-row items-stretch border-2  overflow-hidden
          ${isOpen ? 'rounded-t-md border-b-transparent' : 'rounded-md '}`}
        >
          <div ref={handleRef} className="flex items-center justify-center shrink-0">
            <DragDots />
          </div>

          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-background">
            <div className="w-full h-15 flex-1 flex   bg-checkerboard">
              {
                colorBlocksId.map((id) => (<PaletteTopBar blockId={id} key={id} />))
              }
            </div>

            <div className="w-full h-7 flex flex-row justify-between items-center ">
              <div className="flex">
              </div>
              <div className="flex gap-2 h-full items-center  text-md">

                {paletteEntity.name}
                <div
                  onClick={() => togglePalette(paletteEntity.blockId)}
                  className="bg-secondary h-full   flex items-center justify-center cursor-pointer"
                >
                  <ChevronDown className="transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isOpen && colorBlocksId.length ? <div className="w-full dark:bg-neutral-900/70 rounded-b-md border-2 border-t-0 px-1">
          <div className="flex flex-col gap-0.5 border-neutral-700 ">
            <DroppableLine id={`drop:start:${paletteEntity.id}`} blockId={-1} key='drop:start' palette={paletteEntity.id} />
            {

              colorBlocksId.map((blockId) => (
                <React.Fragment key={blockId}>
                  <InnerBlock blockId={blockId} />
                  <DroppableLine id={`drop:${blockId}`} blockId={blockId} palette={paletteEntity.id} />
                </React.Fragment>
              ))
            }
          </div>
        </div> : null}
      </div>

    </ContextMenuTrigger>
    <ContextMenuContent className="w-20">
      <ContextMenuItem className="gap-2" onClick={() => setEditBox(paletteEntity.blockId)}>
        <Pen className="size-4" />
        Edit
      </ContextMenuItem>

      <ContextMenuSeparator />
      <ContextMenuItem
        variant="destructive"
        className="gap-2"
      >
        <Trash2 className="size-4" />
        Delete
      </ContextMenuItem>

    </ContextMenuContent>
  </ContextMenu>
};

export default PaletteBlock;