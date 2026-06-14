import GradientLayerList from "./gradient-layer/gradient-layer-list";
import GradientPreviewBox from "./gradient-preview";
import { AllGradientsList } from "./all-gradients-list/all-gradient-list";
import GradientInfo from "./gradient-info";
import {useGradientStoreHasElements} from "@/store/use-gradient-store";
import GradientLayerListHeader from "./gradient-layer/gradient-layer-list-header";

const GradientGeneratorPage = () => {
  const hasElements = useGradientStoreHasElements();

  const GradientPreview = () => {
    return (
      <>
        <GradientInfo />
        <GradientPreviewBox gradientBackground=" linear-gradient(4deg,rgba(63, 94, 251, 1) 0%, rgba(152, 83, 183, 1) 31%, rgba(252, 70, 107, 1) 100%)" />
        <GradientLayerListHeader/>
        <GradientLayerList />
      </>
    );
  };

  const EmptyGradientList = () => {
    return <><div>Add new gradietns</div></>
  }

  return (
    <>
      <div className="flex flex-col w-full flex-1 p-1 gap-2">
        <AllGradientsList />
        {hasElements ? <GradientPreview /> : <EmptyGradientList />}
      </div>
    </>
  );
};

export default GradientGeneratorPage;
