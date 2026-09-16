import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import GradientIcon from "@/components/icons/gradient-icon";
import { CustomButton } from "@/components/common/custom-button";
import { addNewGradient } from "../feature/add-new-gradient";

const GradientEmptyPage = () => {

  return (
    <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <GradientIcon size={100} className="opacity-70" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">No gradient created</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CustomButton onClick={() => addNewGradient()}>Add new gradient</CustomButton>
        </EmptyContent>
      </Empty>
  );
};

export default GradientEmptyPage;
