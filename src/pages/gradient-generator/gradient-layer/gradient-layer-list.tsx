import "@/style/empty-checker-board.css";
import { GradientEntity } from "@/features/infrastructure/entity/gradient.entity";
interface GradientLayerListParm {
  gradient: GradientEntity;
}
const GradientLayerList = ({ gradient }: GradientLayerListParm) => {
  return (
    <div className="flex-1 overflow-y-auto  flex  gap-3 py-1 ">
      {gradient.layers.map((layer, ix) => (
        <div key={ix} className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <div>{layer.id}</div>
            <div>{layer.patternRepeatNumber}</div>
            <div>{layer.colorSpace}</div>
            <div>{layer.easingFunction}</div>
          </div>
          <div>
            {layer.stops.map((stop, ix) => (
              <div className="flex flex-row gap-5">
                <div key={ix}>{stop.r}</div>
                <div key={ix}>{stop.g}</div>
                <div key={ix}>{stop.b}</div>
                <div key={ix}>{stop.a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradientLayerList;
