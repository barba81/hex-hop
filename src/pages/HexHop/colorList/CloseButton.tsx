import { ColorEntity } from "@/model/color";
import { ColorPallet } from "@/service/colorPallet";
import { X } from "lucide-react";

type CloseButtonParams = {
  color: ColorEntity;
};

const CloseButton = ({ color }: CloseButtonParams) => {
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

export default CloseButton;