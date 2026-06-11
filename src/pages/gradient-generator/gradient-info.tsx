import {  Trash2 } from "lucide-react";
import {  useGradientStore } from "@/store/use-gradient-store";
import { deleteGradient } from "@/features/gradient/remove-gradient/remove-gradient";

const GradientInfo = () => {
  const selectedGradientId = useGradientStore().selectedGradientId;

  return (
    <>
      <div className="flex w-full justify-between px-2 gap-2 bg-stone-800">
        <div>Gradient name</div>
        <div onClick={() => deleteGradient(selectedGradientId)}>
          <Trash2 size={20} />
        </div>
      </div>
    </>
  );
};

export default GradientInfo;
