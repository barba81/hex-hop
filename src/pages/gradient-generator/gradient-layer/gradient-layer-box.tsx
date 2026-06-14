import "@/style/empty-checker-board.css";
import GradientStopHeader from "../gradient-stop/gradient-stop-header";
import { useGradientStops } from "@/store/use-gradient-store";

const GradientLayerBox = ({ layerId }: { layerId: number }) => {
  const gradientStops = useGradientStops(layerId);
  return (
    <>
      <GradientStopHeader layerId={layerId}/>
       {gradientStops.map((stop,ix) => (
        <div key={ix}>
          {stop.a}
        </div>
        ))}
    
    </>
  );
};

export default GradientLayerBox;
