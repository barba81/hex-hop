import type { ColorEntity } from "@/infrastructure/entity";
import { X } from "lucide-react";

type CloseButtonParams = {
  colorEntity: ColorEntity;
};

const CloseButton = ({  }: CloseButtonParams) => {
  return (
      <div
        onClick={async () => {
        }}
        className=" hover:cursor-pointer hover:bg-amber-50/20 rounded-full"
      >
        <X size={15} />
      </div>
  );
};

export default CloseButton;