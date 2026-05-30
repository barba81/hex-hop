import "@/style/empty-checker-board.css";
import { useAppStore } from "@/store/use-theme-store";
import ColorText from "./color-text";
import CopyLogo from "./copy-button";
import CloseButton from "./close-button";
import ColorName from "./color-name";
import { DragDots } from "../drag-dots";
import { ColorData } from "@/features/colors/types";
import { ColorEntity } from "@/features/infrastructure/entity/color.entity";
import { colorDataToRoundData } from "@/features/colors/color-format-changer";
import {useSortable} from '@dnd-kit/react/sortable';

const ColorBlock = ({ color: colorEntity }: { color: ColorEntity }) => {
  const {ref} = useSortable({id: colorEntity.blockId, index: colorEntity.order});
  
  const isDark = useAppStore((state) => state.isDark);

  const getFontColor = (isDark: boolean, color: ColorData) => {
    const { r, g, b } = color;
    const a = color.a ?? 1;
    const bgLuma = isDark ? 30 : 255;
    const colorLuma = 0.299 * r + 0.587 * g + 0.114 * b;
    const apparentLuma = colorLuma * a + bgLuma * (1 - a);

    return apparentLuma > 150 ? "text-gray-900" : "text-gray-100";
  };

  const fontColor = getFontColor(isDark, colorEntity);
  const colorHexData = colorDataToRoundData(colorEntity);

  return (
    <div
    ref={ref} 
      className={`h-14 rounded-md w-full shrink-0 relative flex items-center justify-between  ${fontColor} outline-1 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
        <div
          className="w-full h-full"
          style={{
           backgroundColor: `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.a ?? 1.0})`
          }}
        />
      </div>

      <DragDots/>
      
      <div className=" w-full h-full relative ">
        <ColorText color={colorHexData} />
        <CopyLogo color={colorEntity} fontClass={fontColor} />
        <CloseButton colorEntity={colorEntity} />
        <ColorName colorEntity={colorEntity} />
      </div>
    </div>
  );
};

export default ColorBlock;
