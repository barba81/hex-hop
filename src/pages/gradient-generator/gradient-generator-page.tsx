import { Plus } from "lucide-react";
import GradientList from "./gradient-list";
import GradientPreview from "./gradient-preview";
import ColorPicker from "../color-clipboard/colorPicker/color-picker";

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
