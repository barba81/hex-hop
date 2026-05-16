import { ColorData, ColorModel } from "@/model/color";


import "@/style/EmptyCheckerBoard.css";
import { useAppStore } from "@/store/useThemeStore";
import ColorText from "./ColorText";
import CopyLogo from "../colorList/CopyButton";
import CloseButton from "../colorList/CloseButton";
import ColorName from "../colorList/ColorName";
import { DragDots } from "../colorList/DragDots";

const ColorBlock = ({ color }: { color: ColorModel }) => {
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
      className={`h-14 rounded-md w-full shrink-0 relative flex items-center justify-between  ${fontColor} outline-1 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
        <div
          className="w-full h-full"
          style={{
           backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1.0})`
          }}
        />
      </div>

      <DragDots/>
      
      <div className=" w-full h-full relative ">
        <ColorText color={color} />
        <CopyLogo color={color} fontClass={fontColor} />
        <CloseButton color={color} />
        <ColorName name={color.name} />
      </div>
    </div>
  );
};

export default ColorBlock;
