import GradientIcon from "@/components/icons/gradient-icon";
import { ChevronDownIcon } from "lucide-react";
import GradientColorSpaceBadgeText from "./gradient-color-badge-text";
import "@/style/empty-checker-board.css";
import { DragDots } from "@/components/common/drag-dots";

const GradientHeaderSummery = ({layerId}:{layerId: number}) => {
  
  
  return (
    <>
      <div className=" flex   justify-between items-center gap-1  ">
        {/* drag and drop */}
        <div className=" flex items-center h-7 gap-1">
          <DragDots/>
          <div className="rounded-md p-0.5  bg-foreground/20" onClick={()=>{}}>
            <ChevronDownIcon size={14} />
          </div>
        </div>
        <div className="h-5.5 w-44 rounded-sm  bg-linear-to-r from-cyan-500 to-blue-500"></div>
        <div className="flex pr-1 gap-1 justify-end items-center w-28">
          {/* Gradient type radial, linear conninc  */}
          <GradientColorSpaceBadgeText colorSpace="srbxx"/>
          <div>
            {" "}
            <GradientIcon size={18} />{" "}
          </div>
          {/* Easing function, steps linesar or some shit */}

          <div>
            {" "}
            <GradientIcon size={18} />{" "}
          </div>
          {/* Easing function, pattern */}
          <div>
            {" "}
            <GradientIcon size={18} />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default GradientHeaderSummery;
