import { GradientLayerEntity } from "@/infrastructure/entity";
import { Plus, Trash2 } from "lucide-react";
import { addNewStop } from "./feature/add-new-gradient";
import { deleteGradientStop } from "./feature/delete-gradient";

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
