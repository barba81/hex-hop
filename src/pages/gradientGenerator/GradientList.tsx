import GradientIcon from "@/components/icons/MyIcon";
import "@/style/EmptyCheckerBoard.css";
import { DragDots } from "../colorClipboard/colorList/DragDots";
import { ChevronDownIcon } from "lucide-react";

const GradientList = () => {
  return (
    <>
      <div className=" flex  justify-between items-center gap-1  outline-2 rounded-md ">
        {/* drag and drop */}
        <div className=" flex items-center h-full gap-1">
          <div className="flex flex-col gap-1 p-1 py-1 bg-foreground/20 rounded-l-md">
            <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
            <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
            <span className="h-0.75 w-0.75 rounded-full bg-current"></span>
          </div>
          <div className="rounded-md p-0.5  bg-foreground/20">
            <ChevronDownIcon size={14} />
          </div>
        </div>
        <div className="h-4 w-44 rounded-sm  bg-linear-to-r from-cyan-500 to-blue-500"></div>
        {/* text */}

        <div className="flex pr-1 gap-1 justify-end items-center w-28">
          <div className="font-mono text-xs"> OKLAB </div>
          {/* Gradient type radial, linear conninc  */}
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

export default GradientList;
