import { DragDots } from "@/components/common/drag-dots";
import type { PaletteEntity } from "@/infrastructure/models/entity";
import { colorDataToCss } from "@/infrastructure/utils/color-format-changer";
import { gradientToCssString } from "@/infrastructure/utils/gradient-to-css-string";
import { useClipboardStore } from "@/store/use-clipboard-store";
import { ChevronDown } from "lucide-react";
import ColorBlock from "./colo-block";
import GradientBlock from "./gradient-block";

type PaletteBoxParams = {
  paletteEntity: PaletteEntity
};

const PaletteBlock = ({ paletteEntity }: PaletteBoxParams) => {
  const isOpen = useClipboardStore((state) => !!state.openPalette[paletteEntity.blockId]);
  const togglePalette = useClipboardStore((state) => state.togglePalette);

  return (
    <div>
      <div
        className={`h-15 w-full shrink-0 relative flex flex-row items-stretch border-2   overflow-hidden
          ${isOpen ? 'rounded-t-md border-b-cyan-400' : 'rounded-md '}`}
      >
        <div className="flex items-center justify-center shrink-0">
          <DragDots />
        </div>

        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-checkerboard">
          <div className="w-full h-15 flex-1 flex">
            {paletteEntity.blocks?.map((child) => {
              if (child.kind === 'color')
                return (
                  <div
                    key={child.id}
                    className="w-full h-full"
                    style={{ backgroundColor: colorDataToCss(child) }}
                  />
                );
              if (child.kind === 'gradient')
                return (
                  <div
                    key={child.id}
                    className={`w-full h-full ${gradientToCssString(child)}`}
                  />
                );
            })}
          </div>

          <div className="w-full h-7 flex flex-row justify-between items-center pr-2">
            <div className="flex">
              {/* Copy */}
            </div>
            <div className="flex gap-2 h-full items-center font-mono text-md">
              {paletteEntity.name}
              <div
                onClick={() => togglePalette(paletteEntity.blockId)}
                className="outline-1 rounded-full bg-black w-5 h-5 flex items-center justify-center transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="w-full bg-neutral-900/60 rounded-b-md border-2 border-t-0 p-2">
          <div className="flex flex-col gap-2 border-neutral-700 ">
            {paletteEntity.blocks?.map((child) => {
              if (child.kind === 'color')
                return <ColorBlock key={child.blockId} colorEntity={child} />;
              if (child.kind === 'gradient')
                return <GradientBlock key={child.blockId} gradientEntity={child} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaletteBlock;