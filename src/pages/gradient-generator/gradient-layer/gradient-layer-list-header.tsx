import { useSelectedGradientId } from "@/store/use-gradient-store";
import "@/style/empty-checker-board.css";
import { Plus } from "lucide-react";

const GradientLayerListHeader = () => {
  const selectGradientId = useSelectedGradientId();

  return (
    <div className="" onClick={()=>{}}>
      {selectGradientId}
      <Plus />
    </div>
  );
};

export default GradientLayerListHeader;
