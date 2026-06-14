import "@/style/empty-checker-board.css";
import { useSelectedLayers } from "@/store/use-gradient-store";
import GradientLayer from "./gradient-layer";

const GradientLayerList = () => {
  const layers = useSelectedLayers();

  return (
    <div className="flex-1 overflow-y-auto  flex flex-col gap-3 py-1 bg-stone-800">
       {layers.map((layer,ix) => (
          <GradientLayer key={ix} layerId={layer.id} />
        ))}
    </div>
  );
};

export default GradientLayerList;
