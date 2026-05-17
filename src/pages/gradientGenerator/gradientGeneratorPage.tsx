import { Plus } from "lucide-react";
import GradientList from "./GradientList";
import GradientPreview from "./GradientPreview";
import ColorPicker from "../colorClipboard/colorPicker/ColorPicker";

const GradientGeneratorPage = () => {
  return (
    <>
      <div className="p-2">
        <GradientPreview />
      </div>
      <Plus />
      <GradientList />
      <ColorPicker />
    </>
  );
};

export default GradientGeneratorPage;
