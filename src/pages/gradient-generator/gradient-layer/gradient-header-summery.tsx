import GradientIcon from "@/components/icons/gradient-icon";
import { ChevronDownIcon } from "lucide-react";
import GradientColorSpaceBadgeText from "./gradient-color-badge-text";
import "@/style/empty-checker-board.css";

const GradientHeaderSummery = () => {
  return (
    <>
      <div className=" flex h-7  justify-between items-center gap-1  outline-2 rounded-md ">
        {/* drag and drop */}
        <div className=" flex items-center h-7 gap-1">
          <div className="flex flex-col justify-center h-7 gap-1 p-1 py-1 bg-foreground/20 rounded-l-md">
            <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
            <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
            <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
          </div>
          <div className="rounded-md p-0.5  bg-foreground/20">
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
