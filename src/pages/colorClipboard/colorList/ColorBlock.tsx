import { ColorData, ColorEntity } from "@/model/color";
import CloseButton from "./CloseButton";
import CopyLogo from "./CopyButton";
import ColorText from "./ColorText";

import "@/style/EmptyCheckerBoard.css";
import { useAppStore } from "@/store/useThemeStore";
import { EllipsisVertical } from "lucide-react";

const ColorBlock = ({ color }: { color: ColorEntity }) => {
  const isDark = useAppStore((state) => state.isDark);

  const getFontColor = (isDark: boolean, color: ColorData) => {
    const { r, g, b } = color;
    const a = color.a ?? 1;
    const bgLuma = isDark ? 30 : 255;
    const colorLuma = 0.299 * r + 0.587 * g + 0.114 * b;
    const apparentLuma = colorLuma * a + bgLuma * (1 - a);

    return apparentLuma > 150 ? "text-gray-900" : "text-gray-100";
  };

  const fontColor = getFontColor(isDark, color);

  return (
    <div
      className={`group h-14 rounded-md w-full shrink-0 relative flex items-center justify-between  ${fontColor} outline-1`}
    >
      <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1.0})`,
          }}
        />
      </div>

      <div className="relative cursor-pointer h-full w-3 flex flex-col items-center justify-center gap-1 bg-foreground/20 mr-1 rounded-l-md">
        <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
        <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
        <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
      </div>
      <div className=" w-full h-full relative ">
        <ColorText color={color} />
        <CopyLogo color={color} fontClass={fontColor} />
        <CloseButton color={color} />
      </div>
    </div>
  );
};

export default ColorBlock;
