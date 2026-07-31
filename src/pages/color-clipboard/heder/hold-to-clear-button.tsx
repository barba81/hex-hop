import HoldToButton from "@/components/common/hold-to-button";
import { removeAllData } from "@/pages/color-clipboard/features/remove-all";
import { Trash2 } from "lucide-react";

const HoldToClear = () => {
  return (
    <HoldToButton
      text={
        <>
          <Trash2 />
        </>
      }
      holdText={
        <>
          <Trash2 />
        </>
      }
      action={() => {
        removeAllData();
      }}
      className={"h-6 "}
    />
  );
};

export default HoldToClear;
