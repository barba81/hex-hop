import "@/style/empty-checker-board.css";
import GradientHeaderSummery from "./gradient-layer/gradient-header-summery";

const GradientList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2 bg-stone-800">
      <GradientHeaderSummery />
    </div>
  );
};

export default GradientList;
