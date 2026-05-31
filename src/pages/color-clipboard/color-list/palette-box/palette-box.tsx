import { ChevronDown, ChevronUp } from "lucide-react";
import { DragDots } from "../drag-dots";
import ColorBlock from "../color-box/color-block";
import { useState } from "react";
import { PaletteEntity } from "@/features/infrastructure/entity/palette.entity";
import { PaletteBoxEmpty } from "./palette-box-empty";
import { colorDataToHex } from "@/features/color/color-format-changer";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import React from "react";
import DropLine from "../drop-line";
import { useHexHopStore } from "@/store/use-hex-hop-store";
import { Button } from "@/components/ui/button";
import { removeAllBlocks } from "@/features/palette/remove-all-blocks";
import {
  useIsPaletteExtended,
  usePaletteStore,
} from "@/store/use-palette-store";

type PaletteBoxParams = {
  palette: PaletteEntity;
};

export const PaletteBox = ({ palette }: PaletteBoxParams) => {
  const expandPalette = useIsPaletteExtended(palette.id);
  const actions = usePaletteStore().actions;

  const colorBlocks = useHexHopStore()
    .colorBlocks.filter(
      (x) => x.kind !== "palette" && x.paletteId === palette.id,
    )
    .sort((a, b) => a.order - b.order);

  const { ref: refDraggable } = useDraggable({
    id: palette.blockId,
    data: { parent: palette.id },
  });
  const { ref: refDroppable, isDropTarget } = useDroppable({
    id: palette.blockId,
    data: { parentId: palette.id },
  });

  return (
    <>
      <div ref={refDraggable} className="flex flex-col outline-3 rounded-md ">
        {colorBlocks.length === 0 && (
          <div ref={refDroppable}>
            {isDropTarget ? (
              <div>
                <PaletteBoxEmpty className="opacity-15" name="Empty Palette" />
              </div>
            ) : (
              <PaletteBoxEmpty className="" name="Empty Palette" />
            )}
          </div>
        )}
        {colorBlocks.length !== 0 && (
          <>
            <div
              ref={refDroppable}
              className={`h-7  ${!expandPalette && "rounded-md"}  ${expandPalette && "rounded-t-md"} w-full shrink-0 relative flex items-center justify-between overflow-hidden `}
            >
              {/* Background  */}
              <div className="absolute inset-0 bg-checkerboard    flex">
                {colorBlocks.map((block, ix) =>
                  block.kind === "color" ? (
                    <div
                      key={ix}
                      className="w-full h-full"
                      style={{
                        background: colorDataToHex(block),
                      }}
                    />
                  ) : null,
                )}
              </div>

              <div
                className={` h-full flex items-center justify-start overflow-hidden ${!expandPalette && "rounded-md"} `}
              >
                <DragDots />
                <div
                  className="relative rounded-md bg-foreground/20 p-0.5 cursor-pointer   flex flex-col items-center justify-center "
                  onClick={() =>
                    !expandPalette
                      ? actions.addExtendedPalletId(palette.id)
                      : actions.removeExtendedPalletId(palette.id)
                  }
                >
                  {!expandPalette && <ChevronDown size={14} />}
                  {expandPalette && <ChevronUp size={14} />}
                </div>
              </div>
              {/* <div className="relative h-full   flex items-center justify-start overflow-hidden text-sm  text-red-50 bg-foreground/20 px-3 rounded-l-md font-mono">
            Test palette name
          </div> */}
            </div>
            {expandPalette && (
              <div className="flex flex-col px-1.5 gap-1 bg-foreground/2 rounded-b-md ">
                <div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="relative  select-none hover:cursor-pointer  text-xs rounded-md h-6"
                    onClick={() => removeAllBlocks(palette.id)}
                  >
                    {" "}
                    Remove all from palette{" "}
                  </Button>
                </div>

                {colorBlocks.map((block, ix) => {
                  const renderBlock = () => {
                    if (block.kind === "color") {
                      return <ColorBlock key={block.id} color={block} />;
                    }
                    return null;
                  };

                  return (
                    <React.Fragment key={block.id}>
                      <DropLine
                        id={`before-${block.id}`}
                        order={ix}
                        parentId={palette.id}
                      />
                      {renderBlock()}
                      {ix === colorBlocks.length - 1 && (
                        <DropLine
                          id={`after-${block.id}`}
                          order={ix + 1}
                          parentId={palette.id}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
