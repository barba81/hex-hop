import { ColorEntity } from "@/model/color";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";
import CloseButton from "./CloseButton";
import CopyLogo from "./CopyButton";
import ColorText from "./ColorText";

import "@/style/EmptyCheckerBoard.css";

const ColorBlock = ({ color }: { color: ColorEntity }) => {
  const { isDark: isAppDarkMode } = useTheme();
  const isLight = useMemo(() => {
    const { r, g, b, a = 1.0 } = color;

    const bgLuma = isAppDarkMode ? 30 : 255;
    const colorLuma = 0.299 * r + 0.587 * g + 0.114 * b;
    var A = a ?? 1;
    const apparentLuma = colorLuma * A + bgLuma * (1 - A);
    return apparentLuma > 150;
  }, [color, isAppDarkMode]);

  const fontColor = isLight ? "text-gray-900" : "text-gray-100";

  return (
    <div
      className={`group h-14 rounded-md w-full shrink-0 relative flex items-center justify-between px-1  ${fontColor} outline-1`}
    >
      <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1.0})`,
          }}
        />
      </div>

      <div className=" w-full h-full relative">
        <ColorText color={color} />
        <CopyLogo color={color} fontClass={fontColor} />
        <CloseButton color={color} />
      </div>
    </div>
  );
};

export default ColorBlock;
