import "@/style/empty-checker-board.css";
import { useGradientStore } from "@/store/use-gradient-store";
import GradientLayerHeader from "./gradient-header-summery";
import GradientLayerBox from "./gradient-layer-box";

const GradientLayer = ({ layerId }: { layerId: number }) => {
  const isExpanded = useGradientStore(
    (state) => !!state.expandedLayers[layerId],
  );

  return (
    <>
      <div className=" flex flex-col  outline-1 rounded-sm overflow-auto">
        <GradientLayerHeader layerId={layerId} />
        {isExpanded && <GradientLayerBox layerId={layerId} />}
      </div>
    </>
  );
};

export default GradientLayer;
