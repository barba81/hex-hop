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

const GradientEmptyPage = () => {
  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <GradientStepIcon size={100} className="opacity-70" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">No gradient created</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => addNewGradient()}>Add new gradient</Button>
        </EmptyContent>
      </Empty>
    </>
  );
};

export default GradientEmptyPage;
