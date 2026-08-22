import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { addNewGradient } from "./feature/add-new-gradient";
import GradientIcon from "@/components/icons/gradient-icon";
import { Button } from "@/components/common/micro-button";

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
          <Button onClick={() => addNewGradient()}>Add new gradient</Button>
        </EmptyContent>
      </Empty>
  );
};

export default GradientEmptyPage;
