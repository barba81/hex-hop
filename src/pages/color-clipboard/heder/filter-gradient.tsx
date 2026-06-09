import GradientIcon from "@/components/icons/gradient-icon";
import Button from "@/components/common/button";

const FilterGradient = ({selected} :{selected: boolean}) => {
    return (<>
     <Button className={`outline-2 outline-amber-600 `}>
        <GradientIcon strokeWidth={2} size={17} />
      </Button>
    
    </>)
};

export default FilterGradient;
