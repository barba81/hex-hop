import "@/style/empty-checker-board.css";
import GradientHeaderSummery from "./gradient-header-summery";
import {  useGradientLayerStore } from "@/store/use-gradient-layer";

const GradientLayerList = () => {
  const layers = useGradientLayerStore().layers;

  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2 bg-stone-800">
       {layers.map((_,ix) => (
          <GradientHeaderSummery key={ix} />
        ))}
    </div>
  );
};

export default GradientLayerList;
