import { DragDots } from "@/components/common/drag-dots";
import type { PaletteEntity } from "@/infrastructure/models/entity";

import { useClipboardStore } from "@/pages/color-clipboard/store/use-clipboard-store";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { ChevronDown } from "lucide-react";
import { DraggableData } from "../features/darg-and-drop";
import { coloBackground } from "@/infrastructure/utils/color-format-changer";
import { gradientToCssString } from "@/infrastructure/utils/gradient-to-css-string";

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
  const colorBlocksId = useClipboardStore(state => state.blockIds[paletteEntity.blockId]) ?? [];

  const isOpen = useClipboardStore((state) => !!state.openPalette[paletteEntity.blockId]);
  const togglePalette = useClipboardStore((state) => state.togglePalette);

  const { isDropTarget, ref: dropRef } = useDroppable<DraggableData>({
    id: `darg:${paletteEntity.blockId}`,
    data: {
      blockId: paletteEntity.blockId,
      kind: "palette",
      palette: null
    }
  });

  const { ref: dragRef, handleRef } = useDraggable<DraggableData>({
    id: `drag:${paletteEntity.blockId}`,
    data: {
      blockId: paletteEntity.blockId,
      kind: "palette",
      palette: null
    }
  });


  const setCombinedRef = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };



  return (
    <div ref={setCombinedRef}>
      <div
        className={`${isDropTarget && 'outline-2 outline-accent'} h-15 w-full shrink-0 relative flex flex-row items-stretch border-2   overflow-hidden
          ${isOpen ? 'rounded-t-md border-b-transparent' : 'rounded-md '}`}
      >
        <div ref={handleRef} className="flex items-center justify-center shrink-0">
          <DragDots />
        </div>

        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-background">
          <div className="w-full h-15 flex-1 flex  bg-checkerboard">
            {
              colorBlocksId.map((id) => (<PaletteTopBar blockId={id} key={id} />))
            }
          </div>

          <div className="w-full h-7 flex flex-row justify-between items-center pr-2">
            <div className="flex">
              TAILWIND, XX
            </div>
            <div className="flex gap-2 h-full items-center  text-md">

              {paletteEntity.name}
              <div
                onClick={() => togglePalette(paletteEntity.blockId)}
                className="  w-6 h-6 flex items-center justify-center transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? <div className="w-full dark:bg-neutral-900/70 rounded-b-md border-2 border-t-0 p-2">
        <div className="flex flex-col gap-2 border-neutral-700 ">

        </div>
      </div> : null}
    </div>
  );
};

export default PaletteBlock;