import type { PaletteEntity } from "@/infrastructure/models/entity";
import { useClipboardStore } from "@/store/clipboard-store";
import { ChevronDown, Pen, Trash2 } from "lucide-react";
import { coloBackground } from "@/infrastructure/utils/color-format-changer";
import { gradientToCssString } from "@/infrastructure/utils/gradient-to-css-string";
import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import { setEditBlock, togglePalette } from "@/pages/clipboard-page/features/clipboard-store-actions";
import DroppableLine from "@/components/custom/drag-and-drop/drop-line";
import InnerBlock from "./inner-block";
import { BaseOutlineBlock } from "../base-outline-block";

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

  return <ContextMenu>
    <ContextMenuTrigger>
      <BaseOutlineBlock block={paletteEntity} >

        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-background">
          <div className="w-full h-6  flex  bg-checkerboard">
            {
              colorBlocksId.map((id) => (<PaletteTopBar blockId={id} key={id} />))
            }
          </div>

          <div className="w-full h-7 flex flex-row justify-between items-center ">
            <div className="flex gap-2 h-full items-center  text-md">
              {paletteEntity.name}
              <Button
                variant='ghost'
                onClick={() => togglePalette(paletteEntity.blockId)}
                className="w-5 hover:bg-secondary h-full   flex items-center justify-center cursor-pointer"
              >
                <ChevronDown className="transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </Button>
            </div>
          </div>
        </div>

      </BaseOutlineBlock>
      {isOpen && colorBlocksId.length ? <div className="w-full dark:bg-neutral-900/70 rounded-b-md border-2 border-t-0 px-1">
        <div className="flex flex-col  border-neutral-700 ">
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

    </ContextMenuTrigger>
    <ContextMenuContent className="w-20">
      <ContextMenuItem className="gap-2" onClick={() => setEditBlock(paletteEntity.blockId)}>
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