import "@/style/empty-checker-board.css";
import ColorText from "./color-text";
import CopyLogo from "./copy-button";
import CloseButton from "./close-button";
import ColorName from "./color-name";
import { DragDots } from "../../../../components/common/drag-dots";
import { ColorEntity } from "@/features/infrastructure/entity/color.entity";
import { colorDataToRoundData } from "@/features/color/color-format-changer";
import { useDraggable } from "@dnd-kit/react";
import EditButton from "./edit-button";

const ColorBlock = ({ color: colorEntity }: { color: ColorEntity }) => {
  const {ref} = useDraggable({id: colorEntity.blockId, data:{parent: colorEntity.paletteId}});

  const colorHexData = colorDataToRoundData(colorEntity);

  return (
    <div
    ref={ref} 
      className={`h-14 rounded-md w-full shrink-0 relative flex items-center justify-between   outline-1 overflow-hidden`}
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
        <CopyLogo color={colorEntity} fontClass={"white"} />
        <EditButton colorEntity={colorEntity} />
        <CloseButton colorEntity={colorEntity} />
        <ColorName colorEntity={colorEntity} />
      </div>
    </div>
  );
};

export default ColorBlock;
