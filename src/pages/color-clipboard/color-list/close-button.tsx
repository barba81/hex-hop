import { removeColor } from "@/features/colors/remove-color";
import { ColorEntity } from "@/features/infrastructure/entity/color.entity";
import { X } from "lucide-react";

type CloseButtonParams = {
  color: ColorEntity;
};

const CloseButton = ({ color }: CloseButtonParams) => {
  return (
    <>
      <div
        onClick={() => {
            removeColor(color);
        }}
        className="absolute top-1 right-1 hover:cursor-pointer hover:bg-amber-50/20 p-0.5 rounded-full"
      >
        <X size={15} />
      </div>
    </>
  );
};

export default CloseButton;