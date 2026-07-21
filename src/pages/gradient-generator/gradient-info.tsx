import { Button } from "@/components/ui/button";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { Copy, Plus, Trash2 } from "lucide-react";

interface GradientInfoParm {
  gradient: GradientEntity;
}

const GradientInfo = ({ gradient }: GradientInfoParm) => {
  return (
    <>
      <div className="flex w-full justify-between px-2 gap-2 ">
        <div className="">{gradient.name}</div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="relative  select-none hover:cursor-pointer  text-xs rounded-md h-6"
          >
            <Plus />
            Add layer
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="relative  select-none hover:cursor-pointer  text-xs rounded-md h-6"
          >
            <Copy />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="relative  select-none hover:cursor-pointer  text-xs rounded-md h-6"
          >
            <Trash2 size={20} className="stroke-red-400"/>
          </Button>
        </div>
      </div>
    </>
  );
};

export default GradientInfo;
