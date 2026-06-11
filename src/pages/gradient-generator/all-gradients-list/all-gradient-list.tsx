import { addNewGradient } from "@/features/gradient/add-new-gradient/add-new-gradient";
import { useGradientActions, useGradients } from "@/store/use-gradient-store";
import { Plus } from "lucide-react";

export const AllGradientsList = () => {
  const gradients = useGradients();

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

  const GradientPreview = () => {
    return (
      <div
        className=" h-10 w-20 rounded-md  hover:outline-5 shrink-0 "
        style={{
          background:
            "linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(152, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)",
        }}
      />
    );
  };

  return (
    <>
      <div className="flex flex-row gap-2  p-2 w-full overflow-auto whitespace-nowrap shrink-0">
        <AddNewGradient />
        {gradients.map((_,ix) => (
          <GradientPreview key={ix} />
        ))}
      </div>
    </>
  );
};
