import GradientLayerList from "./gradient-layer-list";
import GradientPreviewBox from "./gradient-preview";
import GradientInfo from "./gradient-info";
import {
  useGradientStoreHasElements,
  useGradientStoreSelectedGradient,
} from "@/store/use-gradient-store";
import GradientEmptyPage from "./gradient-empty-page";
import { List } from "lucide-react";

const GradientGeneratorPage = () => {
  const hasElements = useGradientStoreHasElements();
  const selectedGradient = useGradientStoreSelectedGradient();

  const GradientPreview = () => {
    return (
      <>
        <GradientPreviewBox gradientBackground=" linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(152, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)" />
        <GradientInfo gradient={selectedGradient} />
        <GradientLayerList gradient={selectedGradient} />
      </>
    );
  };

  return (
    <>
      <List />
      <div className="flex flex-col w-full flex-1 p-1 gap-2">
        {hasElements ? <GradientPreview /> : <GradientEmptyPage />}
      </div>
    </>
  );
};

export default GradientGeneratorPage;
