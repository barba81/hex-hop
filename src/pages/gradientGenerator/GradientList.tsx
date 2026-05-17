import GradientIcon from "@/components/icons/MyIcon";
import "@/style/EmptyCheckerBoard.css";
import { DragDots } from "../colorClipboard/colorList/DragDots";
import { ChevronDownIcon, Plus } from "lucide-react";
import GradientHeaderSummery from "./GradientHeaderSummery";

const GradientList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2 bg-stone-800">
      <GradientHeaderSummery/>
    </div>
  );
};

export default GradientList;
