import "@/style/empty-checker-board.css";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
import GradientStopList from "./gradient-stop-list";
interface GradientLayerListParm {
  gradient: GradientEntity;
}

const GradientLayerList = ({ gradient }: GradientLayerListParm) => {
  return (
    <div className="flex-1 overflow-y-auto  flex  gap-3 py-1 bg-stone-900/20">
      {gradient.layers.map((layer, ix) => (
        <div key={ix} className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <div>{layer.id}</div>
            <div>{layer.patternRepeatNumber}</div>
            <div>{layer.colorSpace}</div>
            <div>{layer.easingFunction}</div>
          </div>

          <div>
            <GradientStopList gradientId={gradient.id} layer={layer} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradientLayerList;
