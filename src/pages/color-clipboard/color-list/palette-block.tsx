import { DragDots } from "@/components/common/drag-dots";
import type { PaletteEntity } from "@/infrastructure/entity";
import { ChevronDown, X } from "lucide-react";

type PaletteBoxParams = {
  paletteEntity: PaletteEntity
};

const PaletteBlock = ({ paletteEntity }: PaletteBoxParams) => {
  return (
    <div
      className="h-17 rounded-md w-full shrink-0 relative flex flex-row items-stretch outline-2 overflow-hidden"
    >
      <div className="flex items-center justify-center  shrink-0">
        <DragDots />
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-checkerboard">
        <div
          className="w-full h-5 flex-1 flex "
        >
          <div className="bg-red-100 w-full h-full" />
          <div className="bg-red-200 w-full h-full" />
          <div className="bg-red-300 w-full h-full" />
          <div className="bg-red-400 w-full h-full" />
          <div className="bg-red-500 w-full h-full" />
          <div className="bg-red-600 w-full h-full" />
          <div className="bg-red-700 w-full h-full" />
          <div className="bg-red-800 w-full h-full" />
          <div className="bg-red-900 w-full h-full" />
        </div>

        <div className="w-full h-7 flex flex-row justify-between pr-2">
          <div className="flex">
            {/* Copy */}
          </div>
          <div className="flex gap-2 h-full items-center font-mono text-md">
            {paletteEntity.name}
            <ChevronDown size={15}/>
            <X size={15}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteBlock;