import "@/style/empty-checker-board.css";
import GradientStopHeader from "../gradient-stop/gradient-stop-header";

const GradientLayerBox = ({ layerId }: { layerId: number }) => {
  return (
    <>
      <GradientStopHeader layerId={layerId}/>
    </>
  );
};

export default GradientLayerBox;
