import GradientIcon from "@/components/icons/gradient-icon";
import { Button } from "@/components/ui/button";

const FilterGradient = ({} :{selected: boolean}) => {
    return (<Button className={`outline-2 outline-amber-600 `}>
        <GradientIcon strokeWidth={2} size={17} />
      </Button>)
};

export default FilterGradient;
