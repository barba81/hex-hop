import { addNewGradientLayer } from "@/features/gradient/add-new-gradient-layer/add-new-gradient-layer";
import { useGradientStore, useSelectedGradientId } from "@/store/use-gradient-store";
import "@/style/empty-checker-board.css";
import { Plus } from "lucide-react";

const GradientLayerListHeader = () => {
  const selectGradientId = useSelectedGradientId();

  return (
    <div className="" onClick={() => addNewGradientLayer(selectGradientId)}>
      {selectGradientId}
      <Plus />
    </div>
  );
};

export default GradientLayerListHeader;
