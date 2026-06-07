import { Plus } from "lucide-react";
import GradientList from "./gradient-list";
import GradientPreview from "./gradient-preview";
import ColorPicker from "../color-clipboard/color-picker/color-picker";
import { AllGradinetsList } from "./all-gradient-list";

const GradientGeneratorPage = () => {
  return (
    <>
    <div>
      <Plus/>
    </div>
      <AllGradinetsList/>
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
