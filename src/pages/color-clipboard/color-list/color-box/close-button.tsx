import { removeColor } from "@/features/color/remove-color";
import { ColorEntity } from "@/features/infrastructure/entity/color.entity";
import { X } from "lucide-react";

type CloseButtonParams = {
  colorEntity: ColorEntity;
};

const CloseButton = ({ colorEntity }: CloseButtonParams) => {
  return (
      <div
        onClick={async () => {
            await removeColor(colorEntity);
        }}
        className=" hover:cursor-pointer hover:bg-amber-50/20 rounded-full"
      >
        <X size={15} />
      </div>
  );
};

export default CloseButton;