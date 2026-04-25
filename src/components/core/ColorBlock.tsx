import { ColorEntity } from "@/model/color";
import { ColorPallet } from "@/service/colorPallet";
import { Hash, X } from "lucide-react";

type ColorBlockParams = {
  color: ColorEntity;
};

const CopyLogo = ({ color }: ColorBlockParams) => {
  return (
    <>
      <div className="flex absolute top-1 left-1 items-center gap-1">
        <Hash
          size={18}
          onClick={() => ColorPallet.CopyToClipboard(color, "RBG")}
        />
        <div
          onClick={() => ColorPallet.CopyToClipboard(color, "Tailwind")}
          className="w-[20px] h-[20px] bg-black dark:bg-white hover:cursor-pointer"
          style={{
            maskImage: 'url("/tailwind-icon.svg")',
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
            WebkitMaskImage: 'url("/tailwind-icon.svg")',
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
          }}
        />
      </div>
    </>
  );
};

const CloseButton = ({ color }: ColorBlockParams) => {
  return (
    <>
      <div
        onClick={() => {
          ColorPallet.DeleteById(color);
        }}
        className="absolute top-1 right-1 hover:cursor-pointer hover:bg-amber-50/20 p-0.5 rounded-full"
      >
        <X size={15} />
      </div>
    </>
  );
};

const ColorText = ({ color }: ColorBlockParams) => {
  return (
    <>
      <div
        onClick={() => {}}
        className="absolute bottom-1 left-1 hover:cursor-pointer
                text-sm
              "
      >
        {color.r}, {color.g}, {color.b}, {color.a}
      </div>
    </>
  );
};

const ColorBlock = ({ color }: ColorBlockParams) => {
  // Define grid colors based on theme (or just use neutral grays that work for both)
  const gridLight = "#ffffff";
  const gridDark = "#e5e7eb"; // Tailwind gray-200

  return (
    <div
      className="group h-12 rounded-md w-full shrink-0 relative flex items-center justify-between px-4 overflow-hidden border border-gray-200 dark:border-gray-800"
      style={{
        // 1. The Checkerboard Pattern
        backgroundImage: `
          linear-gradient(45deg, ${gridDark} 25%, transparent 25%), 
          linear-gradient(-45deg, ${gridDark} 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, ${gridDark} 75%), 
          linear-gradient(-45deg, transparent 75%, ${gridDark} 75%)
        `,
        backgroundSize: '12px 12px',
        backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
        backgroundColor: gridLight, // The "white" part of the grid
      }}
    >
      {/* 2. The Color Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${0.8})`,
        }}
      />

      {/* 3. Content (needs z-10 to stay above the color) */}
      <div className="z-10 w-full flex items-center justify-between">
        <ColorText color={color} />

        <div className="flex gap-2 opacity-30 group-hover:opacity-80 transition-opacity">
          <CopyLogo color={color} />
          <CloseButton color={color} />
        </div>
      </div>
    </div>
  );
};
export default ColorBlock;
