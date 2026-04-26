import { ColorEntity } from "@/model/color";
import { ColorPallet } from "@/service/colorPallet";
import { Hash, X } from "lucide-react";

type ColorBlockComponentParams = {
  color: ColorEntity;
  fontClass: string;
};

type ColorBlockParams = {
  color: ColorEntity;
};

const CopyLogo = ({ color, fontClass }: ColorBlockComponentParams) => {
  const colorBlock = "opacity-60 hover:opacity-100 select-none";
  return (
    <div
      className={`flex absolute top-1.5 left-0 items-center gap-2 ${fontClass}`}
    >
      <Hash
        size={18}
        strokeWidth={2.5}
        className={`hover:cursor-pointer ${colorBlock}`}
        onClick={() => ColorPallet.CopyToClipboard(color, "#")}
      />
      <div
        className={`font-mono font-semibold hover:cursor-pointer ${colorBlock}`}
        onClick={() => ColorPallet.CopyToClipboard(color, "RBG")}
      >
        RGB
      </div>
      <div
        className={`font-mono font-semibold hover:cursor-pointer ${colorBlock}`}
        onClick={() => ColorPallet.CopyToClipboard(color, "HSL")}
      >
        HSL
      </div>
      <div
        className={`font-mono font-semibold hover:cursor-pointer ${colorBlock}`}
        onClick={() => ColorPallet.CopyToClipboard(color, "OK")}
      >
        OK
      </div>
      <div
        className={`font-mono font-semibold hover:cursor-pointer ${colorBlock}`}
        onClick={() => ColorPallet.CopyToClipboard(color, "VEC")}
      >
        VEC
      </div>
    </div>
  );
};
const CloseButton = ({ color }: ColorBlockParams) => {
  return (
    <>
      <div
        onClick={() => {
          ColorPallet.DeleteById(color);
        }}
        className="absolute top-0.5 right-0 hover:cursor-pointer hover:bg-amber-50/20 p-0.5 rounded-full"
      >
        <X size={15} />
      </div>
    </>
  );
};

const ColorText = ({ color }: ColorBlockParams) => {
  return (
    <div className="absolute bottom-1.5 left-1 select-none cursor-default  antialiased">
      <div className="flex gap-2 opacity-80 text-[13px] uppercase tracking-wider font-semibold">
        <span>
          <span className="opacity-50 mr-1">R</span>
          {color.r}
        </span>
        <span>
          <span className="opacity-50 mr-1">G</span>
          {color.g}
        </span>
        <span>
          <span className="opacity-50 mr-1">B</span>
          {color.b}
        </span>
      </div>
    </div>
  );
};

const ColorBlock = ({ color }: { color: ColorEntity }) => {
  const isLight = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b > 150;
  const fontColor = isLight ? "text-gray-900" : "text-gray-100";

  return (
    <div
      className={`group h-14 rounded-md w-full shrink-0 relative flex items-center justify-between px-1 overflow-hidden ${fontColor} outline-1`}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}
      />

      <div className="z-10 w-full h-full relative">
        <ColorText color={color} />
        <CopyLogo color={color} fontClass={fontColor} />
        <CloseButton color={color} />
      </div>
    </div>
  );
};

export default ColorBlock;
