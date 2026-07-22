import { addNewStop } from "@/features/gradient/add-new-gradient";
import { GradientLayerEntity } from "@/features/infrastructure/entity/gradient.entity";
import { Plus } from "lucide-react";

interface GradientStopListParm {
  layer: GradientLayerEntity;
  gradientId: number;
}

const GradientStopList = ({ layer, gradientId }: GradientStopListParm) => {
  return layer.stops.map((stop, ix) => (
    <>
    <div onClick={()=>addNewStop(gradientId, layer.id)}><Plus/></div>
    <div className="flex flex-row gap-5">
      <div key={ix}>{stop.r}</div>
      <div key={ix}>{stop.g}</div>
      <div key={ix}>{stop.b}</div>
      <div key={ix}>{stop.a}</div>
    </div>
    </>
  ));
};

export default GradientStopList;
