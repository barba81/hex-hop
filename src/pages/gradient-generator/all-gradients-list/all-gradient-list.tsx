import { addNewGradient } from "@/features/gradient/add-new-gradient/add-new-gradient";
import { selectGradient } from "@/features/gradient/select-gradient/select-gradient";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import { useGradients, useSelectedGradientId } from "@/store/use-gradient-store";
import { Plus } from "lucide-react";

export const AllGradientsList = () => {
  const gradients = useGradients();
  const activeId = useSelectedGradientId();

  const AddNewGradient = () => {
    return (
      <div
        className="h-10 w-20 rounded-md bg-stone-600/20 flex items-center justify-center hover:bg-stone-600 hover:cursor-pointer shrink-0"
        onClick={async () => await addNewGradient({
          kind: "gradient",
          id: 0,
          blockId: 0,
          order: 0,
          name: "",
          paletteId: null,
          layers: []
        })}
      >
        <Plus size={20} />
      </div>
    );
  };

  const GradientPreview = ({gradient}:{gradient:GradientEntity} ) => {
    return (
      <div
        onClick={() => selectGradient(gradient.id)}
        className={` h-10 w-20 rounded-md  hover:outline-5 shrink-0 ${activeId === gradient.id && 'outline-2 outline-amber-500'}`}
        style={{
          background:
            "linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(15, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)",
        }}
      />
    );
  };

  return (
    <>
      <div className="flex flex-row gap-2  p-2 w-full overflow-auto whitespace-nowrap shrink-0">
        <AddNewGradient />
        {gradients.map((gradient,ix) => (
          <GradientPreview key={ix} gradient={gradient}/>
        ))}
      </div>
    </>
  );
};
