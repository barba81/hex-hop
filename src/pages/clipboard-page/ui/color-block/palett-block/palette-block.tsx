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


type PaletteBlockBaseParams = {
  paletteEntity: PaletteEntity,
  colorBlocksId: number[],
  isOpen: boolean
};

const PaletteBlockBase = ({ colorBlocksId, paletteEntity, isOpen }: PaletteBlockBaseParams) => {
  return <div className="grid grid-rows-2 w-full h-full overflow-hidden bg-background">
    <div className="bg-checkerboard flex w-full">
      {
        colorBlocksId.map((id) => (<PaletteTopBar blockId={id} key={id} />))
      }
    </div>

    <div className="  flex flex-row justify-end items-center ">
      <div className="text-sm">
        {paletteEntity.name}
      </div>
      <Button
        size='icon-sm'
        variant='ghost'
        onClick={() => togglePalette(paletteEntity.blockId)}
        className=" hover:bg-secondary  flex items-center justify-center cursor-pointer"
      >
        <ChevronDown className="transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </Button>
    </div>

  </div>
}


type PaletteDropDownCardParams = {
  paletteEntity: PaletteEntity,
  colorBlocksId: number[]
};

const PaletteDropDownCard = ({ paletteEntity, colorBlocksId }: PaletteDropDownCardParams) => {
  return <div className="w-full dark:bg-neutral-900/70 rounded-b-md border-2 border-t-0 px-1">
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
  </div>
}


const PaletteBlock = ({ paletteEntity }: PaletteBoxParams) => {
  const colorBlocksId = useClipboardStore(state => state.blockIds[paletteEntity.id]) ?? [];
  const isOpen = useClipboardStore((state) => !!state.openPalette[paletteEntity.blockId]);

  return <ContextMenu>
    <ContextMenuTrigger>
      <BaseOutlineBlock block={paletteEntity} >
        <PaletteBlockBase colorBlocksId={colorBlocksId} paletteEntity={paletteEntity} isOpen={isOpen} />
      </BaseOutlineBlock>
      {isOpen &&
        <PaletteDropDownCard colorBlocksId={colorBlocksId} paletteEntity={paletteEntity} />
      }

    </ContextMenuTrigger>
    <ContextMenuContent className="w-auto">
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