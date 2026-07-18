import GradientLayerList from "./gradient-layer/gradient-layer-list";
import GradientPreviewBox from "./gradient-preview";
import GradientInfo from "./gradient-info";
import { useGradientStoreHasElements } from "@/store/use-gradient-store";
import GradientLayerListHeader from "./gradient-layer/gradient-layer-list-header";
import GradientEmptyPage from "./gradient-empty-page";

const GradientGeneratorPage = () => {
  const hasElements = useGradientStoreHasElements();

  const GradientPreview = () => {
    return (
      <>
        <GradientInfo />
        <GradientPreviewBox gradientBackground=" linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(152, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)" />
        <GradientLayerListHeader />
        <GradientLayerList />
      </>
    );
  };


  return (
    <>
      <div className="flex flex-col w-full flex-1 p-1 gap-2">
        {hasElements ? <GradientPreview /> : <GradientEmptyPage />}
      </div>
    </>
  );
};

export default GradientGeneratorPage;
