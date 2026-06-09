import { removeColor } from "@/features/color/remove-color";
import { ColorEntity } from "@/features/infrastructure/entity/color.entity";
import { Pencil } from "lucide-react";

type EditButtonParams = {
  colorEntity: ColorEntity;
};

const EditButton = ({ colorEntity }: EditButtonParams) => {
  return (
      <div
        onClick={async () => {}}
        className=" hover:cursor-pointer hover:bg-amber-50/20  rounded-full"
      >
        <Pencil size={15} fill="white"/>
      </div>
  );
};

export default EditButton;