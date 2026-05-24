import GradientIcon from "@/components/icons/my-icon";
import "@/style/EmptyCheckerBoard.css";
import { DragDots } from "../color-clipboard/color-list/drag-dots";
import { ChevronDownIcon, Plus } from "lucide-react";
import GradientHeaderSummery from "./gradient-header-summery";

const GradientList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-3 p-2 bg-stone-800">
      <GradientHeaderSummery/>
    </div>
  );
};

export default GradientList;
