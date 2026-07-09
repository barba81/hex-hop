import GradientLayerList from "./gradient-layer/gradient-layer-list";
import GradientPreviewBox from "./gradient-preview";
import GradientInfo from "./gradient-info";
import { useGradientStoreHasElements } from "@/store/use-gradient-store";
import GradientLayerListHeader from "./gradient-layer/gradient-layer-list-header";
import { Plus } from "lucide-react";
import { GradientStepIcon } from "@/components/icons/gradient-step-icon";
import { addNewGradient } from "@/features/gradient/add-new-gradient";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

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

  const EmptyGradientList = () => {
    return (
      <>
        <Empty>
          <EmptyHeader>
            <EmptyMedia >
              <GradientStepIcon size={100} className="opacity-70" />
            </EmptyMedia>
            <EmptyTitle className="text-xl">No gradient created</EmptyTitle>
            <EmptyDescription>No data found</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button  onClick={() => addNewGradient()}>Add new gradient</Button>
          </EmptyContent>
        </Empty>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full flex-1 p-1 gap-2">
        {hasElements ? <GradientPreview /> : <EmptyGradientList />}
      </div>
    </>
  );
};

export default GradientGeneratorPage;
