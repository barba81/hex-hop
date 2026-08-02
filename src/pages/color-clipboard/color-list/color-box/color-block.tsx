import "@/style/empty-checker-board.css";
import ColorText from "./color-text";
import CopyLogo from "./copy-button";
import CloseButton from "./close-button";
import ColorName from "./color-name";
import { DragDots } from "../../../../components/common/drag-dots";
import { useDraggable } from "@dnd-kit/react";
import EditButton from "./edit-button";
import { Pin } from "lucide-react";
import type { ColorEntity } from "@/infrastructure/entity";
import { colorDataToRoundData } from "../../features/color-format-changer";

const ColorBlock = ({ color: colorEntity }: { color: ColorEntity }) => {
  const { ref } = useDraggable({
    id: colorEntity.blockId,
    data: { parent: colorEntity.paletteId },
  });

  const colorHexData = colorDataToRoundData(colorEntity);

  const BottomLeft = () => {
    return (
      <div className="absolute bottom-1 left-1 flex flex-row gap-2">
          <ColorText color={colorHexData} />
        </div>
    );
  };

  const TopLeft = () => {
    return (
      <div className="absolute top-2 left-1 flex flex-row gap-2">
          <CopyLogo color={colorEntity} fontClass={"white"} />
        </div>
    );
  };

  const TopRight = () => {
    return (
      <div
          onClick={async () => {}}
          className="absolute top-2 right-2  flex flex-row gap-2 "
        >
          <EditButton colorEntity={colorEntity} />
          <Pin size={14}/>
          <CloseButton colorEntity={colorEntity} />
        </div>
    );
  };

  const BottomRight = () => {
    return (
      <div className="absolute bottom-1 right-2 flex flex-row gap-2">
          <ColorName colorEntity={colorEntity} />
        </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`h-14 rounded-md w-full shrink-0 relative flex items-center justify-between   outline-1 overflow-hidden `}
    >
      <div className="absolute inset-0 bg-checkerboard  rounded-md overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: `rgba(${colorHexData.r}, ${colorHexData.g}, ${colorHexData.b}, ${colorHexData.a ?? 1.0})`,
          }}
        />
      </div>

      <DragDots />

      <div className=" w-full h-full  relative ">
        <BottomLeft />
        <TopLeft />
        <TopRight />
        <BottomRight />
      </div>
    </div>
  );
};

export default ColorBlock;
