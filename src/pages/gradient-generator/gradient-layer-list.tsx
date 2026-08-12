import "@/globals.css";
import type { GradientEntity } from "@/infrastructure/models/entity";
interface GradientLayerListParm {
  gradient: GradientEntity;
}

const GradientLayerList = ({  }: GradientLayerListParm) => {
  return (
    <div className="flex-1 overflow-y-auto  flex flex-col  gap-3 py-1 bg-stone-900/20">
      {/* {gradient.layers.map((layer, ix) => (
        <div key={ix} className="flex flex-col w-full ">
          <div className="flex w-full justify-between">
            <div>{layer.id}</div>
            <div>{layer.patternRepeatNumber}</div>
            <div>{layer.colorSpace}</div>
            <div>{layer.easingFunction}</div>
            <Trash2 onClick={()=>deleteGradientLayer(gradient.id, layer.id)} />
          </div>

          <div>
            <GradientStopList gradientId={gradient.id} layer={layer} />
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default GradientLayerList;
