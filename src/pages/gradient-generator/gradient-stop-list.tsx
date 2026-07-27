import { addNewStop } from "@/features/gradient/add-new-gradient";
import { deleteGradientStop } from "@/features/gradient/delete-gradient";
import { GradientLayerEntity } from "@/infrastructure/entity";
import { Plus, Trash2 } from "lucide-react";

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
          <Trash2 onClick={()=>deleteGradientStop(gradientId, layer.id, stop.id)} />

    </div>
    </>
  ));
};

export default GradientStopList;
