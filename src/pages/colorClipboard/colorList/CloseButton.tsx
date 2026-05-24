import { ColorModel } from "@/features/common/getAllData.types";
import { ColorPallet } from "@/features/colors/colorPallet";
import { X } from "lucide-react";

type CloseButtonParams = {
  color: ColorModel;
};

const CloseButton = ({ color }: CloseButtonParams) => {
  return (
    <>
      <div
        onClick={() => {
          ColorPallet.DeleteById(color);
        }}
        className="absolute top-1 right-1 hover:cursor-pointer hover:bg-amber-50/20 p-0.5 rounded-full"
      >
        <X size={15} />
      </div>
    </>
  );
};

export default CloseButton;