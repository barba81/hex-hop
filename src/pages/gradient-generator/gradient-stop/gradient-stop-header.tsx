import { addNewColorToLayer } from "@/features/gradient/add-new-color-to-layer/add-new-color-to-layer";
import "@/style/empty-checker-board.css";
import { Plus } from "lucide-react";

const GradientStopHeader = ({ layerId }: { layerId: number }) => {
  return <> 
  <div onClick={()=>addNewColorToLayer(layerId )}>
    <Plus/>
  </div>
  </>;
};

export default GradientStopHeader;
