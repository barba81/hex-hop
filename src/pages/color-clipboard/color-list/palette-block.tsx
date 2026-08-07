import { DragDots } from "@/components/common/drag-dots";
import type { PaletteEntity } from "@/infrastructure/models/entity";
import { colorDataToCss } from "@/infrastructure/utils/color-format-changer";
import { gradientToCssString } from "@/infrastructure/utils/gradient-to-css-string";
import { ChevronDown } from "lucide-react";

type PaletteBoxParams = {
  paletteEntity: PaletteEntity
};

const PaletteBlock = ({ paletteEntity }: PaletteBoxParams) => {
  return (
    <div
      className="h-14 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-2 overflow-hidden"
    >
      <div className="flex items-center justify-center  shrink-0">
        <DragDots />
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-checkerboard">
        <div
          className="w-full h-5 flex-1 flex "
        >
          {paletteEntity.blocks?.map((child, ix) => {
            if (child.kind === 'color')
              return <div key={child.id} className={` w-full h-full `} style={{
                backgroundColor: colorDataToCss(child),
              }} />
            if (child.kind === 'gradient')
              return <div key={child.id} className={` w-full h-full ${gradientToCssString(child)}`} />
          })}
        </div>

        <div className="w-full h-7 flex flex-row justify-between pr-2">
          <div className="flex">
            {/* Copy */}
          </div>
          <div className="flex gap-2 h-full items-center font-mono text-md">
            {paletteEntity.name}
            <ChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteBlock;